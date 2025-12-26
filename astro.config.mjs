import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://ireneburresi.dev',
  // SEO: URL policy coerente - trailing slash sempre
  trailingSlash: 'always',
  // i18n: Multilingual support (Italian primary, English secondary)
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
    fallback: {
      en: 'it',
    },
  },
  integrations: [
    mdx(),
    sitemap({
      // Escludi pagine utility dalla sitemap
      filter: (page) => !page.includes('/404') && !page.includes('/500'),
      i18n: {
        defaultLocale: 'it',
        locales: {
          it: 'it-IT',
          en: 'en-US',
        },
      },
    }),
    preact(),
    pagefind(),
  ],
  vite: {
    // @ts-expect-error - Tailwind v4 plugin types not fully compatible
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true,
    },
  },
});
