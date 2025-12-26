# Guida ai Metadati degli Articoli del Blog

Documentazione completa dei metadati disponibili per gli articoli del blog, basata sullo schema definito in [`src/content/config.ts`](src/content/config.ts).

---

## Indice

1. [Metadati Obbligatori](#metadati-obbligatori)
2. [Metadati Opzionali](#metadati-opzionali)
3. [Pillar e Subsection](#pillar-e-subsection)
4. [Tag e Wikidata](#tag-e-wikidata)
5. [Generi degli Articoli](#generi-degli-articoli)
6. [Esempi Completi](#esempi-completi)

---

## Metadati Obbligatori

Questi campi sono **sempre necessari** in ogni articolo:

### `title`
- **Tipo**: `string`
- **Descrizione**: Titolo dell'articolo
- **Esempio**: `"AI nel 2027: scenario planning basato su traiettorie correnti"`

### `summary`
- **Tipo**: `string`
- **Descrizione**: Breve riassunto dell'articolo (usato per SEO e preview)
- **Best practice**: 120-160 caratteri per ottimizzazione SEO
- **Esempio**: `"Proiezioni evidence-based sull'evoluzione dell'AI nei prossimi tre anni con analisi di scenari alternativi."`

### `publishedAt`
- **Tipo**: `string` (formato: `YYYY-MM-DD`)
- **Descrizione**: Data di pubblicazione dell'articolo
- **Esempio**: `"2025-01-15"`

### `author`
- **Tipo**: `object`
- **Descrizione**: Informazioni sull'autore
- **Campi obbligatori**:
  - `name`: Nome completo dell'autore
  - `avatar`: Path dell'immagine avatar (es. `/images/avatar.png`)
  - `role`: Ruolo/titolo dell'autore
- **Esempio**:
  ```yaml
  author:
    name: "Irene Burresi"
    avatar: "/images/avatar.png"
    role: "Lead AI Professional"
  ```

### `pillar`
- **Tipo**: `enum`
- **Descrizione**: Categoria principale dell'articolo
- **Valori possibili**:
  - `engineering` - Ingegneria AI
  - `research` - Ricerca
  - `business` - Business e strategie
  - `governance` - Governance e regolamentazione
  - `methodology` - Metodologie
  - `synthesis` - Sintesi e review
- **Esempio**: `pillar: "engineering"`

### `subsection`
- **Tipo**: `string`
- **Descrizione**: Sottosezione all'interno del pillar
- **Esempio**: `subsection: "implementazioni"` o `subsection: "scenario-planning"`

### `tags`
- **Tipo**: `array[string]`
- **Descrizione**: Tag per categorizzazione e ricerca
- **Best practice**: 3-6 tag per articolo
- **Esempio**: `tags: ["RAG", "Production", "Architecture", "LLM"]`

### `featured`
- **Tipo**: `boolean`
- **Default**: `false`
- **Descrizione**: Se l'articolo deve essere evidenziato in homepage
- **Esempio**: `featured: true`

### `draft`
- **Tipo**: `boolean`
- **Default**: `false`
- **Descrizione**: Se l'articolo è una bozza (non pubblicato)
- **Esempio**: `draft: false`

---

## Metadati Opzionali

Questi campi migliorano SEO, organizzazione e funzionalità:

### SEO e Schema.org

#### `abstract`
- **Tipo**: `string` (opzionale)
- **Descrizione**: Abstract esteso per Schema.org, se diverso da `summary`
- **Quando usarlo**: Per articoli tecnici che necessitano di un riassunto più dettagliato per i motori di ricerca
- **Esempio**: `"Analisi approfondita delle previsioni 2026 di Stanford HAI, confrontate con i dati di fallimento dei progetti AI enterprise..."`

#### `updatedAt`
- **Tipo**: `string` (formato: `YYYY-MM-DD`)
- **Descrizione**: Data dell'ultimo aggiornamento significativo
- **Quando usarlo**: Quando si aggiorna un articolo esistente con nuove informazioni
- **Esempio**: `updatedAt: "2025-02-20"`

#### `inLanguage`
- **Tipo**: `string` (codice ISO 639-1)
- **Default**: `"it"` (dal sito)
- **Descrizione**: Override della lingua dell'articolo
- **Esempio**: `inLanguage: "en"` per articoli in inglese

#### `genre`
- **Tipo**: `string`
- **Descrizione**: Genere dell'articolo per Schema.org
- **Valori comuni**: Vedi sezione [Generi degli Articoli](#generi-degli-articoli)
- **Esempio**: `genre: "Analysis"`

#### `citation`
- **Tipo**: `array[string]` (URL validi)
- **Descrizione**: Array di URL alle fonti citate nell'articolo
- **Best practice**: Includere tutte le fonti principali
- **Esempio**:
  ```yaml
  citation:
    - "https://hai.stanford.edu/news/stanford-ai-experts-predict-what-will-happen-in-2026"
    - "https://projectnanda.org/"
    - "https://www.rand.org/pubs/research_reports/RRA2680-1.html"
  ```

#### `canonical`
- **Tipo**: `string` (URL valido)
- **Descrizione**: URL canonico se il contenuto è ripubblicato da altra fonte
- **Quando usarlo**: Solo per contenuti sindacati o ripubblicati
- **Esempio**: `canonical: "https://originale.com/articolo"`

### Immagini

#### `coverImage`
- **Tipo**: `string`
- **Descrizione**: Path dell'immagine di copertina
- **Best practice**: Risoluzione minima 1200x630px per social sharing
- **Esempio**: `coverImage: "/images/covers/ai-2026-anno-resa-conti.png"`

#### `ogImage`
- **Tipo**: `string`
- **Descrizione**: Immagine specifica per Open Graph (se diversa da `coverImage`)
- **Quando usarlo**: Quando serve un'immagine ottimizzata per social media
- **Esempio**: `ogImage: "/images/og/custom-share-image.png"`

### Organizzazione Multi-Pillar

#### `secondaryPillars`
- **Tipo**: `array[enum]`
- **Descrizione**: Pillar secondari per articoli trasversali
- **Valori possibili**: Stesso enum di `pillar`
- **Esempio**: `secondaryPillars: ["research", "business"]`

### Articoli Correlati

#### `relatedSlugs`
- **Tipo**: `array[string]`
- **Descrizione**: Array di slug di articoli correlati
- **Best practice**: 2-4 articoli correlati
- **Esempio**: `relatedSlugs: ["mckinsey-ai-report-2024", "q4-2024-research-review"]`

### Deprecato

#### `readingTime`
- **Stato**: DEPRECATO
- **Descrizione**: Tempo di lettura (ora calcolato automaticamente)
- **Nota**: Non usare nei nuovi articoli

---

## Pillar e Subsection

### Pillar Disponibili

| Pillar | Slug | Descrizione | Esempi Subsection |
|--------|------|-------------|-------------------|
| **Engineering** | `engineering` | Architetture, implementazioni, best practices tecniche | `implementazioni`, `architetture`, `tools`, `performance` |
| **Research** | `research` | Ricerca scientifica, paper review, state-of-the-art | `paper-review`, `benchmarks`, `metodologia-ricerca` |
| **Business** | `business` | ROI, metriche, casi d'uso aziendali, strategie | `roi-metriche`, `casi-studio`, `market-analysis` |
| **Governance** | `governance` | Regolamentazione, compliance, etica, policy | `regolamentazione`, `compliance`, `etica`, `privacy` |
| **Methodology** | `methodology` | Metodologie di lavoro, processi, framework | `workflow`, `best-practices`, `team-organization` |
| **Synthesis** | `synthesis` | Review trimestrali, analisi di trend, scenario planning | `review-trimestrali`, `scenario-planning`, `trend-analysis` |

### Come Scegliere Pillar e Subsection

1. **Pillar primario**: Categoria principale che descrive meglio l'articolo
2. **Subsection**: Sottocategoria specifica all'interno del pillar
3. **Secondary Pillars**: Aggiungi se l'articolo è rilevante per più categorie

**Esempio**:
```yaml
pillar: "synthesis"
subsection: "review-trimestrali"
secondaryPillars: ["research", "business"]
```

---

## Tag e Wikidata

### Tag Mappati a Wikidata

I tag disponibili sono mappati a entità Wikidata in [`src/consts/schema.ts`](src/consts/schema.ts) per migliorare la semantica SEO.

#### AI & Machine Learning
- `AI`, `Artificial Intelligence`
- `Machine Learning`, `Deep Learning`
- `LLM`, `Large Language Models`
- `Generative AI`, `GenAI`
- `NLP`, `Natural Language Processing`
- `RAG`, `Retrieval-Augmented Generation`
- `Computer Vision`
- `Neural Networks`
- `Transformers`

#### Frameworks & Tools
- `LangChain`, `LlamaIndex`
- `OpenAI`, `Anthropic`
- `GPT`, `Claude`
- `Python`, `TypeScript`

#### Business & Enterprise
- `Enterprise AI`
- `ROI`, `KPI`, `Metrics`
- `Market Analysis`
- `TCO` (Total Cost of Ownership)

#### Governance & Ethics
- `AI Governance`, `AI Ethics`
- `EU AI Act`, `Compliance`, `GDPR`
- `Bias Detection`, `AI Safety`

#### Research & Academia
- `Stanford HAI`, `MIT`
- `Research`, `Scientific Research`

#### Infrastructure
- `Cloud Computing`
- `AWS`, `Azure`, `GCP`
- `Infrastructure`, `Data Center`, `GPU`

#### Security
- `Security`, `Cybersecurity`
- `Prompt Injection`

#### Regions & Geopolitics
- `Europe`, `USA`, `China`
- `AI Sovereignty`, `Geopolitics`
- `GAIA-X`

#### Productivity & Tools
- `Productivity`, `Deep Work`
- `VSCode`, `Cursor`, `IDE`
- `Developer Tools`

#### Architecture
- `Architecture`, `Software Architecture`
- `Microservices`, `API`
- `Vector Database`, `Embeddings`

#### Multimodal
- `Multimodal`, `Vision`, `Audio`, `Text`

### Best Practice per i Tag

1. **Numero**: Usa 3-6 tag per articolo
2. **Specificità**: Preferisci tag specifici a quelli generici
3. **Coerenza**: Usa i tag mappati quando possibile per beneficiare del linking Wikidata
4. **Mix**: Combina tag tecnici, di dominio e di contesto

**Esempio**:
```yaml
tags: ["RAG", "Production", "Architecture", "LLM", "Python"]
```

---

## Generi degli Articoli

Il campo `genre` categorizza il tipo di contenuto per Schema.org:

### Generi Consigliati

| Genere | Quando Usarlo | Esempio |
|--------|---------------|---------|
| **Analysis** | Analisi approfondite, critiche, comparazioni | Analisi del report McKinsey |
| **Tutorial** | Guide step-by-step, how-to | "Come implementare RAG" |
| **Review** | Recensioni di paper, tool, framework | Review trimestrale ricerca AI |
| **Case Study** | Casi d'uso reali, implementazioni specifiche | Implementazione RAG in produzione |
| **Opinion** | Editoriali, opinioni personali | Riflessioni su AI sovereignty |
| **Research** | Articoli basati su ricerca originale | Esperimenti su chunking strategies |
| **News** | Notizie, aggiornamenti rapidi | Annunci di nuovi modelli |
| **Comparison** | Confronti tecnici dettagliati | LangChain vs LlamaIndex |
| **Guide** | Guide comprehensive, reference | Guida completa a vector databases |

**Esempio**:
```yaml
genre: "Analysis"  # Per un'analisi critica di trend
genre: "Tutorial"  # Per una guida pratica
genre: "Review"    # Per una recensione di ricerca
```

---

## Esempi Completi

### Esempio 1: Articolo Tecnico (Engineering)

```yaml
---
title: "Deployment di un sistema RAG in produzione: 12 decisioni architetturali critiche"
summary: "Analisi approfondita delle scelte architetturali fondamentali per implementare un sistema RAG scalabile e performante in ambiente di produzione."
abstract: "Guida tecnica completa alle decisioni architetturali per sistemi RAG enterprise, dalla scelta del vector database alla strategia di chunking, con benchmark e best practices basate su implementazioni reali."
publishedAt: "2025-01-15"
updatedAt: "2025-02-01"
author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "AI Engineer"
inLanguage: "it"
genre: "Guide"
citation:
  - "https://www.pinecone.io/learn/rag-best-practices/"
  - "https://weaviate.io/blog/rag-evaluation"
pillar: "engineering"
subsection: "implementazioni"
tags: ["RAG", "Production", "Architecture", "Vector Database", "LLM"]
featured: true
draft: false
secondaryPillars: ["business"]
coverImage: "/images/covers/rag-production.png"
relatedSlugs: ["rag-architecture-scaling", "langchain-llamaindex-comparison"]
---
```

### Esempio 2: Articolo di Sintesi/Review

```yaml
---
title: "Da evangelismo a valutazione: cosa aspettarsi dall'AI nel 2026 secondo Stanford HAI"
summary: "Analisi critica delle previsioni di 9 esperti Stanford. Cosa è credibile, cosa è hype, cosa manca dalla prospettiva europea."
abstract: "Analisi approfondita delle previsioni 2026 di Stanford HAI, confrontate con i dati di fallimento dei progetti AI enterprise (42% di abbandono secondo S&P Global, 95% senza ROI misurabile secondo MIT NANDA). Include valutazione del track record delle previsioni passate e implicazioni per decisori aziendali."
publishedAt: "2025-12-20"
author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "Lead AI Professional"
inLanguage: "it"
genre: "Analysis"
citation:
  - "https://hai.stanford.edu/news/stanford-ai-experts-predict-what-will-happen-in-2026"
  - "https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/"
  - "https://projectnanda.org/"
  - "https://www.rand.org/pubs/research_reports/RRA2680-1.html"
pillar: "synthesis"
subsection: "review-trimestrali"
tags: ["Stanford HAI", "AI 2026", "Enterprise AI", "Market Analysis"]
featured: false
draft: false
secondaryPillars: ["research", "business"]
coverImage: "/images/covers/ai-2026-anno-resa-conti.png"
relatedSlugs: ["mckinsey-ai-report-2024", "q4-2024-research-review", "q1-2025-ai-landscape"]
---
```

### Esempio 3: Articolo Minimal (Solo Campi Obbligatori)

```yaml
---
title: "Introduzione al prompt engineering"
summary: "Guida pratica alle tecniche fondamentali di prompt engineering per LLM."
publishedAt: "2025-01-20"
author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "AI Engineer"
pillar: "methodology"
subsection: "best-practices"
tags: ["Prompt Engineering", "LLM", "Best Practices"]
featured: false
draft: false
---
```

### Esempio 4: Articolo Governance/Compliance

```yaml
---
title: "EU AI Act: guida pratica alla compliance per sistemi RAG enterprise"
summary: "Analisi operativa dei requisiti EU AI Act per implementazioni RAG, con checklist e timeline di adeguamento."
publishedAt: "2025-01-25"
updatedAt: "2025-02-10"
author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "Lead AI Professional"
inLanguage: "it"
genre: "Guide"
citation:
  - "https://artificialintelligenceact.eu/"
  - "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52021PC0206"
pillar: "governance"
subsection: "compliance"
tags: ["EU AI Act", "Compliance", "GDPR", "RAG", "Enterprise AI"]
featured: true
draft: false
secondaryPillars: ["engineering", "business"]
coverImage: "/images/covers/eu-ai-act-compliance.png"
relatedSlugs: ["ai-governance-framework", "bias-detection-production"]
---
```

### Esempio 5: Articolo Multilingua (Inglese)

```yaml
---
title: "Scaling RAG Systems: Architectural Patterns for Production"
summary: "Technical deep-dive into architectural patterns for scaling RAG systems in production environments."
publishedAt: "2025-02-01"
author:
  name: "Irene Burresi"
  avatar: "/images/avatar.png"
  role: "AI Engineer"
inLanguage: "en"
genre: "Tutorial"
pillar: "engineering"
subsection: "architetture"
tags: ["RAG", "Scaling", "Architecture", "Production"]
featured: false
draft: false
---
```

---

## Checklist Pre-Pubblicazione

Prima di pubblicare un articolo, verifica:

### Obbligatorio
- [ ] `title` presente e descrittivo
- [ ] `summary` presente (120-160 caratteri ideali)
- [ ] `publishedAt` con data corretta (formato YYYY-MM-DD)
- [ ] `author` con name, avatar, role
- [ ] `pillar` scelto correttamente
- [ ] `subsection` specifica e coerente
- [ ] `tags` array con 3-6 tag rilevanti
- [ ] `featured` impostato (true/false)
- [ ] `draft` impostato (false per pubblicare)

### Raccomandato per SEO
- [ ] `genre` specificato
- [ ] `coverImage` presente e ottimizzata
- [ ] `citation` con tutte le fonti principali
- [ ] `abstract` se l'articolo è tecnico/complesso
- [ ] `relatedSlugs` con 2-4 articoli correlati
- [ ] `secondaryPillars` se applicabile

### Best Practice
- [ ] Tag scelti dalla lista mappata Wikidata quando possibile
- [ ] Immagini in formato ottimizzato (WebP/PNG, min 1200x630)
- [ ] Slug del file coerente con il title
- [ ] Metadata coerenti con il contenuto effettivo

---

## Riferimenti

- **Schema Zod**: [`src/content/config.ts`](src/content/config.ts)
- **Costanti Schema.org**: [`src/consts/schema.ts`](src/consts/schema.ts)
- **Esempi articoli**:
  - Engineering: [`src/content/blog/rag-production-architecture.mdx`](src/content/blog/rag-production-architecture.mdx)
  - Synthesis: [`src/content/blog/ai-2026-anno-resa-conti.mdx`](src/content/blog/ai-2026-anno-resa-conti.mdx)

---

## Note Tecniche

### Validazione
Lo schema Zod in `config.ts` valida automaticamente i metadati al build. Errori di validazione bloccheranno la build.

### Calcolo Automatico
- **Reading Time**: Calcolato automaticamente dal contenuto (non specificare manualmente)
- **Date**: Usare sempre formato ISO (YYYY-MM-DD)
- **URL**: Tutti gli URL devono essere validi (schema li valida)

### Estensibilità
Per aggiungere nuovi metadati, modificare lo schema in [`src/content/config.ts`](src/content/config.ts) e aggiornare questa guida.
