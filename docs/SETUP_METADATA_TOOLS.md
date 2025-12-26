# Setup Strumenti Metadati - Guida Rapida

Tutti gli strumenti per gestione metadati sono stati implementati e pronti all'uso! 🎉

---

## ✅ Cosa È Stato Implementato

### 1. **Script Analisi Metadati** 📊
- **File**: `scripts/analyze-metadata.ts`
- **Comando**: `npm run metadata:analyze`
- **Cosa fa**: Analizza distribuzione pillar, tag, genre, coverage metadati

### 2. **Dashboard HTML Interattiva** 📈
- **File**: `scripts/generate-dashboard.ts`
- **Comando**: `npm run metadata:dashboard`
- **Output**: `docs/metadata-dashboard.html`
- **Cosa fa**: Genera dashboard con grafici Chart.js

### 3. **Validatore Immagini** 🖼️
- **File**: `scripts/validate-images.ts`
- **Comando**: `npm run images:validate`
- **Cosa fa**: Verifica esistenza, dimensioni, peso, formato immagini

### 4. **Test Avanzati** ✅
- **File**: `tests/content.test.ts` (esteso)
- **Comando**: `npm run test:content`
- **Nuovi test**:
  - Genre validi
  - Citation URL validi
  - relatedSlugs esistenti
  - coverImage esistono
  - 3-6 tag raccomandati
  - secondaryPillars validi
  - inLanguage ISO corretti
  - Summary lunghezza SEO
  - No draft in CI

### 5. **Pre-commit Hook (Husky)** 🔒
- **Directory**: `.husky/`
- **Cosa fa**: Valida metadati automaticamente prima di ogni commit
- **Trigger**: `git commit`

### 6. **GitHub Actions Workflow** 🤖
- **File**: `.github/workflows/validate-metadata.yml`
- **Trigger**: PR/push su articoli blog
- **Cosa fa**: CI automatica con validazione completa

### 7. **VS Code Snippets** ⚡
- **File**: `.vscode/blog.code-snippets`
- **Snippets**:
  - `blog-complete` - Template completo
  - `blog-minimal` - Template minimale
  - `blog-tutorial` - Template tutorial
  - `blog-analysis` - Template analisi
  - `meta-citation` - Citation block
  - `meta-related` - Related slugs
  - `meta-secondary` - Secondary pillars

### 8. **Documentazione** 📚
- **METADATA_GUIDE.md** - Riferimento completo metadati
- **METADATA_IMPROVEMENTS.md** - Proposte implementate
- **METADATA_TOOLS.md** - Documentazione strumenti
- **SETUP_METADATA_TOOLS.md** (questo file) - Setup rapido

---

## 🚀 Setup Iniziale (5 minuti)

### Step 1: Installa Dipendenze

```bash
npm install
```

Questo installerà automaticamente:
- ✅ Husky per pre-commit hooks
- ✅ Lint-staged per validazione file modificati
- ✅ Tutte le dipendenze necessarie

### Step 2: (Opzionale) Installa Sharp

Per validazione avanzata dimensioni immagini:

```bash
npm install -D sharp @types/sharp
```

**Nota**: Non obbligatorio ma consigliato.

### Step 3: Verifica Setup

```bash
# Test che tutto funzioni
npm run test:content        # ✓ Test metadati
npm run metadata:analyze    # ✓ Analisi statistiche
npm run images:validate     # ✓ Validazione immagini
```

Se tutti e 3 passano, il setup è completo! ✅

---

## 📖 Quick Start

### Analizzare il Blog

```bash
# Statistiche testuali
npm run metadata:analyze

# Dashboard visuale
npm run metadata:dashboard
open docs/metadata-dashboard.html
```

### Scrivere Nuovo Articolo

**Metodo 1: Usa Snippet VS Code**

1. Crea file `.mdx` in `src/content/blog/`
2. Digita `blog-complete` e premi Tab
3. Compila i campi con Tab
4. Scrivi contenuto

**Metodo 2: Copia Template**

Vedi esempi completi in [METADATA_GUIDE.md](../METADATA_GUIDE.md#esempi-completi)

### Validare Prima di Commit

```bash
# Manuale
npm run test:content
npm run images:validate

# Automatico (al commit)
git add .
git commit -m "Add article"
# → Hook esegue validazione automaticamente!
```

### Pre-Pubblicazione Checklist

```bash
npm run prepublish:check
```

Esegue:
- ✓ Build
- ✓ Tutti i test
- ✓ Verifica robots.txt, sitemap, feeds

---

## 🎯 Comandi Principali

| Comando | Descrizione |
|---------|-------------|
| `npm run metadata:analyze` | Analisi statistiche metadati |
| `npm run metadata:dashboard` | Genera dashboard HTML |
| `npm run images:validate` | Valida immagini cover |
| `npm run test:content` | Test metadati articoli |
| `npm run typecheck` | TypeScript check |
| `npm run prepublish:check` | Validazione pre-pubblicazione completa |

---

## 🔧 Troubleshooting

### Pre-commit Hook Non Funziona

```bash
# Reinstalla hooks
rm -rf .husky
npm install

# Verifica
git commit -m "test" --allow-empty
# Dovrebbe eseguire validazione
```

### Test Falliscono

Controlla errori nel log. Esempi:

```bash
# Genre non valido
genre: "Analysis"  # ✓ OK (uppercase)
genre: "analysis"  # ✗ Errore (lowercase)

# relatedSlugs non esistente
relatedSlugs: ["articolo-che-non-esiste"]  # ✗ Errore

# coverImage mancante
coverImage: "/images/covers/missing.png"  # ✗ File non esiste
```

Vedi [METADATA_TOOLS.md](METADATA_TOOLS.md#troubleshooting) per altri casi.

---

## 📊 Esempio Output

### Analisi Metadati

```
📊 ANALISI METADATI BLOG
═══════════════════════════════════════════

📁 Totale articoli: 19

🏛️  DISTRIBUZIONE PILLAR
  synthesis       6 articoli (31.6%)
  engineering     5 articoli (26.3%)
  ...

🏷️  TOP 15 TAG PIÙ USATI
  1. AI                          12 occorrenze
  2. RAG                          8 occorrenze
  ...

Coverage Metadati: 87.3%
```

### Validazione Immagini

```
🖼️  VALIDAZIONE IMMAGINI BLOG
═══════════════════════════════════════════

✅ Tutte le coverImage referenziate esistono
⚠️  3 immagini con warning (dimensioni o peso)
```

### Pre-commit Hook

```bash
$ git commit -m "Add new article"

🔍 Validazione metadati in corso...
✓ tests/content.test.ts (42 passed)
✓ typecheck completed
✅ Validazione completata!

[main abc123] Add new article
```

---

## 🎨 VS Code Snippets

Disponibili quando scrivi file `.mdx`:

- **`blog-complete`** → Template con tutti i metadati
- **`blog-minimal`** → Template solo campi obbligatori
- **`blog-tutorial`** → Template per tutorial
- **`blog-analysis`** → Template per analisi

**Demo**:
```
1. Digita: blog-complete
2. Premi: Tab
3. → Genera frontmatter completo
4. Compila con Tab tra i campi
```

---

## 📚 Documentazione Completa

- **[METADATA_GUIDE.md](../METADATA_GUIDE.md)** → Reference completo metadati
- **[METADATA_TOOLS.md](METADATA_TOOLS.md)** → Guida dettagliata strumenti
- **[METADATA_IMPROVEMENTS.md](METADATA_IMPROVEMENTS.md)** → Proposte implementate

---

## ✨ Features Highlight

### Validazione Automatica
✅ Pre-commit hook blocca errori
✅ GitHub Actions valida PR
✅ Test completi in CI/CD

### Dashboard & Analytics
📊 Statistiche testuali dettagliate
📈 Grafici interattivi Chart.js
🏷️ Tag cloud e timeline

### Developer Experience
⚡ Snippets VS Code per velocità
🔍 Errori chiari e actionable
📖 Documentazione completa

---

## 🎉 Sei Pronto!

Hai tutto il necessario per gestire i metadati del blog in modo professionale.

**Next Steps**:
1. ✅ Esegui `npm run metadata:analyze` per vedere lo stato attuale
2. ✅ Prova a scrivere un articolo usando snippet `blog-complete`
3. ✅ Commit e osserva il pre-commit hook in azione
4. ✅ Apri una PR e vedi GitHub Actions validare

**Problemi?** Controlla [METADATA_TOOLS.md](METADATA_TOOLS.md#troubleshooting)

---

**Happy blogging!** 🚀
