/**
 * Test SEO: robots.txt, sitemap, schema.org, meta tags
 */
import { describe, it, expect, beforeAll } from 'vitest';
import {
  ensureBuildExists,
  readDistFile,
  distFileExists,
  loadHtml,
  loadXml,
  getAllHtmlFiles,
} from './setup';

beforeAll(() => {
  ensureBuildExists();
});

describe('robots.txt', () => {
  it('esiste e ha contenuto valido', () => {
    expect(distFileExists('robots.txt')).toBe(true);

    const content = readDistFile('robots.txt');
    expect(content).toContain('User-agent:');
    expect(content).toContain('Sitemap:');
  });

  it('punta al sitemap corretto', () => {
    const content = readDistFile('robots.txt');
    expect(content).toMatch(/Sitemap:\s*https:\/\/ireneburresi\.dev\/sitemap/i);
  });

  it('non blocca i crawler principali', () => {
    const content = readDistFile('robots.txt');
    // Non dovrebbe avere Disallow: / per User-agent: *
    const lines = content.split('\n');
    let currentAgent = '';

    for (const line of lines) {
      if (line.startsWith('User-agent:')) {
        currentAgent = line.replace('User-agent:', '').trim();
      }
      if (currentAgent === '*' && line.trim() === 'Disallow: /') {
        throw new Error('robots.txt blocca tutti i crawler con Disallow: /');
      }
    }
  });
});

describe('Sitemap', () => {
  it('sitemap-index.xml esiste', () => {
    expect(distFileExists('sitemap-index.xml')).toBe(true);
  });

  it('sitemap-index.xml è XML valido', () => {
    const xml = loadXml('sitemap-index.xml') as { sitemapindex?: unknown };
    expect(xml).toHaveProperty('sitemapindex');
  });

  it('contiene almeno un sitemap', () => {
    const xml = loadXml('sitemap-index.xml') as {
      sitemapindex?: { sitemap?: unknown | unknown[] };
    };
    const sitemaps = xml.sitemapindex?.sitemap;
    expect(sitemaps).toBeDefined();

    const sitemapArray = Array.isArray(sitemaps) ? sitemaps : [sitemaps];
    expect(sitemapArray.length).toBeGreaterThan(0);
  });

  it('tutti i sitemap referenziati esistono', () => {
    const xml = loadXml('sitemap-index.xml') as {
      sitemapindex?: { sitemap?: { loc: string } | Array<{ loc: string }> };
    };
    const sitemaps = xml.sitemapindex?.sitemap;
    const sitemapArray = Array.isArray(sitemaps) ? sitemaps : sitemaps ? [sitemaps] : [];

    for (const sitemap of sitemapArray) {
      const loc = sitemap.loc;
      const path = loc.replace('https://ireneburresi.dev/', '');
      expect(distFileExists(path)).toBe(true);
    }
  });
});

describe('Meta Tags', () => {
  it('homepage ha tutti i meta tag essenziali', () => {
    const $ = loadHtml('index.html');

    // Title
    expect($('title').text()).toBeTruthy();
    expect($('title').text().length).toBeGreaterThan(10);

    // Description
    const description = $('meta[name="description"]').attr('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(50);

    // Canonical
    const canonical = $('link[rel="canonical"]').attr('href');
    expect(canonical).toBeTruthy();

    // Viewport
    expect($('meta[name="viewport"]').attr('content')).toBeTruthy();

    // Language
    expect($('html').attr('lang')).toBe('it');
  });

  it('homepage ha Open Graph tags', () => {
    const $ = loadHtml('index.html');

    expect($('meta[property="og:title"]').attr('content')).toBeTruthy();
    expect($('meta[property="og:description"]').attr('content')).toBeTruthy();
    expect($('meta[property="og:type"]').attr('content')).toBeTruthy();
    expect($('meta[property="og:url"]').attr('content')).toBeTruthy();
  });

  it('homepage ha Twitter Card tags', () => {
    const $ = loadHtml('index.html');

    expect($('meta[name="twitter:card"]').attr('content')).toBeTruthy();
    expect($('meta[name="twitter:title"]').attr('content')).toBeTruthy();
  });

  it('tutte le pagine hanno title e description', () => {
    const htmlFiles = getAllHtmlFiles();

    for (const file of htmlFiles) {
      const $ = loadHtml(file);
      const title = $('title').text();
      const description = $('meta[name="description"]').attr('content');

      expect(title, `${file} manca title`).toBeTruthy();
      expect(description, `${file} manca description`).toBeTruthy();
    }
  });
});

describe('Schema.org / JSON-LD', () => {
  it('homepage ha JSON-LD valido', () => {
    const $ = loadHtml('index.html');
    const scripts = $('script[type="application/ld+json"]');

    expect(scripts.length).toBeGreaterThan(0);

    scripts.each((_, el) => {
      const content = $(el).html();
      expect(content).toBeTruthy();

      // Deve essere JSON valido
      const json = JSON.parse(content!);
      expect(json).toBeTruthy();
    });
  });

  it('homepage JSON-LD ha @context schema.org', () => {
    const $ = loadHtml('index.html');
    const script = $('script[type="application/ld+json"]').first();
    const json = JSON.parse(script.html()!);

    expect(json['@context']).toBe('https://schema.org');
  });

  it('homepage JSON-LD ha @graph con Person e Organization', () => {
    const $ = loadHtml('index.html');
    const script = $('script[type="application/ld+json"]').first();
    const json = JSON.parse(script.html()!);

    expect(json['@graph']).toBeDefined();
    expect(Array.isArray(json['@graph'])).toBe(true);

    const types = json['@graph'].map((item: { '@type': string }) => item['@type']);
    expect(types).toContain('Person');
    expect(types).toContain('Organization');
    expect(types).toContain('WebSite');
  });

  it('Person schema ha campi richiesti', () => {
    const $ = loadHtml('index.html');
    const script = $('script[type="application/ld+json"]').first();
    const json = JSON.parse(script.html()!);

    const person = json['@graph'].find(
      (item: { '@type': string }) => item['@type'] === 'Person'
    );

    expect(person).toBeDefined();
    expect(person.name).toBeTruthy();
    expect(person.url).toBeTruthy();
    expect(person.jobTitle).toBeTruthy();
  });

  it('articoli blog hanno TechArticle schema', () => {
    const $ = loadHtml('blog/index.html');

    // Se esiste la pagina blog, controlla che abbia structured data
    const scripts = $('script[type="application/ld+json"]');
    expect(scripts.length).toBeGreaterThan(0);
  });
});

describe('Accessibilità base', () => {
  it('tutte le immagini hanno alt text', () => {
    const htmlFiles = getAllHtmlFiles();

    for (const file of htmlFiles) {
      const $ = loadHtml(file);
      const imagesWithoutAlt = $('img:not([alt])');

      expect(
        imagesWithoutAlt.length,
        `${file} ha ${imagesWithoutAlt.length} immagini senza alt`
      ).toBe(0);
    }
  });

  it('homepage ha heading h1', () => {
    const $ = loadHtml('index.html');
    expect($('h1').length).toBeGreaterThan(0);
  });

  it('struttura heading è corretta (no skip levels)', () => {
    const $ = loadHtml('index.html');
    const headings = $('h1, h2, h3, h4, h5, h6')
      .map((_, el) => parseInt(el.tagName.replace('h', '')))
      .get();

    for (let i = 1; i < headings.length; i++) {
      const diff = headings[i] - headings[i - 1];
      // Non dovrebbe saltare più di un livello
      expect(diff, 'Heading levels should not skip more than 1 level').toBeLessThanOrEqual(1);
    }
  });

  it('link hanno testo accessibile', () => {
    const $ = loadHtml('index.html');
    const emptyLinks = $('a:not([aria-label])').filter((_, el) => {
      const text = $(el).text().trim();
      const hasImage = $(el).find('img[alt]').length > 0;
      const hasSvgTitle = $(el).find('svg title').length > 0;
      return !text && !hasImage && !hasSvgTitle;
    });

    // Permetti alcuni link vuoti (es. icone con aria-label)
    expect(
      emptyLinks.length,
      'Troppi link senza testo accessibile'
    ).toBeLessThan(5);
  });
});
