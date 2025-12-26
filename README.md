# ireneburresi.dev

Technical blog on AI Engineering, RAG architectures, scientific research, and artificial intelligence governance.

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/small.svg)](https://astro.build)

## Tech Stack

- **Framework**: [Astro](https://astro.build) v5 with static rendering
- **UI**: [Tailwind CSS](https://tailwindcss.com) v4 + Material Design 3
- **Components**: [Preact](https://preactjs.com) for interactivity
- **Content**: MDX with typed content collections
- **SEO**: Schema.org/JSON-LD, Open Graph, automatic sitemap
- **Feeds**: RSS, Atom, JSON Feed
- **Testing**: Vitest with SEO, link, and content validation

## Project Structure

```
src/
├── components/
│   ├── blog/          # Article components
│   ├── icons/         # SVG icons
│   ├── layout/        # Navbar, Footer, Hero
│   ├── seo/           # Meta tags, JSON-LD
│   └── ui/            # Badge, Button, Card
├── consts/
│   ├── schema.ts      # Schema.org data (Person, Organization)
│   └── site.ts        # Site configuration
├── content/
│   └── blog/          # MDX articles
├── layouts/           # Page layouts
├── lib/
│   ├── constants.ts   # Pillars and subsections
│   ├── feed.ts        # Feed utilities
│   ├── seo/           # Structured data builders
│   └── utils.ts       # Shared utilities
├── pages/             # Astro routes
└── styles/            # Global CSS
tests/
├── content.test.ts    # Frontmatter validation
├── feeds.test.ts      # RSS/Atom/JSON tests
├── links.test.ts      # Internal links and assets
├── seo.test.ts        # Meta, sitemap, schema.org
└── setup.ts           # Test utilities
```

## Blog Pillars

The blog is organized into 6 thematic areas:

| Pillar | Description |
|--------|-------------|
| **AI Engineering** | Architectures, implementations, and deployment |
| **Research** | Paper analysis and technological breakthroughs |
| **Business** | ROI, TCO, and strategic frameworks |
| **Governance** | Compliance, security, and AI ethics |
| **Methodology** | Workflow, deep work, and tooling |
| **Synthesis** | Quarterly reviews and scenario planning |

## Development

### Requirements

- Node.js 20+
- npm 10+

### Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on `localhost:4321` |
| `npm run build` | Production build in `./dist/` |
| `npm run preview` | Preview local build |
| `npm run test` | Run all tests |
| `npm run test:watch` | Tests in watch mode |
| `npm run test:seo` | SEO tests only |
| `npm run test:links` | Link tests only |
| `npm run test:feeds` | Feed tests only |
| `npm run test:content` | Content tests only |
| `npm run lint` | Astro check |
| `npm run typecheck` | TypeScript check |
| `npm run validate` | Build + full test suite |
| `npm run audit:seo` | Full SEO audit (Lighthouse CI) |
| `npm run audit:perf` | Performance audit with Core Web Vitals |
| `npm run audit:quick` | Quick SEO+Performance check |

### Testing

The test suite validates:

- **SEO**: robots.txt, sitemap, meta tags, JSON-LD
- **Feeds**: RSS, Atom, JSON Feed structure and consistency
- **Links**: Internal links, assets, canonical URLs
- **Content**: Frontmatter, valid pillars, schema.ts

```bash
# Run all tests
npm run test

# Expected output: 86 tests passed
```

### SEO Audit

The blog includes automated SEO and performance auditing with Lighthouse CI:

```bash
# Full SEO audit on multiple pages
npm run audit:seo

# Performance-focused audit with Core Web Vitals
npm run audit:perf

# Quick headless audit (SEO + Performance)
npm run audit:quick
```

**What gets tested:**

- **Core Web Vitals**: LCP, CLS, INP (Google ranking signals)
- **SEO Technical**: Meta tags, robots.txt, canonical, structured data
- **Accessibility**: WCAG AA compliance, color contrast, alt text
- **Performance**: Resource optimization, image formats, compression

**Configuration**: See [lighthouserc.cjs](./lighthouserc.cjs) for thresholds and URLs.

**Requirements**: Chrome/Chromium must be installed. Install via:
```bash
# macOS
brew install --cask google-chrome

# Ubuntu/Debian
sudo apt install chromium-browser

# Or use Chrome you already have installed
```

**Full Guide**: [docs/SEO_AUDIT_GUIDE.md](./docs/SEO_AUDIT_GUIDE.md) includes:
- Lighthouse CI usage and interpretation
- Core Web Vitals optimization strategies
- Screaming Frog setup for technical crawling
- Complete SEO checklist

## Configuration

### Author Data

Edit `src/consts/schema.ts` to update:

- Name, role, bio
- Social links (GitHub, LinkedIn)
- Skills (knowsAbout with Wikidata)

### Adding an Article

Create an `.mdx` file in `src/content/blog/`:

```yaml
---
title: "Article title"
summary: "Description 120-160 characters"
publishedAt: "2024-12-20"
author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "AI Engineer"
pillar: "engineering"
subsection: "implementations"
tags: ["RAG", "LLM"]
draft: false
---

MDX content...
```

## Deploy

The site is configured for static deployment. Compatible with:

- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages

```bash
# Production build
npm run build

# Static files are in ./dist/
```

## License

MIT License - see [LICENSE](LICENSE)

---

Developed by [Irene Burresi](https://ireneburresi.dev)
