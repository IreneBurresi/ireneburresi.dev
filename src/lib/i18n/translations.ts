/**
 * Multilingual translations for the blog
 * Italian (it) is the primary language, English (en) is secondary
 */

export const translations = {
  it: {
    // Navigation
    nav: {
      home: 'Home',
      blog: 'Blog',
      about: 'Chi sono',
      articles: 'Articoli',
    },

    // Hero section
    hero: {
      subtitle: 'AI Engineering, Ricerca & Strategy',
      description:
        'Analisi tecnica, ricerca accademica e strategia aziendale nel campo dell\'Intelligenza Artificiale. Architetture RAG, analisi di paper, valutazione ROI e compliance normativa.',
      cta: 'Esplora i Contenuti',
      exploreCta: 'Esplora Tecnica',
      researchCta: 'Scopri la Ricerca',
    },

    // Pillars
    pillars: {
      engineering: {
        name: 'Tecnica',
        slug: 'ingegneria-ai',
        menuLabel: 'Architetture, implementazioni e deployment di sistemi in produzione',
        hero: 'Progettazione e implementazione di sistemi AI in produzione. RAG, orchestrazione di agent, scelte architetturali e pattern consolidati per deployment scalabili.',
        description: 'Architetture, implementazioni e sistemi',
        subsectionsLabel: '3 sottosezioni • RAG, orchestrazione, troubleshooting',
        subsections: {
          implementations: {
            name: 'Implementazioni e Casi Studio',
            slug: 'implementazioni',
            subtitle:
              'Progetti reali, decisioni tecniche documentate e analisi comparativa di approcci implementativi. Dalle prove di concetto ai sistemi in produzione.',
          },
          architectures: {
            name: 'Architetture e Pattern',
            slug: 'architetture',
            subtitle:
              'Design di sistemi scalabili, performanti ed economicamente sostenibili. Pattern architetturali e best practices consolidate.',
          },
          troubleshooting: {
            name: 'Troubleshooting e Ottimizzazione',
            slug: 'troubleshooting',
            subtitle:
              'Problematiche comuni in produzione, strategie di debugging e ottimizzazioni basate su metriche reali.',
          },
        },
      },
      research: {
        name: 'Ricerca',
        slug: 'ricerca',
        menuLabel: 'Analisi di paper, breakthrough tecnologici e direzioni emergenti',
        hero: 'Analisi della ricerca accademica e industriale: paper rilevanti, breakthrough tecnologici e direzioni emergenti nel campo dell\'AI.',
        description: 'Paper, trend e stato dell\'arte',
        subsectionsLabel: '3 sottosezioni • Paper analysis, panoramiche, critiche',
        subsections: {
          papers: {
            name: 'Analisi Paper',
            slug: 'paper',
            subtitle:
              'Esame critico di pubblicazioni rilevanti: contributi originali, implicazioni pratiche e prospettive di implementazione.',
          },
          quarterly: {
            name: 'Panoramiche Trimestrali',
            slug: 'panoramiche',
            subtitle:
              'Sintesi periodiche della produzione scientifica: pubblicazioni significative, trend emergenti e shift metodologici.',
          },
          critiques: {
            name: 'Analisi Critiche',
            slug: 'analisi-critiche',
            subtitle:
              'Valutazione critica di metodologie, limitazioni e validità dei risultati. Lettura oltre i claim.',
          },
        },
      },
      business: {
        name: 'Business',
        slug: 'business',
        menuLabel: 'Analisi economica, valutazione ROI e framework strategici',
        hero: 'Analisi economica e strategica dell\'AI: valutazione ROI, strutture di costo, casi studio aziendali e framework decisionali per investimenti tecnologici.',
        description: 'Economia, strategia e ROI',
        subsectionsLabel: '3 sottosezioni • TCO, market intelligence, framework',
        subsections: {
          costBenefit: {
            name: 'Analisi Costi-Benefici',
            slug: 'costi-benefici',
            subtitle:
              'Valutazione economica dettagliata: TCO, analisi make-or-buy, modelli di pricing e metriche di ritorno sull\'investimento.',
          },
          marketIntel: {
            name: 'Report e Intelligence di Mercato',
            slug: 'market-intelligence',
            subtitle:
              'Analisi di report industriali e trend di mercato: McKinsey, Gartner, a16z e altre fonti primarie esaminate criticamente.',
          },
          frameworks: {
            name: 'Framework Strategici',
            slug: 'framework',
            subtitle:
              'Modelli decisionali e metodologie per l\'adozione strategica dell\'AI: maturity assessment, readiness evaluation, risk framework.',
          },
        },
      },
      governance: {
        name: 'Governance',
        slug: 'governance',
        menuLabel: 'Regolamentazione, sicurezza informatica e AI ethics',
        hero: 'Aspetti regolamentari, sicurezza informatica e AI ethics: compliance normativa, gestione dei rischi e framework per AI responsabile.',
        description: 'Compliance, sicurezza ed etica',
        subsectionsLabel: '3 sottosezioni • AI Act, security, etica',
        subsections: {
          compliance: {
            name: 'Regolamentazione e Compliance',
            slug: 'compliance',
            subtitle:
              'Analisi normativa e requisiti di conformità: EU AI Act, GDPR, implicazioni legali e procedure di compliance operative.',
          },
          security: {
            name: 'Sicurezza e Threat Landscape',
            slug: 'sicurezza',
            subtitle:
              'Vulnerabilità, vettori di attacco e strategie difensive per sistemi AI: adversarial attacks, injection, poisoning e framework di mitigazione.',
          },
          ethics: {
            name: 'Ethics e Responsible AI',
            slug: 'ethics',
            subtitle:
              'Implementazione pratica di principi di AI responsabile: bias detection, fairness metrics, transparency e accountability.',
          },
        },
      },
      methodology: {
        name: 'Metodologia',
        slug: 'metodologia',
        menuLabel: 'Workflow di ricerca, deep work e setup operativo',
        hero: 'Metodologie di lavoro per professionisti AI: workflow di ricerca, gestione della conoscenza, produttività e strumenti operativi.',
        description: 'Ricerca, focus e tooling',
        subsectionsLabel: '3 sottosezioni • Workflow, deep work, strumenti',
        subsections: {
          research: {
            name: 'Workflow di Ricerca',
            slug: 'workflow-ricerca',
            subtitle:
              'Strategie di information management, selezione delle fonti e sistemi di knowledge organization per rimanere aggiornati efficacemente.',
          },
          deepWork: {
            name: 'Deep Work e Focus Management',
            slug: 'deep-work',
            subtitle:
              'Protezione del tempo di concentrazione, gestione delle interruzioni e strategie per lavoro cognitivamente intensivo.',
          },
          tooling: {
            name: 'Tooling e Setup Operativo',
            slug: 'tooling',
            subtitle:
              'Ambienti di sviluppo, stack tecnologico e automation per ottimizzazione del workflow quotidiano.',
          },
        },
      },
      synthesis: {
        name: 'Altro',
        slug: 'sintesi',
        menuLabel: 'Review trimestrali, trend analysis e scenario planning',
        hero: 'Articoli di sintesi che integrano prospettive multiple: analisi trimestrali, trend cross-domain e scenario planning basato su dati.',
        description: 'Sintesi e analisi integrate',
        subsectionsLabel: '3 sottosezioni • Review, trend analysis, scenario',
        subsections: {
          quarterlyReviews: {
            name: 'Review Trimestrali',
            slug: 'review-trimestrali',
            subtitle:
              'Panoramiche periodiche integrate: convergenza di ricerca, mercato e regolamentazione in sintesi analitiche.',
          },
          multiDimensional: {
            name: 'Analisi Multi-Dimensionale',
            slug: 'analisi-multidimensionale',
            subtitle:
              'Tracking di innovazioni attraverso dimensioni tecniche, economiche e regolatorie: dalla ricerca all\'implementazione.',
          },
          scenarioPlanning: {
            name: 'Scenario Planning',
            slug: 'scenario-planning',
            subtitle:
              'Proiezioni evidence-based su evoluzioni tecnologiche e di mercato: scenario analysis e implicazioni strategiche.',
          },
        },
      },
    },

    // UI Common strings
    ui: {
      readMore: 'Leggi di più',
      published: 'Pubblicato il',
      updated: 'Aggiornato il',
      readingTime: 'min di lettura',
      share: 'Condividi',
      toc: 'Indice',
      backToTop: 'Torna su',
      featured: 'In evidenza',
      featuredStory: 'Featured Story',
      latestArticles: 'Latest Articles',
      recent: 'Articoli Recenti',
      related: 'Articoli Correlati',
      discoverMore: 'Scopri di più',
      relatedArticles: 'Potrebbe interessarti anche',
      viewAll: 'Vedi tutti',
      noArticles: 'Nessun articolo disponibile',
      noArticlesYet: 'Gli articoli per questa sezione saranno pubblicati presto',
      browseByPillar: 'Esplora per Pillar',
      rssFeed: 'Feed RSS per',
      subscribeRss: 'Iscriviti al feed RSS di',
      search: 'Cerca',
      searchPlaceholder: 'Cerca articoli...',
      close: 'Chiudi',
      menu: 'Menu',
      darkMode: 'Tema scuro',
      lightMode: 'Tema chiaro',
      language: 'Lingua',
    },

    // Footer
    footer: {
      explore: 'Esplora',
      infoResources: 'Info & Risorse',
      about: 'Chi Sono',
      privacy: 'Privacy',
      license: 'Licenza',
      rss: 'RSS Feed',
      newsletter: 'Newsletter',
      newsletterTitle: 'Stay in the loop',
      newsletterDescription:
        'Ricevi aggiornamenti settimanali su tech e design. No spam.',
      newsletterPlaceholder: 'La tua email...',
      subscribe: 'Iscriviti',
      comingSoon: 'Prossimamente',
      copyright: 'Tutti i contenuti sono pubblicati sotto licenza',
      madeWith: 'Realizzato con',
    },

    // Fallback banner (quando contenuto EN non disponibile)
    fallbackBanner: {
      title: 'Contenuto non disponibile in inglese',
      message: 'Questo articolo è disponibile solo in italiano.',
      switchToItalian: 'Passa alla versione italiana',
    },

    // Blog listing page
    blog: {
      title: 'Blog',
      description: 'Tutti gli articoli su AI Engineering, ricerca e strategia',
      allArticles: 'Tutti gli articoli',
      filterByPillar: 'Filtra per categoria',
      sortBy: 'Ordina per',
      sortRecent: 'Più recenti',
      sortOldest: 'Più vecchi',
    },

    // About page
    about: {
      title: 'Chi Sono',
      role: 'Lead AI Professional',
      bio: 'Specializzata in progettazione e implementazione di sistemi AI in produzione, con focus su architetture RAG, analisi tecnica e strategia aziendale.',
    },

    // Article/Blog post specific
    article: {
      newsletterTitle: 'Non perdere i prossimi articoli',
      newsletterDescription:
        'Iscriviti alla newsletter per ricevere aggiornamenti settimanali su AI, engineering e produttività.',
      tocLabel: 'Indice dei contenuti',
      shareTitle: 'Ti è piaciuto questo articolo?',
      shareDescription: 'Condividilo con chi potrebbe trovarlo utile',
      shareLinkedIn: 'Condividi su LinkedIn',
      shareTwitter: 'Condividi su X',
      copyLink: 'Copia link',
    },
  },

  en: {
    // Navigation
    nav: {
      home: 'Home',
      blog: 'Blog',
      about: 'About',
      articles: 'Articles',
    },

    // Hero section
    hero: {
      subtitle: 'AI Engineering, Research & Strategy',
      description:
        'Technical analysis, academic research, and business strategy in Artificial Intelligence. RAG architectures, paper analysis, ROI evaluation, and regulatory compliance.',
      cta: 'Explore Content',
      exploreCta: 'Explore Engineering',
      researchCta: 'Discover Research',
    },

    // Pillars (with English slugs and translations)
    pillars: {
      engineering: {
        name: 'Engineering',
        slug: 'ai-engineering',
        menuLabel: 'Architectures, implementations, and production system deployment',
        hero: 'Design and implementation of production AI systems. RAG, agent orchestration, architectural decisions, and proven patterns for scalable deployments.',
        description: 'Architectures, implementations, and systems',
        subsectionsLabel: '3 subsections • RAG, orchestration, troubleshooting',
        subsections: {
          implementations: {
            name: 'Implementations & Case Studies',
            slug: 'implementations',
            subtitle:
              'Real-world projects, documented technical decisions, and comparative analysis of implementation approaches. From proof-of-concept to production systems.',
          },
          architectures: {
            name: 'Architectures & Patterns',
            slug: 'architectures',
            subtitle:
              'Design of scalable, performant, and economically sustainable systems. Architectural patterns and established best practices.',
          },
          troubleshooting: {
            name: 'Troubleshooting & Optimization',
            slug: 'troubleshooting',
            subtitle:
              'Common production issues, debugging strategies, and optimizations based on real metrics.',
          },
        },
      },
      research: {
        name: 'Research',
        slug: 'research',
        menuLabel: 'Paper analysis, technological breakthroughs, and emerging directions',
        hero: 'Analysis of academic and industrial research: relevant papers, technological breakthroughs, and emerging directions in AI.',
        description: 'Papers, trends, and state of the art',
        subsectionsLabel: '3 subsections • Paper analysis, overviews, critiques',
        subsections: {
          papers: {
            name: 'Paper Analysis',
            slug: 'papers',
            subtitle:
              'Critical examination of relevant publications: original contributions, practical implications, and implementation perspectives.',
          },
          quarterly: {
            name: 'Quarterly Overviews',
            slug: 'quarterly',
            subtitle:
              'Periodic summaries of scientific production: significant publications, emerging trends, and methodological shifts.',
          },
          critiques: {
            name: 'Critical Analysis',
            slug: 'critiques',
            subtitle:
              'Critical evaluation of methodologies, limitations, and validity of results. Reading beyond the claims.',
          },
        },
      },
      business: {
        name: 'Business',
        slug: 'business',
        menuLabel: 'Economic analysis, ROI evaluation, and strategic frameworks',
        hero: 'Economic and strategic AI analysis: ROI evaluation, cost structures, business case studies, and decision frameworks for technology investments.',
        description: 'Economics, strategy, and ROI',
        subsectionsLabel: '3 subsections • TCO, market intelligence, frameworks',
        subsections: {
          costBenefit: {
            name: 'Cost-Benefit Analysis',
            slug: 'cost-benefit',
            subtitle:
              'Detailed economic evaluation: TCO, make-or-buy analysis, pricing models, and return on investment metrics.',
          },
          marketIntel: {
            name: 'Market Reports & Intelligence',
            slug: 'market-intelligence',
            subtitle:
              'Analysis of industry reports and market trends: McKinsey, Gartner, a16z, and other primary sources critically examined.',
          },
          frameworks: {
            name: 'Strategic Frameworks',
            slug: 'frameworks',
            subtitle:
              'Decision models and methodologies for strategic AI adoption: maturity assessment, readiness evaluation, risk framework.',
          },
        },
      },
      governance: {
        name: 'Governance',
        slug: 'governance',
        menuLabel: 'Regulation, cybersecurity, and AI ethics',
        hero: 'Regulatory aspects, cybersecurity, and AI ethics: regulatory compliance, risk management, and frameworks for responsible AI.',
        description: 'Compliance, security, and ethics',
        subsectionsLabel: '3 subsections • AI Act, security, ethics',
        subsections: {
          compliance: {
            name: 'Regulation & Compliance',
            slug: 'compliance',
            subtitle:
              'Regulatory analysis and compliance requirements: EU AI Act, GDPR, legal implications, and operational compliance procedures.',
          },
          security: {
            name: 'Security & Threat Landscape',
            slug: 'security',
            subtitle:
              'Vulnerabilities, attack vectors, and defensive strategies for AI systems: adversarial attacks, injection, poisoning, and mitigation frameworks.',
          },
          ethics: {
            name: 'Ethics & Responsible AI',
            slug: 'ethics',
            subtitle:
              'Practical implementation of responsible AI principles: bias detection, fairness metrics, transparency, and accountability.',
          },
        },
      },
      methodology: {
        name: 'Methodology',
        slug: 'methodology',
        menuLabel: 'Research workflow, deep work, and operational setup',
        hero: 'Work methodologies for AI professionals: research workflow, knowledge management, productivity, and operational tools.',
        description: 'Research, focus, and tooling',
        subsectionsLabel: '3 subsections • Workflow, deep work, tools',
        subsections: {
          research: {
            name: 'Research Workflow',
            slug: 'research-workflow',
            subtitle:
              'Information management strategies, source selection, and knowledge organization systems to stay effectively updated.',
          },
          deepWork: {
            name: 'Deep Work & Focus Management',
            slug: 'deep-work',
            subtitle:
              'Protecting concentration time, managing interruptions, and strategies for cognitively intensive work.',
          },
          tooling: {
            name: 'Tooling & Operational Setup',
            slug: 'tooling',
            subtitle:
              'Development environments, tech stack, and automation for daily workflow optimization.',
          },
        },
      },
      synthesis: {
        name: 'Synthesis',
        slug: 'synthesis',
        menuLabel: 'Quarterly reviews, trend analysis, and scenario planning',
        hero: 'Synthesis articles integrating multiple perspectives: quarterly analyses, cross-domain trends, and data-driven scenario planning.',
        description: 'Synthesis and integrated analysis',
        subsectionsLabel: '3 subsections • Reviews, trend analysis, scenarios',
        subsections: {
          quarterlyReviews: {
            name: 'Quarterly Reviews',
            slug: 'quarterly-reviews',
            subtitle:
              'Integrated periodic overviews: convergence of research, market, and regulation in analytical syntheses.',
          },
          multiDimensional: {
            name: 'Multi-Dimensional Analysis',
            slug: 'multi-dimensional',
            subtitle:
              'Tracking innovations across technical, economic, and regulatory dimensions: from research to implementation.',
          },
          scenarioPlanning: {
            name: 'Scenario Planning',
            slug: 'scenario-planning',
            subtitle:
              'Evidence-based projections on technological and market evolutions: scenario analysis and strategic implications.',
          },
        },
      },
    },

    // UI Common strings
    ui: {
      readMore: 'Read more',
      published: 'Published on',
      updated: 'Updated on',
      readingTime: 'min read',
      share: 'Share',
      toc: 'Table of Contents',
      backToTop: 'Back to top',
      featured: 'Featured',
      featuredStory: 'Featured Story',
      latestArticles: 'Latest Articles',
      recent: 'Recent Articles',
      related: 'Related Articles',
      discoverMore: 'Discover more',
      relatedArticles: 'You might also like',
      viewAll: 'View all',
      noArticles: 'No articles available',
      noArticlesYet: 'Articles for this section will be published soon',
      browseByPillar: 'Browse by Pillar',
      rssFeed: 'RSS feed for',
      subscribeRss: 'Subscribe to the RSS feed of',
      search: 'Search',
      searchPlaceholder: 'Search articles...',
      close: 'Close',
      menu: 'Menu',
      darkMode: 'Dark mode',
      lightMode: 'Light mode',
      language: 'Language',
    },

    // Footer
    footer: {
      explore: 'Explore',
      infoResources: 'Info & Resources',
      about: 'About',
      privacy: 'Privacy',
      license: 'License',
      rss: 'RSS Feed',
      newsletter: 'Newsletter',
      newsletterTitle: 'Stay in the loop',
      newsletterDescription:
        'Get weekly updates on tech and design. No spam.',
      newsletterPlaceholder: 'Your email...',
      subscribe: 'Subscribe',
      comingSoon: 'Coming soon',
      copyright: 'All content is published under',
      madeWith: 'Made with',
    },

    // Fallback banner (quando contenuto EN non disponibile)
    fallbackBanner: {
      title: 'Content not available in English',
      message: 'This article is only available in Italian.',
      switchToItalian: 'Switch to Italian version',
    },

    // Blog listing page
    blog: {
      title: 'Blog',
      description: 'All articles on AI Engineering, research, and strategy',
      allArticles: 'All articles',
      filterByPillar: 'Filter by category',
      sortBy: 'Sort by',
      sortRecent: 'Most recent',
      sortOldest: 'Oldest',
    },

    // About page
    about: {
      title: 'About',
      role: 'Lead AI Professional',
      bio: 'Specialized in designing and implementing production AI systems, with focus on RAG architectures, technical analysis, and business strategy.',
    },

    // Article/Blog post specific
    article: {
      newsletterTitle: 'Don\'t miss future articles',
      newsletterDescription:
        'Subscribe to the newsletter for weekly updates on AI, engineering, and productivity.',
      tocLabel: 'Table of contents',
      shareTitle: 'Did you like this article?',
      shareDescription: 'Share it with someone who might find it useful',
      shareLinkedIn: 'Share on LinkedIn',
      shareTwitter: 'Share on X',
      copyLink: 'Copy link',
    },
  },
} as const;

// Type exports
export type Locale = 'it' | 'en';
export type TranslationKeys = typeof translations.it;

/**
 * Get translations for a specific locale
 * @param locale - The locale to get translations for ('it' or 'en')
 * @returns Translation object for the specified locale
 */
export function useTranslations(locale: Locale = 'it'): TranslationKeys {
  return translations[locale] as TranslationKeys;
}

/**
 * Get the slug for a pillar in a specific locale
 * @param pillarKey - The pillar key (e.g., 'engineering', 'research')
 * @param locale - The locale ('it' or 'en')
 * @returns The localized pillar slug
 */
export function getPillarSlug(
  pillarKey: keyof TranslationKeys['pillars'],
  locale: Locale,
): string {
  return translations[locale].pillars[pillarKey].slug;
}

/**
 * Get pillar key from localized slug
 * @param slug - The localized slug (e.g., 'ingegneria-ai' or 'ai-engineering')
 * @param locale - The locale ('it' or 'en')
 * @returns The pillar key (e.g., 'engineering') or undefined if not found
 */
export function getPillarKeyFromSlug(
  slug: string,
  locale: Locale,
): keyof TranslationKeys['pillars'] | undefined {
  const entries = Object.entries(translations[locale].pillars);
  const found = entries.find(([_key, pillar]) => pillar.slug === slug);
  return found ? (found[0] as keyof TranslationKeys['pillars']) : undefined;
}
