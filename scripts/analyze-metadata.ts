#!/usr/bin/env npx tsx
/**
 * Script Analisi Metadati Blog
 *
 * Analizza i metadati di tutti gli articoli e genera statistiche:
 * - Distribuzione pillar
 * - Top tag più usati
 * - Distribuzione genre
 * - Metadati opzionali mancanti
 * - Qualità SEO
 *
 * Uso: npx tsx scripts/analyze-metadata.ts
 */

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

interface Frontmatter {
  title?: string;
  summary?: string;
  description?: string;
  pillar?: string;
  subsection?: string;
  genre?: string;
  tags?: string[];
  coverImage?: string;
  citation?: string[];
  abstract?: string;
  relatedSlugs?: string[];
  secondaryPillars?: string[];
  featured?: boolean;
  draft?: boolean;
}

const BLOG_DIR = join(process.cwd(), 'src', 'content', 'blog');

function extractFrontmatter(filePath: string): Frontmatter {
  const content = readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const yaml = match[1];
  const fm: Frontmatter = {};

  // Parse semplice YAML (sufficiente per il nostro caso)
  const lines = yaml.split('\n');
  let currentKey = '';
  let currentArray: string[] = [];
  let inArray = false;

  for (const line of lines) {
    // Array items
    if (line.trim().startsWith('-')) {
      const value = line
        .trim()
        .substring(1)
        .trim()
        .replace(/^["']|["']$/g, '');
      currentArray.push(value);
      continue;
    }

    // Key-value
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0 && !line.trim().startsWith(' ')) {
      // Save previous array if any
      if (inArray && currentKey) {
        (fm as any)[currentKey] = currentArray;
        currentArray = [];
        inArray = false;
      }

      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      currentKey = key;

      if (value === '' || value === '[]') {
        inArray = true;
        currentArray = [];
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Inline array
        (fm as any)[key] = value
          .slice(1, -1)
          .split(',')
          .map((v) => v.trim().replace(/^["']|["']$/g, ''));
      } else {
        (fm as any)[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  // Save last array
  if (inArray && currentKey) {
    (fm as any)[currentKey] = currentArray;
  }

  return fm;
}

function getAllBlogPosts(): string[] {
  const files = readdirSync(BLOG_DIR);
  return files
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => join(BLOG_DIR, f));
}

function analyze() {
  const posts = getAllBlogPosts();
  const allMetadata: Frontmatter[] = posts.map(extractFrontmatter);

  console.log('\n📊 ANALISI METADATI BLOG');
  console.log('═'.repeat(60));
  console.log(`\n📁 Totale articoli: ${posts.length}\n`);

  // Distribuzione Pillar
  console.log('🏛️  DISTRIBUZIONE PILLAR');
  const pillarCount: Record<string, number> = {};
  for (const fm of allMetadata) {
    if (fm.pillar) {
      pillarCount[fm.pillar] = (pillarCount[fm.pillar] || 0) + 1;
    }
  }

  const sortedPillars = Object.entries(pillarCount).sort((a, b) => b[1] - a[1]);
  for (const [pillar, count] of sortedPillars) {
    const percentage = ((count / posts.length) * 100).toFixed(1);
    console.log(`  ${pillar.padEnd(15)} ${count} articoli (${percentage}%)`);
  }

  // Secondary Pillars
  console.log('\n🔗 SECONDARY PILLARS');
  const secondaryCount: Record<string, number> = {};
  for (const fm of allMetadata) {
    if (fm.secondaryPillars) {
      for (const sp of fm.secondaryPillars) {
        secondaryCount[sp] = (secondaryCount[sp] || 0) + 1;
      }
    }
  }
  const sortedSecondary = Object.entries(secondaryCount).sort((a, b) => b[1] - a[1]);
  if (sortedSecondary.length > 0) {
    for (const [pillar, count] of sortedSecondary) {
      console.log(`  ${pillar.padEnd(15)} ${count} articoli`);
    }
  } else {
    console.log('  Nessun secondary pillar usato');
  }

  // Top Tag
  console.log('\n🏷️  TOP 15 TAG PIÙ USATI');
  const tagCount: Record<string, number> = {};
  for (const fm of allMetadata) {
    if (fm.tags) {
      for (const tag of fm.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      }
    }
  }

  const sortedTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  for (let i = 0; i < sortedTags.length; i++) {
    const [tag, count] = sortedTags[i];
    console.log(`  ${(i + 1).toString().padStart(2)}. ${tag.padEnd(30)} ${count} occorrenze`);
  }

  // Distribuzione Genre
  console.log('\n📖 DISTRIBUZIONE GENRE');
  const genreCount: Record<string, number> = {};
  let noGenre = 0;

  for (const fm of allMetadata) {
    if (fm.genre) {
      genreCount[fm.genre] = (genreCount[fm.genre] || 0) + 1;
    } else {
      noGenre++;
    }
  }

  const sortedGenres = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
  for (const [genre, count] of sortedGenres) {
    console.log(`  ${genre.padEnd(15)} ${count} articoli`);
  }
  if (noGenre > 0) {
    console.log(`  (non spec)      ${noGenre} articoli ⚠️`);
  }

  // Metadati Opzionali
  console.log('\n⚠️  METADATI OPZIONALI MANCANTI');
  const noCover = allMetadata.filter((fm) => !fm.coverImage).length;
  const noCitation = allMetadata.filter((fm) => !fm.citation || fm.citation.length === 0).length;
  const noGenreCount = allMetadata.filter((fm) => !fm.genre).length;
  const noAbstract = allMetadata.filter((fm) => !fm.abstract).length;
  const noRelated = allMetadata.filter((fm) => !fm.relatedSlugs || fm.relatedSlugs.length === 0)
    .length;

  console.log(`  Senza coverImage:   ${noCover} articoli`);
  console.log(`  Senza citation:     ${noCitation} articoli`);
  console.log(`  Senza genre:        ${noGenreCount} articoli`);
  console.log(`  Senza abstract:     ${noAbstract} articoli`);
  console.log(`  Senza relatedSlugs: ${noRelated} articoli`);

  // Coverage percentuale
  const coverageScore =
    ((posts.length - noCover) / posts.length) * 20 +
    ((posts.length - noCitation) / posts.length) * 20 +
    ((posts.length - noGenreCount) / posts.length) * 20 +
    ((posts.length - noAbstract) / posts.length) * 20 +
    ((posts.length - noRelated) / posts.length) * 20;

  console.log(`\n  Coverage Metadati: ${coverageScore.toFixed(1)}%`);

  // Qualità SEO
  console.log('\n✅ QUALITÀ SEO');
  const longTitles = allMetadata.filter(
    (fm) => fm.title && fm.title.length > 60
  ).length;

  const shortSummaries = allMetadata.filter((fm) => {
    const summary = fm.summary || fm.description || '';
    return summary.length < 120;
  }).length;

  const longSummaries = allMetadata.filter((fm) => {
    const summary = fm.summary || fm.description || '';
    return summary.length > 160;
  }).length;

  console.log(`  Title >60 chars:    ${longTitles} articoli ${longTitles > 0 ? '⚠️' : '✅'}`);
  console.log(`  Summary <120:       ${shortSummaries} articoli ${shortSummaries > 0 ? '⚠️' : '✅'}`);
  console.log(`  Summary >160:       ${longSummaries} articoli ${longSummaries > 0 ? '⚠️' : '✅'}`);

  // Featured/Draft
  console.log('\n🎯 STATO ARTICOLI');
  const featured = allMetadata.filter((fm) => fm.featured === true).length;
  const draft = allMetadata.filter((fm) => fm.draft === true).length;

  console.log(`  Featured:  ${featured} articoli`);
  console.log(`  Draft:     ${draft} articoli ${draft > 0 ? '⚠️' : ''}`);
  console.log(`  Published: ${posts.length - draft} articoli\n`);

  // Tag senza uso ripetuto (usati 1 sola volta)
  console.log('🔍 TAG POCO USATI (1 occorrenza)');
  const singleUseTags = Object.entries(tagCount)
    .filter(([_, count]) => count === 1)
    .map(([tag]) => tag);

  if (singleUseTags.length > 0) {
    console.log(`  ${singleUseTags.length} tag usati 1 sola volta:`);
    singleUseTags.slice(0, 10).forEach((tag) => {
      console.log(`    - ${tag}`);
    });
    if (singleUseTags.length > 10) {
      console.log(`    ... e altri ${singleUseTags.length - 10} tag`);
    }
  } else {
    console.log('  Nessun tag usato una sola volta ✅');
  }

  // Media tag per articolo
  const totalTags = Object.values(tagCount).reduce((sum, count) => sum + count, 0);
  const avgTags = totalTags / posts.length;
  console.log(`\n📊 STATISTICHE TAG`);
  console.log(`  Totale tag unici:        ${Object.keys(tagCount).length}`);
  console.log(`  Media tag per articolo:  ${avgTags.toFixed(1)}`);

  // Subsections
  console.log('\n📂 SUBSECTIONS');
  const subsectionCount: Record<string, number> = {};
  for (const fm of allMetadata) {
    if (fm.subsection) {
      subsectionCount[fm.subsection] = (subsectionCount[fm.subsection] || 0) + 1;
    }
  }
  const sortedSubsections = Object.entries(subsectionCount).sort((a, b) => b[1] - a[1]);
  for (const [subsection, count] of sortedSubsections.slice(0, 10)) {
    console.log(`  ${subsection.padEnd(25)} ${count} articoli`);
  }

  console.log('\n' + '═'.repeat(60) + '\n');
}

// Run
analyze();
