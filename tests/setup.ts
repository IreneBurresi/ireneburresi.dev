/**
 * Test Setup e Utility
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import * as cheerio from 'cheerio';
import { XMLParser } from 'fast-xml-parser';

export const DIST_DIR = join(process.cwd(), 'dist');
export const SRC_DIR = join(process.cwd(), 'src');
export const CONTENT_DIR = join(SRC_DIR, 'content', 'blog');

export const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

/**
 * Verifica che la build esista
 */
export function ensureBuildExists(): void {
  if (!existsSync(DIST_DIR)) {
    throw new Error(
      'Build directory non trovata. Esegui `npm run build` prima dei test.'
    );
  }
}

/**
 * Legge un file dalla cartella dist
 */
export function readDistFile(relativePath: string): string {
  const fullPath = join(DIST_DIR, relativePath);
  if (!existsSync(fullPath)) {
    throw new Error(`File non trovato: ${relativePath}`);
  }
  return readFileSync(fullPath, 'utf-8');
}

/**
 * Verifica se un file esiste in dist
 */
export function distFileExists(relativePath: string): boolean {
  return existsSync(join(DIST_DIR, relativePath));
}

/**
 * Carica e parsa HTML
 */
export function loadHtml(relativePath: string): cheerio.CheerioAPI {
  const html = readDistFile(relativePath);
  return cheerio.load(html);
}

/**
 * Carica e parsa XML
 */
export function loadXml(relativePath: string): unknown {
  const xml = readDistFile(relativePath);
  return xmlParser.parse(xml);
}

/**
 * Ottiene tutti i file HTML nella build
 */
export function getAllHtmlFiles(dir: string = DIST_DIR): string[] {
  const files: string[] = [];

  function walk(currentDir: string): void {
    const entries = readdirSync(currentDir);
    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (entry.endsWith('.html')) {
        files.push(fullPath.replace(DIST_DIR + '/', ''));
      }
    }
  }

  walk(dir);
  return files;
}

/**
 * Ottiene tutti i file MDX del blog
 */
export function getAllBlogPosts(): string[] {
  if (!existsSync(CONTENT_DIR)) {
    return [];
  }
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => join(CONTENT_DIR, f));
}

/**
 * Estrae il frontmatter da un file MDX/MD
 */
export function extractFrontmatter(filePath: string): Record<string, unknown> {
  const content = readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return {};
  }

  const yaml = match[1];
  const result: Record<string, unknown> = {};

  // Parser YAML semplice
  for (const line of yaml.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value: unknown = line.slice(colonIndex + 1).trim();

      // Rimuovi quote
      if (
        (value as string).startsWith("'") &&
        (value as string).endsWith("'")
      ) {
        value = (value as string).slice(1, -1);
      } else if (
        (value as string).startsWith('"') &&
        (value as string).endsWith('"')
      ) {
        value = (value as string).slice(1, -1);
      }

      result[key] = value;
    }
  }

  return result;
}

/**
 * Verifica se un URL è interno
 */
export function isInternalUrl(url: string): boolean {
  return (
    url.startsWith('/') ||
    url.startsWith('#') ||
    url.startsWith('https://ireneburresi.dev')
  );
}

/**
 * Normalizza un path URL
 */
export function normalizeUrlPath(url: string): string {
  // Rimuovi anchor e query string
  let path = url.split('#')[0].split('?')[0];

  // Rimuovi dominio se presente
  if (path.startsWith('https://ireneburresi.dev')) {
    path = path.replace('https://ireneburresi.dev', '');
  }

  // Assicurati che inizi con /
  if (!path.startsWith('/')) {
    path = '/' + path;
  }

  return path;
}
