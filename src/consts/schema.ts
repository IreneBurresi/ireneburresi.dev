/**
 * Configurazione Schema.org / JSON-LD
 *
 * Single source of truth per i dati strutturati SEO.
 * Test: https://search.google.com/test/rich-results
 * Validator: https://validator.schema.org/
 */

// ============================================================================
// TYPES
// ============================================================================

export interface KnowsAboutTopic {
  readonly name: string;
  readonly wikidata: string;
}

export interface EducationalOrganization {
  readonly name: string;
  readonly url?: string;
  readonly sameAs?: string; // Wikidata o Wikipedia
}

export interface Credential {
  readonly name: string;
  readonly credentialCategory: 'degree' | 'certificate' | 'badge' | 'license';
  readonly educationalLevel?: string;
  readonly recognizedBy?: string;
  readonly dateCreated?: string;
  readonly url?: string;
}

export interface Employer {
  readonly name: string;
  readonly url?: string;
  readonly sameAs?: string;
}

export interface ContactPoint {
  readonly contactType: string;
  readonly email?: string;
  readonly url?: string;
  readonly availableLanguage?: string[];
}

export interface PersonConfig {
  readonly name: string;
  readonly givenName: string;
  readonly familyName: string;
  readonly gender: 'Female' | 'Male' | 'Other';
  readonly jobTitle: string;
  readonly description: string;
  readonly url: string;
  readonly image: string;
  readonly email?: string;
  readonly telephone?: string;
  readonly nationality: {
    readonly name: string;
    readonly sameAs: string; // Wikidata
  };
  readonly sameAs: readonly string[];
  readonly knowsAbout: readonly KnowsAboutTopic[];
  readonly alumniOf: readonly EducationalOrganization[];
  readonly hasCredential: readonly Credential[];
  readonly worksFor?: Employer;
  readonly knowsLanguage: readonly {
    readonly name: string;
    readonly alternateName: string; // ISO code
  }[];
}

export interface OrganizationConfig {
  readonly name: string;
  readonly legalName?: string;
  readonly url: string;
  readonly logo: string;
  readonly description?: string;
  readonly foundingDate?: string;
  readonly founder?: string;
  readonly areaServed?: string;
  readonly sameAs: readonly string[];
  readonly contactPoint?: ContactPoint;
  readonly address?: {
    readonly addressLocality: string;
    readonly addressRegion: string;
    readonly addressCountry: string;
  };
}

export interface WebsiteConfig {
  readonly name: string;
  readonly alternateName: string;
  readonly url: string;
  readonly description: string;
  readonly inLanguage: string;
  readonly keywords: readonly string[];
  readonly license: string;
  readonly dateCreated?: string;
  readonly genre?: string;
}

export interface SocialConfig {
  readonly twitter: string;
}

// ============================================================================
// MAPPATURA TAG → WIKIDATA
// Per arricchire semanticamente i tag degli articoli
// ============================================================================

export const TAG_WIKIDATA_MAP: Record<string, string> = {
  // AI & ML
  'AI': 'https://www.wikidata.org/wiki/Q11660',
  'Artificial Intelligence': 'https://www.wikidata.org/wiki/Q11660',
  'Machine Learning': 'https://www.wikidata.org/wiki/Q2539',
  'Deep Learning': 'https://www.wikidata.org/wiki/Q197536',
  'LLM': 'https://www.wikidata.org/wiki/Q115305900',
  'Large Language Models': 'https://www.wikidata.org/wiki/Q115305900',
  'Generative AI': 'https://www.wikidata.org/wiki/Q113378498',
  'GenAI': 'https://www.wikidata.org/wiki/Q113378498',
  'NLP': 'https://www.wikidata.org/wiki/Q30642',
  'Natural Language Processing': 'https://www.wikidata.org/wiki/Q30642',
  'RAG': 'https://www.wikidata.org/wiki/Q113378498',
  'Retrieval-Augmented Generation': 'https://www.wikidata.org/wiki/Q113378498',
  'Computer Vision': 'https://www.wikidata.org/wiki/Q133585',
  'Neural Networks': 'https://www.wikidata.org/wiki/Q192776',
  'Transformers': 'https://www.wikidata.org/wiki/Q115305900',

  // Frameworks & Tools
  'LangChain': 'https://www.wikidata.org/wiki/Q113378498',
  'LlamaIndex': 'https://www.wikidata.org/wiki/Q113378498',
  'OpenAI': 'https://www.wikidata.org/wiki/Q21708200',
  'Anthropic': 'https://www.wikidata.org/wiki/Q107555985',
  'GPT': 'https://www.wikidata.org/wiki/Q89378861',
  'Claude': 'https://www.wikidata.org/wiki/Q107555985',
  'Python': 'https://www.wikidata.org/wiki/Q28865',
  'TypeScript': 'https://www.wikidata.org/wiki/Q978185',

  // Business & Enterprise
  'Enterprise AI': 'https://www.wikidata.org/wiki/Q11660',
  'ROI': 'https://www.wikidata.org/wiki/Q622123',
  'KPI': 'https://www.wikidata.org/wiki/Q1063544',
  'Metrics': 'https://www.wikidata.org/wiki/Q1063544',
  'Market Analysis': 'https://www.wikidata.org/wiki/Q913545',
  'TCO': 'https://www.wikidata.org/wiki/Q1138866',

  // Governance & Ethics
  'AI Governance': 'https://www.wikidata.org/wiki/Q11660',
  'AI Ethics': 'https://www.wikidata.org/wiki/Q2630597',
  'EU AI Act': 'https://www.wikidata.org/wiki/Q108532589',
  'Compliance': 'https://www.wikidata.org/wiki/Q1419450',
  'GDPR': 'https://www.wikidata.org/wiki/Q28797476',
  'Bias Detection': 'https://www.wikidata.org/wiki/Q2630597',
  'AI Safety': 'https://www.wikidata.org/wiki/Q2630597',

  // Research & Academia
  'Stanford HAI': 'https://www.wikidata.org/wiki/Q41506',
  'MIT': 'https://www.wikidata.org/wiki/Q49108',
  'Research': 'https://www.wikidata.org/wiki/Q42240',
  'Scientific Research': 'https://www.wikidata.org/wiki/Q42240',

  // Infrastructure
  'Cloud Computing': 'https://www.wikidata.org/wiki/Q483639',
  'AWS': 'https://www.wikidata.org/wiki/Q456157',
  'Azure': 'https://www.wikidata.org/wiki/Q725967',
  'GCP': 'https://www.wikidata.org/wiki/Q21048333',
  'Infrastructure': 'https://www.wikidata.org/wiki/Q121359',
  'Data Center': 'https://www.wikidata.org/wiki/Q1054813',
  'GPU': 'https://www.wikidata.org/wiki/Q189083',

  // Security
  'Security': 'https://www.wikidata.org/wiki/Q3510521',
  'Cybersecurity': 'https://www.wikidata.org/wiki/Q3510521',
  'Prompt Injection': 'https://www.wikidata.org/wiki/Q3510521',

  // Regions
  'Europe': 'https://www.wikidata.org/wiki/Q46',
  'USA': 'https://www.wikidata.org/wiki/Q30',
  'China': 'https://www.wikidata.org/wiki/Q148',
  'AI Sovereignty': 'https://www.wikidata.org/wiki/Q11660',
  'Geopolitics': 'https://www.wikidata.org/wiki/Q56139',
  'GAIA-X': 'https://www.wikidata.org/wiki/Q98380344',

  // Productivity
  'Productivity': 'https://www.wikidata.org/wiki/Q1061509',
  'Deep Work': 'https://www.wikidata.org/wiki/Q1061509',
  'VSCode': 'https://www.wikidata.org/wiki/Q19841877',
  'Cursor': 'https://www.wikidata.org/wiki/Q19841877',
  'IDE': 'https://www.wikidata.org/wiki/Q13741',
  'Developer Tools': 'https://www.wikidata.org/wiki/Q13741',

  // Architecture
  'Architecture': 'https://www.wikidata.org/wiki/Q846636',
  'Software Architecture': 'https://www.wikidata.org/wiki/Q846636',
  'Microservices': 'https://www.wikidata.org/wiki/Q18344866',
  'API': 'https://www.wikidata.org/wiki/Q165194',
  'Vector Database': 'https://www.wikidata.org/wiki/Q8513',
  'Embeddings': 'https://www.wikidata.org/wiki/Q115305900',

  // Multimodal
  'Multimodal': 'https://www.wikidata.org/wiki/Q113378498',
  'Vision': 'https://www.wikidata.org/wiki/Q133585',
  'Audio': 'https://www.wikidata.org/wiki/Q11424',
  'Text': 'https://www.wikidata.org/wiki/Q234460',
};

// ============================================================================
// PERSONA (Autore)
// ============================================================================

export const PERSON: PersonConfig = {
  name: 'Irene Burresi',
  givenName: 'Irene',
  familyName: 'Burresi',
  gender: 'Female',
  jobTitle: 'Lead AI Professional',
  description:
    'Data Scientist con solida esperienza nello sviluppo e nella messa in produzione di soluzioni di AI Generativa, Data Extraction, Hybrid RAG, e Chatbot avanzati. Lead AI Professional con responsabilità di leadership.',
  url: 'https://ireneburresi.dev/about/',
  image: 'https://ireneburresi.dev/images/avatar.png',
  // email: 'contact@ireneburresi.dev', // Decommentare se vuoi renderlo pubblico
  nationality: {
    name: 'Italian',
    sameAs: 'https://www.wikidata.org/wiki/Q38',
  },
  sameAs: [
    'https://github.com/ireneburresi',
    'https://www.linkedin.com/in/ireneburresi/',
  ],
  knowsLanguage: [
    { name: 'Italian', alternateName: 'it' },
    { name: 'English', alternateName: 'en' },
  ],
  knowsAbout: [
    {
      name: 'Generative AI',
      wikidata: 'https://www.wikidata.org/wiki/Q113378498',
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
      name: 'Data Extraction & OCR',
      wikidata: 'https://www.wikidata.org/wiki/Q328189',
    },
    {
      name: 'Natural Language Processing',
      wikidata: 'https://www.wikidata.org/wiki/Q30642',
    },
    {
      name: 'Machine Learning',
      wikidata: 'https://www.wikidata.org/wiki/Q2539',
    },
    {
      name: 'Cloud Computing',
      wikidata: 'https://www.wikidata.org/wiki/Q483639',
    },
    {
      name: 'Team Leadership',
      wikidata: 'https://www.wikidata.org/wiki/Q484876',
    },
  ],
  alumniOf: [
    // Aggiungi le tue università/scuole qui
    // {
    //   name: 'Università di Pisa',
    //   url: 'https://www.unipi.it/',
    //   sameAs: 'https://www.wikidata.org/wiki/Q645663',
    // },
  ],
  hasCredential: [
    // Aggiungi le tue certificazioni qui
    // {
    //   name: 'AWS Certified Machine Learning - Specialty',
    //   credentialCategory: 'certificate',
    //   recognizedBy: 'Amazon Web Services',
    //   dateCreated: '2024-01-15',
    //   url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/',
    // },
  ],
  worksFor: undefined, // Opzionale: aggiungi se vuoi
  // worksFor: {
  //   name: 'Company Name',
  //   url: 'https://company.com',
  //   sameAs: 'https://www.wikidata.org/wiki/Q...',
  // },
};

// ============================================================================
// ORGANIZZAZIONE (Publisher)
// ============================================================================

export const ORGANIZATION: OrganizationConfig = {
  name: 'Irene Burresi',
  legalName: 'Irene Burresi',
  url: 'https://ireneburresi.dev',
  logo: 'https://ireneburresi.dev/favicon.svg',
  description:
    "Blog tecnico su AI Engineering, architetture RAG, ricerca scientifica, economia e governance dell'intelligenza artificiale.",
  foundingDate: '2024',
  founder: 'Irene Burresi',
  areaServed: 'Worldwide',
  sameAs: PERSON.sameAs,
  contactPoint: {
    contactType: 'customer support',
    url: 'https://ireneburresi.dev/about/',
    availableLanguage: ['Italian', 'English'],
  },
  address: {
    addressLocality: 'Italy',
    addressRegion: 'Italy',
    addressCountry: 'IT',
  },
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
  dateCreated: '2024-01-01',
  genre: 'Technology Blog',
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

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Ottiene il riferimento Wikidata per un tag, se disponibile
 */
export function getTagWikidata(tag: string): string | undefined {
  return TAG_WIKIDATA_MAP[tag];
}

/**
 * Converte un array di tag in oggetti Thing con riferimenti Wikidata
 */
export function tagsToThings(tags: string[]): Array<{ name: string; sameAs?: string }> {
  return tags.map((tag) => ({
    name: tag,
    ...(TAG_WIKIDATA_MAP[tag] && { sameAs: TAG_WIKIDATA_MAP[tag] }),
  }));
}
