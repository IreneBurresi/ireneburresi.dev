/**
 * Test Feed: RSS, Atom, JSON Feed
 */
import { describe, it, expect, beforeAll } from 'vitest';
import {
  ensureBuildExists,
  readDistFile,
  distFileExists,
  loadXml,
} from './setup';

beforeAll(() => {
  ensureBuildExists();
});

describe('RSS Feed', () => {
  it('rss.xml esiste', () => {
    expect(distFileExists('rss.xml')).toBe(true);
  });

  it('rss.xml è XML valido con struttura RSS', () => {
    const xml = loadXml('rss.xml') as { rss?: { channel?: unknown } };
    expect(xml).toHaveProperty('rss');
    expect(xml.rss).toHaveProperty('channel');
  });

  it('RSS ha title e description', () => {
    const xml = loadXml('rss.xml') as {
      rss?: { channel?: { title?: string; description?: string } };
    };
    const channel = xml.rss?.channel;

    expect(channel?.title).toBeTruthy();
    expect(channel?.description).toBeTruthy();
  });

  it('RSS ha almeno un item', () => {
    const xml = loadXml('rss.xml') as {
      rss?: { channel?: { item?: unknown | unknown[] } };
    };
    const items = xml.rss?.channel?.item;

    expect(items).toBeDefined();
    const itemArray = Array.isArray(items) ? items : [items];
    expect(itemArray.length).toBeGreaterThan(0);
  });

  it('RSS items hanno campi richiesti', () => {
    const xml = loadXml('rss.xml') as {
      rss?: {
        channel?: {
          item?:
            | { title?: string; link?: string; pubDate?: string; description?: string }
            | Array<{ title?: string; link?: string; pubDate?: string; description?: string }>;
        };
      };
    };
    const items = xml.rss?.channel?.item;
    const itemArray = Array.isArray(items) ? items : items ? [items] : [];

    for (const item of itemArray) {
      expect(item.title, 'RSS item manca title').toBeTruthy();
      expect(item.link, 'RSS item manca link').toBeTruthy();
      expect(item.pubDate, 'RSS item manca pubDate').toBeTruthy();
      expect(item.description, 'RSS item manca description').toBeTruthy();
    }
  });

  it('RSS ha lingua italiana', () => {
    const content = readDistFile('rss.xml');
    expect(content).toContain('<language>it-IT</language>');
  });
});

describe('Atom Feed', () => {
  it('atom.xml esiste', () => {
    expect(distFileExists('atom.xml')).toBe(true);
  });

  it('atom.xml è XML valido con struttura Atom', () => {
    const xml = loadXml('atom.xml') as { feed?: unknown };
    expect(xml).toHaveProperty('feed');
  });

  it('Atom ha title e id', () => {
    const xml = loadXml('atom.xml') as {
      feed?: { title?: string; id?: string };
    };
    const feed = xml.feed;

    expect(feed?.title).toBeTruthy();
    expect(feed?.id).toBeTruthy();
  });

  it('Atom ha almeno un entry', () => {
    const xml = loadXml('atom.xml') as {
      feed?: { entry?: unknown | unknown[] };
    };
    const entries = xml.feed?.entry;

    expect(entries).toBeDefined();
    const entryArray = Array.isArray(entries) ? entries : [entries];
    expect(entryArray.length).toBeGreaterThan(0);
  });

  it('Atom entries hanno campi richiesti', () => {
    const xml = loadXml('atom.xml') as {
      feed?: {
        entry?:
          | { title?: string; id?: string; published?: string; updated?: string }
          | Array<{ title?: string; id?: string; published?: string; updated?: string }>;
      };
    };
    const entries = xml.feed?.entry;
    const entryArray = Array.isArray(entries) ? entries : entries ? [entries] : [];

    for (const entry of entryArray) {
      expect(entry.title, 'Atom entry manca title').toBeTruthy();
      expect(entry.id, 'Atom entry manca id').toBeTruthy();
      expect(entry.published, 'Atom entry manca published').toBeTruthy();
      expect(entry.updated, 'Atom entry manca updated').toBeTruthy();
    }
  });

  it('Atom ha namespace corretto', () => {
    const content = readDistFile('atom.xml');
    expect(content).toContain('xmlns="http://www.w3.org/2005/Atom"');
  });
});

describe('JSON Feed', () => {
  it('feed.json esiste', () => {
    expect(distFileExists('feed.json')).toBe(true);
  });

  it('feed.json è JSON valido', () => {
    const content = readDistFile('feed.json');
    const json = JSON.parse(content);
    expect(json).toBeTruthy();
  });

  it('JSON Feed ha versione 1.1', () => {
    const content = readDistFile('feed.json');
    const json = JSON.parse(content);
    expect(json.version).toBe('https://jsonfeed.org/version/1.1');
  });

  it('JSON Feed ha campi richiesti', () => {
    const content = readDistFile('feed.json');
    const json = JSON.parse(content);

    expect(json.title).toBeTruthy();
    expect(json.home_page_url).toBeTruthy();
    expect(json.feed_url).toBeTruthy();
    expect(json.items).toBeDefined();
    expect(Array.isArray(json.items)).toBe(true);
  });

  it('JSON Feed items hanno campi richiesti', () => {
    const content = readDistFile('feed.json');
    const json = JSON.parse(content);

    for (const item of json.items) {
      expect(item.id, 'JSON Feed item manca id').toBeTruthy();
      expect(item.url, 'JSON Feed item manca url').toBeTruthy();
      expect(item.title, 'JSON Feed item manca title').toBeTruthy();
      expect(item.date_published, 'JSON Feed item manca date_published').toBeTruthy();
    }
  });

  it('JSON Feed ha autori', () => {
    const content = readDistFile('feed.json');
    const json = JSON.parse(content);

    expect(json.authors).toBeDefined();
    expect(Array.isArray(json.authors)).toBe(true);
    expect(json.authors.length).toBeGreaterThan(0);
    expect(json.authors[0].name).toBeTruthy();
  });
});

describe('Pillar RSS Feeds', () => {
  const pillars = [
    'ingegneria-ai',
    'ricerca',
    'business',
    'governance',
    'metodologia',
    'sintesi',
  ];

  for (const pillar of pillars) {
    it(`${pillar}/rss.xml esiste`, () => {
      // Astro genera i file come /pillar/rss.xml/index.html
      const exists =
        distFileExists(`${pillar}/rss.xml`) ||
        distFileExists(`${pillar}/rss.xml/index.html`);
      expect(exists).toBe(true);
    });
  }
});

describe('Feed Consistency', () => {
  it('RSS e Atom hanno stesso numero di items', () => {
    const rssXml = loadXml('rss.xml') as {
      rss?: { channel?: { item?: unknown | unknown[] } };
    };
    const atomXml = loadXml('atom.xml') as {
      feed?: { entry?: unknown | unknown[] };
    };

    const rssItems = rssXml.rss?.channel?.item;
    const atomEntries = atomXml.feed?.entry;

    const rssCount = Array.isArray(rssItems) ? rssItems.length : rssItems ? 1 : 0;
    const atomCount = Array.isArray(atomEntries) ? atomEntries.length : atomEntries ? 1 : 0;

    expect(rssCount).toBe(atomCount);
  });

  it('JSON Feed ha stesso numero di items', () => {
    const rssXml = loadXml('rss.xml') as {
      rss?: { channel?: { item?: unknown | unknown[] } };
    };
    const jsonContent = readDistFile('feed.json');
    const jsonFeed = JSON.parse(jsonContent);

    const rssItems = rssXml.rss?.channel?.item;
    const rssCount = Array.isArray(rssItems) ? rssItems.length : rssItems ? 1 : 0;

    expect(jsonFeed.items.length).toBe(rssCount);
  });
});
