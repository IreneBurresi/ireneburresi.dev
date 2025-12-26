/**
 * Builder per JSON-LD strutturati con @graph
 * Type-safe grazie a schema-dts
 *
 * Riferimenti:
 * - https://schema.org/BlogPosting
 * - https://schema.org/Blog
 * - https://schema.org/Person
 * - https://developers.google.com/search/docs/appearance/structured-data/article
 */

import type {
  Person,
  Organization,
  WebSite,
  WebPage,
  BlogPosting,
  Blog,
  BreadcrumbList,
  ListItem,
  CollectionPage,
  ItemList,
  Thing,
  ImageObject,
  ContactPoint,
  PostalAddress,
} from 'schema-dts';
import { SITE } from '@/consts/site';
import { PERSON, ORGANIZATION, WEBSITE, tagsToThings } from '@/consts/schema';

// Schema.org graph structure
type SchemaItem = Thing | Person | Organization | WebSite | WebPage | BlogPosting | Blog | BreadcrumbList | CollectionPage;

export type JsonLdGraph = {
  '@context': 'https://schema.org';
  '@graph': SchemaItem[];
};

// ID stabili per riferimenti cross-entità
const PERSON_ID = `${SITE.url}#/person`;
const ORG_ID = `${SITE.url}#/org`;
const WEBSITE_ID = `${SITE.url}#/website`;
const BLOG_ID = `${SITE.url}/blog/#blog`;

/**
 * ImageObject schema completo
 */
function buildImageObject(url: string, alt?: string): ImageObject {
  return {
    '@type': 'ImageObject',
    url,
    contentUrl: url,
    ...(alt && { caption: alt }),
  };
}

/**
 * ContactPoint schema
 */
function buildContactPoint(): ContactPoint | undefined {
  if (!ORGANIZATION.contactPoint) return undefined;

  return {
    '@type': 'ContactPoint',
    contactType: ORGANIZATION.contactPoint.contactType,
    ...(ORGANIZATION.contactPoint.email && { email: ORGANIZATION.contactPoint.email }),
    ...(ORGANIZATION.contactPoint.url && { url: ORGANIZATION.contactPoint.url }),
    ...(ORGANIZATION.contactPoint.availableLanguage && {
      availableLanguage: ORGANIZATION.contactPoint.availableLanguage,
    }),
  };
}

/**
 * PostalAddress schema
 */
function buildPostalAddress(): PostalAddress | undefined {
  if (!ORGANIZATION.address) return undefined;

  return {
    '@type': 'PostalAddress',
    addressLocality: ORGANIZATION.address.addressLocality,
    addressRegion: ORGANIZATION.address.addressRegion,
    addressCountry: ORGANIZATION.address.addressCountry,
  };
}

/**
 * Person schema completo per E-E-A-T
 * (expertise, experience, authoritativeness, trustworthiness)
 *
 * Include:
 * - Identità: name, givenName, familyName, gender
 * - Professione: jobTitle, description, worksFor
 * - Formazione: alumniOf, hasCredential
 * - Competenze: knowsAbout, knowsLanguage
 * - Contatti: email, sameAs (social profiles)
 * - Localizzazione: nationality
 */
export function buildPersonSchema(): Person {
  // Costruisci oggetto base
  const personData: Record<string, unknown> = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSON.name,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    gender: PERSON.gender,
    url: PERSON.url,
    image: buildImageObject(PERSON.image, PERSON.name),
    jobTitle: PERSON.jobTitle,
    description: PERSON.description,
    sameAs: [...PERSON.sameAs],

    // Nazionalità
    nationality: {
      '@type': 'Country',
      name: PERSON.nationality.name,
      sameAs: PERSON.nationality.sameAs,
    },

    // Lingue conosciute
    knowsLanguage: PERSON.knowsLanguage.map((lang) => ({
      '@type': 'Language',
      name: lang.name,
      alternateName: lang.alternateName,
    })),

    // Competenze (con riferimenti Wikidata)
    knowsAbout: PERSON.knowsAbout.map((topic) => ({
      '@type': 'Thing',
      name: topic.name,
      sameAs: topic.wikidata,
    })),
  };

  // Email (opzionale)
  if (PERSON.email) {
    personData.email = PERSON.email;
  }

  // Telefono (opzionale)
  if (PERSON.telephone) {
    personData.telephone = PERSON.telephone;
  }

  // Formazione (alumniOf)
  if (PERSON.alumniOf.length > 0) {
    personData.alumniOf = PERSON.alumniOf.map((org) => ({
      '@type': 'EducationalOrganization',
      name: org.name,
      ...(org.url && { url: org.url }),
      ...(org.sameAs && { sameAs: org.sameAs }),
    }));
  }

  // Certificazioni (hasCredential)
  if (PERSON.hasCredential.length > 0) {
    personData.hasCredential = PERSON.hasCredential.map((cred) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cred.name,
      credentialCategory: cred.credentialCategory,
      ...(cred.educationalLevel && { educationalLevel: cred.educationalLevel }),
      ...(cred.recognizedBy && {
        recognizedBy: {
          '@type': 'Organization',
          name: cred.recognizedBy,
        },
      }),
      ...(cred.dateCreated && { dateCreated: cred.dateCreated }),
      ...(cred.url && { url: cred.url }),
    }));
  }

  // Datore di lavoro attuale
  if (PERSON.worksFor) {
    personData.worksFor = {
      '@type': 'Organization',
      name: PERSON.worksFor.name,
      ...(PERSON.worksFor.url && { url: PERSON.worksFor.url }),
      ...(PERSON.worksFor.sameAs && { sameAs: PERSON.worksFor.sameAs }),
    };
  }

  return personData as unknown as Person;
}

/**
 * Organization schema completo
 *
 * Include:
 * - Identità: name, legalName, description
 * - Contatti: contactPoint, address
 * - Storia: foundingDate, founder
 * - Copertura: areaServed
 * - Media: logo
 * - Social: sameAs
 */
export function buildOrganizationSchema(): Organization {
  const orgData: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    logo: buildImageObject(ORGANIZATION.logo, `${ORGANIZATION.name} logo`),
    sameAs: [...ORGANIZATION.sameAs],
  };

  // Campi opzionali
  if (ORGANIZATION.legalName) {
    orgData.legalName = ORGANIZATION.legalName;
  }

  if (ORGANIZATION.description) {
    orgData.description = ORGANIZATION.description;
  }

  if (ORGANIZATION.foundingDate) {
    orgData.foundingDate = ORGANIZATION.foundingDate;
  }

  if (ORGANIZATION.founder) {
    orgData.founder = {
      '@type': 'Person',
      name: ORGANIZATION.founder,
    };
  }

  if (ORGANIZATION.areaServed) {
    orgData.areaServed = ORGANIZATION.areaServed;
  }

  const contactPoint = buildContactPoint();
  if (contactPoint) {
    orgData.contactPoint = contactPoint;
  }

  const address = buildPostalAddress();
  if (address) {
    orgData.address = address;
  }

  return orgData as unknown as Organization;
}

/**
 * WebSite schema con SearchAction per sitelinks searchbox
 *
 * Include:
 * - Identità: name, alternateName, description
 * - Metadata: inLanguage, dateCreated, genre
 * - Licensing: license, copyrightHolder
 * - Actions: SearchAction per Google Sitelinks
 */
export function buildWebSiteSchema(): WebSite {
  const websiteData: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: WEBSITE.url,
    name: WEBSITE.name,
    alternateName: WEBSITE.alternateName,
    description: WEBSITE.description,
    publisher: { '@id': ORG_ID },
    author: { '@id': PERSON_ID },
    inLanguage: WEBSITE.inLanguage,
    copyrightHolder: { '@id': PERSON_ID },
    license: WEBSITE.license,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${WEBSITE.url}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // Campi opzionali
  if (WEBSITE.dateCreated) {
    websiteData.dateCreated = WEBSITE.dateCreated;
  }

  if (WEBSITE.genre) {
    websiteData.genre = WEBSITE.genre;
  }

  return websiteData as unknown as WebSite;
}

/**
 * Blog schema per la sezione blog
 */
export function buildBlogSchema(): Blog {
  return {
    '@type': 'Blog',
    '@id': BLOG_ID,
    url: `${SITE.url}/blog/`,
    name: `${WEBSITE.name} Blog`,
    description: WEBSITE.description,
    publisher: { '@id': ORG_ID },
    author: { '@id': PERSON_ID },
    inLanguage: WEBSITE.inLanguage,
    isPartOf: { '@id': WEBSITE_ID },
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
 * Converte reading time "X min" in formato ISO 8601 duration
 * es: "5 min" -> "PT5M"
 */
function toIsoDuration(readingTime: string): string {
  const match = readingTime.match(/(\d+)/);
  if (match) {
    return `PT${match[1]}M`;
  }
  return 'PT5M'; // fallback
}

/**
 * BlogPosting schema completo
 *
 * Proprietà incluse:
 * - Core: headline, name, description, abstract
 * - Dates: datePublished, dateModified, copyrightYear
 * - Author/Publisher: author, publisher, copyrightHolder
 * - Content: wordCount, timeRequired
 * - Media: image, thumbnailUrl
 * - Classification: keywords, articleSection, inLanguage, genre
 * - Licensing: license, isAccessibleForFree
 * - Relations: isPartOf (Blog), mainEntityOfPage
 * - Semantic: about (topics with Wikidata), mentions (related articles)
 * - Actions: potentialAction (ReadAction)
 * - Accessibility: speakable
 */
export function buildArticleSchema(params: {
  canonicalUrl: string;
  title: string;
  description: string;
  abstract?: string; // Abstract separato per Schema.org (opzionale)
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  tags?: string[];
  section?: string;
  wordCount?: number;
  readingTime?: string;
  relatedUrls?: Array<{ url: string; title: string }>;
  inLanguage?: string; // Override lingua articolo
  genre?: string; // Genere articolo (es. "Analysis", "Tutorial")
  citation?: string[]; // Array di URL delle fonti
}): BlogPosting {
  // Costruisci about con riferimenti Wikidata dai tags
  const aboutThings = params.tags ? tagsToThings(params.tags) : [];

  const article: BlogPosting = {
    '@type': 'BlogPosting',
    '@id': `${params.canonicalUrl}#article`,
    url: params.canonicalUrl,
    headline: params.title,
    name: params.title,
    description: params.description,
    abstract: params.abstract ?? params.description, // Usa abstract custom se disponibile

    // Dates
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,

    // Author & Publisher
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    copyrightHolder: { '@id': PERSON_ID },
    copyrightYear: new Date(params.datePublished).getFullYear(),

    // Relations
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${params.canonicalUrl}#webpage`,
      url: params.canonicalUrl,
    },
    isPartOf: { '@id': BLOG_ID },

    // Classification
    keywords: params.tags?.join(', '),
    articleSection: params.section,
    inLanguage: params.inLanguage ?? SITE.lang,
    genre: params.genre ?? 'Technology',

    // Citation (fonti)
    ...(params.citation && params.citation.length > 0 && {
      citation: params.citation.map((url) => ({
        '@type': 'CreativeWork',
        url,
      })),
    }),

    // Licensing & Access
    license: WEBSITE.license,
    isAccessibleForFree: true,

    // Semantic: about (argomenti con Wikidata)
    ...(aboutThings.length > 0 && {
      about: aboutThings.map((thing) => ({
        '@type': 'Thing',
        name: thing.name,
        ...(thing.sameAs && { sameAs: thing.sameAs }),
      })),
    }),

    // Media
    ...(params.imageUrl && {
      image: buildImageObject(params.imageUrl, params.title),
      thumbnailUrl: params.imageUrl,
    }),

    // Content metrics
    ...(params.wordCount && { wordCount: params.wordCount }),
    ...(params.readingTime && { timeRequired: toIsoDuration(params.readingTime) }),

    // Mentions (articoli correlati)
    ...(params.relatedUrls && params.relatedUrls.length > 0 && {
      mentions: params.relatedUrls.map((related) => ({
        '@type': 'BlogPosting',
        url: related.url,
        headline: related.title,
      })),
    }),

    // potentialAction: ReadAction
    potentialAction: {
      '@type': 'ReadAction',
      target: params.canonicalUrl,
    },

    // Speakable (per assistenti vocali - headline e primo paragrafo)
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.mdx-content > p:first-of-type'],
    },
  } as BlogPosting;

  return article;
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
    author: { '@id': PERSON_ID },
    inLanguage: SITE.lang,
    potentialAction: {
      '@type': 'ReadAction',
      target: params.canonicalUrl,
    },
  } as WebPage;
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
    numberOfItems: params.items.length,
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
 * Blog listing page schema
 * Include Blog + lista di BlogPosting
 */
export function buildBlogListingSchema(params: {
  canonicalUrl: string;
  title: string;
  description: string;
  posts: Array<{
    title: string;
    url: string;
    description: string;
    datePublished: string;
    imageUrl?: string;
  }>;
}): JsonLdGraph {
  const blogPostings = params.posts.slice(0, 10).map((post) => ({
    '@type': 'BlogPosting' as const,
    headline: post.title,
    url: post.url,
    description: post.description,
    datePublished: post.datePublished,
    ...(post.imageUrl && { image: post.imageUrl }),
    author: { '@id': PERSON_ID },
  }));

  const blog: Blog = {
    '@type': 'Blog',
    '@id': BLOG_ID,
    url: params.canonicalUrl,
    name: params.title,
    description: params.description,
    publisher: { '@id': ORG_ID },
    author: { '@id': PERSON_ID },
    inLanguage: SITE.lang,
    isPartOf: { '@id': WEBSITE_ID },
    blogPost: blogPostings as unknown as BlogPosting[],
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonSchema(),
      buildOrganizationSchema(),
      buildWebSiteSchema(),
      blog,
    ],
  };
}

/**
 * Grafo completo per un articolo
 * Include: Person, Org, WebSite, Blog, BlogPosting, Breadcrumb
 */
export function buildArticleGraph(params: {
  canonicalUrl: string;
  title: string;
  description: string;
  abstract?: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  tags?: string[];
  section?: string;
  wordCount?: number;
  readingTime?: string;
  relatedUrls?: Array<{ url: string; title: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
  inLanguage?: string;
  genre?: string;
  citation?: string[];
}): JsonLdGraph {
  const graph: SchemaItem[] = [
    buildPersonSchema(),
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildBlogSchema(),
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
