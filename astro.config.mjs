// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ireneburresi.dev',
  // SEO: URL policy coerente - trailing slash sempre
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      // Escludi pagine utility dalla sitemap
      filter: (page) => !page.includes('/404') && !page.includes('/500'),
    }),
    preact(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'material-theme-palenight',
      wrap: true,
    },
  },
});
