# Guida completa (Engineering‑grade) per indicizzazione Google + “LLM/GEO” su un blog **Astro**

> Obiettivo: rendere il tuo blog **facile da scoprire**, **facile da indicizzare**, **facile da capire** e **facile da citare** sia da Google (crawler deterministici) sia da sistemi AI/LLM (agent probabilistici, RAG, generative search).

Astro parte avvantaggiato: *HTML statico pulito (Zero‑JS by default)* → meno rumore per crawler e tokenizer.

---

## Indice

1. [Principi di base: SEO vs GEO/LLM](#principi-di-base-seo-vs-geollm)
2. [Fondamenta tecniche: crawl, index, canonical, status code](#fondamenta-tecniche-crawl-index-canonical-status-code)
3. [Astro setup “SEO-first”](#astro-setup-seo-first)
4. [Discovery: sitemap, robots.txt, meta robots, pagination](#discovery-sitemap-robotstxt-meta-robots-pagination)
5. [Dati strutturati: schema.org (JSON-LD) con **schema-dts**](#dati-strutturati-schemaorg-json-ld-con-schema-dts)
6. [LLM-friendly: llms.txt, ai.txt, feed completi, versioni “plain”](#llm-friendly-llmstxt-aitxt-feed-completi-versioni-plain)
7. [Performance e “trust signals” invisibili](#performance-e-trust-signals-invisibili)
8. [Licensing & diritti machine-readable: TDM + **RSL**](#licensing--diritti-machine-readable-tdm--rsl)
9. [Architettura contenuti: topical authority, internal linking, hub](#architettura-contenuti-topical-authority-internal-linking-hub)
10. [Multilingua e internazionalizzazione](#multilingua-e-internazionalizzazione)
11. [Osservabilità, QA e CI: controlli automatici](#osservabilità-qa-e-ci-controlli-automatici)
12. [Blueprint: struttura file e componenti riusabili](#blueprint-struttura-file-e-componenti-riusabili)
13. [Checklist “Definition of Done”](#checklist-definition-of-done)

---

## Principi di base: SEO vs GEO/LLM

### SEO classica (Google)

* **Discovery**: trovare gli URL (link interni/esterni, sitemap, feed)
* **Crawl**: scaricare HTML/asset
* **Index**: capire contenuto + canonicalizzazione
* **Rank**: qualità + pertinenza + segnali tecnici + reputazione

### GEO / “LLM Optimization”

Gli LLM non “indicizzano” solo per keyword: ragionano su **entità, relazioni e chunk semantici**.

* **Token efficiency**: HTML pulito, heading corretti, poco rumore
* **Struttura citabile**: paragrafi segmentati, definizioni, esempi
* **Contesto dichiarato**: `llms.txt`, feed full-text, schema.org ricco
* **Diritti chiari**: licensing machine-readable (RSL / TDM)

---

## Fondamenta tecniche: crawl, index, canonical, status code

### 1) Status code e contenuto renderizzato

* Pagine indicizzabili devono rispondere **200**.
* Contenuto deve essere presente in HTML server-side (SSG/SSR). Evita pagine “vuote” che si popolano solo client-side.
* Contenuti rimossi:

  * **404** se non esiste più
  * **410** se vuoi segnalare rimozione permanente

### 2) HTTPS + redirect policy

* Unifica:

  * `https://` sempre
  * `www` vs `non-www` (scegline uno)
  * trailing slash sì/no (scegline uno)
* Evita redirect chain (301 → 301 → 200). Ogni salto è frizione per crawler.

### 3) Canonicalizzazione anti-duplicati

Obiettivo: **1 URL canonico per 1 contenuto**.

* Inserisci sempre:

  * `<link rel="canonical" href="...">`
  * `og:url` coerente
* Gestisci duplicati tipici:

  * tag/paginazione
  * query params (`?utm_*`, `?ref=`)
  * varianti lingua

### 4) URL design

* Stabili, leggibili, semanticamente densi
* Evita cambiare slug; se lo fai: 301 permanente

---

## Astro setup “SEO-first”

### 1) Imposta `site` (fondamentale)

Serve per canonical, sitemap, feed e costruzione URL assoluti.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tuodominio.com',
  integrations: [sitemap()],
});
```

### 2) Preferisci SSG per i post (quando possibile)

* SSG = HTML statico: perfetto per crawl e performance.
* SSR va bene, ma assicurati che:

  * HTML contenga il contenuto completo
  * cache/CDN ben configurate

### 3) Content Collections (consigliato)

* Normalizza frontmatter (title, description, pubDate, modDate, tags, canonical, draft).
* Ti permette di generare sitemap, rss e schema in modo consistente.

---

## Discovery: sitemap, robots.txt, meta robots, pagination

### 1) Sitemap (XML)

**Scopo**: dare una lista affidabile degli URL indicizzabili.

* Includi solo URL che vuoi indicizzare.
* Includi `lastmod` realistico.
* Se hai molto contenuto: sitemap index.

**Con Astro SSG**: `@astrojs/sitemap`.

### 2) robots.txt (accesso crawl)

**Scopo**: dire ai bot cosa possono crawlare.

Esempio pragmatico:

```txt
User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /search
Allow: /

Sitemap: https://tuodominio.com/sitemap-index.xml
```

#### Strategia “AI bots” (scelta di prodotto)

Decidi cosa vuoi:

* **Massima visibilità** (anche in tool/assistant):

  * Allow per bot AI noti (es. GPTBot/ClaudeBot) e per i bot “search”.

* **Selettivo** (visibilità in search/quote ma non training):

  * Nota: il robots standard non esprime bene “training vs RAG”. Per questo serve un layer di **licensing** (vedi RSL).

* **Blocca dataset training legacy**:

  * molti sistemi usano dataset tipo Common Crawl → tipicamente user agent `CCBot`.

Esempio:

```txt
User-agent: CCBot
Disallow: /

User-agent: *
Allow: /
```

> Importante: robots è *access control “gentile”*. Non è enforcement legale/tecnico.

### 3) Meta robots / X-Robots-Tag (index policy)

Per dire “questa pagina non deve finire in indice”.

* Pagine da **noindex** tipiche:

  * risultati ricerca interna
  * pagine tag “thin”
  * pagine paginazione profonde
  * staging

Esempio:

```html
<meta name="robots" content="noindex,follow">
```

### 4) Pagination e tag pages

* Pagina 1 di una lista: spesso indicizzabile.
* Pagine 2..N: valuta `noindex,follow` se sono duplicative.
* Tag pages: indicizza solo quelle “curate” (intro + selezione, non solo elenco).

---

## Dati strutturati: schema.org (JSON-LD) con schema-dts

### Perché è così importante

* Google: capisce tipo contenuto, autore, publisher, breadcrumb.
* LLM: struttura entità/relazioni → migliore grounding, citazione, disambiguazione.

### Regola d’oro: usa un **grafo unificato** (`@graph`)

Invece di script separati, crea un solo JSON-LD con:

* `Person` (identità autore)
* `WebSite`
* `WebPage`
* `TechArticle`/`Article`
* `CollectionPage + ItemList` (per listing)

### 1) Type safety con `schema-dts`

Evita errori di sintassi e campi sbagliati.

```ts
import type { WithContext, TechArticle } from 'schema-dts';

const schema: WithContext<TechArticle> = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: title,
  // ...
};
```

### 2) Person “definitivo” (disambiguazione + E‑E‑A‑T)

Crea un file riusabile.

```ts
// src/lib/schema-person.ts
import type { Person } from 'schema-dts';

export const myPersonSchema: Person = {
  "@type": "Person",
  "@id": "https://tuodominio.com/#identity",
  name: "Tuo Nome",
  jobTitle: "AI Engineer",
  url: "https://tuodominio.com",
  image: {
    "@type": "ImageObject",
    url: "https://tuodominio.com/assets/profile.jpg",
    caption: "Tuo Nome"
  },
  sameAs: [
    "https://github.com/tuouser",
    "https://linkedin.com/in/tuouser",
    "https://orcid.org/0000-0000-0000-0000"
  ],
  knowsAbout: [
    { "@type": "Thing", name: "Artificial Intelligence", sameAs: "https://www.wikidata.org/wiki/Q11660" },
    { "@type": "Thing", name: "Large Language Models", sameAs: "https://www.wikidata.org/wiki/Q115305900" }
  ]
};
```

**Note pratiche**

* `@id` deve essere stabile: è la “chiave primaria” del tuo grafo.
* `sameAs` riduce ambiguità (omonimie).
* `knowsAbout` + `sameAs` su Wikidata aiuta l’anchoring semantico.

### 3) WebSite (sitelinks search box)

```ts
export const websiteSchema = {
  "@type": "WebSite",
  "@id": "https://tuodominio.com/#website",
  url: "https://tuodominio.com",
  name: "Nome Blog",
  publisher: { "@id": "https://tuodominio.com/#identity" },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://tuodominio.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};
```

### 4) Post: `TechArticle` (meglio di BlogPosting per contenuti tecnici)

```ts
import type { TechArticle, Graph } from 'schema-dts';
import { myPersonSchema } from './schema-person';

const articleSchema: TechArticle = {
  "@type": "TechArticle",
  "@id": `${canonicalURL}#article`,
  isPartOf: { "@id": "https://tuodominio.com/#website" },
  headline: title,
  description,
  image: [heroImageUrl],
  datePublished: pubDate.toISOString(),
  dateModified: (modDate ?? pubDate).toISOString(),
  author: { "@id": "https://tuodominio.com/#identity" },
  publisher: { "@id": "https://tuodominio.com/#identity" },
  proficiencyLevel: "Expert",
  dependencies: "Python 3.12, FastAPI, OpenSearch",
  keywords: tags.join(", "),
  articleSection: "AI Engineering",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", ".intro-text"]
  },
  citation: [
    "https://arxiv.org/...",
    "https://rslstandard.org/rsl"
  ]
};

const graph: Graph = {
  "@context": "https://schema.org",
  "@graph": [myPersonSchema, websiteSchema, articleSchema]
};
```

Nel layout Astro:

```astro
---
const { graph } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify(graph)} />
```

### 5) Sezioni / Tag / Listing: `CollectionPage` + `ItemList`

```ts
import type { CollectionPage, ItemList, Graph } from 'schema-dts';

const itemList: ItemList = {
  "@type": "ItemList",
  itemListElement: posts.map((post, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: new URL(`/blog/${post.slug}/`, Astro.site).toString(),
    name: post.data.title
  }))
};

const collectionSchema: CollectionPage = {
  "@type": "CollectionPage",
  "@id": `${Astro.url.href}#webpage`,
  url: Astro.url.href,
  name: `Articoli su ${tag}`,
  description: `Raccolta di guide tecniche e analisi su ${tag}`,
  mainEntity: itemList,
  author: { "@id": "https://tuodominio.com/#identity" }
};

const graph: Graph = {
  "@context": "https://schema.org",
  "@graph": [myPersonSchema, websiteSchema, collectionSchema]
};
```

### 6) “Power‑ups” semantici

* `about` vs `mentions`

  * `about`: tema principale
  * `mentions`: tecnologie citate marginalmente
* Serie di articoli: `hasPart` + navigazione prev/next
* `BreadcrumbList` per gerarchia (home → categoria → post)

---

## LLM-friendly: llms.txt, ai.txt, feed completi, versioni “plain”

### 1) `llms.txt` (contesto ad alta densità)

**Scopo**: dare agli agenti un “indice semantico” in Markdown.

`/public/llms.txt` (Markdown pulito, zero marketing):

````md
# Nome Blog
> Blog tecnico su AI Engineering, FastAPI, search, e architetture RAG.

## Cosa trovi qui
- Guide operative (step-by-step)
- Note di architettura e pattern
- Benchmark e valutazioni

## Pagine chiave
- /about/
- /blog/
- /tags/rag/
- /tags/opensearch/

## Post fondamentali
- /blog/hybrid-search-opensearch/
- /blog/rag-evaluation-framework/

## Convenzioni
- Lingua: it-IT
- Snippet: includono sempre il linguaggio (```python)
- Tutti gli esempi sono “production-oriented”
````

### 2) `ai.txt` (opzionale)

Se lo usi, trattalo come “readme per agenti”: ridondante con `llms.txt` ma utile se vuoi separare contesto vs policy.

### 3) RSS/Atom **full-text**

Per ingestione e aggiornamenti continui.

* Non limitarti allo snippet: includi l’articolo completo (`content:encoded`).

Con Astro:

* usa `@astrojs/rss` e passa l’HTML del post come `content`.

### 4) Versioni “plain” dei post (fortemente consigliato)

Gli agenti amano contenuti puliti:

* `/blog/slug.md` o `/blog/slug.txt`
* o “print view” senza sidebar e widget

### 5) DOM hygiene / token efficiency

* Evita “div soup” e wrapper inutili.
* Mantieni alto il rapporto testo/codice.
* Usa HTML5 semantico: `<main>`, `<article>`, `<section>`, `<aside>`, `<code>`.

### 6) Struttura “citabile”

* H1 unico
* H2/H3 informativi
* definizioni esplicite
* paragrafi segmentati (aiuta embedding e retrieval)
* code block sempre con linguaggio

---

## Performance e “trust signals” invisibili

### 1) Core Web Vitals (e performance generale)

* Astro Islands: idrata solo dove serve.

  * `client:idle`, `client:visible` per ridurre lavoro iniziale.
* Immagini:

  * usa `<Image />` di Astro
  * dimensioni esplicite (riduce CLS)
  * formati moderni (WebP/AVIF)
* Font:

  * subset
  * preload con cautela
  * `font-display: swap`
* Cache:

  * asset fingerprinted con `Cache-Control: public, max-age=31536000, immutable`

### 2) Security headers (segnale forte di igiene tecnica)

Da configurare su CDN/host (Netlify/Vercel/Cloudflare/Nginx):

* `Strict-Transport-Security` (HSTS)
* `Content-Security-Policy` (CSP)
* `X-Content-Type-Options: nosniff`
* `Referrer-Policy: strict-origin-when-cross-origin`
* `Permissions-Policy` (riduci superfici inutili)

### 3) Qualità markup

* Valida HTML (errori di nesting/tag chiusi male confondono i parser).

---

## Licensing & diritti machine-readable: TDM + RSL

Questa parte è “nuova frontiera”: non riguarda il ranking diretto oggi, ma incide su **compliance**, **discovery AI** e (probabilmente) su future pipeline di ingestion.

### 1) Licensing umano: pagina licenza + rel=license

* Crea `/licenza/` con testo chiaro.
* Aggiungi nell’`<head>`:

```html
<link rel="license" href="https://tuodominio.com/licenza/">
```

### 2) TDM reservation (se vuoi riservare il text/data mining)

```html
<meta name="tdm-reservation" content="1">
```

> Nota: è un segnale/policy, non enforcement tecnico.

### 3) Really Simple Licensing (RSL)

RSL è uno standard XML per dichiarare **permessi/proibizioni** (es. training vs RAG) e termini di pagamento/attribuzione.

#### A) Crea un file `public/rsl.xml`

Esempio: permetti search + RAG (`ai-input`) e indicizzazione AI (`ai-index`), ma vieti training (`ai-train`). Richiedi attribuzione (es. CC BY).

```xml
<rsl xmlns="https://rslstandard.org/rsl">
  <content url="/">
    <license>
      <permits type="usage">search ai-input ai-index</permits>
      <prohibits type="usage">ai-train</prohibits>
      <payment type="attribution">
        <standard>https://creativecommons.org/licenses/by/4.0/</standard>
      </payment>
      <legal type="warranty">ownership authority</legal>
    </license>
  </content>
</rsl>
```

#### B) Associazione (discovery) della licenza RSL

RSL può essere associata via:

* `robots.txt` (direttiva globale **License:**)
* header HTTP `Link: <...>; rel="license"; type="application/rsl+xml"`
* HTML `<link rel="license" type="application/rsl+xml" href="..." />`
* RSS module `rsl:content` dentro gli item

##### robots.txt (global License)

> La direttiva **License** è globale (come Sitemap): non metterla dentro un gruppo `User-agent`.

```txt
License: https://tuodominio.com/rsl.xml

User-agent: *
Allow: /

Sitemap: https://tuodominio.com/sitemap-index.xml
```

##### HTML `<head>` (opzionale)

```html
<link rel="license" type="application/rsl+xml" href="/rsl.xml" />
```

##### RSS con RSL (se vuoi che la licenza “viaggi” col contenuto)

```xml
<rss xmlns:rsl="https://rslstandard.org/rsl" version="2.0">
  <channel>
    <item>
      <title>...</title>
      <link>https://tuodominio.com/blog/slug/</link>
      <rsl:content url="https://tuodominio.com/blog/slug/">
        <rsl:license>
          <rsl:permits type="usage">search ai-input ai-index</rsl:permits>
          <rsl:prohibits type="usage">ai-train</rsl:prohibits>
        </rsl:license>
      </rsl:content>
    </item>
  </channel>
</rss>
```

---

## Architettura contenuti: topical authority, internal linking, hub

### 1) Topic cluster (hub & spoke)

* Crea pagine “hub” (es. `/tags/rag/` ben curate) che:

  * introducono l’argomento
  * definiscono i concetti
  * linkano ai post “spoke” più specifici

### 2) Anchor text descrittivo

Evita “clicca qui”. Usa anchor che descrivono la relazione semantica.

### 3) Internal linking sistematico

Per ogni post:

* link ai prerequisiti
* link ai follow‑up
* link alle definizioni (glossario)

### 4) Evita thin content “automatico”

* Tag page con solo elenco = spesso low value.
* Meglio poche tag page “premium” con testo introduttivo.

---

## Multilingua e internazionalizzazione

Se pubblichi in più lingue:

* `hreflang` corretto
* URL per lingua stabili (es. `/it/...`, `/en/...`)
* canonical per lingua
* sitemap separata o con alternates
* `lang="it"` sull’html

---

## Osservabilità, QA e CI: controlli automatici

### Strumenti “invisibili” ma ad alto impatto

* **Lighthouse** (SEO + Accessibility)
* **Rich results test** per JSON-LD
* **Validator HTML**
* **Security headers** check (es. securityheaders.com)
* Link checker (broken links)

### Log & Search Console

* controlla errori crawl, redirect chain, soft 404
* monitora pagine escluse e motivazioni

### CI consigliata

Esegui a ogni build:

* build Astro
* link check
* lint JSON-LD (type safety già aiuta)
* generazione sitemap e feed

---

## Blueprint: struttura file e componenti riusabili

### Struttura root (pubblica)

```txt
/public
  robots.txt
  sitemap.xml            (o generato)
  rss.xml
  llms.txt
  ai.txt                 (opzionale)
  rsl.xml
```

### Struttura src (riuso)

```txt
/src
  /layouts
    BaseLayout.astro
    BlogPost.astro
  /components
    BaseHead.astro
  /lib
    schema-person.ts
    schema-website.ts
    schema-builders.ts
  /pages
    rss.xml.ts
    (eventuali endpoints)
```

### Pattern: “builder” per metadata

Crea una funzione che produce:

* meta tag (title, description, canonical)
* Open Graph
* JSON-LD graph
  Così eviti divergenze tra pagine.

---

## Checklist “Definition of Done”

### A. Crawl & Index

* [ ] HTTPS + redirect policy unificata
* [ ] 200 per pagine indicizzabili
* [ ] 404/410 per contenuti rimossi
* [ ] canonical coerenti

### B. Discovery

* [ ] sitemap con soli URL indicizzabili + lastmod
* [ ] robots.txt pulito + sitemap link
* [ ] noindex per pagine utility/thin

### C. Structured data

* [ ] JSON-LD (typed) su post + pagine listing + website + person
* [ ] `@graph` unificato, `@id` stabili
* [ ] `sameAs`, `knowsAbout` (se utile)

### D. LLM/GEO

* [ ] `llms.txt` denso e pulito
* [ ] RSS full-text
* [ ] versioni “plain” (md/txt o print view)
* [ ] HTML semantico + heading corretti

### E. Performance & Trust

* [ ] immagini ottimizzate e dimensionate
* [ ] islands solo dove serve (client:idle/visible)
* [ ] security headers (HSTS, CSP, nosniff, referrer-policy)

### F. Licensing

* [ ] pagina licenza + rel=license
* [ ] (opz) tdm-reservation
* [ ] (opz) RSL: rsl.xml + robots License

### G. QA/Monitoring

* [ ] Lighthouse alto
* [ ] validazione HTML
* [ ] test JSON-LD
* [ ] monitor Search Console

---

## Appendice: esempi pronti da copiare

### robots.txt completo (con RSL)

```txt
License: https://tuodominio.com/rsl.xml

User-agent: CCBot
Disallow: /

User-agent: *
Allow: /

Sitemap: https://tuodominio.com/sitemap-index.xml
```

### `<head>` minimo per un post

```html
<link rel="canonical" href="https://tuodominio.com/blog/slug/">
<meta name="description" content="...">
<link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml">
<link rel="license" type="application/rsl+xml" href="/rsl.xml">
```

### llms.txt minimalista

```md
# Nome Blog
> Blog tecnico su AI Engineering e sistemi di ricerca.

## Link principali
- /about/
- /blog/
- /tags/

## Post chiave
- /blog/hybrid-search-opensearch/
- /blog/rag-evaluation-framework/
```

---

## Discoverability massima: profilo “default” (scelte consigliate)

Se vuoi **massima discoverability**, la strategia è: *molti canali di scoperta + contenuto facilmente parsabile + niente barriere inutili*.

### Impostazioni “max discoverability”

* **Non bloccare crawler** (né search né AI). Evita `Disallow: /` e usa `noindex` solo dove strettamente necessario.
* Pubblica **più superfici di discovery** in parallelo:

  * sitemap XML (index + sitemaps per tipo)
  * RSS/Atom full-text (+ eventualmente JSON Feed)
  * internal linking forte (hub & spoke)
  * Open Graph/Twitter card (per share e re-discovery)
  * `opensearch.xml` (integrazione search browser)
  * `llms.txt` (indice per agent)
* Mantieni HTML **pulito, semantico e stabile** (URL permanenti, H1/H2 coerenti, no DOM “ballerino”).

> Nota di prodotto: “massima discoverability” può aumentare anche l’uso del contenuto da terzi (incl. ingestion AI). Se vuoi controllo più stretto, sposta la policy su **licensing** (RSL) invece di “bloccare”.

---

## Meta tag & preview social (Open Graph / Twitter) — indispensabili per discovery indiretta

Quando un articolo viene condiviso su social/chat/newsletter, la preview influenza click → link → segnali → nuove scoperte.

### 1) Meta tag minimi per ogni pagina

* `<title>` unico
* `<meta name="description">` unico (non “boilerplate”)
* `<link rel="canonical">`
* `<meta name="robots">` coerente

### 2) Robots avanzato per snippet/preview ricchi

Per massimizzare la resa in SERP (quando appropriato):

```html
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
<meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
```

### 3) Open Graph (OG)

```html
<meta property="og:type" content="article">
<meta property="og:site_name" content="Nome Blog">
<meta property="og:title" content="Titolo Post">
<meta property="og:description" content="Descrizione fedele e densa">
<meta property="og:url" content="https://tuodominio.com/blog/slug/">
<meta property="og:image" content="https://tuodominio.com/og/slug.png">
<meta property="og:image:alt" content="Descrizione accessibile dell'immagine">
```

### 4) Twitter Card

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Titolo Post">
<meta name="twitter:description" content="Descrizione fedele e densa">
<meta name="twitter:image" content="https://tuodominio.com/og/slug.png">
```

### 5) OG images programmatiche (best practice Astro)

* Genera immagini OG dinamiche a build time (endpoint `og/[slug].png`).
* Mantieni template stabile e leggibile.
* Non mettere troppo testo: deve restare leggibile anche in miniature.

---

## Link relations utili (head hygiene)

Questi `link rel` migliorano discovery, disambiguazione e integrazione.

```html
<link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml">
<link rel="alternate" type="application/atom+xml" title="Atom" href="/atom.xml">
<link rel="alternate" type="application/feed+json" title="JSON Feed" href="/feed.json">
<link rel="search" type="application/opensearchdescription+xml" title="Cerca su Nome Blog" href="/opensearch.xml">
<link rel="author" href="/about/">
<link rel="me" href="https://github.com/tuouser">
<link rel="me" href="https://www.linkedin.com/in/tuouser/">
```

* `rel="me"` aiuta a collegare identità (specie se ripetuto anche nei profili esterni).
* Se sei multilingua, aggiungi `hreflang` (vedi sezione i18n).

---

## Feed avanzati: RSS/Atom full-text, JSON Feed, WebSub

### 1) RSS/Atom full-text (non snippet)

* Includi l’intero contenuto: è un canale “pulito” usato da reader e sistemi di ingestion.
* Mantieni `guid` stabile.

### 2) JSON Feed (opzionale ma utile)

* Più semplice da consumare per tool moderni.
* Utile come endpoint “plain” per agent.

### 3) Feed per tag/categoria (discoverability tematica)

* Genera feed per i principali tag/hub:

  * `/tags/rag/rss.xml`
  * `/tags/opensearch/rss.xml`
* Se hai tanti tag, fallo solo per quelli “premium” (curati).

### 4) WebSub (opzionale)

Se vuoi notifiche push ai subscriber (alcuni sistemi le usano):

* aggiungi un hub WebSub (`rel="hub"`) nel feed
* (richiede un hub pubblico o self-hosted)

---

## Sitemap “pro” (oltre il minimo)

### 1) Sitemap index + sitemaps per tipo

Se cresci, separa:

* `sitemap-posts.xml`
* `sitemap-tags.xml`
* `sitemap-pages.xml`
* `sitemap-images.xml` (se lavori molto con immagini)

### 2) Image SEO

* Usa immagini significative e **alt text** descrittivi.
* Se le immagini sono centrali (tutorial, diagrammi), valuta:

  * `ImageObject` in schema.org
  * sitemap immagini (quando appropriato)

### 3) Video SEO (se embed YouTube o video propri)

* `VideoObject` in JSON-LD
* (se video propri) valuta sitemap video

### 4) lastmod “vero”

* Aggiorna `lastmod` quando cambi davvero il contenuto (non ad ogni build).

---

## Structured data: best practices extra per contenuti tecnici

### 1) FAQPage / HowTo (solo quando il contenuto lo giustifica)

* `FAQPage` se hai una sezione FAQ reale (domanda/risposta, non finta).
* `HowTo` se è una guida step-by-step con prerequisiti e steps.

### 2) Code & repo

Se pubblichi codice o repo:

* `SoftwareSourceCode` (quando ha senso)
* link a GitHub (come `codeRepository` o `sameAs`)

### 3) Citazioni e fonti

* Aggiungi sezione “References” nei post e popola `citation` nello schema.
* Aiuta sia Google sia LLM a fare grounding.

### 4) Identità forte (E‑E‑A‑T “machine-readable”)

* `Person` con `sameAs` + eventuale ORCID
* `Organization` se pubblichi come brand (logo, social, contatti)

---

## Contenuto “LLM-first” (senza sacrificare umani)

Pattern che massimizza ingestione e citabilità:

* **TL;DR** (3–6 righe) all’inizio
* **Key takeaways** (bullet)
* **Glossario** per termini chiave (anchoring)
* **FAQ** finale (solo se autentica)
* **Esempi minimi + esempi “production”**
* **Edge cases** (i modelli li cercano)
* **Changelog** (se aggiorni spesso) + `dateModified`

---

## Extra: OpenSearch description (`opensearch.xml`)

Se hai una search interna (anche semplice), aggiungi `/public/opensearch.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>Nome Blog</ShortName>
  <Description>Search su Nome Blog</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Url type="text/html" template="https://tuodominio.com/search?q={searchTerms}" />
</OpenSearchDescription>
```

> Best practice: la pagina `/search` in genere è **noindex** (utility), ma l’endpoint aiuta discovery della funzionalità.

---

## Checklist EXTRA (più granulari) — modalità “massima discoverability”

### Checklist 1 — Setup sito (una tantum)

* [ ] `site` configurato in Astro (`astro.config.mjs`)
* [ ] Policy URL unificata (https, www/no-www, trailing slash)
* [ ] `robots.txt` con:

  * [ ] `Sitemap:`
  * [ ] (opz) `License:` verso `rsl.xml`
  * [ ] nessun blocco globale se vuoi massima discoverability
* [ ] Sitemap index + sitemap per post
* [ ] RSS full-text + autodiscovery `rel="alternate"`
* [ ] (opz) Atom + JSON Feed
* [ ] `llms.txt` pubblicato e linkato chiaramente
* [ ] Pagina `/about/` forte + contatti
* [ ] Pagina `/licenza/` + `<link rel="license">`
* [ ] Security headers di base (HSTS, CSP, nosniff, referrer-policy)

### Checklist 2 — Per ogni post (Definition of Done “content”)

* [ ] H1 unico e descrittivo
* [ ] Meta description fedele e densa
* [ ] Canonical corretto
* [ ] JSON-LD `TechArticle/Article` con:

  * [ ] `datePublished` + `dateModified`
  * [ ] `author` stabile (`@id`)
  * [ ] `image` + `image:alt`
  * [ ] `keywords`/`articleSection`
  * [ ] (opz) `citation` con fonti
* [ ] Open Graph + Twitter card
* [ ] TL;DR + Key takeaways
* [ ] Code blocks con linguaggio
* [ ] Link a prerequisiti e follow-up
* [ ] 1–3 link esterni autorevoli (quando fai claim fattuali)
* [ ] Immagini con `alt` utile (non keyword stuffing)

### Checklist 3 — Per ogni release (build/publish)

* [ ] Build Astro passa
* [ ] Link checker (niente 404 interni)
* [ ] Sitemap valida e non include URL noindex/utility
* [ ] Feed aggiornato e valido
* [ ] HTML validation (errori grossi = parser confuso)
* [ ] Lighthouse: niente regressioni grandi

### Checklist 4 — Mensile (monitoring & growth)

* [ ] Search Console: coverage (esclusioni, canonical, soft 404)
* [ ] Query che portano impression ma CTR basso → migliora title/desc
* [ ] Pagine orfane → aggiungi internal linking
* [ ] Aggiorna hub pages (topical authority)
* [ ] Aggiorna/merge contenuti duplicati o simili

---

## Aggiornamento al robots.txt (massima discoverability)

Se il tuo obiettivo è *massimo crawling*, evita blocchi aggressivi.

```txt
License: https://tuodominio.com/rsl.xml

User-agent: *
Allow: /

Sitemap: https://tuodominio.com/sitemap-index.xml
```

> Poi gestisci “cosa non indicizzare” con **noindex** mirato, non con `Disallow`.

---

## Mini‑roadmap (se vuoi implementare in ordine)

1. `site` + canonical + redirect policy
2. sitemap + RSS full-text + autodiscovery
3. JSON-LD typed con `@graph` (Person + WebSite + Article)
4. OG/Twitter + OG images automatiche
5. `llms.txt` + versione plain dei post
6. Licensing: `rel=license` (+ RSL se ti serve policy esplicita)
7. Hub pages + feed per tag premium
8. Monitoring + CI checks

---

# Template pronti Astro (copy/paste) — SEO + LLM discoverability “max”

Questi template sono pensati per:

* canonical + meta robusti
* OpenGraph/Twitter
* JSON-LD con `@graph`
* RSS full-text + JSON Feed
* `robots.txt`, `llms.txt`, `llms-full.txt`, `opensearch.xml`
* URL stabili (trailing slash coerente)

> Assumo Astro v5+ e Content Layer (collections con loader). Se hai un setup diverso, dimmelo e adatto.

## Struttura consigliata

```
src/
  components/seo/BaseHead.astro
  consts/site.ts
  content.config.ts
  layouts/BaseLayout.astro
  layouts/BlogPostLayout.astro
  lib/seo/structuredData.ts
  lib/seo/url.ts
  pages/
    index.astro
    blog/
      index.astro
      [...slug].astro
    rss.xml.ts
    atom.xml.ts
    feed.json.ts
    llms.txt.ts
    llms-full.txt.ts
    robots.txt.ts
    opensearch.xml.ts
public/
  favicon.svg
  rss/styles.xsl (opzionale)
  og/default.png (opzionale)
```

## 0) Dipendenze

```bash
pnpm add @astrojs/sitemap @astrojs/rss markdown-it sanitize-html
pnpm add -D schema-dts
```

> `schema-dts` è solo per type safety sul JSON-LD.

---

## 1) `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tuodominio.com',
  // Per SEO: scegli una policy e non cambiarla più.
  trailingSlash: 'always',

  integrations: [
    sitemap({
      // opz: escludi utility
      filter: (page) => !['/404', '/500'].includes(page),
    }),
  ],
});
```

---

## 2) `src/consts/site.ts`

```ts
export const SITE = {
  name: 'Nome Blog',
  description: 'Descrizione chiara e specifica del blog (1 frase).',
  url: 'https://tuodominio.com',
  locale: 'it-IT',
  lang: 'it',

  // Identità (usata per JSON-LD + link rel=me)
  author: {
    name: 'Nome Cognome',
    url: 'https://tuodominio.com/about/',
    sameAs: [
      'https://github.com/tuouser',
      'https://www.linkedin.com/in/tuouser/',
    ],
  },

  social: {
    twitter: '@handle', // opzionale
  },

  // Default OG
  og: {
    defaultImagePath: '/og/default.png',
  },

  // Feeds
  feeds: {
    rssPath: '/rss.xml',
    atomPath: '/atom.xml',
    jsonFeedPath: '/feed.json',
  },

  // Licensing
  license: {
    humanUrl: 'https://tuodominio.com/licenza/',
    rslUrl: 'https://tuodominio.com/rsl.xml', // opzionale
  },
} as const;
```

---

## 3) Content collections: `src/content.config.ts`

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),

    // Date
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),

    // SEO
    canonical: z.string().url().optional(),
    ogImage: z.string().optional(), // path assoluto tipo /og/post.png o URL
    tags: z.array(z.string()).default([]),

    // Controlli
    draft: z.boolean().default(false),

    // opz: override autore per post
    authorName: z.string().optional(),
  }),
});

export const collections = { blog };
```

---

## 4) Helper URL canoniche: `src/lib/seo/url.ts`

```ts
export function ensureTrailingSlash(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function toAbsoluteUrl(input: string, site: URL): URL {
  // accetta URL assoluti o path tipo /foo/
  try {
    return new URL(input);
  } catch {
    const p = input.startsWith('/') ? input : `/${input}`;
    return new URL(p, site);
  }
}

export function canonicalFromPath(pathname: string, site: URL): URL {
  return new URL(ensureTrailingSlash(pathname), site);
}

export function absolutizeHtml(html: string, site: URL): string {
  // Converte href/src relativi in assoluti (utile per RSS/JSON Feed)
  // Evita di toccare mailto:, data:, http(s):, #
  const replacer = (attr: 'href' | 'src') => (match: string, value: string) => {
    const v = value.trim();
    if (
      v.startsWith('http://') ||
      v.startsWith('https://') ||
      v.startsWith('mailto:') ||
      v.startsWith('data:') ||
      v.startsWith('#')
    ) {
      return match;
    }

    const abs = new URL(v, site).toString();
    return `${attr}="${abs}"`;
  };

  return html
    .replace(/href=\"([^\"]+)\"/g, replacer('href'))
    .replace(/src=\"([^\"]+)\"/g, replacer('src'));
}
```

---

## 5) JSON‑LD `@graph`: `src/lib/seo/structuredData.ts`

```ts
import type {
  Graph,
  Person,
  Organization,
  WebSite,
  WebPage,
  TechArticle,
  BreadcrumbList,
  ListItem,
} from 'schema-dts';

export type JsonLdGraph = {
  '@context': 'https://schema.org';
  '@graph': Graph;
};

export function buildSiteGraph(params: {
  siteUrl: string;
  siteName: string;
  siteDescription: string;
  author: {
    name: string;
    url: string;
    sameAs?: string[];
  };
  organization?: {
    name: string;
    url: string;
    logoUrl?: string;
    sameAs?: string[];
  };
}): JsonLdGraph {
  const personId = `${params.siteUrl}#/person`;
  const orgId = `${params.siteUrl}#/org`;
  const siteId = `${params.siteUrl}#/website`;

  const person: Person = {
    '@type': 'Person',
    '@id': personId,
    name: params.author.name,
    url: params.author.url,
    sameAs: params.author.sameAs,
  };

  const organization: Organization = {
    '@type': 'Organization',
    '@id': orgId,
    name: params.organization?.name ?? params.siteName,
    url: params.organization?.url ?? params.siteUrl,
    logo: params.organization?.logoUrl,
    sameAs: params.organization?.sameAs,
  };

  const website: WebSite = {
    '@type': 'WebSite',
    '@id': siteId,
    url: params.siteUrl,
    name: params.siteName,
    description: params.siteDescription,
    publisher: { '@id': orgId },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, person, website],
  };
}

export function buildArticleGraph(params: {
  canonicalUrl: string;
  title: string;
  description: string;
  datePublished: string; // ISO
  dateModified?: string; // ISO
  imageUrl?: string;
  siteUrl: string;
  authorPersonId: string; // es: https://site/#/person
  publisherOrgId: string; // es: https://site/#/org
  breadcrumbs?: Array<{ name: string; url: string }>;
  keywords?: string[];
}): JsonLdGraph {
  const webpageId = `${params.canonicalUrl}#/webpage`;
  const articleId = `${params.canonicalUrl}#/article`;

  const webpage: WebPage = {
    '@type': 'WebPage',
    '@id': webpageId,
    url: params.canonicalUrl,
    name: params.title,
    description: params.description,
    isPartOf: { '@id': `${params.siteUrl}#/website` },
  };

  const article: TechArticle = {
    '@type': 'TechArticle',
    '@id': articleId,
    headline: params.title,
    description: params.description,
    mainEntityOfPage: { '@id': webpageId },
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: { '@id': params.authorPersonId },
    publisher: { '@id': params.publisherOrgId },
    image: params.imageUrl,
    keywords: params.keywords?.join(', '),
  };

  const graph: Graph = [webpage, article];

  if (params.breadcrumbs?.length) {
    const itemList: ListItem[] = params.breadcrumbs.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.name,
      item: b.url,
    }));

    const breadcrumbs: BreadcrumbList = {
      '@type': 'BreadcrumbList',
      itemListElement: itemList,
    };

    graph.push(breadcrumbs);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
```

---

## 6) Head component: `src/components/seo/BaseHead.astro`

```astro
---
import { SITE } from '../../consts/site';
import { canonicalFromPath, toAbsoluteUrl } from '../../lib/seo/url';

export type RobotsPolicy = {
  index?: boolean;
  follow?: boolean;
  maxSnippet?: number; // -1 = unlimited
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: number; // -1 = unlimited
};

export interface Props {
  title: string;
  description?: string;
  canonical?: string; // assoluto o path
  lang?: string;

  // Preview
  ogType?: 'website' | 'article';
  ogImage?: string;

  // Article metadata
  publishedTime?: string; // ISO
  modifiedTime?: string; // ISO
  tags?: string[];

  // Controlli
  robots?: RobotsPolicy;

  // JSON-LD
  jsonLd?: unknown | unknown[];
}

const props = Astro.props;
const site = Astro.site;
if (!site) throw new Error('Astro.site mancante: configura `site` in astro.config.mjs');

const lang = props.lang ?? SITE.lang;
const description = props.description ?? SITE.description;

const canonicalUrl = props.canonical
  ? toAbsoluteUrl(props.canonical, site)
  : canonicalFromPath(Astro.url.pathname, site);

const ogType = props.ogType ?? 'website';
const ogImageUrl = toAbsoluteUrl(props.ogImage ?? SITE.og.defaultImagePath, site);

const robots: RobotsPolicy = {
  index: true,
  follow: true,
  maxSnippet: -1,
  maxImagePreview: 'large',
  maxVideoPreview: -1,
  ...props.robots,
};

const robotsContent = [
  robots.index ? 'index' : 'noindex',
  robots.follow ? 'follow' : 'nofollow',
  robots.maxSnippet !== undefined ? `max-snippet:${robots.maxSnippet}` : null,
  robots.maxImagePreview ? `max-image-preview:${robots.maxImagePreview}` : null,
  robots.maxVideoPreview !== undefined ? `max-video-preview:${robots.maxVideoPreview}` : null,
]
  .filter(Boolean)
  .join(',');

const jsonLdPayload = props.jsonLd
  ? Array.isArray(props.jsonLd)
    ? props.jsonLd
    : [props.jsonLd]
  : [];
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />

<title>{props.title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalUrl.toString()} />

<meta name="robots" content={robotsContent} />
<meta name="googlebot" content={robotsContent} />

<!-- Feeds autodiscovery -->
<link
  rel="alternate"
  type="application/rss+xml"
  title={SITE.name}
  href={new URL(SITE.feeds.rssPath, site).toString()}
/>
<link
  rel="alternate"
  type="application/atom+xml"
  title={SITE.name}
  href={new URL(SITE.feeds.atomPath, site).toString()}
/>
<link
  rel="alternate"
  type="application/feed+json"
  title={SITE.name}
  href={new URL(SITE.feeds.jsonFeedPath, site).toString()}
/>

<!-- Licensing -->
<link rel="license" href={SITE.license.humanUrl} />

<!-- Identity -->
<link rel="author" href={SITE.author.url} />
{SITE.author.sameAs?.map((u) => <link rel="me" href={u} />)}

<!-- OpenGraph -->
<meta property="og:type" content={ogType} />
<meta property="og:site_name" content={SITE.name} />
<meta property="og:title" content={props.title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalUrl.toString()} />
<meta property="og:image" content={ogImageUrl.toString()} />
<meta property="og:image:alt" content={props.title} />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
{SITE.social.twitter ? <meta name="twitter:site" content={SITE.social.twitter} /> : null}
<meta name="twitter:title" content={props.title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl.toString()} />

<!-- Article extras -->
{props.publishedTime ? <meta property="article:published_time" content={props.publishedTime} /> : null}
{props.modifiedTime ? <meta property="article:modified_time" content={props.modifiedTime} /> : null}
{props.tags?.map((t) => <meta property="article:tag" content={t} />)}

<!-- JSON-LD -->
{jsonLdPayload.map((obj) => (
  <script type="application/ld+json" set:html={JSON.stringify(obj)} />
))}

<html lang={lang} />
```

> Nota: la riga finale `<html lang=... />` è “quirk” — in Astro conviene impostare `lang` nel layout sul tag `<html>`. Se preferisci, elimina quella riga e metti `lang` nel layout (vedi sotto).

---

## 7) Layout base: `src/layouts/BaseLayout.astro`

```astro
---
import BaseHead from '../components/seo/BaseHead.astro';
import { SITE } from '../consts/site';

export interface Props {
  title: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  robots?: import('../components/seo/BaseHead.astro').RobotsPolicy;
  jsonLd?: unknown | unknown[];
  lang?: string;
}

const { title, description, canonical, ogType, ogImage, robots, jsonLd, lang } = Astro.props;
const htmlLang = lang ?? SITE.lang;
---

<!doctype html>
<html lang={htmlLang}>
  <head>
    <BaseHead
      title={title}
      description={description}
      canonical={canonical}
      ogType={ogType}
      ogImage={ogImage}
      robots={robots}
      jsonLd={jsonLd}
      lang={htmlLang}
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

---

## 8) Layout post: `src/layouts/BlogPostLayout.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';
import { SITE } from '../consts/site';
import { buildSiteGraph, buildArticleGraph } from '../lib/seo/structuredData';

export interface Props {
  title: string;
  description: string;
  canonical: string;
  pubDateISO: string;
  updatedISO?: string;
  tags?: string[];
  ogImage?: string;
}

const p = Astro.props;

const siteGraph = buildSiteGraph({
  siteUrl: SITE.url,
  siteName: SITE.name,
  siteDescription: SITE.description,
  author: {
    name: SITE.author.name,
    url: SITE.author.url,
    sameAs: SITE.author.sameAs,
  },
  organization: {
    name: SITE.name,
    url: SITE.url,
  },
});

const articleGraph = buildArticleGraph({
  canonicalUrl: p.canonical,
  title: p.title,
  description: p.description,
  datePublished: p.pubDateISO,
  dateModified: p.updatedISO,
  imageUrl: p.ogImage ? new URL(p.ogImage, SITE.url).toString() : undefined,
  siteUrl: SITE.url,
  authorPersonId: `${SITE.url}#/person`,
  publisherOrgId: `${SITE.url}#/org`,
  breadcrumbs: [
    { name: 'Home', url: SITE.url + '/' },
    { name: 'Blog', url: SITE.url + '/blog/' },
    { name: p.title, url: p.canonical },
  ],
  keywords: p.tags,
});
---

<BaseLayout
  title={p.title}
  description={p.description}
  canonical={p.canonical}
  ogType="article"
  ogImage={p.ogImage}
  jsonLd={[siteGraph, articleGraph]}
>
  <article>
    <header>
      <h1>{p.title}</h1>
      <p>{p.description}</p>
      <p>
        <time datetime={p.pubDateISO}>{new Date(p.pubDateISO).toLocaleDateString('it-IT')}</time>
        {p.updatedISO ? (
          <>
            {' '}· Aggiornato{' '}
            <time datetime={p.updatedISO}>{new Date(p.updatedISO).toLocaleDateString('it-IT')}</time>
          </>
        ) : null}
      </p>
      {p.tags?.length ? (
        <ul>
          {p.tags.map((t) => (
            <li><a href={`/tags/${encodeURIComponent(t)}/`}>{t}</a></li>
          ))}
        </ul>
      ) : null}
    </header>

    <main>
      <slot />
    </main>
  </article>
</BaseLayout>
```

---

## 9) Pagina post: `src/pages/blog/[...slug].astro`

```astro
---
import { getCollection, getEntry } from 'astro:content';
import { SITE } from '../../consts/site';
import { canonicalFromPath } from '../../lib/seo/url';
import BlogPostLayout from '../../layouts/BlogPostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((p) => ({
    params: { slug: p.id },
  }));
}

const { slug } = Astro.params;
if (!slug) throw new Error('Missing slug');

const entry = await getEntry('blog', slug);
if (!entry) return Astro.redirect('/404');

const { Content } = await entry.render();

const canonical = entry.data.canonical
  ? entry.data.canonical
  : canonicalFromPath(`/blog/${entry.id}/`, new URL(SITE.url)).toString();

const pubDateISO = entry.data.pubDate.toISOString();
const updatedISO = entry.data.updatedDate?.toISOString();
---

<BlogPostLayout
  title={entry.data.title}
  description={entry.data.description}
  canonical={canonical}
  pubDateISO={pubDateISO}
  updatedISO={updatedISO}
  tags={entry.data.tags}
  ogImage={entry.data.ogImage}
>
  <Content />
</BlogPostLayout>
```

---

## 10) Index blog: `src/pages/blog/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import { SITE } from '../../consts/site';

const posts = (await getCollection('blog', ({ data }) => !data.draft))
  .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
---

<BaseLayout
  title={`Blog · ${SITE.name}`}
  description={SITE.description}
  canonical="/blog/"
>
  <main>
    <h1>Blog</h1>
    <ul>
      {posts.map((p) => (
        <li>
          <a href={`/blog/${p.id}/`}>{p.data.title}</a>
          <p>{p.data.description}</p>
        </li>
      ))}
    </ul>
  </main>
</BaseLayout>
```

---

## 11) RSS full‑text: `src/pages/rss.xml.ts`

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import type { APIContext } from 'astro';
import { absolutizeHtml } from '../lib/seo/url';
import { SITE } from '../consts/site';

const parser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

function toFeedHtml(markdownBody: string, site: URL): string {
  const raw = parser.render(markdownBody);
  const sanitized = sanitizeHtml(raw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img',
      'figure',
      'figcaption',
      'pre',
      'code',
      'blockquote',
      'hr',
    ]),
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      '*': ['id', 'class'],
    },
    // importante per evitare injection via href/src
    allowedSchemes: ['http', 'https', 'mailto'],
  });

  return absolutizeHtml(sanitized, site);
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const blog = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: SITE.name,
    description: SITE.description,
    site,
    // opzionale: /public/rss/styles.xsl
    // stylesheet: '/rss/styles.xsl',

    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      content: toFeedHtml(post.body, site),
      categories: post.data.tags,
    })),

    customData: `<language>${SITE.locale}</language>`,
  });
}
```

---

## 12) Atom: `src/pages/atom.xml.ts`

Atom non è fornito “out of the box” da `@astrojs/rss`. Qui una versione essenziale (full-text) che riusa la stessa logica.

```ts
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { absolutizeHtml } from '../lib/seo/url';
import { SITE } from '../consts/site';

const parser = new MarkdownIt({ html: true, linkify: true, typographer: true });

function esc(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function toFeedHtml(markdownBody: string, site: URL): string {
  const raw = parser.render(markdownBody);
  const sanitized = sanitizeHtml(raw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'pre', 'code', 'blockquote']),
    allowedAttributes: { a: ['href', 'rel'], img: ['src', 'alt'], '*': ['id', 'class'] },
    allowedSchemes: ['http', 'https', 'mailto'],
  });
  return absolutizeHtml(sanitized, site);
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const updated = (posts[0]?.data.updatedDate ?? posts[0]?.data.pubDate ?? new Date()).toISOString();

  const feedUrl = new URL('/atom.xml', site).toString();
  const homeUrl = new URL('/', site).toString();

  const entries = posts
    .map((p) => {
      const url = new URL(`/blog/${p.id}/`, site).toString();
      const html = toFeedHtml(p.body, site);
      const published = p.data.pubDate.toISOString();
      const modified = (p.data.updatedDate ?? p.data.pubDate).toISOString();

      return `
<entry>
` +
        `<title>${esc(p.data.title)}</title>
` +
        `<link href="${esc(url)}"/>
` +
        `<id>${esc(url)}</id>
` +
        `<published>${esc(published)}</published>
` +
        `<updated>${esc(modified)}</updated>
` +
        `<summary>${esc(p.data.description)}</summary>
` +
        `<content type="html">${esc(html)}</content>
` +
      `</entry>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="utf-8"?>
` +
    `<feed xmlns="http://www.w3.org/2005/Atom">
` +
    `<title>${esc(SITE.name)}</title>
` +
    `<subtitle>${esc(SITE.description)}</subtitle>
` +
    `<id>${esc(homeUrl)}</id>
` +
    `<link href="${esc(homeUrl)}"/>
` +
    `<link rel="self" href="${esc(feedUrl)}"/>
` +
    `<updated>${esc(updated)}</updated>
` +
    `${entries}
` +
    `</feed>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
```

---

## 13) JSON Feed: `src/pages/feed.json.ts`

```ts
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { absolutizeHtml } from '../lib/seo/url';
import { SITE } from '../consts/site';

const parser = new MarkdownIt({ html: true, linkify: true, typographer: true });

function toFeedHtml(markdownBody: string, site: URL): string {
  const raw = parser.render(markdownBody);
  const sanitized = sanitizeHtml(raw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'pre', 'code', 'blockquote']),
    allowedAttributes: { a: ['href', 'rel'], img: ['src', 'alt'], '*': ['id', 'class'] },
    allowedSchemes: ['http', 'https', 'mailto'],
  });
  return absolutizeHtml(sanitized, site);
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const feedUrl = new URL('/feed.json', site).toString();

  const json = {
    version: 'https://jsonfeed.org/version/1',
    title: SITE.name,
    home_page_url: new URL('/', site).toString(),
    feed_url: feedUrl,
    description: SITE.description,
    language: SITE.locale,
    authors: [
      {
        name: SITE.author.name,
        url: SITE.author.url,
      },
    ],
    items: posts.map((p) => {
      const url = new URL(`/blog/${p.id}/`, site).toString();
      return {
        id: url,
        url,
        title: p.data.title,
        summary: p.data.description,
        date_published: p.data.pubDate.toISOString(),
        date_modified: (p.data.updatedDate ?? p.data.pubDate).toISOString(),
        tags: p.data.tags,
        content_html: toFeedHtml(p.body, site),
      };
    }),
  };

  return new Response(JSON.stringify(json), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
```

---

## 14) `llms.txt`: `src/pages/llms.txt.ts`

Formato pragmatico: 1) overview 2) link principali 3) indice dei contenuti “core”.

```ts
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../consts/site';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const lines: string[] = [];
  lines.push(`# ${SITE.name}`);
  lines.push(SITE.description);
  lines.push('');

  lines.push('## Primary endpoints');
  lines.push(`- RSS: ${new URL(SITE.feeds.rssPath, site).toString()}`);
  lines.push(`- Atom: ${new URL(SITE.feeds.atomPath, site).toString()}`);
  lines.push(`- JSON Feed: ${new URL(SITE.feeds.jsonFeedPath, site).toString()}`);
  lines.push(`- llms-full: ${new URL('/llms-full.txt', site).toString()}`);
  lines.push('');

  lines.push('## Core content index (most recent first)');
  for (const p of posts) {
    const url = new URL(`/blog/${p.id}/`, site).toString();
    lines.push(`- ${p.data.title} — ${url}`);
  }

  lines.push('');
  lines.push('## License');
  lines.push(`- Human: ${SITE.license.humanUrl}`);
  if (SITE.license.rslUrl) lines.push(`- Machine (RSL): ${SITE.license.rslUrl}`);

  return new Response(lines.join('
'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
```

---

## 15) `llms-full.txt`: `src/pages/llms-full.txt.ts`

Questo file può diventare grande: utile come fallback per tool che scaricano “tutto” in bulk.

```ts
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../consts/site';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const out: string[] = [];
  out.push(`# ${SITE.name} — llms-full`);
  out.push(SITE.description);
  out.push('');

  for (const p of posts) {
    const url = new URL(`/blog/${p.id}/`, site).toString();
    out.push('---');
    out.push(`## ${p.data.title}`);
    out.push(url);
    out.push('');
    out.push(p.body); // markdown grezzo (molto leggibile per LLM)
    out.push('');
  }

  return new Response(out.join('
'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
```

---

## 16) `robots.txt`: `src/pages/robots.txt.ts`

```ts
import type { APIContext } from 'astro';
import { SITE } from '../consts/site';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const lines: string[] = [];

  // opzionale: direttiva licensing (alcuni crawler la leggono)
  if (SITE.license.rslUrl) lines.push(`License: ${SITE.license.rslUrl}`);

  lines.push('');
  lines.push('User-agent: *');
  lines.push('Allow: /');
  lines.push('');

  // Sitemap generata da @astrojs/sitemap
  lines.push(`Sitemap: ${new URL('/sitemap-index.xml', site).toString()}`);

  return new Response(lines.join('
'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
```

---

## 17) `opensearch.xml`: `src/pages/opensearch.xml.ts`

Se hai `/search?q=...`:

```ts
import type { APIContext } from 'astro';
import { SITE } from '../consts/site';

function esc(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
` +
    `<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
` +
    `  <ShortName>${esc(SITE.name)}</ShortName>
` +
    `  <Description>${esc('Cerca su ' + SITE.name)}</Description>
` +
    `  <InputEncoding>UTF-8</InputEncoding>
` +
    `  <Url type="text/html" template="${esc(new URL('/search?q={searchTerms}', site).toString())}" />
` +
    `</OpenSearchDescription>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/opensearchdescription+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
```

E nel `<head>` (già suggerito nella guida):

```html
<link rel="search" type="application/opensearchdescription+xml" title="Cerca" href="/opensearch.xml" />
```

---

## 18) OG images (2 opzioni)

### Opzione A — semplice: immagini statiche per post

* Metti un default: `public/og/default.png`
* Per singolo post: `ogImage: /og/nome.png` nel frontmatter

### Opzione B — generate OG a build time (endpoint)

Se vuoi OG auto per ogni post, la soluzione “pulita” è:

* `src/pages/og/[...slug].png.ts`
* una libreria tipo `satori` + `@resvg/resvg-js`

> Se vuoi questa opzione, dimmi se deploy è **SSR** (Node adapter) o **static** puro: cambia dove/come conviene generare.

---

## 19) Piccole cose che alzano davvero la discoverability (da applicare subito)

* In `BaseHead` mantieni **sempre**:

  * canonical
  * feeds autodiscovery
  * OG/Twitter
  * robots con `max-image-preview:large`
* Pubblica **tutti e 2**: `llms.txt` e `llms-full.txt`.
* RSS full-text: converti href/src relativi in assoluti (già incluso).
* Aggiungi una `/about/` forte, linkata in `rel=author`.
* Hub pages: `/tags/[tag]/` + internal linking (spinge topical authority).
