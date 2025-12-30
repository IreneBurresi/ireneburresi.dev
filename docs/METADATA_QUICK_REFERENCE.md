# Quick Reference: Metadati Blog

Riferimento rapido per i metadati degli articoli del blog.

---

## ✅ Template Base

```yaml
---
title: "Titolo Articolo (max 60 caratteri)"
summary: "Riassunto breve 120-160 caratteri per preview e SEO"

author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "Lead AI Professional"

publishedAt: "2025-01-15"
locale: it

pillar: engineering  # engineering | research | business | governance | methodology | synthesis
subsection: "implementazioni"
tags: ["Tag1", "Tag2", "Tag3"]

featured: false
draft: false
---
```

---

## 🎯 Pillars & Subsections

### Engineering
- `implementazioni`, `architettura`, `performance`, `security`, `best-practices`

### Research
- `papers`, `panoramiche`, `review-trimestrali`, `quarterly`

### Business
- `market-intelligence`, `costi-benefici`, `strategy`

### Governance
- `compliance`, `ethics`, `regulation`

### Methodology
- `workflow-ricerca`, `deep-work`, `productivity`

### Synthesis
- `analisi-multidimensionale`, `scenario-planning`, `cross-domain`

---

## 🔧 Campi Opzionali Comuni

### SEO Avanzato
```yaml
description: "Meta description SEO ottimizzata (150-160 char)"
keywords: ["keyword1", "keyword2"]
abstract: "Abstract tecnico per Schema.org"
alternativeHeadline: "Titolo alternativo breve"
genre: "Tutorial"  # Tutorial | Analysis | Guide | Review | Case Study
```

### Educational
```yaml
educationalLevel: intermediate  # beginner | intermediate | advanced
learningResourceType: tutorial  # tutorial | guide | analysis | review | reference | case-study
prerequisites:
  - "Conoscenza base di Python"
  - "Familiarità con LLM"
```

### Media & Links
```yaml
coverImage: "/images/blog/article-cover.png"
video: "https://www.youtube.com/watch?v=..."
discussionUrl: "https://www.linkedin.com/posts/..."
```

### Citations & Relations
```yaml
citation:
  - "https://arxiv.org/abs/..."
isBasedOn:
  - "https://example.com/article"
relatedSlugs:
  - "related-article-1"
  - "related-article-2"
```

### Dates
```yaml
publishedAt: "2025-01-15"
updatedAt: "2025-01-20"  # Solo per aggiornamenti sostanziali
```

---

## 📋 Checklist Pre-Pubblicazione

- [ ] `title` max 60 caratteri
- [ ] `summary` tra 120-160 caratteri
- [ ] `tags` 3-6 elementi
- [ ] `pillar` e `subsection` corretti
- [ ] `publishedAt` formato YYYY-MM-DD
- [ ] `coverImage` presente (o OK con auto-generata)
- [ ] `draft: false` prima di committare
- [ ] `relatedSlugs` verificati (slug esistono)
- [ ] `featured` solo se necessario (max 1-2 articoli)

---

## 🚀 Templates per Caso d'Uso

### Tutorial Tecnico

```yaml
---
title: "Tutorial: [Argomento]"
summary: "Guida pratica step-by-step per [obiettivo]"
description: "Scopri come [azione]. Guida completa con esempi di codice e best practices."

author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "Lead AI Professional"

publishedAt: "2025-01-15"
locale: it

pillar: engineering
subsection: "implementazioni"
tags: ["Tutorial", "Python", "LLM"]

educationalLevel: intermediate
learningResourceType: tutorial
prerequisites:
  - "Conoscenza base di Python"

coverImage: "/images/blog/tutorial-cover.png"
featured: false
draft: false
---
```

### Analisi/Review

```yaml
---
title: "[Paper/Report Name]: Analisi e Insights"
summary: "Analisi approfondita di [documento]: key findings e implicazioni pratiche."

author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "Lead AI Professional"

publishedAt: "2025-01-15"
locale: it

pillar: research
subsection: "papers"
tags: ["Research", "Analysis", "AI"]

genre: "Analysis"
learningResourceType: analysis

citation:
  - "https://arxiv.org/abs/..."

featured: false
draft: false
---
```

### Quarterly Review

```yaml
---
title: "Q1 2025: AI Landscape Review"
summary: "Panoramica trimestrale: trend, breakthrough, e direzioni future dell'AI."

author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "Lead AI Professional"

publishedAt: "2025-03-31"
locale: it

pillar: synthesis
subsection: "review-trimestrali"
tags: ["Quarterly Review", "AI Trends", "Market Analysis"]

genre: "Review"
learningResourceType: review

featured: true
draft: false
---
```

---

## ⚡ Tips

### SEO
- Title: query principale + beneficio
- Summary: hook + value proposition + keyword
- Tags: mix generale + specifico

### Images
- Dimensioni: 1200x630px (OG optimal)
- Path: `/public/images/blog/`
- Nome: `kebab-case.png`

### Featured
- Solo 1-2 articoli featured contemporaneamente
- Ruota regolarmente (ogni 2-4 settimane)
- Scegli articoli evergreen o timely

### Locale
- `it` per italiano
- `en` per inglese
- Slug file inglese: `article-name.en.mdx`

---

## 🆘 Fix Comuni

| Problema | Fix |
|----------|-----|
| Articolo non appare | Verifica `draft: false` e `locale` |
| Immagine non carica | Path corretto? File in `/public/`? |
| Build error | Controlla sintassi YAML, array con `[]` |
| Tag non funzionano | Usa array: `["Tag1", "Tag2"]` |
| Featured non appare | Max 2 featured, verifica altri articoli |

---

**Link**: [Guida Completa](./METADATA_GUIDE.md) | [Config Schema](../src/content/config.ts)
