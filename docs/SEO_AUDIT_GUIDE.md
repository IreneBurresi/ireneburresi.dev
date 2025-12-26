# SEO Audit Guide

Guida completa agli strumenti SEO per il blog, con focus su audit tecnico, Core Web Vitals e crawling diagnostico.

---

## Table of Contents

1. [Lighthouse CI - Audit Automatici](#lighthouse-ci---audit-automatici)
2. [Core Web Vitals - Metriche Critiche](#core-web-vitals---metriche-critiche)
3. [Screaming Frog - Crawling Tecnico](#screaming-frog---crawling-tecnico)
4. [SEO Checklist](#seo-checklist)
5. [Interpretazione Risultati](#interpretazione-risultati)

---

## Lighthouse CI - Audit Automatici

### Prerequisiti

**Chrome/Chromium richiesto**. Lighthouse necessita di un browser Chromium per funzionare.

```bash
# macOS
brew install --cask google-chrome

# Ubuntu/Debian
sudo apt install chromium-browser

# Verifica installazione
which google-chrome-stable || which chromium
```

Se hai Chrome già installato, Lighthouse lo troverà automaticamente.

### Script Disponibili

```bash
# Audit SEO completo su più pagine (raccomandato)
npm run audit:seo

# Audit performance veloce con visualizzazione interattiva
npm run audit:perf

# Audit rapido SEO+Performance (headless, genera HTML)
npm run audit:quick
```

### Cosa Viene Testato

#### Performance & Core Web Vitals
- **LCP (Largest Contentful Paint)**: tempo di rendering del contenuto principale
  - Target: < 2.5s
  - Segnale di ranking confermato (Google 2021)
- **CLS (Cumulative Layout Shift)**: stabilità visiva
  - Target: < 0.1
  - Penalizza pagine che "saltano" durante il caricamento
- **INP (Interaction to Next Paint)**: reattività interazioni
  - Target: < 200ms
  - Sostituisce FID come metrica di interattività

#### SEO Tecnico
- Meta description presenza e lunghezza
- Title tag ottimizzazione
- Crawlability (robots.txt, canonical)
- Anchor text descrittivi
- Font leggibili su mobile
- Tap target dimensioni adeguate

#### Accessibility
- Contrasto colori (WCAG AA)
- Alt text immagini
- Label form
- ARIA attributes

### Configurazione

Il file [lighthouserc.cjs](../lighthouserc.cjs) definisce:
- **URL da testare**: homepage, blog index, about, sample post
- **Soglie minime**: performance 85%, SEO 95%, accessibility 90%
- **Output**: report HTML in `.lighthouseci/`

Modifica le URL in `ci.collect.url` per testare pagine specifiche.

### Interpretazione Punteggi

| Punteggio | Categoria | Azione |
|-----------|-----------|--------|
| 90-100 | ✅ Eccellente | Mantieni performance |
| 50-89 | ⚠️ Da migliorare | Identifica quick wins |
| 0-49 | ❌ Critico | Intervento urgente |

---

## Core Web Vitals - Metriche Critiche

### LCP - Largest Contentful Paint

**Cosa misura**: Tempo di rendering del contenuto visivamente più grande nella viewport.

**Target**:
- ✅ Buono: < 2.5s
- ⚠️ Da migliorare: 2.5s - 4s
- ❌ Scarso: > 4s

**Come ottimizzare**:
```bash
# 1. Preload immagini critiche
<link rel="preload" as="image" href="/hero.jpg">

# 2. Usa formati moderni (WebP, AVIF)
# 3. Ottimizza font loading
<link rel="preload" as="font" type="font/woff2" crossorigin>

# 4. Riduci CSS/JS blocking
# 5. Usa CDN per asset statici
```

### CLS - Cumulative Layout Shift

**Cosa misura**: Somma di tutti gli spostamenti imprevisti di layout.

**Target**:
- ✅ Buono: < 0.1
- ⚠️ Da migliorare: 0.1 - 0.25
- ❌ Scarso: > 0.25

**Cause comuni**:
- Immagini senza dimensioni esplicite
- Font swap troppo aggressivo
- Ads/embeds iniettati dinamicamente
- Animazioni CSS che modificano layout

**Fix**:
```html
<!-- SEMPRE specificare width/height -->
<img src="hero.jpg" width="1200" height="630" alt="...">

<!-- Usare aspect-ratio CSS per contenitori dinamici -->
<div style="aspect-ratio: 16/9;">
  <img src="..." alt="...">
</div>
```

### INP - Interaction to Next Paint

**Cosa misura**: Latenza tra input utente e risposta visiva.

**Target**:
- ✅ Buono: < 200ms
- ⚠️ Da migliorare: 200ms - 500ms
- ❌ Scarso: > 500ms

**Come ottimizzare**:
- Riduci JavaScript sul main thread
- Usa `requestIdleCallback` per task non urgenti
- Debounce/throttle event handler
- Code splitting per caricare solo JS necessario

---

## Screaming Frog - Crawling Tecnico

### Installazione

Screaming Frog SEO Spider è uno strumento desktop esterno.

**Download**: [https://www.screamingfrog.co.uk/seo-spider/](https://www.screamingfrog.co.uk/seo-spider/)

**Versioni**:
- Free: limite 500 URL (sufficiente per questo blog)
- Paid: unlimited crawling + features avanzate

### Setup Iniziale

1. Scarica e installa Screaming Frog
2. Avvia il blog localmente:
   ```bash
   npm run build
   npm run preview
   ```
   Server disponibile su `http://localhost:4321`

3. In Screaming Frog:
   - Configuration → Spider → Crawl: HTML only
   - Configuration → Limits: Max URI Length 2048
   - Configuration → Speed: 1 URI/s (per localhost, aumenta in prod)

4. Inserisci URL: `http://localhost:4321`
5. Click **Start**

### Cosa Controllare

#### 1. Link Rotti (404)
- Tab: **Response Codes → Client Error (4xx)**
- Export: Reports → Response Codes → Client Error (4xx) Inlinks
- Fix: correggi i link o aggiungi redirect 301

#### 2. Catene di Redirect
- Tab: **Response Codes → Redirection (3xx)**
- Filtra: redirect che puntano ad altri redirect
- Fix: redirect diretti alla destinazione finale
  ```
  ❌ /old → /temp → /new
  ✅ /old → /new
  ```

#### 3. Canonical Issues
- Tab: **Canonicals**
- Controlli:
  - ✅ Ogni pagina ha `<link rel="canonical">`
  - ✅ Canonical punta a URL finale (non redirect)
  - ✅ No canonical chains
  - ✅ Self-referencing canonical su pagine uniche

#### 4. Meta Description
- Tab: **Page Titles → Meta Description**
- Filtra: Missing / Duplicate / Over 160 chars
- Fix: ogni pagina deve avere meta description unica 120-160 char

#### 5. Robots.txt
- Tab: **Response Codes → Blocked by robots.txt**
- Verifica: nessun URL critico bloccato
- File: `/public/robots.txt`

#### 6. Sitemap
- Tab: **Sitemaps**
- Upload sitemap: Configuration → Include → Upload → Sitemaps
- Verifica: tutti gli URL importanti sono presenti

#### 7. Immagini Senza Alt
- Tab: **Images → Missing Alt Text**
- Export per elenco completo
- Fix: aggiungi alt text descrittivo a tutte le immagini

### Export Report

**Bulk Export**:
```
Reports → Bulk Export → All Reports → Export
```

Genera cartella con tutti i tab come CSV per analisi approfondita.

---

## SEO Checklist

### On-Page (per ogni articolo)

- [ ] **Title tag** unico, 50-60 caratteri, keyword principale
- [ ] **Meta description** unica, 120-160 caratteri, invito all'azione
- [ ] **H1** uno solo, contiene keyword principale
- [ ] **H2-H6** struttura gerarchica logica
- [ ] **URL** breve, descrittivo, con keyword (kebab-case)
- [ ] **Immagini** tutte con alt text descrittivo
- [ ] **Cover image** ottimizzata (< 200KB, WebP/AVIF)
- [ ] **Internal links** almeno 2-3 link ad altri articoli correlati
- [ ] **Canonical tag** presente e corretto
- [ ] **Schema markup** (Article, Person, Organization)
- [ ] **Open Graph tags** per social sharing
- [ ] **Reading time** visibile per UX

### Technical (site-wide)

- [ ] **Sitemap XML** aggiornata e submitta a Google Search Console
- [ ] **Robots.txt** configurato correttamente
- [ ] **HTTPS** attivo e certificato valido
- [ ] **Mobile-friendly** responsive design
- [ ] **Page speed** LCP < 2.5s su mobile
- [ ] **No link rotti** (verifica con Screaming Frog)
- [ ] **RSS feed** funzionante
- [ ] **404 page** custom e user-friendly
- [ ] **Redirect 301** per URL obsoleti
- [ ] **Hreflang** se multi-lingua (il blog ha inLanguage="it")

### Content Quality

- [ ] **Word count** minimo 800 parole per articoli approfonditi
- [ ] **Keyword research** focalizzato su intent utente
- [ ] **Unique content** 0% duplicazione
- [ ] **Citations/fonti** link a fonti autorevoli
- [ ] **Freshness** data pubblicazione e ultimo aggiornamento
- [ ] **Engagement** call-to-action, related articles

---

## Interpretazione Risultati

### Priorità Interventi

| Gravità | Tipo Problema | Esempi | Azione |
|---------|---------------|--------|--------|
| 🔴 Critico | Blocca indicizzazione | robots.txt errato, canonical loop, 5xx | Immediata |
| 🟠 Alta | Impatta ranking | LCP > 4s, link rotti su pagine top, duplicate content | Entro 48h |
| 🟡 Media | UX subottimale | CLS > 0.1, meta description mancanti, alt text | Entro 1 settimana |
| 🟢 Bassa | Nice-to-have | Redirect chains singoli, immagini non WebP | Backlog |

### Google Search Console Integration

Dopo aver fixato problemi SEO, monitora impatto in Google Search Console:

1. **Performance**: click, impressions, CTR, posizione media
2. **Coverage**: errori indicizzazione, pagine escluse
3. **Core Web Vitals**: distribuzione LCP/INP/CLS su URL reali
4. **Mobile Usability**: problemi specifici mobile

Tempo di impatto: 2-6 settimane per vedere cambiamenti in ranking.

---

## Tools Quick Reference

| Tool | Uso Principale | Frequenza |
|------|----------------|-----------|
| Lighthouse CI | Audit automatico pre-deploy | Ogni build CI/CD |
| Screaming Frog | Deep crawl tecnico | Mensile |
| Google Search Console | Monitoring indicizzazione | Settimanale |
| PageSpeed Insights | Test singola pagina real user data | On-demand |
| Google Analytics 4 | Behavior metrics (bounce, time on page) | Continuo |

---

## Risorse Aggiuntive

- [Google Core Web Vitals Guide](https://web.dev/vitals/)
- [Lighthouse Scoring Calculator](https://googlechrome.github.io/lighthouse/scorecalc/)
- [Screaming Frog Documentation](https://www.screamingfrog.co.uk/seo-spider/user-guide/)
- [Schema.org Article Markup](https://schema.org/Article)
- [Google Search Central](https://developers.google.com/search)

---

**Last Updated**: 2025-12-24
**Maintainer**: Irene Burresi
