# Audience Personas — ireneburresi.dev

**Profili dettagliati del pubblico target**  
Versione: 1.0  
Data: Dicembre 2024

---

## Indice

1. [Framework e metodologia](#1-framework-e-metodologia)
2. [Mappa delle Personas](#2-mappa-delle-personas)
3. [Persona 1: Marco — Il Technical Lead](#3-persona-1-marco--il-technical-lead)
4. [Persona 2: Elena — La Decision Maker](#4-persona-2-elena--la-decision-maker)
5. [Persona 3: Alessandro — Il Practitioner](#5-persona-3-alessandro--il-practitioner)
6. [Persona 4: Giulia — La Senior che Scala](#6-persona-4-giulia--la-senior-che-scala)
7. [Anti-Personas (chi NON è il tuo pubblico)](#7-anti-personas-chi-non-è-il-tuo-pubblico)
8. [Matrice Personas × Pillar](#8-matrice-personas--pillar)
9. [Implicazioni per il contenuto](#9-implicazioni-per-il-contenuto)
10. [Schede sintetiche](#10-schede-sintetiche)

---

## 1. Framework e metodologia

### 1.1 Fonti metodologiche

Questo documento usa elementi da:

| Framework | Elementi utilizzati |
|-----------|---------------------|
| **Buyer Personas** (Adele Revella) | Priority Initiatives, Success Factors, Perceived Barriers, Decision Criteria |
| **They Ask You Answer** (Marcus Sheridan) | Le 5 domande che ogni buyer si pone |
| **Jobs To Be Done** (Christensen) | Job funzionale, emotivo, sociale |
| **Empathy Mapping** | Cosa vede, sente, pensa, fa |

### 1.2 Criteri di segmentazione

Le personas sono segmentate su tre assi:

```
                    TECNICO
                       ▲
                       │
            Marco ●    │    ● Giulia
                       │
    OPERATIVO ◄────────┼────────► STRATEGICO
                       │
        Alessandro ●   │    ● Elena
                       │
                       ▼
                   BUSINESS
```

| Asse | Descrizione |
|------|-------------|
| **Tecnico ↔ Business** | Quanto il ruolo è hands-on vs. gestionale |
| **Operativo ↔ Strategico** | Orizzonte temporale delle decisioni (settimane vs. anni) |

### 1.3 Nota metodologica

Queste personas sono costruite su:
- Osservazione diretta (tuoi colleghi in consulenza)
- Pattern comportamentali tipici del settore
- Letteratura su adozione tecnologica enterprise

Sono ipotesi da validare con dati reali (analytics, feedback, survey) dopo 6 mesi di pubblicazione.

---

## 2. Mappa delle Personas

### Overview

| Persona | Ruolo tipico | Seniority | Focus primario | Pillar principali |
|---------|--------------|-----------|----------------|-------------------|
| **Marco** | AI/ML Engineer, Tech Lead | Senior (5-10+ anni) | Costruire sistemi che funzionano | Engineering, Research |
| **Elena** | CTO, Head of Data, VP Engineering | Executive (10-15+ anni) | Decidere investimenti, gestire rischio | Business, Governance |
| **Alessandro** | AI Consultant, Solution Architect | Mid-Senior (4-8 anni) | Portare valore ai clienti | Tutti (generalista) |
| **Giulia** | Senior Data Scientist → Team Lead | Transizione (5-7 anni) | Crescere da IC a leader | Engineering, Methodology, Business |

### Distribuzione attesa del traffico

```
Marco (Technical Lead)     ████████████████████  35%
Elena (Decision Maker)     ████████████          20%
Alessandro (Practitioner)  ████████████████      30%
Giulia (Senior che Scala)  ██████                15%
```

---

## 3. Persona 1: Marco — Il Technical Lead

### 3.1 Profilo

| Attributo | Dettaglio |
|-----------|-----------|
| **Nome fittizio** | Marco |
| **Età** | 32-42 anni |
| **Titolo** | AI/ML Engineer, Technical Lead, Staff Engineer |
| **Azienda tipo** | Mid-large enterprise, scale-up tech, società di consulenza tech |
| **Team** | Guida 2-5 persone o è senior IC in team più grande |
| **Esperienza** | 5-10+ anni in tech, 2-5 in AI/ML specifico |
| **Formazione** | Laurea/Master in CS, Ingegneria, Fisica, Matematica |
| **Città** | Milano, Roma, Torino, Bologna — o remote per azienda internazionale |

### 3.2 Contesto professionale

**Responsabilità quotidiane:**
- Architettura e design di sistemi ML/AI
- Code review e mentoring tecnico
- Traduzione di requisiti business in soluzioni tecniche
- Troubleshooting problemi in produzione
- Valutazione di nuove tecnologie e tool
- Documentazione tecnica

**Stack tipico:**
- Python, FastAPI/Flask
- Cloud (AWS/Azure/GCP)
- MLOps (MLflow, Kubeflow, o equivalenti)
- Vector DB (Pinecone, Weaviate, pgvector)
- LLM APIs (OpenAI, Anthropic, Azure OpenAI)

**Pressioni:**
- Delivery timeline aggressive
- Aspettative business gonfiate dall'hype
- Technical debt accumulato
- Difficoltà a trovare/trattenere talento
- Responsabilità su sistemi critici

### 3.3 Priority Initiatives (cosa sta cercando di fare)

| Priorità | Descrizione | Urgenza |
|----------|-------------|---------|
| **Mettere in produzione sistemi GenAI affidabili** | Passare da POC a produzione senza sorprese | Alta |
| **Ridurre il tempo di debug** | Trovare soluzioni a problemi che i tutorial non coprono | Alta |
| **Restare aggiornato senza perdere tempo** | Filtrare il rumore, capire cosa conta davvero | Media |
| **Costruire credibilità interna** | Essere il riferimento tecnico per AI nel team/azienda | Media |
| **Prepararsi al prossimo step di carriera** | Staff Engineer, Principal, o management track | Bassa |

### 3.4 Jobs To Be Done

| Tipo | Job |
|------|-----|
| **Funzionale** | "Quando devo architettare un sistema RAG, voglio pattern testati in produzione, così evito errori costosi" |
| **Emotivo** | "Quando leggo un articolo tecnico, voglio sentirmi rispettato intellettualmente, non trattato come un novizio" |
| **Sociale** | "Quando condivido una risorsa col team, voglio che mi vedano come quello che trova contenuti di qualità" |

### 3.5 Success Factors (come definisce il successo)

Per Marco, un contenuto ha successo se:

| Criterio | Indicatore |
|----------|------------|
| **Applicabile** | "Posso usare questo lunedì mattina" |
| **Specifico** | Numeri, codice, configurazioni — non principi vaghi |
| **Testato** | L'autore ha fatto questo in produzione, non solo in un notebook |
| **Onesto sui limiti** | Dice quando NON usare l'approccio |
| **Ben strutturato** | Trova l'informazione che cerca in 30 secondi |

### 3.6 Perceived Barriers (obiezioni e resistenze)

| Obiezione | Forma mentis | Come rispondere |
|-----------|--------------|-----------------|
| "Sarà il solito tutorial che funziona solo in demo" | Scottato da contenuti che non scalano | Mostra metriche di produzione, failure modes, edge cases |
| "Non ho tempo per articoli lunghi" | Sovraccarico informativo | Struttura scannable, TL;DR, codice estraibile |
| "Che ne sa lei del mio contesto?" | Scetticismo su applicabilità | Dichiara contesto (enterprise, scale), ammetti limiti |
| "I paper sono più affidabili" | Preferenza per fonti primarie | Linka sempre ai paper, aggiungi analisi pratica |

### 3.7 Buyer's Journey (come cerca e consuma informazioni)

**Fonti primarie:**
- arXiv, Papers With Code
- Blog tecnici (Simon Willison, Chip Huyen, Lilian Weng)
- GitHub (trending, repo specifici)
- Hacker News, Reddit (r/MachineLearning, r/LocalLLaMA)
- Stack Overflow per troubleshooting

**Fonti secondarie:**
- Newsletter tecniche (The Batch, TLDR AI)
- LinkedIn (selettivo, segue pochi)
- YouTube (conference talk, non tutorial basic)
- Slack/Discord community tecniche

**Pattern di consumo:**
- Legge la mattina presto o la sera tardi
- Scannerizza prima, approfondisce se rileva valore
- Bookmarks aggressivo, spesso non torna a leggere
- Condivide su Slack interno se trova qualcosa di buono
- RSS reader o newsletter curate

**Dispositivo:** Prevalentemente desktop (lavoro), mobile per scan iniziale

### 3.8 Le 5 domande (They Ask You Answer)

| Domanda | Declinazione per Marco |
|---------|------------------------|
| **Costi** | "Quanto costa in inference? Qual è il TCO reale?" |
| **Problemi** | "Quali sono i failure modes? Cosa può andare storto?" |
| **Confronti** | "Questo approccio vs. quello: quando usare quale?" |
| **Recensioni** | "Chi l'ha usato in produzione? Con quali risultati?" |
| **Best** | "Qual è il pattern migliore per [caso specifico]?" |

### 3.9 Empathy Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         MARCO PENSA                             │
│                                                                 │
│  "Devo capire se questo approccio regge prima di proporlo"     │
│  "Se va in produzione e si rompe, è colpa mia"                 │
│  "Non ho tempo per cose che non funzionano"                    │
│  "L'AI hype sta creando aspettative impossibili"               │
│                                                                 │
├────────────────────────────┬────────────────────────────────────┤
│         MARCO VEDE         │          MARCO SENTE               │
│                            │                                    │
│  • Demo impressive che     │  • "Perché non siamo ancora in    │
│    non scalano             │     produzione?"                   │
│  • Colleghi che promettono │  • "Il competitor ha già fatto X" │
│    troppo al business      │  • "L'AI può risolvere tutto"     │
│  • Tool nuovi ogni         │  • "Basta un prompt"              │
│    settimana               │                                    │
│  • Progetti AI che         │                                    │
│    falliscono silenziosam. │                                    │
│                            │                                    │
├────────────────────────────┴────────────────────────────────────┤
│                          MARCO FA                               │
│                                                                 │
│  • Prototipa velocemente per validare                          │
│  • Cerca su Google/Stack Overflow quando blocccato             │
│  • Legge paper quando ha tempo (weekend, sera)                 │
│  • Costruisce POC per convincere stakeholder                   │
│  • Documenta (obtorto collo) per il team                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                       FRUSTRAZIONI                              │
│                                                                 │
│  • Tutorial che si fermano al "Hello World"                    │
│  • Documentazione incompleta dei framework                     │
│  • Gap tra paper e implementazione                             │
│  • Aspettative irrealistiche da management                     │
│  • Mancanza di benchmark su use case reali                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.10 Come parlargli

| Aspetto | Indicazione |
|---------|-------------|
| **Tono** | Peer-to-peer. Non insegni: condividi |
| **Livello tecnico** | Alto. Non spiegare concetti base. |
| **Prove** | Codice > slide. Metriche > aggettivi. |
| **Struttura** | TL;DR upfront, poi dettaglio. Heading navigabili. |
| **CTA** | "Condividi col team", non "Iscriviti ora" |

### 3.11 Content preferences

| ✅ Vuole | ❌ Non vuole |
|----------|-------------|
| Architetture con diagrammi | Overview generiche |
| Codice funzionante | Pseudocodice vago |
| Benchmark comparativi | "È veloce" senza numeri |
| Failure modes e edge cases | Solo happy path |
| Link a paper/repo originali | "Fonti varie" |

---

## 4. Persona 2: Elena — La Decision Maker

### 4.1 Profilo

| Attributo | Dettaglio |
|-----------|-----------|
| **Nome fittizio** | Elena |
| **Età** | 40-52 anni |
| **Titolo** | CTO, VP Engineering, Head of Data & AI, CDO |
| **Azienda tipo** | Enterprise italiana, filiale italiana di multinazionale, grande PMI |
| **Team** | Gestisce 15-50+ persone, budget significativo |
| **Esperienza** | 15-20+ anni in tech, 5+ in ruoli executive |
| **Formazione** | Laurea tecnica + MBA o equivalente executive education |
| **Città** | Milano (prevalentemente), Roma |

### 4.2 Contesto professionale

**Responsabilità quotidiane:**
- Definizione strategia tecnologica
- Allocazione budget e risorse
- Hiring e sviluppo leadership
- Relazione con CEO/Board su temi tech
- Valutazione vendor e partnership
- Governance e compliance

**Pressioni:**
- Board che chiede "cosa stiamo facendo con l'AI"
- Competitor che annunciano iniziative AI
- Budget limitato vs. aspettative infinite
- Talent acquisition difficile
- Responsabilità su rischio e compliance
- Bilanciare innovazione e stabilità

**Orizzonte temporale:** Pensa in trimestri e anni, non settimane

### 4.3 Priority Initiatives

| Priorità | Descrizione | Urgenza |
|----------|-------------|---------|
| **Costruire strategia AI difendibile** | Roadmap che regge scrutinio del Board | Alta |
| **Allocare budget in modo razionale** | Evitare investimenti che non generano ROI | Alta |
| **Gestire aspettative** | Né oversell né undersell delle capability AI | Media |
| **Compliance e rischio** | Capire AI Act, gestire rischio reputazionale | Media |
| **Attrarre e trattenere talento AI** | Competere per profili scarsi | Media |

### 4.4 Jobs To Be Done

| Tipo | Job |
|------|-----|
| **Funzionale** | "Quando devo presentare al Board, voglio dati e framework credibili, così prendo decisioni difendibili" |
| **Emotivo** | "Quando leggo un report sull'AI, voglio sentirmi informata senza sentirmi venduta qualcosa" |
| **Sociale** | "Quando parlo con peer CTO, voglio avere insight che loro non hanno" |

### 4.5 Success Factors

Per Elena, un contenuto ha successo se:

| Criterio | Indicatore |
|----------|------------|
| **Executive-ready** | Può usare dati/framework in una presentazione al Board |
| **Senza conflitto di interesse** | Non è content marketing mascherato |
| **Contestualizzato** | Tiene conto del contesto italiano/europeo |
| **Azionabile** | Traduce insight in decisioni concrete |
| **Ben sourced** | Fonti verificabili, non "secondo esperti" |

### 4.6 Perceived Barriers

| Obiezione | Forma mentis | Come rispondere |
|-----------|--------------|-----------------|
| "È troppo tecnico per me" | Non ha tempo per dettagli implementativi | Offri executive summary, poi dettaglio opzionale |
| "I vendor mi dicono già queste cose" | Sovraesposta a pitch commerciali | Differenziati con assenza di conflitto di interesse |
| "Nel mio settore è diverso" | Scetticismo su applicabilità | Usa esempi cross-industry, evidenzia principi trasferibili |
| "L'anno scorso era blockchain, ora AI" | Hype fatigue | Riconosci il pattern, distingui hype da sostanza |

### 4.7 Buyer's Journey

**Fonti primarie:**
- Report McKinsey, BCG, Deloitte, Gartner
- Harvard Business Review
- Il Sole 24 Ore (sezione tech)
- MIT Sloan Management Review
- Peer network (altri CTO, eventi executive)

**Fonti secondarie:**
- LinkedIn (segue thought leader selezionati)
- Newsletter business (Stratechery, The Economist)
- Podcast durante commute
- Conference executive (non tech deep-dive)

**Pattern di consumo:**
- Tempo di lettura limitato: 10-15 min max per articolo
- Legge durante commute, viaggi, weekend
- Assistente che filtra e segnala
- Preferisce summary con opzione di approfondimento
- Salva per dopo, spesso non torna

**Dispositivo:** Mobile prevalente, tablet in viaggio

### 4.8 Le 5 domande

| Domanda | Declinazione per Elena |
|---------|------------------------|
| **Costi** | "Qual è il TCO? Quali costi nascosti?" |
| **Problemi** | "Cosa può andare storto? Quali sono i rischi?" |
| **Confronti** | "Build vs. buy? Vendor A vs. B?" |
| **Recensioni** | "Chi l'ha fatto? Con quali risultati di business?" |
| **Best** | "Qual è la best practice per organizzazioni come la mia?" |

### 4.9 Empathy Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         ELENA PENSA                             │
│                                                                 │
│  "Se approvo questo e fallisce, è responsabilità mia"          │
│  "Il Board vuole risultati, non esperimenti"                   │
│  "Non posso permettermi di sembrare indietro sui competitor"   │
│  "Ma non posso neanche bruciare budget su hype"                │
│                                                                 │
├────────────────────────────┬────────────────────────────────────┤
│         ELENA VEDE         │          ELENA SENTE               │
│                            │                                    │
│  • Vendor che promettono   │  • "Quando avremo AI come loro?"  │
│    miracoli                │  • "Cosa stiamo facendo con l'AI?"|
│  • Competitor che          │  • "I nostri competitor sono più  │
│    annunciano AI           │     avanti"                       │
│  • Report con numeri       │  • "L'AI risolverà X"             │
│    impressionanti          │  • "Perché ci mettiamo così       │
│  • Team tech che chiede    │     tanto?"                       │
│    budget                  │                                    │
│                            │                                    │
├────────────────────────────┴────────────────────────────────────┤
│                          ELENA FA                               │
│                                                                 │
│  • Riunioni con Board/CEO per allineare aspettative            │
│  • Valutazione di business case per investimenti               │
│  • Networking con peer CTO per benchmark                       │
│  • Delega approfondimento tecnico ai team lead                 │
│  • Firma su compliance e risk assessment                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                       FRUSTRAZIONI                              │
│                                                                 │
│  • Report di consulenza che costano ma non dicono come fare    │
│  • Vendor che vendono sogni                                    │
│  • Gap tra aspettative Board e realtà tecnica                  │
│  • Difficoltà a valutare competenze AI in hiring               │
│  • Incertezza normativa (AI Act)                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.10 Come parlarle

| Aspetto | Indicazione |
|---------|-------------|
| **Tono** | Rispettoso, peer-level ma non tecnico |
| **Livello tecnico** | Medio-basso. Spiega implicazioni, non implementazione |
| **Prove** | ROI, case study business, framework decisionali |
| **Struttura** | Executive summary PRIMA, dettaglio per chi vuole |
| **CTA** | "Condividi con il tuo team tech", "Usa questo framework" |

### 4.11 Content preferences

| ✅ Vuole | ❌ Non vuole |
|----------|-------------|
| Framework decisionali | Dettagli implementativi |
| Numeri di business (ROI, costi) | Solo metriche tecniche |
| Case study enterprise | Esempi da startup |
| Rischi e mitigation | Solo upside |
| Contesto normativo EU | Focus solo US |

---

## 5. Persona 3: Alessandro — Il Practitioner

### 5.1 Profilo

| Attributo | Dettaglio |
|-----------|-----------|
| **Nome fittizio** | Alessandro |
| **Età** | 30-40 anni |
| **Titolo** | AI Consultant, Senior Consultant, Solution Architect, Manager |
| **Azienda tipo** | Società di consulenza (Big4, boutique tech, system integrator) |
| **Team** | Lavora su progetti cliente, spesso in team variabili |
| **Esperienza** | 4-8 anni post-laurea, di cui 2-4 in AI/ML |
| **Formazione** | Laurea STEM, possibili certificazioni cloud/ML |
| **Città** | Milano prevalentemente, ma viaggia per clienti |

### 5.2 Contesto professionale

**Responsabilità quotidiane:**
- Assessment e scoping progetti AI per clienti
- Design di soluzioni (proposal, architettura)
- Delivery di progetti (hands-on o supervisione)
- Sviluppo materiali e methodology
- Pre-sales e supporto commerciale
- Formazione e upskilling clienti

**Pressioni:**
- Billability e utilization
- Aspettative cliente vs. realtà
- Doversi vendere come esperto anche su cose nuove
- Aggiornamento continuo su tecnologie che cambiano
- Competizione interna per progetti interessanti
- Work-life balance difficile

**Doppia natura:** Deve essere abbastanza tecnico da costruire e abbastanza business da vendere.

### 5.3 Priority Initiatives

| Priorità | Descrizione | Urgenza |
|----------|-------------|---------|
| **Portare valore ai clienti** | Delivery che genera risultati reali | Alta |
| **Essere credibile su AI** | Rispondere alle domande dei clienti con competenza | Alta |
| **Restare aggiornato velocemente** | Tempo limitato, deve massimizzare ROI dell'apprendimento | Alta |
| **Costruire asset riutilizzabili** | Framework, template, accelerator | Media |
| **Crescere verso ruoli senior** | Manager, Principal, Partner track | Media |

### 5.4 Jobs To Be Done

| Tipo | Job |
|------|-----|
| **Funzionale** | "Quando preparo una proposta, voglio dati e framework credibili, così convinco il cliente" |
| **Emotivo** | "Quando il cliente fa una domanda difficile, voglio sentirmi preparato, non colto in fallo" |
| **Sociale** | "Quando presento al cliente, voglio essere visto come l'esperto che risolve i loro problemi" |

### 5.5 Success Factors

Per Alessandro, un contenuto ha successo se:

| Criterio | Indicatore |
|----------|------------|
| **Riutilizzabile** | Può adattare framework/dati per proposal o delivery |
| **Credibile** | Fonti che può citare con i clienti |
| **Bilanciato** | Abbastanza tecnico da essere solido, abbastanza business da essere utile |
| **Attuale** | Non roba vecchia di 6 mesi |
| **Differenziante** | Qualcosa che i competitor non sanno |

### 5.6 Perceived Barriers

| Obiezione | Forma mentis | Come rispondere |
|-----------|--------------|-----------------|
| "I clienti vogliono cose diverse" | Ogni progetto è un caso speciale | Offri principi adattabili, non ricette fisse |
| "Non ho tempo per leggere paper" | Sempre in delivery o travel | Fai tu la sintesi, risparmiagli tempo |
| "Devo sembrare esperto anche se sto imparando" | Pressione da ruolo | Dagli materiale che può studiare velocemente |
| "In consulenza le cose sono diverse" | Context specifico | Riconosci il contesto, usa esempi consulenza |

### 5.7 Buyer's Journey

**Fonti primarie:**
- Report della propria firm (McKinsey per chi è in McKinsey, etc.)
- Blog e contenuti dei vendor (per capire cosa vendono)
- LinkedIn (molto attivo, sia consumo che produzione)
- Newsletter generaliste tech (The Batch, TLDR)
- Training interni della firm

**Fonti secondarie:**
- Paper (quando deve approfondire per un progetto specifico)
- Podcast durante viaggi/commute
- Corsi online (Coursera, firm learning platform)
- Community di pratica interne

**Pattern di consumo:**
- Consuma in momenti frammentati (aerei, treni, attese)
- Molto mobile
- Salva articoli per leggerli poi (spesso non li legge)
- Condivide attivamente su LinkedIn (personal branding)
- Cerca contenuti "ready to use" per progetti

**Dispositivo:** Mobile prevalente, laptop quando in "focus time"

### 5.8 Le 5 domande

| Domanda | Declinazione per Alessandro |
|---------|------------------------|
| **Costi** | "Come presento i costi al cliente in modo credibile?" |
| **Problemi** | "Quali problemi incontrerò e come li prevengo?" |
| **Confronti** | "Come si posiziona questa soluzione vs. le alternative?" |
| **Recensioni** | "Che case study posso citare?" |
| **Best** | "Qual è la best practice che posso proporre?" |

### 5.9 Empathy Map

```
┌─────────────────────────────────────────────────────────────────┐
│                       ALESSANDRO PENSA                          │
│                                                                 │
│  "Devo sembrare esperto anche sulle cose che sto imparando"    │
│  "Il cliente si aspetta che io sappia tutto"                   │
│  "Devo differenziarmi dai competitor in gara"                  │
│  "Non ho tempo per approfondire, ma devo farlo"                │
│                                                                 │
├────────────────────────────┬────────────────────────────────────┤
│      ALESSANDRO VEDE       │        ALESSANDRO SENTE            │
│                            │                                    │
│  • Competitor che fanno    │  • "Cosa state facendo con l'AI?" │
│    pitch aggressivi        │  • "Ma funziona davvero?"         │
│  • Clienti con aspettative │  • "Il competitor ci ha detto X"  │
│    gonfiate                │  • "Quando avremo risultati?"     │
│  • Colleghi che sembrano   │                                    │
│    sapere tutto            │                                    │
│  • Progetti che falliscono │                                    │
│    ma nessuno ne parla     │                                    │
│                            │                                    │
├────────────────────────────┴────────────────────────────────────┤
│                       ALESSANDRO FA                             │
│                                                                 │
│  • Prepara proposal e presentazioni                            │
│  • Studia durante viaggi                                       │
│  • Fa networking interno per staffing su progetti AI           │
│  • Cura LinkedIn per personal branding                         │
│  • Supporta sales call come "esperto tecnico"                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                       FRUSTRAZIONI                              │
│                                                                 │
│  • Tempo insufficiente per approfondire                        │
│  • Gap tra ciò che si vende e ciò che si può consegnare        │
│  • Clienti con aspettative irrealistiche                       │
│  • Contenuti o troppo tecnici o troppo superficiali            │
│  • Mancanza di case study concreti da citare                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.10 Come parlargli

| Aspetto | Indicazione |
|---------|-------------|
| **Tono** | Collega senior che condivide, non professore che insegna |
| **Livello tecnico** | Medio-alto. Comprende tech, ma non sempre fa hands-on |
| **Prove** | Framework riutilizzabili, dati citabili, case study |
| **Struttura** | Key takeaways evidenti, "so what" esplicito |
| **CTA** | "Salva per la prossima proposta", "Condividi col team" |

### 5.11 Content preferences

| ✅ Vuole | ❌ Non vuole |
|----------|-------------|
| Framework adattabili | Soluzioni troppo specifiche |
| Dati e numeri citabili | Opinioni senza fonti |
| Bilanciamento tech/business | Solo uno dei due |
| Case study anche anonimizzati | Solo teoria |
| Sintesi con option to deep-dive | Wall of text |

---

## 6. Persona 4: Giulia — La Senior che Scala

### 6.1 Profilo

| Attributo | Dettaglio |
|-----------|-----------|
| **Nome fittizio** | Giulia |
| **Età** | 28-35 anni |
| **Titolo** | Senior Data Scientist, Senior ML Engineer → Team Lead, Tech Lead |
| **Azienda tipo** | Enterprise, scale-up, consulting |
| **Team** | IC senior in transizione a primo ruolo di leadership (2-4 persone) |
| **Esperienza** | 5-7 anni post-laurea, interamente in data/AI |
| **Formazione** | Laurea/Master in Data Science, Statistics, CS |
| **Città** | Milano, remote |

### 6.2 Contesto professionale

**Responsabilità in evoluzione:**
- Ancora hands-on ma meno di prima
- Primi task di people management
- Code review e mentoring junior
- Traduzione business-tech (nuova skill)
- Decisioni architetturali
- Inizio visibilità con stakeholder non-tech

**Pressioni:**
- Imposter syndrome su ruolo manageriale
- Paura di perdere skill tecniche
- Incertezza su IC track vs. management track
- Responsabilità su persone, non solo codice
- Aspettative più alte da leadership

**Transizione chiave:** Da "essere la più brava tecnicamente" a "far crescere altri"

### 6.3 Priority Initiatives

| Priorità | Descrizione | Urgenza |
|----------|-------------|---------|
| **Capire come essere un buon lead** | Bilanciare tech e people | Alta |
| **Non perdere competenze tecniche** | Restare credibile come tecnico | Alta |
| **Comunicare con non-tech** | Nuova audience (business, stakeholder) | Media |
| **Definire il proprio percorso** | IC track vs. management track | Media |
| **Costruire reputation** | Visibilità interna e esterna | Bassa |

### 6.4 Jobs To Be Done

| Tipo | Job |
|------|-----|
| **Funzionale** | "Quando devo guidare il team su una scelta tecnica, voglio essere sicura della direzione, così mantengo credibilità" |
| **Emotivo** | "Quando leggo contenuti su leadership, voglio sentirmi meno sola nella transizione" |
| **Sociale** | "Quando parlo con il mio manager, voglio essere vista come pronta per il prossimo step" |

### 6.5 Success Factors

Per Giulia, un contenuto ha successo se:

| Criterio | Indicatore |
|----------|------------|
| **Rilevante per la transizione** | Parla di crescita IC → Lead |
| **Tecnico ma non solo** | Mescola tech e soft skill |
| **Onesto** | Non fa sembrare tutto facile |
| **Pratico** | Cose che può provare questa settimana |
| **Non paternalistico** | Non assume che non sappia già |

### 6.6 Perceived Barriers

| Obiezione | Forma mentis | Come rispondere |
|-----------|--------------|-----------------|
| "I contenuti su leadership sono troppo generici" | Cerca specifico per tech lead | Offri contenuti specifici per transizione IC→Lead in AI |
| "Non ho tempo per leggere libri di management" | Già sovraccarica | Sintesi pratiche, non teoria |
| "Tutti parlano come se fosse facile" | Imposter syndrome | Normalizza le difficoltà della transizione |
| "Il mio contesto è specifico" | Ogni azienda è diversa | Principi adattabili > ricette fisse |

### 6.7 Buyer's Journey

**Fonti primarie:**
- Stessi contenuti di Marco (tecnici)
- Blog su engineering management (Will Larson, Charity Majors)
- LinkedIn (inizia a essere più attiva)
- Libri su leadership tech (The Manager's Path, Staff Engineer)
- Mentor/coach interno

**Fonti secondarie:**
- Newsletter su leadership (Lara Hogan, Software Lead Weekly)
- Podcast durante commute
- Community interne (women in tech, leadership cohort)
- Conference talk su eng leadership

**Pattern di consumo:**
- Cerca contenuti specifici quando ha un problema
- Legge di sera/weekend per formazione
- Bookmarks molto, legge selettivamente
- Inizia a condividere (personal branding in costruzione)

**Dispositivo:** Mix desktop/mobile

### 6.8 Empathy Map

```
┌─────────────────────────────────────────────────────────────────┐
│                        GIULIA PENSA                             │
│                                                                 │
│  "Sono pronta per questo ruolo o sto faking it?"               │
│  "Non voglio perdere le mie competenze tecniche"               │
│  "Come faccio a far crescere altri se ho ancora da imparare?"  │
│  "Tutti sembrano sapere cosa fare tranne me"                   │
│                                                                 │
├────────────────────────────┬────────────────────────────────────┤
│        GIULIA VEDE         │          GIULIA SENTE              │
│                            │                                    │
│  • Colleghi IC senior che  │  • "Sei pronta per il prossimo    │
│    sembrano più competenti │     step"                         │
│  • Manager che non fanno   │  • "Devi delegare di più"         │
│    più hands-on            │  • "Come sta andando il team?"    │
│  • Junior che chiedono     │  • "Hai pensato al tuo career     │
│    guidance                │     path?"                        │
│  • Meeting aumentati       │                                    │
│    rispetto a tempo code   │                                    │
│                            │                                    │
├────────────────────────────┴────────────────────────────────────┤
│                         GIULIA FA                               │
│                                                                 │
│  • Bilancia coding e meeting                                   │
│  • 1:1 con i diretti (ancora learning)                         │
│  • Code review come teaching moment                            │
│  • Cerca di proteggere "deep work time"                        │
│  • Legge su leadership quando può                              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                       FRUSTRAZIONI                              │
│                                                                 │
│  • Imposter syndrome                                           │
│  • Meno tempo per tech, più per meeting                        │
│  • Feedback a persone è difficile                              │
│  • Non sa se sta facendo bene                                  │
│  • Contenuti leadership troppo generici                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.9 Come parlarle

| Aspetto | Indicazione |
|---------|-------------|
| **Tono** | Peer che è passata dalla stessa transizione |
| **Livello tecnico** | Alto, ma con bridge verso soft skill |
| **Prove** | Esperienze reali, non teoria |
| **Struttura** | Pratico, "prova questo" |
| **CTA** | "Unisciti alla newsletter", "Condividi con altri in transizione" |

### 6.10 Content preferences

| ✅ Vuole | ❌ Non vuole |
|----------|-------------|
| Mix tech + leadership | Solo uno dei due |
| Esperienze di transizione reali | Teoria HR generica |
| Cose da provare questa settimana | Principi astratti |
| Normalizzazione delle difficoltà | "È facile, basta..." |
| Workflow e productivity per lead | Solo IC stuff |

---

## 7. Anti-Personas (chi NON è il tuo pubblico)

Definire chi NON vuoi è importante quanto definire chi vuoi. Evita di diluire il messaggio cercando di piacere a tutti.

### 7.1 Il Marketer Non-Tecnico

| Attributo | Dettaglio |
|-----------|-----------|
| **Chi è** | Marketing manager, digital marketer, content marketer |
| **Perché non è target** | Cerca contenuti su "AI per marketing", tool no-code, hype facile da vendere internamente |
| **Rischio se incluso** | Diluisce il livello tecnico, richiede semplificazioni eccessive |
| **Come escluderlo** | Livello tecnico del contenuto, assenza di "AI for X" generici |

### 7.2 Il Curioso Generico

| Attributo | Dettaglio |
|-----------|-----------|
| **Chi è** | Persona interessata all'AI per cultura generale, non per lavoro |
| **Perché non è target** | Non ha contesto per applicare, non converte, non condivide in contesti professionali |
| **Rischio se incluso** | Richiede semplificazioni che annoiano i professionisti |
| **Come escluderlo** | Assunzioni implicite di contesto professionale |

### 7.3 Lo Studente Entry-Level

| Attributo | Dettaglio |
|-----------|-----------|
| **Chi è** | Studente universitario o neolaureato senza esperienza lavorativa |
| **Perché non è target** | Cerca tutorial base, non ha contesto enterprise, non ha potere decisionale |
| **Rischio se incluso** | Richiede spiegazioni di concetti base che rallentano i senior |
| **Come escluderlo** | Non spiegare concetti fondamentali, assumere esperienza |

### 7.4 L'AI Hypist

| Attributo | Dettaglio |
|-----------|-----------|
| **Chi è** | Persona che vede AI come soluzione a tutto, spesso non tecnica |
| **Perché non è target** | Cerca conferme, non analisi critica; il tono del blog lo allontanerà naturalmente |
| **Rischio se incluso** | Nessuno, si auto-escluderà |
| **Come escluderlo** | Il tono stesso del contenuto |

### 7.5 L'Accademico Puro

| Attributo | Dettaglio |
|-----------|-----------|
| **Chi è** | Ricercatore accademico senza interesse per applicazioni pratiche |
| **Perché non è target** | Legge paper originali, non ha bisogno di traduzioni pratiche |
| **Rischio se incluso** | Potrebbe criticare semplificazioni necessarie per audience pratica |
| **Come escluderlo** | Focus su applicazione pratica, non su contributo teorico |

---

## 8. Matrice Personas × Pillar

Quale persona legge quale pillar, e con quale priorità.

### 8.1 Matrice di rilevanza

| Pillar | Marco | Elena | Alessandro | Giulia |
|--------|:-----:|:-----:|:----------:|:------:|
| **Engineering** | ●●●●● | ○ | ●●● | ●●●● |
| **Research** | ●●●● | ○ | ●● | ●●● |
| **Business** | ●● | ●●●●● | ●●●● | ●●● |
| **Governance** | ●● | ●●●●● | ●●● | ●● |
| **Methodology** | ●●● | ○ | ●●● | ●●●●● |
| **Altro** | ●● | ● | ●● | ●●● |

*Legenda: ●●●●● = Primario | ●●● = Secondario | ● = Occasionale | ○ = Non rilevante*

### 8.2 Implicazioni per pillar

| Pillar | Persona primaria | Tono/Livello | Focus |
|--------|------------------|--------------|-------|
| **Engineering** | Marco | Tecnico, peer-to-peer | Implementazione, troubleshooting |
| **Research** | Marco | Tecnico-analitico | Paper analysis, implicazioni pratiche |
| **Business** | Elena, Alessandro | Business con fondamento tecnico | ROI, framework decisionali |
| **Governance** | Elena, Alessandro | Chiaro, azionabile | Compliance, rischio, EU context |
| **Methodology** | Giulia | Personale, pratico | Workflow, crescita, productivity |
| **Altro** | Tutti | Riflessivo | Connessioni, meta-temi |

---

## 9. Implicazioni per il contenuto

### 9.1 Calibrazione per persona

| Quando scrivi per... | Assumi che... | Quindi... |
|----------------------|---------------|-----------|
| **Marco** | Sa cosa è RAG, conosce Python, ha sistemi in prod | Non spiegare basics, vai dritto ai dettagli |
| **Elena** | Non fa coding, decide budget, risponde al Board | Apri con business impact, tecnico come approfondimento |
| **Alessandro** | Capisce tech ma cerca asset riutilizzabili | Offri framework, dati citabili, takeaway chiari |
| **Giulia** | Competente tech, insicura su leadership | Mescola tech e soft, normalizza difficoltà |

### 9.2 Struttura articoli per audience mista

Quando un articolo è per multiple personas:

```
┌─────────────────────────────────────────────────────────────────┐
│  EXECUTIVE SUMMARY (per Elena, Alessandro)                     │
│  • Problema                                                     │
│  • Implicazione business                                       │
│  • Conclusione/raccomandazione                                 │
├─────────────────────────────────────────────────────────────────┤
│  CORPO ARTICOLO (per tutti)                                    │
│  • Contesto                                                     │
│  • Analisi/Argomento                                           │
│  • Framework/Pattern                                           │
├─────────────────────────────────────────────────────────────────┤
│  DETTAGLIO TECNICO (per Marco, Giulia)                        │
│  • Implementazione                                             │
│  • Codice                                                       │
│  • Metriche specifiche                                         │
└─────────────────────────────────────────────────────────────────┘
```

### 9.3 Checklist pre-pubblicazione per personas

Prima di pubblicare, verifica:

- [ ] **Chi è la persona primaria di questo pezzo?** (deve essere chiaro)
- [ ] **Il livello tecnico è calibrato per quella persona?**
- [ ] **Le prove/evidenze sono del tipo che quella persona trova credibili?**
- [ ] **La CTA è appropriata per quella persona?**
- [ ] **Le persone secondarie possono comunque trarre valore?**

---

## 10. Schede sintetiche

### Marco — Il Technical Lead

```
┌─────────────────────────────────────────────────────────────────┐
│                       MARCO — QUICK CARD                        │
├─────────────────────────────────────────────────────────────────┤
│  RUOLO          AI/ML Engineer, Tech Lead                      │
│  SENIORITY      Senior (5-10+ anni)                            │
│  PILLAR         Engineering, Research                           │
│                                                                 │
│  VUOLE          Pattern testati, codice, metriche              │
│  NON VUOLE      Tutorial base, teoria senza pratica            │
│                                                                 │
│  LEGGE          Paper, blog tecnici, GitHub, HN                │
│  TONO           Peer-to-peer, alto livello tecnico             │
│                                                                 │
│  PROVA CHE      "Posso usare questo lunedì in produzione"      │
│  FUNZIONA                                                       │
│                                                                 │
│  OBIEZIONE      "Sarà il solito tutorial che non scala"        │
│  PRINCIPALE                                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Elena — La Decision Maker

```
┌─────────────────────────────────────────────────────────────────┐
│                       ELENA — QUICK CARD                        │
├─────────────────────────────────────────────────────────────────┤
│  RUOLO          CTO, VP Engineering, Head of Data              │
│  SENIORITY      Executive (15+ anni)                           │
│  PILLAR         Business, Governance                            │
│                                                                 │
│  VUOLE          Framework decisionali, ROI, rischi             │
│  NON VUOLE      Dettagli implementativi, hype                  │
│                                                                 │
│  LEGGE          Report McKinsey, HBR, Sole24Ore, peer network  │
│  TONO           Rispettoso, business-oriented                   │
│                                                                 │
│  PROVA CHE      "Posso usare questo dato in una slide Board"   │
│  FUNZIONA                                                       │
│                                                                 │
│  OBIEZIONE      "I vendor mi dicono già queste cose"           │
│  PRINCIPALE                                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Alessandro — Il Practitioner

```
┌─────────────────────────────────────────────────────────────────┐
│                    ALESSANDRO — QUICK CARD                      │
├─────────────────────────────────────────────────────────────────┤
│  RUOLO          AI Consultant, Solution Architect              │
│  SENIORITY      Mid-Senior (4-8 anni)                          │
│  PILLAR         Tutti (generalista)                             │
│                                                                 │
│  VUOLE          Framework riutilizzabili, dati citabili        │
│  NON VUOLE      Troppo tecnico O troppo superficiale           │
│                                                                 │
│  LEGGE          Report firm, LinkedIn, vendor content          │
│  TONO           Collega senior che condivide                    │
│                                                                 │
│  PROVA CHE      "Posso adattare questo per una proposta"       │
│  FUNZIONA                                                       │
│                                                                 │
│  OBIEZIONE      "Non ho tempo per approfondire"                │
│  PRINCIPALE                                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Giulia — La Senior che Scala

```
┌─────────────────────────────────────────────────────────────────┐
│                       GIULIA — QUICK CARD                       │
├─────────────────────────────────────────────────────────────────┤
│  RUOLO          Senior DS/ML Eng → Team Lead                   │
│  SENIORITY      In transizione (5-7 anni)                      │
│  PILLAR         Engineering, Methodology                        │
│                                                                 │
│  VUOLE          Mix tech + leadership, esperienze reali        │
│  NON VUOLE      Teoria HR generica, "è facile"                 │
│                                                                 │
│  LEGGE          Blog tech, eng management, mentor              │
│  TONO           Peer che ha fatto la stessa transizione        │
│                                                                 │
│  PROVA CHE      "Qualcuno capisce cosa sto passando"           │
│  FUNZIONA                                                       │
│                                                                 │
│  OBIEZIONE      "I contenuti leadership sono troppo generici"  │
│  PRINCIPALE                                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Appendice: Validazione Personas

### Come validare queste ipotesi

| Metodo | Timeline | Cosa misuri |
|--------|----------|-------------|
| **Analytics** | Primi 3 mesi | Pillar più letti, tempo su pagina, bounce rate |
| **Survey iscritti** | Mese 3-6 | Ruolo, seniority, obiettivi, feedback |
| **Interviste qualitative** | Mese 6+ | Deep dive su 5-10 lettori attivi |
| **Commenti/feedback** | Continuo | Pattern nei feedback spontanei |
| **LinkedIn engagement** | Continuo | Chi condivide, chi commenta, profili |

### Trigger per revisione

Rivedi le personas se:

- [ ] Analytics mostrano pillar inattesi come top performer
- [ ] Feedback ripetuto di "troppo tecnico" o "troppo superficiale"
- [ ] Profili che commentano/condividono sono diversi dalle personas
- [ ] Cambio significativo nel tuo posizionamento o offerta

---

*Documento da rivalidare dopo 6 mesi di pubblicazione con dati reali.*