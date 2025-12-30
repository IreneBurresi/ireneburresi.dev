# Guida ai Metadati del Blog

Documentazione completa su come popolare i metadati (frontmatter) degli articoli del blog.

---

## 📋 Indice

- [Metadati Obbligatori](#-metadati-obbligatori)
- [Metadati con Default](#-metadati-con-default)
- [Metadati Opzionali](#-metadati-opzionali)
  - [SEO & Schema.org](#seo--schemaorg)
  - [Educational Content](#educational-content)
  - [Citations & Sources](#citations--sources)
  - [Media](#media)
  - [Community](#community)
  - [Relations](#relations)
- [Esempi Completi](#-esempi-completi)
- [Best Practices](#-best-practices)

---

## ✅ Metadati Obbligatori

Questi campi **devono** essere presenti in ogni articolo.

### 1. `title` (string)

**Descrizione**: Titolo principale dell'articolo.

**Best Practices**:
- Massimo 60 caratteri per SEO ottimale
- Deve essere chiaro, descrittivo e accattivante
- Evitare clickbait

**Esempio**:
```yaml
title: "RAG in Production: Architettura e Best Practices"
```

---

### 2. `summary` (string)

**Descrizione**: Riassunto breve dell'articolo, usato per preview e meta description di default.

**Best Practices**:
- Lunghezza ideale: 120-160 caratteri
- Deve catturare l'essenza dell'articolo
- Include keyword principali

**Esempio**:
```yaml
summary: "Guida completa all'implementazione di sistemi RAG in produzione: architettura, scaling, monitoring e ottimizzazione delle performance."
```

---

### 3. `author` (object)

**Descrizione**: Informazioni sull'autore dell'articolo.

**Campi Obbligatori**:
- `name` (string): Nome completo
- `avatar` (string): Path all'immagine avatar
- `role` (string): Ruolo/titolo professionale

**Campi Opzionali**:
- `url` (string): URL personale o profilo LinkedIn
- `email` (string): Email di contatto

**Esempio**:
```yaml
author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "Lead AI Professional"
  url: "https://www.linkedin.com/in/ireneburresi/"
  email: "irene@example.com"
```

---

### 4. `publishedAt` (string)

**Descrizione**: Data di pubblicazione in formato YYYY-MM-DD.

**Formato**: `YYYY-MM-DD`

**Esempio**:
```yaml
publishedAt: "2025-01-15"
```

---

### 5. `pillar` (enum)

**Descrizione**: Pillar principale dell'articolo (categoria macro).

**Valori possibili**:
- `engineering` - AI Engineering
- `research` - Ricerca AI
- `business` - Business & Strategy
- `governance` - Governance & Compliance
- `methodology` - Metodologie
- `synthesis` - Sintesi Cross-Domain

**Esempio**:
```yaml
pillar: "engineering"
```

---

### 6. `subsection` (string)

**Descrizione**: Sottosezione specifica all'interno del pillar.

**Esempi per Pillar**:
- Engineering: `"implementazioni"`, `"architettura"`, `"performance"`
- Research: `"papers"`, `"panoramiche"`, `"review-trimestrali"`
- Business: `"market-intelligence"`, `"costi-benefici"`
- Governance: `"compliance"`, `"ethics"`
- Methodology: `"workflow-ricerca"`, `"deep-work"`
- Synthesis: `"analisi-multidimensionale"`

**Esempio**:
```yaml
subsection: "implementazioni"
```

---

### 7. `tags` (array di stringhe)

**Descrizione**: Tag per categorizzazione e SEO. Usati anche per Schema.org "about".

**Best Practices**:
- 3-6 tag per articolo
- Mix di tag generici e specifici
- Usa nomi consistenti (controlla gli articoli esistenti)
- Alcuni tag hanno mappature Wikidata automatiche

**Esempio**:
```yaml
tags: ["RAG", "Production", "Architecture", "LLM", "Vector Database"]
```

---

## ⚙️ Metadati con Default

Questi campi hanno valori di default ma possono essere sovrascritti.

### 8. `locale` (enum)

**Default**: `'it'`

**Descrizione**: Lingua del contenuto.

**Valori**: `'it'` | `'en'`

**Esempio**:
```yaml
locale: en
```

---

### 9. `featured` (boolean)

**Default**: `false`

**Descrizione**: Se `true`, l'articolo viene mostrato in evidenza nella homepage.

**Uso**: Solo 1-2 articoli featured alla volta.

**Esempio**:
```yaml
featured: true
```

---

### 10. `draft` (boolean)

**Default**: `false`

**Descrizione**: Se `true`, l'articolo non viene pubblicato.

**Esempio**:
```yaml
draft: true
```

---

## 🔧 Metadati Opzionali

### SEO & Schema.org

#### `abstract` (string)

**Quando usarlo**: Quando serve un abstract tecnico/formale diverso dal summary.

**Differenza con summary**:
- `summary` = preview accattivante per lettori
- `abstract` = descrizione tecnica formale per Schema.org

**Esempio**:
```yaml
abstract: "Questo articolo presenta un'analisi comparativa delle architetture RAG in produzione, con focus su trade-off tra latenza, accuratezza e costi operativi."
```

---

#### `description` (string)

**Quando usarlo**: Quando serve una meta description SEO diversa dal summary.

**Uso**: Ottimizzazione specifica per snippet SERP.

**Best Practices**:
- 150-160 caratteri
- Include call-to-action
- Keyword-rich ma naturale

**Esempio**:
```yaml
description: "Scopri come implementare sistemi RAG scalabili in produzione. Guida pratica con esempi di codice, architetture testate e best practices verificate sul campo."
```

---

#### `keywords` (array)

**Quando usarlo**: Per aggiungere keyword SEO oltre ai tag.

**Differenza con tags**:
- `tags` = categorizzazione visibile e navigazione
- `keywords` = SEO invisibile, varianti keyword

**Esempio**:
```yaml
keywords: ["Retrieval Augmented Generation", "production ML", "LLM deployment", "vector search"]
```

---

#### `alternativeHeadline` (string)

**Quando usarlo**: Per ottimizzare il titolo per social media o Schema.org.

**Uso**: Versione più corta/accattivante del titolo principale.

**Esempio**:
```yaml
title: "Deep Dive: Implementare RAG in Production con Vector Databases"
alternativeHeadline: "RAG in Production: La Guida Definitiva"
```

---

#### `genre` (string)

**Quando usarlo**: Per specificare il genere dell'articolo in Schema.org.

**Valori suggeriti**: `"Analysis"`, `"Tutorial"`, `"Review"`, `"Guide"`, `"Case Study"`, `"Opinion"`

**Esempio**:
```yaml
genre: "Tutorial"
```

---

#### `inLanguage` (string)

**Quando usarlo**: Raramente. Per override della lingua in Schema.org (diversa da `locale`).

**Formato**: Codice lingua ISO (es. `"it-IT"`, `"en-US"`)

**Esempio**:
```yaml
inLanguage: "en-US"
```

---

### Educational Content

Questi campi migliorano la categorizzazione per contenuti educativi in Schema.org.

#### `educationalLevel` (enum)

**Valori**: `'beginner'` | `'intermediate'` | `'advanced'`

**Quando usarlo**: Per tutorial e guide tecniche.

**Esempio**:
```yaml
educationalLevel: intermediate
```

---

#### `learningResourceType` (enum)

**Valori**:
- `'tutorial'` - Guida step-by-step
- `'guide'` - Guida generale
- `'analysis'` - Analisi approfondita
- `'review'` - Recensione/valutazione
- `'reference'` - Materiale di riferimento
- `'case-study'` - Studio di caso

**Esempio**:
```yaml
learningResourceType: tutorial
```

---

#### `prerequisites` (array)

**Descrizione**: Lista di conoscenze prerequisite per comprendere l'articolo.

**Best Practices**:
- Sii specifico ma conciso
- Ordina per importanza
- 2-5 prerequisiti max

**Esempio**:
```yaml
prerequisites:
  - "Conoscenza base di Python"
  - "Familiarità con LLM e embeddings"
  - "Esperienza con Docker"
```

---

### Citations & Sources

#### `citation` (array di URL)

**Descrizione**: URL di fonti citate nell'articolo.

**Quando usarlo**: Per paper, report, articoli referenziati.

**Esempio**:
```yaml
citation:
  - "https://arxiv.org/abs/2005.11401"
  - "https://www.mckinsey.com/ai-report-2024"
```

---

#### `isBasedOn` (array di URL)

**Descrizione**: URL di articoli/contenuti su cui si basa il lavoro.

**Differenza con citation**:
- `citation` = fonti esterne citate
- `isBasedOn` = lavori precedenti che hanno ispirato/fondato questo articolo

**Esempio**:
```yaml
isBasedOn:
  - "https://example.com/blog/rag-introduction"
  - "https://example.com/blog/vector-databases-explained"
```

---

### Media

#### `coverImage` (string)

**Descrizione**: Path all'immagine di copertina.

**Formato**: Path relativo a `/public/` oppure URL assoluto.

**Dimensioni consigliate**: 1200x630px (16:9)

**Esempio**:
```yaml
coverImage: "/images/blog/rag-production-cover.png"
```

**Nota**: Se omesso, viene generata un'immagine automatica dal titolo.

---

#### `video` (string URL)

**Descrizione**: URL di un video associato (YouTube, Vimeo, etc.).

**Quando usarlo**: Se hai un video companion dell'articolo.

**Esempio**:
```yaml
video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
```

---

### Community

#### `discussionUrl` (string URL)

**Descrizione**: Link alla discussione community (LinkedIn post, forum, etc.).

**Quando usarlo**: Se hai creato un thread di discussione per l'articolo.

**Esempio**:
```yaml
discussionUrl: "https://www.linkedin.com/posts/ireneburresi_rag-production-123456789"
```

---

### Relations

#### `relatedSlugs` (array)

**Descrizione**: Slug di articoli correlati da mostrare a fine articolo.

**Best Practices**:
- 2-4 articoli correlati
- Usa solo il base slug (senza `.en`)
- Verifica che gli slug esistano

**Esempio**:
```yaml
relatedSlugs:
  - "rag-architecture-scaling"
  - "vector-databases-comparison"
  - "llm-production-deployment"
```

---

#### `updatedAt` (string)

**Descrizione**: Data ultimo aggiornamento sostanziale (formato YYYY-MM-DD).

**Quando usarlo**: Quando aggiorni contenuto significativamente.

**Esempio**:
```yaml
publishedAt: "2024-06-15"
updatedAt: "2025-01-20"
```

---

## 📝 Esempi Completi

### Esempio 1: Tutorial Tecnico Completo

```yaml
---
title: "Implementare RAG in Production: Guida Step-by-Step"
summary: "Tutorial completo per portare un sistema RAG da prototipo a produzione, con architettura, monitoring e best practices."
description: "Scopri come implementare Retrieval Augmented Generation in produzione. Guida pratica con codice, architetture testate e metriche di successo."
abstract: "Questo tutorial presenta un approccio sistematico all'implementazione di sistemi RAG production-ready, con focus su architettura scalabile, monitoring, e ottimizzazione dei costi."
alternativeHeadline: "RAG in Production: Tutorial Completo"

author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "Lead AI Professional"
  url: "https://www.linkedin.com/in/ireneburresi/"

publishedAt: "2025-01-15"
updatedAt: "2025-01-20"
locale: it

pillar: engineering
subsection: "implementazioni"
tags: ["RAG", "Production", "Tutorial", "LLM", "Architecture"]
keywords: ["Retrieval Augmented Generation", "production deployment", "vector search", "LLM systems"]

coverImage: "/images/blog/rag-production.png"
video: "https://www.youtube.com/watch?v=example"

genre: "Tutorial"
educationalLevel: intermediate
learningResourceType: tutorial
prerequisites:
  - "Conoscenza base di Python e LLM"
  - "Familiarità con vector databases"
  - "Esperienza base con Docker e deployment"

citation:
  - "https://arxiv.org/abs/2005.11401"
  - "https://www.pinecone.io/learn/rag/"

isBasedOn:
  - "https://example.com/blog/rag-introduction"

discussionUrl: "https://www.linkedin.com/posts/ireneburresi_rag-123456"

relatedSlugs:
  - "rag-architecture-scaling"
  - "vector-databases-comparison"

featured: true
draft: false
---
```

---

### Esempio 2: Analisi Semplice

```yaml
---
title: "McKinsey AI Report 2024: Analisi e Insights"
summary: "Analisi del report McKinsey sull'AI: trend di mercato, ROI aziendale e previsioni per il 2025."

author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "Lead AI Professional"

publishedAt: "2025-01-10"
locale: it

pillar: business
subsection: "market-intelligence"
tags: ["McKinsey", "Market Research", "AI Strategy", "ROI"]

genre: "Analysis"
learningResourceType: analysis

citation:
  - "https://www.mckinsey.com/ai-report-2024"

featured: false
draft: false
---
```

---

### Esempio 3: Articolo Minimalista

```yaml
---
title: "Quick Tip: Ottimizzare Prompt per GPT-4"
summary: "Tre tecniche rapide per migliorare la qualità dei tuoi prompt con GPT-4."

author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "Lead AI Professional"

publishedAt: "2025-01-25"
locale: it

pillar: engineering
subsection: "best-practices"
tags: ["GPT-4", "Prompting", "LLM"]

educationalLevel: beginner
learningResourceType: guide

featured: false
draft: false
---
```

---

## ✨ Best Practices

### 1. **SEO Optimization**

- Sempre compilare `title` e `summary` con cura
- Usare `description` per snippet SERP ottimizzati
- `keywords` solo se diverse dai `tags`
- Title max 60 caratteri, summary 120-160

### 2. **Schema.org Enhancement**

- Usa `abstract` per paper e analisi tecniche
- `genre` aiuta Google a categorizzare il contenuto
- `citation` e `isBasedOn` migliorano l'autorevolezza
- `educationalLevel` e `learningResourceType` per contenuti didattici

### 3. **Content Discovery**

- `tags`: 3-6 tag bilanciati (generici + specifici)
- `relatedSlugs`: 2-4 articoli correlati contestuali
- `featured`: solo 1-2 articoli alla volta

### 4. **Multimedia**

- `coverImage`: sempre per articoli importanti
- `video`: solo se complementare al testo
- Dimensioni image: 1200x630px per OG optimal

### 5. **Community Engagement**

- `discussionUrl`: aggiungi dopo aver pubblicato su social
- Risponde a commenti e monitora engagement

### 6. **Manutenzione**

- `updatedAt`: aggiorna solo per modifiche sostanziali
- `draft: true` per work-in-progress
- Rivedi `featured` regolarmente

---

## 🔍 Troubleshooting

### Build Error: "Property 'X' does not exist"

**Soluzione**: Controlla che il campo sia definito in `src/content/config.ts`

### Immagine non Appare

**Soluzione**:
- Verifica il path in `coverImage`
- File deve essere in `/public/images/`
- Nome file case-sensitive

### Articolo non Appare nella Homepage

**Possibili cause**:
- `draft: true` impostato
- `locale` non corrisponde alla lingua del sito
- `featured: false` e ci sono già articoli featured

### Tag non Funzionano

**Soluzione**:
- `tags` deve essere array: `tags: ["Tag1", "Tag2"]`
- Non usare virgole dentro le stringhe
- Case-sensitive

---

## 📚 Riferimenti

- Schema.org BlogPosting: https://schema.org/BlogPosting
- Schema.org LearningResource: https://schema.org/LearningResource
- Google SEO Guidelines: https://developers.google.com/search/docs
- Open Graph Protocol: https://ogp.me/

---

**Ultimo aggiornamento**: 2025-12-29
**Versione**: 2.0
