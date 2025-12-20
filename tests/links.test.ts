/**
 * Test Link: validazione link interni, risorse, asset
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync } from 'fs';
import { join } from 'path';
import {
  ensureBuildExists,
  loadHtml,
  getAllHtmlFiles,
  isInternalUrl,
  normalizeUrlPath,
  DIST_DIR,
} from './setup';

beforeAll(() => {
  ensureBuildExists();
});

/**
 * Verifica se un path esiste nella build
 */
function resourceExists(urlPath: string): boolean {
  const normalized = normalizeUrlPath(urlPath);

  // Prova prima come file diretto
  if (existsSync(join(DIST_DIR, normalized))) {
    return true;
  }

  // Prova come directory con index.html
  if (existsSync(join(DIST_DIR, normalized, 'index.html'))) {
    return true;
  }

  // Prova aggiungendo .html
  if (existsSync(join(DIST_DIR, normalized + '.html'))) {
    return true;
  }

  // Prova rimuovendo trailing slash e aggiungendo index.html
  const withoutSlash = normalized.endsWith('/')
    ? normalized.slice(0, -1)
    : normalized;
  if (existsSync(join(DIST_DIR, withoutSlash, 'index.html'))) {
    return true;
  }

  return false;
}

describe('Link interni', () => {
  it('homepage non ha link interni rotti', () => {
    const $ = loadHtml('index.html');
    const brokenLinks: string[] = [];

    $('a[href]').each((_, el) => {
      const href = $(el).attr('href')!;

      // Skip link esterni, anchor, mailto, tel
      if (
        href.startsWith('http') &&
        !href.startsWith('https://ireneburresi.dev')
      ) {
        return;
      }
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      if (!resourceExists(href)) {
        brokenLinks.push(href);
      }
    });

    expect(brokenLinks, `Link rotti trovati: ${brokenLinks.join(', ')}`).toEqual([]);
  });

  it('tutte le pagine non hanno link interni rotti', () => {
    const htmlFiles = getAllHtmlFiles();
    const allBrokenLinks: { file: string; link: string }[] = [];

    for (const file of htmlFiles) {
      const $ = loadHtml(file);

      $('a[href]').each((_, el) => {
        const href = $(el).attr('href')!;

        // Skip link esterni, anchor, mailto, tel
        if (
          href.startsWith('http') &&
          !href.startsWith('https://ireneburresi.dev')
        ) {
          return;
        }
        if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          return;
        }

        if (!resourceExists(href)) {
          allBrokenLinks.push({ file, link: href });
        }
      });
    }

    if (allBrokenLinks.length > 0) {
      const report = allBrokenLinks
        .slice(0, 10) // Limita a 10 per leggibilità
        .map((b) => `  ${b.file}: ${b.link}`)
        .join('\n');
      expect.fail(
        `Trovati ${allBrokenLinks.length} link rotti:\n${report}${allBrokenLinks.length > 10 ? '\n  ...' : ''}`
      );
    }
  });
});

describe('Asset e risorse', () => {
  it('immagini referenziate esistono', () => {
    const htmlFiles = getAllHtmlFiles();
    const missingImages: { file: string; src: string }[] = [];

    for (const file of htmlFiles) {
      const $ = loadHtml(file);

      $('img[src]').each((_, el) => {
        const src = $(el).attr('src')!;

        // Skip data URLs e external
        if (src.startsWith('data:') || src.startsWith('http')) {
          return;
        }

        if (!resourceExists(src)) {
          missingImages.push({ file, src });
        }
      });
    }

    if (missingImages.length > 0) {
      const report = missingImages
        .slice(0, 10)
        .map((m) => `  ${m.file}: ${m.src}`)
        .join('\n');
      expect.fail(
        `Trovate ${missingImages.length} immagini mancanti:\n${report}${missingImages.length > 10 ? '\n  ...' : ''}`
      );
    }
  });

  it('CSS referenziati esistono', () => {
    const htmlFiles = getAllHtmlFiles();
    const missingCss: { file: string; href: string }[] = [];

    for (const file of htmlFiles) {
      const $ = loadHtml(file);

      $('link[rel="stylesheet"][href]').each((_, el) => {
        const href = $(el).attr('href')!;

        // Skip external
        if (href.startsWith('http')) {
          return;
        }

        if (!resourceExists(href)) {
          missingCss.push({ file, href });
        }
      });
    }

    expect(missingCss, 'CSS mancanti trovati').toEqual([]);
  });

  it('JS referenziati esistono', () => {
    const htmlFiles = getAllHtmlFiles();
    const missingJs: { file: string; src: string }[] = [];

    for (const file of htmlFiles) {
      const $ = loadHtml(file);

      $('script[src]').each((_, el) => {
        const src = $(el).attr('src')!;

        // Skip external
        if (src.startsWith('http')) {
          return;
        }

        if (!resourceExists(src)) {
          missingJs.push({ file, src });
        }
      });
    }

    expect(missingJs, 'JS mancanti trovati').toEqual([]);
  });
});

describe('Favicon e icone', () => {
  it('favicon.svg esiste', () => {
    expect(existsSync(join(DIST_DIR, 'favicon.svg'))).toBe(true);
  });

  it('favicon è referenziato correttamente', () => {
    const $ = loadHtml('index.html');
    const favicon = $('link[rel="icon"]');
    expect(favicon.length).toBeGreaterThan(0);
  });
});

describe('File statici critici', () => {
  const criticalFiles = [
    'robots.txt',
    'sitemap-index.xml',
    'rss.xml',
    'atom.xml',
    'feed.json',
    'favicon.svg',
  ];

  for (const file of criticalFiles) {
    it(`${file} esiste`, () => {
      expect(existsSync(join(DIST_DIR, file)), `${file} non trovato`).toBe(true);
    });
  }
});

describe('Canonical URLs', () => {
  it('tutte le pagine hanno canonical URL', () => {
    const htmlFiles = getAllHtmlFiles();
    const missingCanonical: string[] = [];

    for (const file of htmlFiles) {
      const $ = loadHtml(file);
      const canonical = $('link[rel="canonical"]');

      if (canonical.length === 0) {
        missingCanonical.push(file);
      }
    }

    expect(
      missingCanonical.length,
      `Pagine senza canonical: ${missingCanonical.join(', ')}`
    ).toBe(0);
  });

  it('canonical URLs usano HTTPS', () => {
    const htmlFiles = getAllHtmlFiles();

    for (const file of htmlFiles) {
      const $ = loadHtml(file);
      const canonical = $('link[rel="canonical"]').attr('href');

      if (canonical) {
        expect(canonical.startsWith('https://'), `${file} ha canonical non HTTPS`).toBe(
          true
        );
      }
    }
  });

  it('canonical URLs puntano al dominio corretto', () => {
    const htmlFiles = getAllHtmlFiles();

    for (const file of htmlFiles) {
      const $ = loadHtml(file);
      const canonical = $('link[rel="canonical"]').attr('href');

      if (canonical) {
        expect(
          canonical.startsWith('https://ireneburresi.dev'),
          `${file} ha canonical con dominio errato: ${canonical}`
        ).toBe(true);
      }
    }
  });
});

describe('Navigazione', () => {
  it('tutte le pagine hanno link alla homepage', () => {
    const htmlFiles = getAllHtmlFiles();

    for (const file of htmlFiles) {
      const $ = loadHtml(file);
      const homeLink = $('a[href="/"], a[href="https://ireneburresi.dev/"]');

      expect(
        homeLink.length,
        `${file} non ha link alla homepage`
      ).toBeGreaterThan(0);
    }
  });

  it('navbar è presente su tutte le pagine', () => {
    const htmlFiles = getAllHtmlFiles();

    for (const file of htmlFiles) {
      const $ = loadHtml(file);
      const nav = $('nav');

      expect(nav.length, `${file} non ha elemento nav`).toBeGreaterThan(0);
    }
  });
});
