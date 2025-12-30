/**
 * Profile Data - Single Source of Truth
 *
 * Centralizes all profile/CV data with i18n support.
 * Used by: About pages (IT/EN), CV page, and any other component needing profile info.
 */

import type { Locale } from '@/lib/i18n/translations';

// ============================================================================
// TYPES
// ============================================================================

export interface LocalizedString {
  it: string;
  en: string;
}

export interface LocalizedStringArray {
  it: string[];
  en: string[];
}

export interface Experience {
  title: LocalizedString;
  company: string;
  period: LocalizedString;
  type: LocalizedString;
  current: boolean;
  description: LocalizedStringArray;
}

export interface SkillCategory {
  category: LocalizedString;
  skills: string[];
}

export interface Certification {
  name: LocalizedString;
  status: LocalizedString;
  provider?: string;
}

export interface Education {
  degree: LocalizedString;
  institution: LocalizedString;
  date: LocalizedString;
  thesis?: LocalizedString;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
  location: LocalizedString;
}

export interface VisionMission {
  vision: LocalizedString;
  mission: LocalizedString;
}

export interface WorkPhilosophy {
  title: LocalizedString;
  description: LocalizedString;
}

export interface AboutContent {
  tagline: LocalizedString;
  bio: LocalizedString;
  blogDescription: LocalizedString;
  blogTopics: LocalizedStringArray;
}

// ============================================================================
// CONTACT INFORMATION
// ============================================================================

export const CONTACT: ContactInfo = {
  email: 'info@ireneburresi.dev',
  phone: '+39 346 955 8740',
  linkedin: 'linkedin.com/in/ireneburresi',
  github: 'github.com/ireneburresi',
  website: 'ireneburresi.dev',
  location: {
    it: 'Italia (Full Remote)',
    en: 'Italy (Full Remote)',
  },
};

// ============================================================================
// ABOUT CONTENT
// ============================================================================

export const ABOUT: AboutContent = {
  tagline: {
    it: 'AI & Data Science',
    en: 'AI & Data Science',
  },
  bio: {
    it: 'Data Scientist con solida esperienza nello sviluppo e nella messa in produzione di soluzioni di AI Generativa, Data Extraction, Hybrid RAG, e Chatbot avanzati. Traduco le esigenze aziendali in soluzioni tecnologiche innovative con approccio agile e orientato al business.',
    en: 'Data Scientist with solid experience in developing and deploying Generative AI solutions, Data Extraction, Hybrid RAG, and advanced Chatbots. I translate business needs into innovative technological solutions with an agile, business-oriented approach.',
  },
  blogDescription: {
    it: 'Questo blog esplora l\'intelligenza artificiale da prospettive multiple: implementazione tecnica, ricerca scientifica, impatto economico e governance.',
    en: 'This blog explores artificial intelligence from multiple perspectives: technical implementation, scientific research, economic impact, and governance.',
  },
  blogTopics: {
    it: ['Tecnica', 'Ricerca', 'Business', 'Governance', 'Metodologia', 'Altro'],
    en: ['Engineering', 'Research', 'Business', 'Governance', 'Methodology', 'Other'],
  },
};

// ============================================================================
// VISION & MISSION
// ============================================================================

export const VISION_MISSION: VisionMission = {
  vision: {
    it: 'Rendere l\'intelligenza artificiale accessibile e utile per le aziende di ogni dimensione, trasformando complessità tecnologica in valore di business tangibile.',
    en: 'Make artificial intelligence accessible and useful for businesses of all sizes, transforming technological complexity into tangible business value.',
  },
  mission: {
    it: 'Creare soluzioni AI che risolvono problemi reali, combinando ricerca scientifica, best practices ingegneristiche e una profonda comprensione delle esigenze aziendali.',
    en: 'Create AI solutions that solve real problems, combining scientific research, engineering best practices, and a deep understanding of business needs.',
  },
};

// ============================================================================
// WORK PHILOSOPHY
// ============================================================================

export const WORK_PHILOSOPHY: WorkPhilosophy[] = [
  {
    title: {
      it: 'Dal codice alla strategia',
      en: 'From code to strategy',
    },
    description: {
      it: 'L\'AI ha valore solo se risolve problemi reali. Parto sempre dal business case, non dalla tecnologia.',
      en: 'AI has value only if it solves real problems. I always start from the business case, not the technology.',
    },
  },
  {
    title: {
      it: 'Misurare, sempre',
      en: 'Measure, always',
    },
    description: {
      it: 'Niente "AI magic". Ogni progetto ha KPI definiti prima del kickoff, non dopo.',
      en: 'No "AI magic". Every project has KPIs defined before kickoff, not after.',
    },
  },
  {
    title: {
      it: 'Iterare velocemente',
      en: 'Iterate fast',
    },
    description: {
      it: 'MVP in settimane, non mesi. Fallire presto costa meno che fallire tardi.',
      en: 'MVP in weeks, not months. Failing early costs less than failing late.',
    },
  },
  {
    title: {
      it: 'Crescere insieme',
      en: 'Grow together',
    },
    description: {
      it: 'Il successo di un team si misura dalla crescita delle persone, non solo dei progetti.',
      en: 'A team\'s success is measured by people\'s growth, not just projects.',
    },
  },
];

// ============================================================================
// PROFESSIONAL EXPERIENCE
// ============================================================================

export const EXPERIENCES: Experience[] = [
  {
    title: {
      it: 'Lead AI Professional',
      en: 'Lead AI Professional',
    },
    company: 'Value Partners S.p.A.',
    period: {
      it: 'Ottobre 2025 - Presente',
      en: 'October 2025 - Present',
    },
    type: {
      it: 'Full Remote',
      en: 'Full Remote',
    },
    current: true,
    description: {
      it: [
        'Progettazione e implementazione di soluzioni AI avanzate per clienti in ambito legale, medico e assicurativo',
        'Sviluppo e ottimizzazione di pipeline di Data Extraction (OCR, NLP) e RAG ibridi',
        'Gestione del team con responsabilità organizzative e di leadership',
        'Coordinamento della definizione delle WBS, gestione dei colloqui tecnici e mentoring',
      ],
      en: [
        'Design and implementation of advanced AI solutions for clients in legal, medical, and insurance sectors',
        'Development and optimization of Data Extraction (OCR, NLP) and hybrid RAG pipelines',
        'Team management with organizational and leadership responsibilities',
        'WBS definition coordination, technical interview management, and mentoring',
      ],
    },
  },
  {
    title: {
      it: 'Data Scientist & AI Engineer',
      en: 'Data Scientist & AI Engineer',
    },
    company: 'Value Partners S.p.A.',
    period: {
      it: 'Settembre 2023 - Ottobre 2025',
      en: 'September 2023 - October 2025',
    },
    type: {
      it: 'Full Remote',
      en: 'Full Remote',
    },
    current: false,
    description: {
      it: [
        'Sviluppo di soluzioni AI per estrazione automatica di dati e documenti complessi',
        'Progettazione e implementazione di chatbot avanzati con Azure AI e Google VertexAI',
        'Ottimizzazione e monitoraggio dei modelli ML/LLM con reportistica dedicata',
        'Creazione di workflow automatizzati combinando GenAI e ML',
      ],
      en: [
        'Development of AI solutions for automatic data extraction from complex documents',
        'Design and implementation of advanced chatbots with Azure AI and Google VertexAI',
        'Optimization and monitoring of ML/LLM models with dedicated reporting',
        'Creation of automated workflows combining GenAI and ML',
      ],
    },
  },
  {
    title: {
      it: 'Tirocinante Data Science',
      en: 'Data Science Intern',
    },
    company: 'Value Partners S.p.A.',
    period: {
      it: 'Maggio - Settembre 2023',
      en: 'May - September 2023',
    },
    type: {
      it: 'Full Remote',
      en: 'Full Remote',
    },
    current: false,
    description: {
      it: [],
      en: [],
    },
  },
  {
    title: {
      it: 'Tirocinante Curriculare',
      en: 'Curricular Intern',
    },
    company: 'Value Partners S.p.A.',
    period: {
      it: 'Gennaio - Aprile 2023',
      en: 'January - April 2023',
    },
    type: {
      it: 'Full Remote',
      en: 'Full Remote',
    },
    current: false,
    description: {
      it: [],
      en: [],
    },
  },
];

// ============================================================================
// SKILLS
// ============================================================================

export const SKILLS: SkillCategory[] = [
  {
    category: {
      it: 'AI & Machine Learning',
      en: 'AI & Machine Learning',
    },
    skills: [
      'Generative AI',
      'Fine-tuning LLM',
      'RAG Systems',
      'Agenti AI',
      'Data Extraction',
      'OCR & NLP',
    ],
  },
  {
    category: {
      it: 'Cloud & Infrastructure',
      en: 'Cloud & Infrastructure',
    },
    skills: [
      'AWS',
      'Azure AI',
      'Google Cloud / VertexAI',
      'Microservizi',
      'Serverless',
    ],
  },
  {
    category: {
      it: 'Development',
      en: 'Development',
    },
    skills: [
      'Python',
      'TypeScript',
      'Java',
      'PostgreSQL',
      'MongoDB',
      'Neo4J',
    ],
  },
  {
    category: {
      it: 'Leadership & Metodologia',
      en: 'Leadership & Methodology',
    },
    skills: [
      'Team Leadership',
      'Mentoring',
      'Agile & Scrum',
      'TDD',
      'Pytest',
    ],
  },
];

// ============================================================================
// CERTIFICATIONS
// ============================================================================

export const CERTIFICATIONS: Certification[] = [
  {
    name: {
      it: 'Data Science',
      en: 'Data Science',
    },
    provider: 'Udemy',
    status: {
      it: 'Completato',
      en: 'Completed',
    },
  },
  {
    name: {
      it: 'Deep Learning',
      en: 'Deep Learning',
    },
    provider: 'Coursera',
    status: {
      it: 'Completato',
      en: 'Completed',
    },
  },
];

// ============================================================================
// EDUCATION
// ============================================================================

export const EDUCATION: Education = {
  degree: {
    it: 'Laurea Triennale in Informatica',
    en: 'Bachelor\'s Degree in Computer Science',
  },
  institution: {
    it: 'Università di Pisa',
    en: 'University of Pisa',
  },
  date: {
    it: 'Aprile 2023',
    en: 'April 2023',
  },
  thesis: {
    it: 'Studio, Applicazione e Confronto di Diverse Metodologie per l\'Estrazione dei Dati in Progetti NLP',
    en: 'Study, Application and Comparison of Different Methodologies for Data Extraction in NLP Projects',
  },
};

// ============================================================================
// LANGUAGES
// ============================================================================

export const LANGUAGES = {
  it: [
    { name: 'Italiano', level: 'Madrelingua' },
    { name: 'Inglese', level: 'Fluente (C1)' },
  ],
  en: [
    { name: 'Italian', level: 'Native' },
    { name: 'English', level: 'Fluent (C1)' },
  ],
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get localized value from a LocalizedString
 */
export function getLocalized(value: LocalizedString, locale: Locale): string {
  return value[locale];
}

/**
 * Get localized array values
 */
export function getLocalizedArray(values: LocalizedStringArray, locale: Locale): string[] {
  return values[locale];
}

/**
 * Get skills for a specific locale
 */
export function getSkillsForLocale(locale: Locale) {
  return SKILLS.map((category) => ({
    category: getLocalized(category.category, locale),
    skills: category.skills,
  }));
}

/**
 * Get experiences for a specific locale
 */
export function getExperiencesForLocale(locale: Locale) {
  return EXPERIENCES.map((exp) => ({
    title: getLocalized(exp.title, locale),
    company: exp.company,
    period: getLocalized(exp.period, locale),
    type: getLocalized(exp.type, locale),
    current: exp.current,
    description: getLocalizedArray(exp.description, locale),
  }));
}

/**
 * Get certifications for a specific locale
 */
export function getCertificationsForLocale(locale: Locale) {
  return CERTIFICATIONS.map((cert) => ({
    name: getLocalized(cert.name, locale),
    status: getLocalized(cert.status, locale),
    provider: cert.provider,
  }));
}

/**
 * Get education for a specific locale
 */
export function getEducationForLocale(locale: Locale) {
  return {
    degree: getLocalized(EDUCATION.degree, locale),
    institution: getLocalized(EDUCATION.institution, locale),
    date: getLocalized(EDUCATION.date, locale),
    thesis: EDUCATION.thesis ? getLocalized(EDUCATION.thesis, locale) : undefined,
  };
}

/**
 * Get work philosophy for a specific locale
 */
export function getWorkPhilosophyForLocale(locale: Locale) {
  return WORK_PHILOSOPHY.map((item) => ({
    title: getLocalized(item.title, locale),
    description: getLocalized(item.description, locale),
  }));
}
