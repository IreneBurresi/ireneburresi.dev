/**
 * Costanti di dominio per il blog
 *
 * NOTA: I dati del sito/autore sono in src/consts/site.ts e src/consts/schema.ts
 * Questo file contiene solo la struttura dei pillar e i tipi correlati.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Subsection {
  readonly name: string;
  readonly slug: string;
  readonly subtitle: string;
}

export interface Pillar {
  readonly name: string;
  readonly slug: string;
  readonly menuLabel: string;
  readonly hero: string;
  readonly subsections: Record<string, Subsection>;
}

// ============================================================================
// PILLARS
// ============================================================================

// Struttura dei 6 Pillar del blog AI
export const PILLARS = {
  engineering: {
    name: 'Ingegneria AI',
    slug: 'ingegneria-ai',
    menuLabel: 'Architetture, implementazioni e deployment di sistemi in produzione',
    hero: 'Progettazione e implementazione di sistemi AI in produzione. RAG, orchestrazione di agent, scelte architetturali e pattern consolidati per deployment scalabili.',
    subsections: {
      implementations: {
        name: 'Implementazioni e Casi Studio',
        slug: 'implementazioni',
        subtitle: 'Progetti reali, decisioni tecniche documentate e analisi comparativa di approcci implementativi. Dalle prove di concetto ai sistemi in produzione.',
      },
      architectures: {
        name: 'Architetture e Pattern',
        slug: 'architetture',
        subtitle: 'Design di sistemi scalabili, performanti ed economicamente sostenibili. Pattern architetturali e best practices consolidate.',
      },
      troubleshooting: {
        name: 'Troubleshooting e Ottimizzazione',
        slug: 'troubleshooting',
        subtitle: 'Problematiche comuni in produzione, strategie di debugging e ottimizzazioni basate su metriche reali.',
      },
    },
  },
  research: {
    name: 'Ricerca e Frontiere',
    slug: 'ricerca',
    menuLabel: 'Analisi di paper, breakthrough tecnologici e direzioni emergenti',
    hero: 'Analisi della ricerca accademica e industriale: paper rilevanti, breakthrough tecnologici e direzioni emergenti nel campo dell\'AI.',
    subsections: {
      papers: {
        name: 'Analisi Paper',
        slug: 'paper',
        subtitle: 'Esame critico di pubblicazioni rilevanti: contributi originali, implicazioni pratiche e prospettive di implementazione.',
      },
      quarterly: {
        name: 'Panoramiche Trimestrali',
        slug: 'panoramiche',
        subtitle: 'Sintesi periodiche della produzione scientifica: pubblicazioni significative, trend emergenti e shift metodologici.',
      },
      critiques: {
        name: 'Analisi Critiche',
        slug: 'analisi-critiche',
        subtitle: 'Valutazione critica di metodologie, limitazioni e validità dei risultati. Lettura oltre i claim.',
      },
    },
  },
  business: {
    name: 'Business e ROI',
    slug: 'business',
    menuLabel: 'Analisi economica, valutazione ROI e framework strategici',
    hero: 'Analisi economica e strategica dell\'AI: valutazione ROI, strutture di costo, casi studio aziendali e framework decisionali per investimenti tecnologici.',
    subsections: {
      costBenefit: {
        name: 'Analisi Costi-Benefici',
        slug: 'costi-benefici',
        subtitle: 'Valutazione economica dettagliata: TCO, analisi make-or-buy, modelli di pricing e metriche di ritorno sull\'investimento.',
      },
      marketIntel: {
        name: 'Report e Intelligence di Mercato',
        slug: 'market-intelligence',
        subtitle: 'Analisi di report industriali e trend di mercato: McKinsey, Gartner, a16z e altre fonti primarie esaminate criticamente.',
      },
      frameworks: {
        name: 'Framework Strategici',
        slug: 'framework',
        subtitle: 'Modelli decisionali e metodologie per l\'adozione strategica dell\'AI: maturity assessment, readiness evaluation, risk framework.',
      },
    },
  },
  governance: {
    name: 'Governance e Sicurezza',
    slug: 'governance',
    menuLabel: 'Regolamentazione, sicurezza informatica e AI ethics',
    hero: 'Aspetti regolamentari, sicurezza informatica e AI ethics: compliance normativa, gestione dei rischi e framework per AI responsabile.',
    subsections: {
      compliance: {
        name: 'Regolamentazione e Compliance',
        slug: 'compliance',
        subtitle: 'Analisi normativa e requisiti di conformità: EU AI Act, GDPR, implicazioni legali e procedure di compliance operative.',
      },
      security: {
        name: 'Sicurezza e Threat Landscape',
        slug: 'sicurezza',
        subtitle: 'Vulnerabilità, vettori di attacco e strategie difensive per sistemi AI: adversarial attacks, injection, poisoning e framework di mitigazione.',
      },
      ethics: {
        name: 'Ethics e Responsible AI',
        slug: 'ethics',
        subtitle: 'Implementazione pratica di principi di AI responsabile: bias detection, fairness metrics, transparency e accountability.',
      },
    },
  },
  methodology: {
    name: 'Metodologia e Produttività',
    slug: 'metodologia',
    menuLabel: 'Workflow di ricerca, deep work e setup operativo',
    hero: 'Metodologie di lavoro per professionisti AI: workflow di ricerca, gestione della conoscenza, produttività e strumenti operativi.',
    subsections: {
      research: {
        name: 'Workflow di Ricerca',
        slug: 'workflow-ricerca',
        subtitle: 'Strategie di information management, selezione delle fonti e sistemi di knowledge organization per rimanere aggiornati efficacemente.',
      },
      deepWork: {
        name: 'Deep Work e Focus Management',
        slug: 'deep-work',
        subtitle: 'Protezione del tempo di concentrazione, gestione delle interruzioni e strategie per lavoro cognitivamente intensivo.',
      },
      tooling: {
        name: 'Tooling e Setup Operativo',
        slug: 'tooling',
        subtitle: 'Ambienti di sviluppo, stack tecnologico e automation per ottimizzazione del workflow quotidiano.',
      },
    },
  },
  synthesis: {
    name: 'Sintesi e Analisi Cross-Domain',
    slug: 'sintesi',
    menuLabel: 'Review trimestrali, trend analysis e scenario planning',
    hero: 'Articoli di sintesi che integrano prospettive multiple: analisi trimestrali, trend cross-domain e scenario planning basato su dati.',
    subsections: {
      quarterlyReviews: {
        name: 'Review Trimestrali',
        slug: 'review-trimestrali',
        subtitle: 'Panoramiche periodiche integrate: convergenza di ricerca, mercato e regolamentazione in sintesi analitiche.',
      },
      multiDimensional: {
        name: 'Analisi Multi-Dimensionale',
        slug: 'analisi-multidimensionale',
        subtitle: 'Tracking di innovazioni attraverso dimensioni tecniche, economiche e regolatorie: dalla ricerca all\'implementazione.',
      },
      scenarioPlanning: {
        name: 'Scenario Planning',
        slug: 'scenario-planning',
        subtitle: 'Proiezioni evidence-based su evoluzioni tecnologiche e di mercato: scenario analysis e implicazioni strategiche.',
      },
    },
  },
} as const satisfies Record<string, Pillar>;

export type PillarKey = keyof typeof PILLARS;
export type PillarData = (typeof PILLARS)[PillarKey];
