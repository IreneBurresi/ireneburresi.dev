/**
 * Lighthouse CI Configuration
 *
 * Audits SEO, Performance, Accessibility, and Best Practices.
 * Focuses on Core Web Vitals (LCP, INP, CLS) as ranking signals.
 */
module.exports = {
  ci: {
    collect: {
      // Start local server and wait for it to be ready
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local',
      startServerReadyTimeout: 30000,

      // URLs to audit (add key pages)
      url: [
        'http://localhost:4321/',
        'http://localhost:4321/blog/',
        'http://localhost:4321/about/',
        // Add sample blog post for content analysis
        'http://localhost:4321/blog/ai-2026-anno-resa-conti/',
      ],

      // Run multiple times for consistent results
      numberOfRuns: 3,

      // Settings for better consistency
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        // Skip PWA checks as this is not a PWA
        skipAudits: ['service-worker', 'installable-manifest', 'apple-touch-icon'],
      },
    },

    assert: {
      // Define minimum acceptable scores (0-1 scale)
      assertions: {
        // Performance & Core Web Vitals
        'categories:performance': ['error', { minScore: 0.85 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }], // LCP < 2.5s
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],   // CLS < 0.1
        'max-potential-fid': ['error', { maxNumericValue: 100 }],         // FID < 100ms (deprecated, use INP)

        // SEO Critical
        'categories:seo': ['error', { minScore: 0.95 }],
        'meta-description': 'error',
        'document-title': 'error',
        'link-text': 'error',
        'crawlable-anchors': 'error',
        'robots-txt': 'warn',
        'canonical': 'error',
        'hreflang': 'warn',
        'font-size': 'error',
        'tap-targets': 'warn',

        // Accessibility
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'aria-allowed-attr': 'error',
        'aria-required-attr': 'error',
        'button-name': 'error',

        // Best Practices
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'errors-in-console': 'warn',
        'is-on-https': 'error',

        // Image optimization
        'modern-image-formats': 'warn',
        'uses-responsive-images': 'warn',
        'offscreen-images': 'warn',

        // Resource optimization
        'unused-css-rules': 'warn',
        'unused-javascript': 'warn',
        'uses-text-compression': 'error',
      },
    },

    upload: {
      // Store reports locally (can be configured for remote storage)
      target: 'filesystem',
      outputDir: './.lighthouseci',
      reportFilenamePattern: 'lighthouse-%%PATHNAME%%-%%DATETIME%%.%%EXTENSION%%',
    },
  },
};
