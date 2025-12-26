#!/usr/bin/env npx tsx
/**
 * Validatore Immagini Blog
 *
 * Verifica qualità e presenza delle immagini:
 * - coverImage esistono
 * - Dimensioni minime (1200x630px per OG)
 * - Formato ottimizzato (WebP, PNG, JPG)
 * - Peso file (raccomandato < 500KB)
 * - Immagini orfane (non referenziate)
 *
 * Uso: npx tsx scripts/validate-images.ts
 *
 * Note: Per check avanzati (dimensioni) installare sharp:
 *   npm install -D sharp @types/sharp
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';

interface ImageInfo {
  path: string;
  size: number;
  format: string;
  referenced: boolean;
}

const BLOG_DIR = join(process.cwd(), 'src', 'content', 'blog');
const IMAGES_DIR = join(process.cwd(), 'public', 'images');
const COVERS_DIR = join(IMAGES_DIR, 'covers');

const MAX_SIZE_KB = 500;
const RECOMMENDED_FORMATS = ['png', 'webp', 'jpg', 'jpeg'];

function extractFrontmatter(filePath: string): Record<string, any> {
  const content = readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const yaml = match[1];
  const fm: Record<string, any> = {};

  for (const line of yaml.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0 && !line.trim().startsWith('-')) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      fm[key] = value;
    }
  }

  return fm;
}

function getAllBlogPosts(): string[] {
  if (!existsSync(BLOG_DIR)) return [];
  const files = readdirSync(BLOG_DIR);
  return files
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => join(BLOG_DIR, f));
}

function getAllImages(dir: string): ImageInfo[] {
  if (!existsSync(dir)) return [];

  const images: ImageInfo[] = [];
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (stat.isFile()) {
      const ext = extname(file).toLowerCase().substring(1);
      if (RECOMMENDED_FORMATS.includes(ext) || ['gif', 'svg'].includes(ext)) {
        images.push({
          path: filePath,
          size: stat.size,
          format: ext,
          referenced: false,
        });
      }
    }
  }

  return images;
}

async function getImageDimensions(
  filePath: string
): Promise<{ width: number; height: number } | null> {
  try {
    // Try to use sharp if available
    const sharp = await import('sharp').then((m) => m.default);
    const metadata = await sharp(filePath).metadata();
    return { width: metadata.width || 0, height: metadata.height || 0 };
  } catch {
    // Sharp not available, return null
    return null;
  }
}

async function validate() {
  console.log('\n🖼️  VALIDAZIONE IMMAGINI BLOG');
  console.log('═'.repeat(60));

  let hasErrors = false;
  let hasWarnings = false;

  // Get all blog posts
  const posts = getAllBlogPosts();
  console.log(`\n📁 Analizzando ${posts.length} articoli...\n`);

  // Check coverImage references
  console.log('🔍 VERIFICA COVER IMAGE\n');
  const missingImages: string[] = [];
  const referencedImages = new Set<string>();
  const imageIssues: string[] = [];

  for (const post of posts) {
    const fm = extractFrontmatter(post);
    const postName = post.split('/').pop() || '';

    if (fm.coverImage) {
      const imagePath = join(process.cwd(), 'public', fm.coverImage);
      referencedImages.add(imagePath);

      if (!existsSync(imagePath)) {
        missingImages.push(`  ❌ ${postName}: ${fm.coverImage} NON TROVATO`);
        hasErrors = true;
      } else {
        // Check file size
        const stat = statSync(imagePath);
        const sizeKB = stat.size / 1024;

        if (sizeKB > MAX_SIZE_KB) {
          imageIssues.push(
            `  ⚠️  ${postName}: ${fm.coverImage} troppo grande (${sizeKB.toFixed(0)}KB > ${MAX_SIZE_KB}KB)`
          );
          hasWarnings = true;
        }

        // Check format
        const ext = extname(imagePath).toLowerCase().substring(1);
        if (!RECOMMENDED_FORMATS.includes(ext)) {
          imageIssues.push(
            `  ⚠️  ${postName}: ${fm.coverImage} formato non ottimale (${ext}), raccomandati: WebP, PNG, JPG`
          );
          hasWarnings = true;
        }

        // Try to check dimensions if sharp is available
        const dimensions = await getImageDimensions(imagePath);
        if (dimensions) {
          const { width, height } = dimensions;
          if (width < 1200 || height < 630) {
            imageIssues.push(
              `  ⚠️  ${postName}: ${fm.coverImage} dimensioni sotto standard OG (${width}x${height}, raccomandato 1200x630)`
            );
            hasWarnings = true;
          }
        }
      }
    }
  }

  if (missingImages.length > 0) {
    console.log('❌ IMMAGINI MANCANTI:\n');
    missingImages.forEach((msg) => console.log(msg));
    console.log();
  } else {
    console.log('✅ Tutte le coverImage referenziate esistono\n');
  }

  if (imageIssues.length > 0) {
    console.log('⚠️  PROBLEMI QUALITÀ IMMAGINI:\n');
    imageIssues.forEach((msg) => console.log(msg));
    console.log();
  }

  // Check orphaned images in covers/
  console.log('🗑️  VERIFICA IMMAGINI ORFANE (covers/)\n');

  if (existsSync(COVERS_DIR)) {
    const coverImages = getAllImages(COVERS_DIR);
    const orphanedImages: string[] = [];

    for (const img of coverImages) {
      if (!referencedImages.has(img.path)) {
        const filename = img.path.split('/').pop() || '';
        const sizeKB = (img.size / 1024).toFixed(0);
        orphanedImages.push(`  📄 ${filename} (${sizeKB}KB, ${img.format})`);
      }
    }

    if (orphanedImages.length > 0) {
      console.log('⚠️  Immagini in covers/ non referenziate:\n');
      orphanedImages.forEach((msg) => console.log(msg));
      console.log(`\n  Totale: ${orphanedImages.length} immagini orfane`);
      console.log('  Considera di rimuoverle per ridurre il bundle size\n');
      hasWarnings = true;
    } else {
      console.log('✅ Nessuna immagine orfana in covers/\n');
    }
  } else {
    console.log('⚠️  Directory covers/ non trovata\n');
  }

  // Summary
  console.log('═'.repeat(60));
  console.log('📊 RIEPILOGO\n');

  const articlesWithCover = posts.filter(
    (p) => extractFrontmatter(p).coverImage
  ).length;
  const coveragePercent = ((articlesWithCover / posts.length) * 100).toFixed(1);

  console.log(`  Articoli con cover: ${articlesWithCover}/${posts.length} (${coveragePercent}%)`);
  console.log(`  Immagini mancanti:  ${missingImages.length}`);
  console.log(`  Problemi qualità:   ${imageIssues.length}`);

  if (!hasErrors && !hasWarnings) {
    console.log('\n✅ Validazione immagini completata con successo!\n');
    process.exit(0);
  } else if (hasErrors) {
    console.log('\n❌ Validazione fallita: correggi gli errori sopra\n');
    process.exit(1);
  } else {
    console.log('\n⚠️  Validazione completata con warning (non bloccanti)\n');
    process.exit(0);
  }
}

// Check if sharp is available
async function checkSharp() {
  try {
    await import('sharp');
    console.log('📦 sharp disponibile - check dimensioni abilitato');
  } catch {
    console.log('⚠️  sharp non installato - skip check dimensioni');
    console.log('   Installa con: npm install -D sharp @types/sharp\n');
  }
}

// Run
checkSharp().then(() => validate());
