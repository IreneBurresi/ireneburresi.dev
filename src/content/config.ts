import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.string(),
    // SEO: data ultimo aggiornamento per dateModified
    updatedAt: z.string().optional(),
    author: z.object({
      name: z.string(),
      avatar: z.string(),
      role: z.string(),
    }),
    coverImage: z.string().optional(),
    // SEO: immagine OG specifica (se diversa da coverImage)
    ogImage: z.string().optional(),
    readingTime: z.string(),
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
