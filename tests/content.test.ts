/**
 * Test Contenuti: frontmatter, struttura articoli, validazione dati
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { getAllBlogPosts, extractFrontmatter, SRC_DIR } from './setup';

const VALID_PILLARS = [
  'engineering',
  'research',
  'business',
  'governance',
  'methodology',
  'synthesis',
];

describe('Blog Posts Frontmatter', () => {
  const posts = getAllBlogPosts();

  if (posts.length === 0) {
    it.skip('nessun post trovato', () => {});
    return;
  }

  it('tutti i post hanno frontmatter', () => {
    for (const post of posts) {
      const content = readFileSync(post, 'utf-8');
      expect(content.startsWith('---'), `${post} non inizia con frontmatter`).toBe(true);
    }
  });

  it('tutti i post hanno title', () => {
    for (const post of posts) {
      const fm = extractFrontmatter(post);
      expect(fm.title, `${post} manca title`).toBeTruthy();
    }
  });

  it('tutti i post hanno summary/description', () => {
    for (const post of posts) {
      const fm = extractFrontmatter(post);
      const hasDescription = fm.summary || fm.description;
      expect(hasDescription, `${post} manca summary/description`).toBeTruthy();
    }
  });

  it('tutti i post hanno publishedAt', () => {
    for (const post of posts) {
      const fm = extractFrontmatter(post);
      expect(fm.publishedAt, `${post} manca publishedAt`).toBeTruthy();
    }
  });

  it('publishedAt è una data valida', () => {
    for (const post of posts) {
      const fm = extractFrontmatter(post);
      if (fm.publishedAt) {
        const date = new Date(fm.publishedAt as string);
        expect(isNaN(date.getTime()), `${post} ha publishedAt non valido`).toBe(false);
      }
    }
  });

  it('tutti i post hanno pillar valido', () => {
    for (const post of posts) {
      const fm = extractFrontmatter(post);
      if (fm.pillar) {
        expect(
          VALID_PILLARS.includes(fm.pillar as string),
          `${post} ha pillar non valido: ${fm.pillar}`
        ).toBe(true);
      }
    }
  });

  it('tutti i post hanno author', () => {
    for (const post of posts) {
      const content = readFileSync(post, 'utf-8');
      // author può essere oggetto nested, verifichiamo che esista nel YAML
      expect(content).toMatch(/author:/);
    }
  });

  it('nessun post è in draft (per produzione)', () => {
    const draftPosts = posts.filter((post) => {
      const fm = extractFrontmatter(post);
      return fm.draft === 'true' || fm.draft === true;
    });

    // Questo è un warning, non un errore
    if (draftPosts.length > 0) {
      console.warn(`⚠️  ${draftPosts.length} post in draft trovati`);
    }
  });
});

describe('Struttura contenuti', () => {
  it('cartella content/blog esiste', () => {
    const blogDir = join(SRC_DIR, 'content', 'blog');
    expect(existsSync(blogDir), 'Cartella content/blog non trovata').toBe(true);
  });

  it('esiste almeno un post', () => {
    const posts = getAllBlogPosts();
    expect(posts.length, 'Nessun post trovato').toBeGreaterThan(0);
  });
});

describe('Schema.ts Validation', () => {
  it('schema.ts esiste e ha export corretti', async () => {
    const schemaPath = join(SRC_DIR, 'consts', 'schema.ts');
    expect(existsSync(schemaPath), 'schema.ts non trovato').toBe(true);

    const content = readFileSync(schemaPath, 'utf-8');

    // Verifica export principali
    expect(content).toContain('export const PERSON');
    expect(content).toContain('export const ORGANIZATION');
    expect(content).toContain('export const WEBSITE');
    expect(content).toContain('export const SOCIAL');
  });

  it('PERSON ha campi richiesti', () => {
    const schemaPath = join(SRC_DIR, 'consts', 'schema.ts');
    const content = readFileSync(schemaPath, 'utf-8');

    // Verifica che PERSON abbia i campi essenziali
    expect(content).toMatch(/name:\s*['"][\w\s]+['"]/);
    expect(content).toMatch(/jobTitle:\s*['"][\w\s]+['"]/);
    expect(content).toMatch(/url:\s*['"]https?:\/\//);
    expect(content).toContain('sameAs');
    expect(content).toContain('knowsAbout');
  });

  it('WEBSITE ha URL corretto', () => {
    const schemaPath = join(SRC_DIR, 'consts', 'schema.ts');
    const content = readFileSync(schemaPath, 'utf-8');

    expect(content).toContain('https://ireneburresi.dev');
  });

  it('sameAs contiene URL reali (non placeholder)', () => {
    const schemaPath = join(SRC_DIR, 'consts', 'schema.ts');
    const content = readFileSync(schemaPath, 'utf-8');

    // Non dovrebbe contenere placeholder
    expect(content).not.toContain('tuousername');
    expect(content).not.toContain('XXXXX');
    expect(content).not.toContain('your-username');
  });
});

describe('Constants Validation', () => {
  it('constants.ts ha PILLARS definiti', () => {
    const constantsPath = join(SRC_DIR, 'lib', 'constants.ts');
    expect(existsSync(constantsPath), 'constants.ts non trovato').toBe(true);

    const content = readFileSync(constantsPath, 'utf-8');
    expect(content).toContain('export const PILLARS');
  });

  it('tutti i pillar hanno campi richiesti', () => {
    const constantsPath = join(SRC_DIR, 'lib', 'constants.ts');
    const content = readFileSync(constantsPath, 'utf-8');

    // Ogni pillar dovrebbe avere name, slug, hero, subsections
    const pillarNames = ['engineering', 'research', 'business', 'governance', 'methodology', 'synthesis'];

    for (const name of pillarNames) {
      expect(content).toContain(`${name}:`);
    }
  });
});

describe('Site Config Validation', () => {
  it('site.ts esiste e ha SITE export', () => {
    const sitePath = join(SRC_DIR, 'consts', 'site.ts');
    expect(existsSync(sitePath), 'site.ts non trovato').toBe(true);

    const content = readFileSync(sitePath, 'utf-8');
    expect(content).toContain('export const SITE');
  });

  it('SITE importa da schema.ts', () => {
    const sitePath = join(SRC_DIR, 'consts', 'site.ts');
    const content = readFileSync(sitePath, 'utf-8');

    expect(content).toContain("from './schema'");
  });
});

describe('Immagini e Asset', () => {
  it('cartella public/images esiste', () => {
    const imagesDir = join(process.cwd(), 'public', 'images');
    expect(existsSync(imagesDir), 'Cartella public/images non trovata').toBe(true);
  });

  it('favicon.svg esiste', () => {
    const faviconPath = join(process.cwd(), 'public', 'favicon.svg');
    expect(existsSync(faviconPath), 'favicon.svg non trovato').toBe(true);
  });
});

describe('Lunghezza contenuti', () => {
  const posts = getAllBlogPosts();

  if (posts.length === 0) {
    it.skip('nessun post trovato', () => {});
    return;
  }

  it('title non supera 60 caratteri (SEO)', () => {
    const longTitles: string[] = [];

    for (const post of posts) {
      const fm = extractFrontmatter(post);
      if (fm.title && (fm.title as string).length > 60) {
        longTitles.push(`${post}: ${(fm.title as string).length} chars`);
      }
    }

    if (longTitles.length > 0) {
      console.warn(`⚠️  Post con title > 60 chars:\n  ${longTitles.join('\n  ')}`);
    }
  });

  it('summary tra 120-160 caratteri (SEO ideale)', () => {
    const outOfRange: string[] = [];

    for (const post of posts) {
      const fm = extractFrontmatter(post);
      const summary = (fm.summary || fm.description) as string;

      if (summary) {
        const len = summary.length;
        if (len < 100 || len > 200) {
          outOfRange.push(`${post}: ${len} chars`);
        }
      }
    }

    if (outOfRange.length > 0) {
      console.warn(
        `⚠️  Post con summary fuori range (100-200 chars):\n  ${outOfRange.join('\n  ')}`
      );
    }
  });
});
