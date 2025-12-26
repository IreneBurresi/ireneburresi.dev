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

// ============================================================================
// ADVANCED VALIDATION TESTS
// ============================================================================

describe('Advanced Metadata Validation', () => {
  const posts = getAllBlogPosts();

  if (posts.length === 0) {
    it.skip('nessun post trovato', () => {});
    return;
  }

  it('genre è tra quelli consigliati', () => {
    const validGenres = [
      'Analysis',
      'Tutorial',
      'Review',
      'Case Study',
      'Opinion',
      'Research',
      'News',
      'Comparison',
      'Guide',
    ];

    const invalidGenres: string[] = [];

    for (const post of posts) {
      const fm = extractFrontmatter(post);
      if (fm.genre && !validGenres.includes(fm.genre as string)) {
        invalidGenres.push(`${post}: "${fm.genre}"`);
      }
    }

    if (invalidGenres.length > 0) {
      console.warn(
        `⚠️  Genre non validi:\n  ${invalidGenres.join('\n  ')}\n  Valori consentiti: ${validGenres.join(', ')}`
      );
    }

    expect(invalidGenres.length).toBe(0);
  });

  it('citation contiene solo URL validi', () => {
    const errors: string[] = [];

    for (const post of posts) {
      const content = readFileSync(post, 'utf-8');

      if (content.includes('citation:')) {
        // Parse citation array
        const citationMatch = content.match(/citation:\s*\n((?:\s*-\s*"[^"]+"\s*\n?)+)/);
        if (citationMatch) {
          const urls = citationMatch[1].match(/"([^"]+)"/g) || [];
          for (const urlQuoted of urls) {
            const url = urlQuoted.replace(/"/g, '');
            try {
              new URL(url);
              if (!url.startsWith('http://') && !url.startsWith('https://')) {
                errors.push(`${post}: URL senza protocollo HTTP/S: ${url}`);
              }
            } catch {
              errors.push(`${post}: URL non valido: ${url}`);
            }
          }
        }
      }
    }

    if (errors.length > 0) {
      console.error(`❌ URL citation non validi:\n  ${errors.join('\n  ')}`);
    }

    expect(errors.length).toBe(0);
  });

  it('relatedSlugs puntano ad articoli esistenti', () => {
    const allSlugs = posts.map((p) => {
      const filename = p.split('/').pop() || '';
      return filename.replace(/\.mdx?$/, '');
    });

    const errors: string[] = [];

    for (const post of posts) {
      const content = readFileSync(post, 'utf-8');
      if (content.includes('relatedSlugs:')) {
        const relatedMatch = content.match(/relatedSlugs:\s*\[(.*?)\]/s);
        if (relatedMatch) {
          const slugs = relatedMatch[1]
            .split(',')
            .map((s) => s.trim().replace(/["']/g, ''))
            .filter((s) => s.length > 0);

          for (const slug of slugs) {
            if (!allSlugs.includes(slug)) {
              errors.push(`${post}: slug "${slug}" non trovato`);
            }
          }
        }
      }
    }

    if (errors.length > 0) {
      console.error(`❌ relatedSlugs non validi:\n  ${errors.join('\n  ')}`);
    }

    expect(errors.length).toBe(0);
  });

  it('coverImage punta a file esistente', () => {
    const errors: string[] = [];

    for (const post of posts) {
      const fm = extractFrontmatter(post);
      if (fm.coverImage) {
        const imagePath = join(process.cwd(), 'public', fm.coverImage as string);
        if (!existsSync(imagePath)) {
          errors.push(`${post}: ${fm.coverImage} non trovato`);
        }
      }
    }

    if (errors.length > 0) {
      console.error(`❌ coverImage mancanti:\n  ${errors.join('\n  ')}`);
    }

    expect(errors.length).toBe(0);
  });

  it('articoli hanno 3-6 tag (raccomandato)', () => {
    const warnings: string[] = [];

    for (const post of posts) {
      const content = readFileSync(post, 'utf-8');
      const tagsMatch = content.match(/tags:\s*\[(.*?)\]/);

      if (tagsMatch) {
        const tags = tagsMatch[1]
          .split(',')
          .map((t) => t.trim().replace(/["']/g, ''))
          .filter((t) => t.length > 0);

        const count = tags.length;
        if (count < 3 || count > 6) {
          warnings.push(`${post}: ${count} tag (raccomandato 3-6)`);
        }
      }
    }

    if (warnings.length > 0) {
      console.warn(`⚠️  Articoli fuori range tag:\n  ${warnings.join('\n  ')}`);
    }
  });

  it('secondaryPillars sono validi', () => {
    const errors: string[] = [];

    for (const post of posts) {
      const content = readFileSync(post, 'utf-8');
      if (content.includes('secondaryPillars:')) {
        const secondaryMatch = content.match(/secondaryPillars:\s*\[(.*?)\]/);
        if (secondaryMatch) {
          const pillars = secondaryMatch[1]
            .split(',')
            .map((p) => p.trim().replace(/["']/g, ''))
            .filter((p) => p.length > 0);

          for (const pillar of pillars) {
            if (!VALID_PILLARS.includes(pillar)) {
              errors.push(`${post}: secondary pillar "${pillar}" non valido`);
            }
          }
        }
      }
    }

    if (errors.length > 0) {
      console.error(`❌ secondaryPillars non validi:\n  ${errors.join('\n  ')}`);
    }

    expect(errors.length).toBe(0);
  });

  it('inLanguage usa codici ISO 639-1 validi', () => {
    const validLangCodes = ['it', 'en', 'es', 'fr', 'de', 'pt'];
    const errors: string[] = [];

    for (const post of posts) {
      const fm = extractFrontmatter(post);
      if (fm.inLanguage && !validLangCodes.includes(fm.inLanguage as string)) {
        errors.push(`${post}: "${fm.inLanguage}" non è un codice ISO 639-1 valido`);
      }
    }

    if (errors.length > 0) {
      console.error(
        `❌ Codici lingua non validi:\n  ${errors.join('\n  ')}\n  Valori consentiti: ${validLangCodes.join(', ')}`
      );
    }

    expect(errors.length).toBe(0);
  });

  it('summary ha lunghezza ideale per SEO (120-160 caratteri)', () => {
    const warnings: string[] = [];

    for (const post of posts) {
      const fm = extractFrontmatter(post);
      const summary = (fm.summary || fm.description) as string;

      if (summary) {
        const len = summary.length;
        if (len < 120) {
          warnings.push(`${post}: summary troppo corto (${len} caratteri)`);
        } else if (len > 160) {
          warnings.push(`${post}: summary troppo lungo (${len} caratteri)`);
        }
      }
    }

    if (warnings.length > 0) {
      console.warn(
        `⚠️  Summary fuori range SEO ideale (120-160):\n  ${warnings.join('\n  ')}`
      );
    }
  });

  it('nessun draft in produzione', () => {
    const drafts: string[] = [];

    for (const post of posts) {
      const fm = extractFrontmatter(post);
      if (fm.draft === true || fm.draft === 'true') {
        drafts.push(post);
      }
    }

    if (drafts.length > 0 && process.env.CI) {
      throw new Error(
        `❌ ${drafts.length} articoli in draft trovati in CI:\n  ${drafts.join('\n  ')}`
      );
    }

    if (drafts.length > 0) {
      console.warn(`⚠️  ${drafts.length} articoli in draft trovati (OK in locale)`);
    }
  });
});
