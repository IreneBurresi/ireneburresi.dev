/**
 * Configurazione del sito
 *
 * Per dati Schema.org/JSON-LD dettagliati, modifica: src/consts/schema.ts
 */

import { PERSON, ORGANIZATION, WEBSITE, SOCIAL } from './schema';

export const SITE = {
  // Dati base (da schema.ts)
  name: WEBSITE.name,
  description: WEBSITE.description,
  url: WEBSITE.url,
  locale: 'it-IT',
  lang: WEBSITE.inLanguage,

  // Autore (da schema.ts)
  author: {
    name: PERSON.name,
    url: PERSON.url,
    jobTitle: PERSON.jobTitle,
    sameAs: [...PERSON.sameAs],
    knowsAbout: [...PERSON.knowsAbout],
  },

  // Social
  social: {
    twitter: SOCIAL.twitter,
  },

  // Default OG image
  og: {
    defaultImagePath: '/images/og-default.svg',
  },

  // Feeds
  feeds: {
    rssPath: '/rss.xml',
    atomPath: '/atom.xml',
    jsonFeedPath: '/feed.json',
  },

  // Licensing
  license: {
    humanUrl: `${WEBSITE.url}/licenza/`,
    rslUrl: `${WEBSITE.url}/rsl.xml`,
    spdx: 'CC-BY-4.0',
  },
} as const;

export type SiteConfig = typeof SITE;
