import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // === Core Content ===
    title: z.string(),
    summary: z.string(),

    // === Author ===
    author: z.object({
      name: z.string(),
      avatar: z.string(),
      role: z.string(),
      url: z.string().url().optional(),
      email: z.string().email().optional(),
    }),

    // === Dates ===
    publishedAt: z.string(),
    updatedAt: z.string().optional(),

    // === i18n ===
    locale: z.enum(['it', 'en']).default('it'),
    inLanguage: z.string().optional(), // Override lingua per Schema.org

    // === Taxonomy ===
    pillar: z.enum([
      'engineering',
      'research',
      'business',
      'governance',
      'methodology',
      'synthesis'
    ]),
    subsection: z.string(),
    tags: z.array(z.string()),

    // === Media ===
    coverImage: z.string().optional(),
    video: z.string().url().optional(), // URL video associato (YouTube, Vimeo, etc.)

    // === SEO & Schema.org ===
    abstract: z.string().optional(), // Abstract tecnico per Schema.org (se diverso da summary)
    description: z.string().optional(), // Meta description SEO ottimizzata (se diversa da summary)
    keywords: z.array(z.string()).optional(), // Keywords aggiuntive per SEO
    alternativeHeadline: z.string().optional(), // Titolo alternativo per social/SEO
    genre: z.string().optional(), // Genere articolo per Schema.org (es. "Analysis", "Tutorial")

    // === Educational Content ===
    educationalLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    learningResourceType: z.enum([
      'tutorial',
      'guide',
      'analysis',
      'review',
      'reference',
      'case-study'
    ]).optional(),
    prerequisites: z.array(z.string()).optional(), // Prerequisiti conoscenze

    // === Citations & Sources ===
    citation: z.array(z.string().url()).optional(), // Citazioni/fonti (array di URL)
    isBasedOn: z.array(z.string().url()).optional(), // Articoli/fonti su cui si basa

    // === Community ===
    discussionUrl: z.string().url().optional(), // URL discussione (LinkedIn, forum, etc.)

    // === Relations ===
    relatedSlugs: z.array(z.string()).optional(),

    // === Status ===
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),

    // ═══════════════════════════════════════════════════════════════
    // EXTENDED METADATA (Editorial, SEO Advanced, Promotional)
    // ═══════════════════════════════════════════════════════════════

    // === TAXONOMY (Extended) ===
    /**
     * Secondary pillar categories beyond the primary pillar.
     * Used for cross-categorization and related content discovery.
     * Maximum 2 secondary pillars recommended.
     *
     * @example ["business", "research"]
     */
    secondaryPillars: z.array(z.enum([
      'engineering',
      'research',
      'business',
      'governance',
      'methodology',
      'synthesis'
    ])).optional(),

    // === AUDIENCE (Editorial - NOT rendered publicly) ===
    /**
     * Target audience information for editorial planning.
     * These fields guide content creation but are NOT displayed on the site.
     *
     * @internal
     */
    audience: z.object({
      /**
       * Primary target audience for this content.
       * Be specific: role, seniority, context.
       *
       * @example "CFOs and technical decision makers evaluating AI investments"
       * @example "Mid-level data scientists implementing production systems"
       */
      primary: z.string(),

      /**
       * Secondary audiences who may benefit from this content.
       * Less critical but still relevant reader segments.
       *
       * @example ["AI team leads", "Technical consultants"]
       */
      secondary: z.array(z.string()).optional(),

      /**
       * Technical level required to understand this content.
       * Scale: 1 (no technical background) to 5 (expert).
       *
       * 1 = General audience, no tech background
       * 2 = Understands concepts but doesn't implement
       * 3 = Technical but not specialist in this domain
       * 4 = Domain specialist
       * 5 = Expert with deep knowledge
       *
       * @minimum 1
       * @maximum 5
       */
      technical_level: z.number().min(1).max(5),

      /**
       * Knowledge prerequisites for this content.
       * What should readers already know before reading?
       *
       * @example ["Basic AI/ML concepts", "Enterprise metrics", "ROI fundamentals"]
       */
      assumes_knowledge: z.array(z.string()).optional(),

      /**
       * Reader's stage in the awareness journey.
       * Helps calibrate content depth and style.
       *
       * - unaware: Doesn't know they have the problem
       * - problem-aware: Knows the problem, exploring solutions
       * - solution-aware: Evaluating different approaches
       * - product-aware: Considering specific implementation
       */
      reader_stage: z.enum(['unaware', 'problem-aware', 'solution-aware', 'product-aware']).optional(),
    }).optional(),

    // === VOICE (Editorial - NOT rendered publicly) ===
    /**
     * Voice and tone settings for this specific article.
     * Guides the writing style and emotional register.
     * These fields are NOT displayed on the site.
     *
     * @internal
     */
    voice: z.object({
      /**
       * Dominant tone for this article.
       *
       * - analytical: Detached, data-focused, objective
       * - analytical-urgent: Analysis with controlled sense of urgency
       * - pragmatic: Action-focused, how-to oriented
       * - reflective: Personal, meditative, exploratory
       * - critical: Challenges status quo, debunks myths
       */
      tone: z.enum(['analytical', 'analytical-urgent', 'pragmatic', 'reflective', 'critical']).optional(),

      /**
       * Formality level on scale 1-10.
       * Default for this blog: 7 (professional but approachable)
       *
       * 5-6 = Conversational (newsletters, methodology)
       * 7 = Professional standard (most articles)
       * 8 = Formal (research, academic analysis)
       *
       * @minimum 1
       * @maximum 10
       */
      formality: z.number().min(1).max(10).optional(),

      /**
       * Narrative perspective and positioning.
       *
       * - analyst: Third person, critical distance, data-driven
       * - practitioner: First person, hands-on experience
       * - guide: Second person, prescriptive, teaching
       * - peer: Mixed perspective, collaborative tone
       */
      perspective: z.enum(['analyst', 'practitioner', 'guide', 'peer']).optional(),

      /**
       * Underlying emotion or attitude.
       *
       * - neutral: Purely informational, detached
       * - controlled-concern: Worried but analytical
       * - confident: Assertive, assured
       * - curious: Exploratory, questioning
       */
      emotion: z.enum(['neutral', 'controlled-concern', 'confident', 'curious']).optional(),
    }).optional(),

    // === STRUCTURE (Editorial - NOT rendered publicly) ===
    /**
     * Article structure and organization.
     * Planning tool for content architecture.
     * NOT displayed publicly.
     *
     * @internal
     */
    structure: z.object({
      /**
       * Structural pattern used for this article.
       * Guides how content is organized and flows.
       *
       * - problem-diagnosis-model: Problem → Analysis → Framework → Application
       * - how-to: Objective → Steps → Result
       * - analysis: Context → Analysis → Implications
       * - comparison: Options → Criteria → Evaluation → Recommendation
       * - case-study: Context → Challenge → Solution → Results → Lessons
       * - paper-analysis: Intro → Methodology → Findings → Practical implications
       * - explainer: What → Why → How → When to use
       */
      pattern: z.enum([
        'problem-diagnosis-model',
        'how-to',
        'analysis',
        'comparison',
        'case-study',
        'paper-analysis',
        'explainer'
      ]).optional(),

      /**
       * Detailed section outline with purpose.
       * Helps track content organization and ensure each section has clear purpose.
       */
      sections: z.array(z.object({
        /** Section heading or identifier */
        name: z.string(),
        /** What this section accomplishes */
        purpose: z.string(),
        /** Target word count for this section */
        word_count: z.number().optional(),
      })).optional(),

      /**
       * Research and sourcing strategy.
       *
       * - single-source-deep: One primary source with context
       * - multi-source-synthesis: Multiple sources synthesized
       * - experience-based: Personal/professional experience as primary source
       * - data-driven: Original data analysis
       */
      source_strategy: z.enum([
        'single-source-deep',
        'multi-source-synthesis',
        'experience-based',
        'data-driven'
      ]).optional(),

      /**
       * Primary source information (if single-source-deep strategy).
       * Documents the main reference work.
       */
      primary_source: z.object({
        /** Type of source */
        type: z.string(),
        /** Title of the work */
        title: z.string(),
        /** Author names */
        authors: z.array(z.string()).optional(),
        /** Publishing institution */
        institution: z.string().optional(),
        /** Publication year */
        year: z.number().optional(),
        /** URL to source */
        url: z.string().url().optional(),
      }).optional(),

      /**
       * Word count targets for planning.
       * Helps keep content focused and within bounds.
       */
      word_count: z.object({
        /** Target word count */
        target: z.number(),
        /** Minimum acceptable */
        min: z.number(),
        /** Maximum acceptable */
        max: z.number(),
      }).optional(),
    }).optional(),

    // === COPY (Editorial - NOT rendered publicly) ===
    /**
     * Copywriting framework and messaging strategy.
     * Inspired by StoryBrand and content marketing best practices.
     * NOT displayed publicly - for editorial guidance only.
     *
     * @internal
     */
    copy: z.object({
      /**
       * Three-level problem framing (StoryBrand model).
       * Defines what challenge the reader faces.
       */
      problem: z.object({
        /** External problem: Observable, practical challenge */
        external: z.string(),
        /** Internal problem: Emotional frustration or concern */
        internal: z.string(),
        /** Philosophical problem: Why this matters at a deeper level */
        philosophical: z.string(),
      }).optional(),

      /**
       * The antagonist or obstacle.
       * What's preventing the reader from success?
       *
       * @example "Vanity metrics that hide real impact"
       * @example "Vendor promises without implementation details"
       */
      villain: z.string().optional(),

      /**
       * How the author positions themselves as guide.
       *
       * - analyst: Has seen the data, understands implications
       * - practitioner: Has done it, sharing experience
       * - curator: Filtered signal from noise
       * - translator: Makes complex accessible
       */
      guide_positioning: z.enum(['analyst', 'practitioner', 'curator', 'translator']).optional(),

      /**
       * Transformation promise: What the reader gains.
       * The positive outcome if they apply this content.
       *
       * @example "Learn to measure differential effects, not averages"
       */
      success_promise: z.string().optional(),

      /**
       * Stakes: What happens if reader doesn't act.
       * Negative consequence that motivates action.
       *
       * @example "Billions wasted without proper measurement"
       */
      stakes: z.string().optional(),

      /**
       * Core thesis: The main argument in one sentence.
       * The "so what" of the article.
       *
       * @example "We measure the wrong things: activity instead of impact"
       */
      thesis: z.string().optional(),

      /**
       * Opening hook strategy and content.
       * How the article captures attention.
       */
      hook: z.object({
        /**
         * Type of hook used.
         *
         * - quantified-paradox: Contradictory stats/facts
         * - surprising-stat: Unexpected data point
         * - common-myth: Challenge widely-held belief
         * - provocation: Bold statement requiring proof
         * - question: Compelling question reader asks themselves
         */
        type: z.enum(['quantified-paradox', 'surprising-stat', 'common-myth', 'provocation', 'question']),
        /** The actual hook content */
        content: z.string(),
      }).optional(),

      /**
       * Key takeaways: 3-5 main points.
       * Actionable insights readers should remember.
       * Can be used for TL;DR, social media, newsletters.
       *
       * @example ["Segment by role/seniority, not averages", "Use control groups and baselines"]
       */
      takeaways: z.array(z.string()).optional(),

      /**
       * Memorable phrases or coined terms.
       * Concepts that make the article quotable and shareable.
       */
      memorable_phrases: z.array(z.object({
        /** The term or phrase */
        term: z.string(),
        /** Brief definition */
        definition: z.string(),
      })).optional(),

      /**
       * Call to action.
       * What should readers do next?
       */
      cta: z.object({
        /** Type of CTA */
        type: z.enum(['newsletter', 'share', 'download', 'read-more']),
        /** CTA text */
        text: z.string(),
      }).optional(),
    }).optional(),

    // === SEO ADVANCED (Extends existing SEO fields) ===
    /**
     * Meta title override for <title> tag.
     * If not specified, uses `title` field.
     * Recommended: 50-60 characters for optimal display.
     *
     * @maxLength 60
     * @example "AI Measurement Guide: Stanford Research Reveals Better Way"
     */
    meta_title: z.string().optional(),

    /**
     * Primary focus keyword for SEO optimization.
     * The main search term this article targets.
     *
     * @example "AI measurement metrics"
     * @example "enterprise RAG architecture"
     */
    focus_keyword: z.string().optional(),

    /**
     * Sitemap priority (0.0 to 1.0).
     * Indicates relative importance of this page.
     *
     * Defaults:
     * - Featured/Cornerstone: 0.9
     * - Pillar content: 0.8
     * - Standard: 0.7
     * - Cluster: 0.6
     *
     * @minimum 0
     * @maximum 1
     */
    sitemap_priority: z.number().min(0).max(1).optional(),

    /**
     * How frequently this page changes.
     * Guides search engine crawl frequency.
     *
     * Defaults:
     * - Evergreen: monthly
     * - News: weekly
     * - Standard: monthly
     */
    sitemap_changefreq: z.enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']).optional(),

    /**
     * Content tier for internal linking and prioritization.
     *
     * - cornerstone: Foundational pillar page
     * - pillar: Important, comprehensive content
     * - cluster: Supporting content for pillar
     * - news: Time-sensitive content
     */
    content_tier: z.enum(['cornerstone', 'pillar', 'cluster', 'news']).optional(),

    /**
     * Whether content remains relevant over time.
     * True = evergreen content (doesn't date)
     * False = time-sensitive (news, events, dated analysis)
     */
    evergreen: z.boolean().optional(),

    // === SEO NAVIGATION ===
    /**
     * Previous article URL (for pagination).
     * Creates rel="prev" link for search engines.
     * Used in article series.
     *
     * @format url
     */
    prev: z.string().url().optional(),

    /**
     * Next article URL (for pagination).
     * Creates rel="next" link for search engines.
     * Used in article series.
     *
     * @format url
     */
    next: z.string().url().optional(),

    /**
     * Domains to preconnect for performance.
     * List of external domains this page loads resources from.
     * Enables DNS prefetch and connection setup.
     *
     * @example ["https://fonts.googleapis.com", "https://cdn.example.com"]
     */
    preconnect: z.array(z.string().url()).optional(),

    // === OPEN GRAPH OVERRIDES ===
    /**
     * Open Graph meta tags customization.
     * Overrides default OG tags for social sharing (Facebook, LinkedIn).
     * If not specified, falls back to meta_title, description, coverImage.
     */
    og: z.object({
      /**
       * OG title (can differ from page title).
       * Recommended: 60-90 characters.
       *
       * @maxLength 90
       */
      title: z.string().optional(),

      /**
       * OG description.
       * Recommended: 155-200 characters.
       *
       * @maxLength 200
       */
      description: z.string().optional(),

      /**
       * OG image path or URL.
       * Recommended: 1200x630px for optimal display.
       */
      image: z.string().optional(),

      /**
       * Alt text for OG image.
       * Accessibility and context for screen readers.
       */
      image_alt: z.string().optional(),
    }).optional(),

    // === TWITTER CARD OVERRIDES ===
    /**
     * Twitter Card meta tags customization.
     * Overrides for Twitter/X sharing.
     * Falls back to OG tags if not specified.
     */
    twitter: z.object({
      /**
       * Twitter card title.
       * Can be shorter/punchier than OG title.
       * Recommended: 55-70 characters.
       *
       * @maxLength 70
       */
      title: z.string().optional(),

      /**
       * Twitter card description.
       * Recommended: 125-200 characters.
       *
       * @maxLength 200
       */
      description: z.string().optional(),

      /**
       * Twitter card image.
       * Can differ from OG image for aspect ratio optimization.
       */
      image: z.string().optional(),

      /**
       * Alt text for Twitter image.
       */
      image_alt: z.string().optional(),
    }).optional(),

    // === SCHEMA.ORG EXTENSIONS ===
    /**
     * FAQ schema for structured data.
     * Generates FAQPage schema.org markup.
     * Enables rich snippets in search results.
     *
     * Use when article contains 2+ frequently asked questions.
     *
     * @see https://schema.org/FAQPage
     */
    faq: z.array(z.object({
      /** Question text */
      question: z.string(),
      /** Answer text (can include HTML) */
      answer: z.string(),
    })).optional(),

    /**
     * HowTo schema for structured data.
     * Generates HowTo schema.org markup.
     * Enables rich snippets for instructional content.
     *
     * Use for step-by-step guides and tutorials.
     *
     * @see https://schema.org/HowTo
     */
    howto: z.object({
      /** Name of the HowTo */
      name: z.string(),
      /** Description of what will be accomplished */
      description: z.string().optional(),
      /** Total time required (ISO 8601 duration, e.g., "PT2H" for 2 hours) */
      totalTime: z.string().optional(),
      /** Array of steps */
      steps: z.array(z.object({
        /** Step name/title */
        name: z.string(),
        /** Step instructions */
        text: z.string(),
        /** Anchor link to step in article (e.g., "#step-1") */
        url: z.string().optional(),
      })),
    }).optional(),

    // === PROMOTIONAL (Manual social copy) ===
    /**
     * Promotional copy variants for distribution.
     * Manual, hand-crafted copy for social media and newsletters.
     * NOT auto-generated - requires explicit authoring.
     */
    promo: z.object({
      /**
       * Summary variants for different contexts.
       */
      summary: z.object({
        /** Short summary (max 160 chars) for cards, previews, meta descriptions */
        short: z.string().max(160).optional(),
        /** Medium summary (max 280 chars) for homepage, newsletter intro */
        medium: z.string().max(280).optional(),
        /** Long summary (max 500 chars) for feature placements */
        long: z.string().max(500).optional(),
      }).optional(),

      /**
       * Social media copy variants.
       * Manually written for each platform.
       */
      social: z.object({
        /** LinkedIn post copy (optimal: <1300 chars for single screen) */
        linkedin: z.string().optional(),
        /** Twitter/X thread or single tweet */
        twitter: z.string().optional(),
        /** Bluesky post (max 300 chars) */
        bluesky: z.string().max(300).optional(),
      }).optional(),

      /**
       * Newsletter copy elements.
       */
      newsletter: z.object({
        /** Email subject line (40-60 chars optimal) */
        subject: z.string().optional(),
        /** Preview text shown in inbox (max 100 chars) */
        preview: z.string().max(100).optional(),
        /** Newsletter intro/teaser paragraph */
        intro: z.string().optional(),
      }).optional(),
    }).optional(),

    // === EDITORIAL WORKFLOW ===
    /**
     * Editorial process and versioning metadata.
     * Tracks content lifecycle and changes.
     * NOT displayed publicly.
     *
     * @internal
     */
    editorial: z.object({
      /**
       * Editorial status.
       *
       * - idea: Concept stage
       * - outline: Structure defined
       * - draft: First draft complete
       * - review: Under review/editing
       * - scheduled: Approved, publication scheduled
       * - published: Live on site
       * - archived: No longer promoted but still accessible
       */
      status: z.enum(['idea', 'outline', 'draft', 'review', 'scheduled', 'published', 'archived']).optional(),

      /**
       * Content version (e.g., "1.0", "1.1", "2.0").
       * Increment for substantive changes.
       */
      version: z.string().optional(),

      /**
       * Date content was initially created.
       * Format: ISO 8601 (YYYY-MM-DD)
       */
      created_at: z.string().optional(),

      /**
       * Editorial notes and reminders.
       * Internal comments for review process.
       *
       * @example "Verify Stanford data when paper officially published"
       */
      review_notes: z.string().optional(),

      /**
       * Change log for tracking updates.
       * Documents what changed and when.
       */
      changelog: z.array(z.object({
        /** Date of change (ISO 8601) */
        date: z.string(),
        /** Version number for this change */
        version: z.string().optional(),
        /** Description of what changed */
        changes: z.string(),
      })).optional(),

      /**
       * Content type classification.
       *
       * - analysis: Deep analytical piece
       * - how-to: Practical guide
       * - opinion: Opinion or commentary
       * - news-analysis: Commentary on news/announcements
       * - review: Tool/book/paper review
       * - interview: Q&A format
       * - roundup: Periodic summary/collection
       */
      content_type: z.enum(['analysis', 'how-to', 'opinion', 'news-analysis', 'review', 'interview', 'roundup']).optional(),
    }).optional(),

    // === i18n (Extended) ===
    /**
     * Languages this content is available in.
     * Used for language switcher and hreflang tags.
     *
     * @example ["it", "en"]
     */
    availableIn: z.array(z.enum(['it', 'en'])).optional(),

    /**
     * Base slug of original content (for translations).
     * Points to the original language version this is translated from.
     * Used in .en.mdx files to reference base .mdx file.
     *
     * @example "misurare-ia" (in misurare-ia.en.mdx file)
     */
    translationOf: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
