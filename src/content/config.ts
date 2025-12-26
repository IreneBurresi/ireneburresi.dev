import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // SEO: abstract per Schema.org (se diverso da summary)
    abstract: z.string().optional(),
    publishedAt: z.string(),
    // SEO: data ultimo aggiornamento per dateModified
    updatedAt: z.string().optional(),
    // SEO: lingua articolo (override del default del sito)
    inLanguage: z.string().optional(),
    // i18n: lingua del contenuto (default: 'it')
    locale: z.enum(['it', 'en']).default('it'),
    // i18n: slug dell'articolo originale se questa è una traduzione
    translationOf: z.string().optional(),
    // i18n: lingue in cui l'articolo è disponibile
    availableIn: z.array(z.enum(['it', 'en'])).optional(),
    // SEO: genere articolo (es. "Analysis", "Tutorial", "Review")
    genre: z.string().optional(),
    // SEO: citazioni/fonti (array di URL)
    citation: z.array(z.string().url()).optional(),
    author: z.object({
      name: z.string(),
      avatar: z.string(),
      role: z.string(),
    }),
    coverImage: z.string().optional(),
    // SEO: immagine OG specifica (se diversa da coverImage)
    ogImage: z.string().optional(),
    // readingTime è ora calcolato dinamicamente - campo deprecato
    readingTime: z.string().optional(),
    // SEO: canonical URL override (per contenuti ripubblicati)
    canonical: z.string().url().optional(),
    // Pillar principale dell'articolo
    pillar: z.enum([
      'engineering',
      'research',
      'business',
      'governance',
      'methodology',
      'synthesis'
    ]),
    // Sottosezione all'interno del pillar
    subsection: z.string(),
    // Tag per categorizzazione multi-pillar
    tags: z.array(z.string()),
    // Pillar secondari (per articoli che appartengono a più pillar)
    secondaryPillars: z.array(z.enum([
      'engineering',
      'research',
      'business',
      'governance',
      'methodology',
      'synthesis'
    ])).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    relatedSlugs: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
