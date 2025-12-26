# Strumenti di Gestione Metadati

Documentazione completa degli strumenti per analizzare, validare e visualizzare i metadati del blog.

---

## 📋 Indice

- [Installazione](#installazione)
- [Script Disponibili](#script-disponibili)
- [Pre-commit Hook](#pre-commit-hook)
- [GitHub Actions](#github-actions)
- [Workflow Consigliato](#workflow-consigliato)

---

## 🚀 Installazione

### Prima Volta

Dopo aver clonato il repository, installa le dipendenze:

```bash
npm install
```

Questo comando:
- Installa tutte le dipendenze
- Configura Husky automaticamente (via `prepare` script)
- Attiva il pre-commit hook

### Dipendenze Opzionali

Per il validatore immagini con check dimensioni avanzato:

```bash
npm install -D sharp @types/sharp
```

---

## 📊 Script Disponibili

### 1. Analisi Metadati

**Comando**: `npm run metadata:analyze`

**Cosa fa**:
- Analizza tutti gli articoli del blog
- Genera statistiche dettagliate su pillar, tag, genre
- Identifica metadati opzionali mancanti
- Mostra coverage SEO

**Output**:
```
📊 ANALISI METADATI BLOG
═══════════════════════════════════════════

📁 Totale articoli: 19

🏛️  DISTRIBUZIONE PILLAR
  synthesis       6 articoli (31.6%)
  engineering     5 articoli (26.3%)
  research        4 articoli (21.1%)
  ...

🏷️  TOP 15 TAG PIÙ USATI
  1. AI                          12 occorrenze
  2. RAG                          8 occorrenze
  ...

📖 DISTRIBUZIONE GENRE
  Analysis        8 articoli
  Tutorial        5 articoli
  ...

⚠️  METADATI OPZIONALI MANCANTI
  Senza coverImage:   3 articoli
  Senza citation:     5 articoli
  ...
```

**Quando usarlo**:
- Prima di scrivere nuovi articoli (per capire gap)
- Durante content planning
- Per report mensili/trimestrali

---

### 2. Dashboard HTML

**Comando**: `npm run metadata:dashboard`

**Cosa fa**:
- Genera una dashboard HTML interattiva
- Grafici con Chart.js per visualizzare distribuzioni
- Timeline pubblicazioni
- Tag cloud
- Coverage metadati

**Output**: `docs/metadata-dashboard.html`

**Visualizzazione**:
```bash
# Genera la dashboard
npm run metadata:dashboard

# Apri nel browser
open docs/metadata-dashboard.html
```

**Quando usarlo**:
- Per presentazioni/review
- Content planning visuale
- Condivisione con team non tecnico

---

### 3. Validatore Immagini

**Comando**: `npm run images:validate`

**Cosa fa**:
- Verifica che tutte le `coverImage` esistano
- Controlla dimensioni (con sharp installato)
- Verifica peso file (raccomandato < 500KB)
- Identifica immagini orfane (non referenziate)
- Suggerisce formati ottimali (WebP, PNG)

**Output**:
```
🖼️  VALIDAZIONE IMMAGINI BLOG
═══════════════════════════════════════════

📁 Analizzando 19 articoli...

🔍 VERIFICA COVER IMAGE

✅ Tutte le coverImage referenziate esistono

⚠️  PROBLEMI QUALITÀ IMMAGINI:

  ⚠️  articolo.mdx: cover.png troppo grande (650KB > 500KB)
  ⚠️  altro.mdx: cover.jpg dimensioni sotto standard OG (800x400, raccomandato 1200x630)

🗑️  VERIFICA IMMAGINI ORFANE (covers/)

  📄 old-image.png (320KB, png)
  Totale: 1 immagini orfane
  Considera di rimuoverle per ridurre il bundle size
```

**Quando usarlo**:
- Prima di pubblicare
- Durante ottimizzazione performance
- Dopo upload nuove immagini

**Note**:
- Senza `sharp`: valida solo esistenza e peso
- Con `sharp`: valida anche dimensioni (consigliato)

---

### 4. Test Avanzati

**Comando**: `npm run test:content`

**Cosa fa**:
Esegue test automatizzati su:
- ✅ Genre validi
- ✅ Citation con URL validi
- ✅ relatedSlugs esistenti
- ✅ coverImage esistono
- ✅ 3-6 tag per articolo (raccomandato)
- ✅ secondaryPillars validi
- ✅ inLanguage con codici ISO corretti
- ✅ Summary lunghezza SEO (120-160 caratteri)
- ✅ Nessun draft in produzione (CI)

**Output**:
```
✓ tests/content.test.ts (42)
  ✓ Advanced Metadata Validation (9)
    ✓ genre è tra quelli consigliati
    ✓ citation contiene solo URL validi
    ✓ relatedSlugs puntano ad articoli esistenti
    ✓ coverImage punta a file esistente
    ...

Test Files  1 passed (1)
     Tests  42 passed (42)
```

**Quando usarlo**:
- Prima di ogni commit (automatico con hook)
- Durante CI/CD
- Dopo modifiche bulk ai metadati

---

## 🔒 Pre-commit Hook

### Come Funziona

Quando esegui `git commit`, Husky esegue automaticamente:

1. **lint-staged**: testa solo file modificati in `src/content/blog/`
2. **typecheck**: verifica errori TypeScript
3. **Blocco commit** se ci sono errori

### Esempio

```bash
git add src/content/blog/nuovo-articolo.mdx
git commit -m "Add new article"

# Output:
🔍 Validazione metadati in corso...
✓ src/content/blog/nuovo-articolo.mdx
  ✓ genre è tra quelli consigliati
  ✓ citation contiene solo URL validi
  ...
✅ Validazione completata!
[main abc123] Add new article
```

### Disabilitare Temporaneamente

Se necessario (non consigliato):

```bash
# Skip hook per questo commit
git commit --no-verify -m "WIP"

# Disabilitare completamente (sconsigliato)
export HUSKY=0
```

### Problemi Comuni

**Errore**: `husky - command not found`
- **Soluzione**: `npm install` per reinstallare hook

**Errore**: Test falliscono
- **Soluzione**: Correggi i metadati o controlla errori nel log

---

## 🤖 GitHub Actions

### Workflow: `validate-metadata.yml`

**Trigger**:
- Pull Request che modifica file in `src/content/blog/`
- Push su `main` che modifica articoli

**Steps**:
1. Checkout codice
2. Setup Node.js 20
3. Installa dipendenze
4. Typecheck
5. Test contenuti
6. Analisi metadati
7. Validazione immagini (non bloccante)

### Visualizzare Risultati

1. Vai su GitHub → Pull Request
2. Tab "Checks"
3. Espandi "Validate Metadata"
4. Vedi log dettagliato

**Esempio Output**:
```
✓ Run typecheck
✓ Run content validation tests
  42 tests passed
✓ Analyze metadata
  Coverage Metadati: 87.3%
⚠ Validate images (continued on error)
  3 immagini con warning
```

### Blocco Merge

Il workflow **blocca il merge** se:
- Typecheck fallisce
- Test contenuti falliscono

Il workflow **NON blocca** per:
- Warning immagini
- Coverage metadati basso

---

## 🎯 Workflow Consigliato

### Scrivere Nuovo Articolo

```bash
# 1. Crea file articolo
touch src/content/blog/nuovo-articolo.mdx

# 2. Scrivi contenuto + metadati (vedi METADATA_GUIDE.md)

# 3. Aggiungi cover image
cp immagine.png public/images/covers/nuovo-articolo.png

# 4. Valida localmente
npm run test:content
npm run images:validate

# 5. Commit (hook esegue validazione automatica)
git add .
git commit -m "Add nuovo articolo"

# 6. Push e apri PR
git push origin feature/nuovo-articolo
```

### Review Mensile

```bash
# 1. Genera statistiche
npm run metadata:analyze

# 2. Genera dashboard visuale
npm run metadata:dashboard
open docs/metadata-dashboard.html

# 3. Identifica gap
# - Tag poco usati
# - Pillar sbilanciati
# - Metadati opzionali mancanti

# 4. Piano content per colmare gap
```

### Pre-Pubblicazione

```bash
# Checklist completa
npm run typecheck        # ✓ No errori TypeScript
npm run test:content     # ✓ Metadati validi
npm run images:validate  # ✓ Immagini OK
npm run build            # ✓ Build successo
npm run test             # ✓ Tutti i test passano

# Se tutto OK
npm run prepublish:check  # Script completo
```

---

## 🔧 Troubleshooting

### Test Falliscono

**Problema**: `genre non valido`
```
❌ Genre non validi:
  articolo.mdx: "analysis"
  Valori consentiti: Analysis, Tutorial, Review, ...
```

**Soluzione**: Correggi il genre (case-sensitive!)
```yaml
genre: "Analysis"  # ✓ OK
genre: "analysis"  # ✗ Errore
```

---

**Problema**: `relatedSlugs non trovato`
```
❌ relatedSlugs non validi:
  articolo.mdx: slug "vecchio-articolo" non trovato
```

**Soluzione**: Verifica che lo slug esista
```bash
ls src/content/blog/ | grep vecchio-articolo
```

---

**Problema**: `coverImage mancante`
```
❌ coverImage mancanti:
  articolo.mdx: /images/covers/missing.png non trovato
```

**Soluzione**: Aggiungi immagine o rimuovi riferimento
```bash
# Aggiungi immagine
cp immagine.png public/images/covers/missing.png

# Oppure rimuovi da frontmatter
# coverImage: "/images/covers/missing.png"  ← rimuovi
```

---

### Husky Non Funziona

**Problema**: Hook non si attiva

**Soluzione**:
```bash
# Reinstalla hook
rm -rf .husky
npm install

# Verifica
ls -la .git/hooks/pre-commit
# Dovrebbe essere un link a .husky/pre-commit
```

---

### Sharp Non Installato

**Warning**: `sharp non installato - skip check dimensioni`

**Soluzione** (opzionale):
```bash
npm install -D sharp @types/sharp
```

**Nota**: Non obbligatorio, ma consigliato per check completo immagini

---

## 📚 Risorse

- [METADATA_GUIDE.md](../METADATA_GUIDE.md) - Guida completa ai metadati
- [METADATA_IMPROVEMENTS.md](METADATA_IMPROVEMENTS.md) - Proposte implementate
- [package.json](../package.json) - Tutti gli script npm
- [tests/content.test.ts](../tests/content.test.ts) - Test automatizzati

---

## 🆘 Supporto

Problemi o domande? Controlla:

1. Log errori dettagliati negli script
2. File di test per esempi corretti
3. METADATA_GUIDE.md per reference

---

**Ultimo aggiornamento**: Dicembre 2024
