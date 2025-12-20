/**
 * Builder per JSON-LD strutturati con @graph
 * Type-safe grazie a schema-dts
 */

import type {
  Graph,
  Person,
  Organization,
  WebSite,
  WebPage,
  TechArticle,
  BreadcrumbList,
  ListItem,
  CollectionPage,
  ItemList,
} from 'schema-dts';
import { SITE } from '@/consts/site';

export type JsonLdGraph = {
  '@context': 'https://schema.org';
  '@graph': Graph;
};

// ID stabili per riferimenti cross-entità
const PERSON_ID = `${SITE.url}#/person`;
const ORG_ID = `${SITE.url}#/org`;
const WEBSITE_ID = `${SITE.url}#/website`;

/**
 * Person schema per E-E-A-T (expertise, experience, authoritativeness, trustworthiness)
 */
export function buildPersonSchema(): Person {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.author.name,
    url: SITE.author.url,
    jobTitle: SITE.author.jobTitle,
    sameAs: SITE.author.sameAs,
    knowsAbout: SITE.author.knowsAbout.map((topic) => ({
      '@type': 'Thing',
      name: topic.name,
      sameAs: topic.wikidata,
    })),
  };
}

/**
 * Organization schema (publisher)
 */
export function buildOrganizationSchema(): Organization {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    sameAs: SITE.author.sameAs,
  };
}

/**
 * WebSite schema con SearchAction
 */
export function buildWebSiteSchema(): WebSite {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
    inLanguage: SITE.lang,
  };
}

/**
 * Grafo base del sito (Person + Organization + WebSite)
 */
export function buildSiteGraph(): JsonLdGraph {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonSchema(),
      buildOrganizationSchema(),
      buildWebSiteSchema(),
    ],
  };
}

/**
 * BreadcrumbList per navigazione gerarchica
 */
export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): BreadcrumbList {
  const itemList: ListItem[] = items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: item.url,
  }));

  return {
    '@type': 'BreadcrumbList',
    itemListElement: itemList,
  };
}

/**
 * TechArticle schema per post tecnici
 */
export function buildArticleSchema(params: {
  canonicalUrl: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  tags?: string[];
  section?: string;
}): TechArticle {
  return {
    '@type': 'TechArticle',
    '@id': `${params.canonicalUrl}#article`,
    headline: params.title,
    description: params.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${params.canonicalUrl}#webpage`,
    },
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
    image: params.imageUrl,
    keywords: params.tags?.join(', '),
    articleSection: params.section,
    inLanguage: SITE.lang,
  };
}

/**
 * WebPage schema
 */
export function buildWebPageSchema(params: {
  canonicalUrl: string;
  title: string;
  description: string;
}): WebPage {
  return {
    '@type': 'WebPage',
    '@id': `${params.canonicalUrl}#webpage`,
    url: params.canonicalUrl,
    name: params.title,
    description: params.description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: SITE.lang,
  };
}

/**
 * CollectionPage + ItemList per pagine di listing (tag, categorie, blog index)
 */
export function buildCollectionSchema(params: {
  canonicalUrl: string;
  title: string;
  description: string;
  items: Array<{ title: string; url: string }>;
}): JsonLdGraph {
  const itemList: ItemList = {
    '@type': 'ItemList',
    itemListElement: params.items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: item.url,
      name: item.title,
    })),
  };

  const collectionPage: CollectionPage = {
    '@type': 'CollectionPage',
    '@id': `${params.canonicalUrl}#webpage`,
    url: params.canonicalUrl,
    name: params.title,
    description: params.description,
    mainEntity: itemList,
    author: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: SITE.lang,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonSchema(),
      buildOrganizationSchema(),
      buildWebSiteSchema(),
      collectionPage,
    ],
  };
}

/**
 * Grafo completo per un articolo (include Person, Org, WebSite, Article, Breadcrumb)
 */
export function buildArticleGraph(params: {
  canonicalUrl: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  tags?: string[];
  section?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}): JsonLdGraph {
  const graph: Graph = [
    buildPersonSchema(),
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildArticleSchema(params),
  ];

  if (params.breadcrumbs?.length) {
    graph.push(buildBreadcrumbSchema(params.breadcrumbs));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
