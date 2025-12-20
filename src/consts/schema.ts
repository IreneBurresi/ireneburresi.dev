/**
 * Configurazione Schema.org / JSON-LD
 *
 * Single source of truth per i dati strutturati SEO.
 * Test: https://search.google.com/test/rich-results
 */

// ============================================================================
// TYPES
// ============================================================================

export interface KnowsAboutTopic {
  readonly name: string;
  readonly wikidata: string;
}

export interface PersonConfig {
  readonly name: string;
  readonly givenName: string;
  readonly familyName: string;
  readonly jobTitle: string;
  readonly description: string;
  readonly url: string;
  readonly image: string;
  readonly sameAs: readonly string[];
  readonly knowsAbout: readonly KnowsAboutTopic[];
}

export interface OrganizationConfig {
  readonly name: string;
  readonly url: string;
  readonly logo: string;
  readonly sameAs: readonly string[];
}

export interface WebsiteConfig {
  readonly name: string;
  readonly alternateName: string;
  readonly url: string;
  readonly description: string;
  readonly inLanguage: string;
  readonly keywords: readonly string[];
  readonly license: string;
}

export interface SocialConfig {
  readonly twitter: string;
}

// ============================================================================
// PERSONA (Autore)
// ============================================================================

export const PERSON: PersonConfig = {
  name: 'Irene Burresi',
  givenName: 'Irene',
  familyName: 'Burresi',
  jobTitle: 'AI Engineer',
  description:
    'AI Engineer specializzata in architetture RAG, LLM e sistemi di produzione. Scrivo di ingegneria AI, ricerca e governance.',
  url: 'https://ireneburresi.dev/about/',
  image: 'https://ireneburresi.dev/images/avatar.jpg',
  sameAs: [
    'https://github.com/ireneburresi',
    'https://www.linkedin.com/in/ireneburresi/',
  ],
  knowsAbout: [
    {
      name: 'Artificial Intelligence',
      wikidata: 'https://www.wikidata.org/wiki/Q11660',
    },
    {
      name: 'Large Language Models',
      wikidata: 'https://www.wikidata.org/wiki/Q115305900',
    },
    {
      name: 'Retrieval-Augmented Generation',
      wikidata: 'https://www.wikidata.org/wiki/Q113378498',
    },
    {
      name: 'Machine Learning',
      wikidata: 'https://www.wikidata.org/wiki/Q2539',
    },
    {
      name: 'Natural Language Processing',
      wikidata: 'https://www.wikidata.org/wiki/Q30642',
    },
  ],
};

// ============================================================================
// ORGANIZZAZIONE (Publisher)
// ============================================================================

export const ORGANIZATION: OrganizationConfig = {
  name: 'Irene Burresi',
  url: 'https://ireneburresi.dev',
  logo: 'https://ireneburresi.dev/favicon.svg',
  sameAs: PERSON.sameAs,
};

// ============================================================================
// SITO WEB
// ============================================================================

export const WEBSITE: WebsiteConfig = {
  name: 'Irene Burresi',
  alternateName: 'AI Engineering Blog',
  url: 'https://ireneburresi.dev',
  description:
    "Blog tecnico su AI Engineering, architetture RAG, ricerca scientifica, economia e governance dell'intelligenza artificiale.",
  inLanguage: 'it',
  keywords: [
    'AI Engineering',
    'RAG Architecture',
    'LLM',
    'Machine Learning',
    'AI Governance',
    'Ricerca AI',
  ],
  license: 'https://creativecommons.org/licenses/by/4.0/',
};

// ============================================================================
// SOCIAL MEDIA
// ============================================================================

export const SOCIAL: SocialConfig = {
  twitter: '@ireneburresi',
};
