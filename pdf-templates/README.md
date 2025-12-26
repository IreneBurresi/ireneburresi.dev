# Template PDF per il Blog

Questa directory contiene 5 template HTML + CSS compatibili con WeasyPrint per convertire gli articoli del blog in PDF scaricabili.

## 📋 Template disponibili

### 1. Minimal Elegant (`template-1-minimal-elegant.html`)
- **Stile**: Minimalista ed elegante
- **Colori**: Viola primario (#65558f)
- **Caratteristiche**:
  - Focus sulla leggibilità
  - Molto spazio bianco
  - Stat badges e highlight box
  - Perfect per articoli lunghi e densi

### 2. Magazine Modern (`template-2-magazine-modern.html`)
- **Stile**: Magazine moderno
- **Colori**: Coral/Pink (#8c4a60)
- **Caratteristiche**:
  - Layout a due colonne
  - Header colorato con gradiente
  - Pullquote e sidebar
  - Tipografia editoriale Georgia

### 3. Academic Professional (`template-3-academic-professional.html`)
- **Stile**: Accademico formale
- **Colori**: Teal (#006a6a)
- **Caratteristiche**:
  - Abstract e bibliografia strutturata
  - Tabelle dati
  - Small-caps per i titoli
  - Perfetto per report professionali

### 4. Editorial Bold (`template-4-editorial-bold.html`)
- **Stile**: Editoriale bold e impattante
- **Colori**: Mix viola (#65558f) + coral (#8c4a60)
- **Caratteristiche**:
  - Tipografia grande e bold
  - Gradienti e stat hero
  - Contrasti forti
  - Visual impact elevato

### 5. Technical Report (`template-5-technical-report.html`)
- **Stile**: Technical report
- **Colori**: Teal (#006a6a)
- **Caratteristiche**:
  - Font monospace (Courier New)
  - Data blocks e metriche
  - Header documento formale
  - Tabelle strutturate

## 🚀 Installazione e uso

### Requisiti

```bash
# Installa WeasyPrint
pip install weasyprint

# Su macOS potrebbero servire dipendenze aggiuntive
brew install cairo pango gdk-pixbuf libffi
```

### Conversione in PDF

#### Opzione 1: Script automatico

```bash
# Converti tutti i template
python convert-to-pdf.py
```

I PDF saranno generati nella directory `output/`.

#### Opzione 2: Conversione singola

```bash
# Converti un singolo template
weasyprint template-1-minimal-elegant.html output/template-1.pdf
```

#### Opzione 3: Da Python

```python
from weasyprint import HTML

HTML('template-1-minimal-elegant.html').write_pdf('output.pdf')
```

## 🎨 Personalizzazione

Ogni template può essere personalizzato modificando:

1. **Colori**: Cerca e sostituisci gli hex code nei `<style>`
2. **Font**: Modifica le `font-family` declarations
3. **Spacing**: Modifica padding e margin
4. **Layout**: Modifica la struttura HTML

### Colori del blog disponibili

```css
/* Primary - Viola */
--primary: #65558f;
--primary-container: #e9ddff;
--on-primary-container: #4d3d75;

/* Secondary - Teal */
--secondary: #006a6a;
--secondary-container: #9cf1f0;
--on-secondary-container: #004f4f;

/* Tertiary - Coral/Pink */
--tertiary: #8c4a60;
--tertiary-container: #ffd9e2;
--on-tertiary-container: #703349;
```

## 📖 Compatibilità WeasyPrint

I template sono stati progettati tenendo conto delle limitazioni di WeasyPrint:

✅ **Supportato:**
- CSS Paged Media (`@page`, `@top-center`, ecc.)
- CSS2.1 completo
- Subset CSS3 (border-radius, gradients, shadows)
- Web fonts (incluso da URL o embedded)
- Tabelle e layout classici

❌ **Non supportato:**
- Flexbox/Grid moderno (supporto parziale)
- JavaScript
- CSS Custom Properties (limitato, meglio usare valori diretti)
- Transform 3D

## 🔧 Integrazione nel blog

Per integrare la funzionalità di download PDF nel blog:

1. Creare un endpoint API per la conversione
2. Passare il contenuto MDX al template
3. Generare il PDF on-demand
4. Servire il file o salvarlo

Esempio base:

```javascript
// pages/api/generate-pdf.js
import { HTML } from 'weasyprint';

export default async function handler(req, res) {
  const { slug } = req.query;

  // 1. Fetch articolo
  const article = await getArticle(slug);

  // 2. Render template con contenuto
  const html = renderTemplate(article, 'template-1-minimal-elegant');

  // 3. Genera PDF
  const pdf = await HTML(html).write_pdf();

  // 4. Return PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdf);
}
```

## 📝 Note

- I template usano HTML semantico per migliore accessibilità
- Le immagini devono essere embedded o accessibili via HTTP
- I gradient potrebbero non funzionare in alcune versioni vecchie di WeasyPrint
- Testare sempre il rendering prima del deploy

## 🤝 Contribuire

Per aggiungere nuovi template:

1. Creare `template-N-nome-descrittivo.html`
2. Usare i colori Material Design 3 del blog
3. Testare con WeasyPrint
4. Documentare qui le caratteristiche

---

**Autore**: Irene Burresi
**Licenza**: Stesso del blog
