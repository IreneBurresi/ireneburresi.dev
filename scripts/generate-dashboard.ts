#!/usr/bin/env npx tsx
/**
 * Generatore Dashboard Metadati HTML
 *
 * Genera una pagina HTML statica con visualizzazioni dei metadati:
 * - Grafici distribuzione pillar/tag
 * - Timeline pubblicazioni
 * - Coverage metadati opzionali
 * - Tag cloud
 * - Statistiche SEO
 *
 * Uso: npx tsx scripts/generate-dashboard.ts
 * Output: docs/metadata-dashboard.html
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

interface Frontmatter {
  title?: string;
  summary?: string;
  description?: string;
  publishedAt?: string;
  pillar?: string;
  subsection?: string;
  genre?: string;
  tags?: string[];
  coverImage?: string;
  citation?: string[];
  abstract?: string;
  relatedSlugs?: string[];
  secondaryPillars?: string[];
  featured?: boolean;
  draft?: boolean;
}

const BLOG_DIR = join(process.cwd(), 'src', 'content', 'blog');
const OUTPUT_PATH = join(process.cwd(), 'docs', 'metadata-dashboard.html');

function extractFrontmatter(filePath: string): Frontmatter {
  const content = readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const yaml = match[1];
  const fm: Frontmatter = {};

  const lines = yaml.split('\n');
  let currentKey = '';
  let currentArray: string[] = [];
  let inArray = false;

  for (const line of lines) {
    if (line.trim().startsWith('-')) {
      const value = line
        .trim()
        .substring(1)
        .trim()
        .replace(/^["']|["']$/g, '');
      currentArray.push(value);
      continue;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex > 0 && !line.trim().startsWith(' ')) {
      if (inArray && currentKey) {
        (fm as any)[currentKey] = currentArray;
        currentArray = [];
        inArray = false;
      }

      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      currentKey = key;

      if (value === '' || value === '[]') {
        inArray = true;
        currentArray = [];
      } else if (value.startsWith('[') && value.endsWith(']')) {
        (fm as any)[key] = value
          .slice(1, -1)
          .split(',')
          .map((v) => v.trim().replace(/^["']|["']$/g, ''));
      } else {
        (fm as any)[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  if (inArray && currentKey) {
    (fm as any)[currentKey] = currentArray;
  }

  return fm;
}

function getAllBlogPosts(): string[] {
  const files = readdirSync(BLOG_DIR);
  return files
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => join(BLOG_DIR, f));
}

function generateHTML() {
  const posts = getAllBlogPosts();
  const allMetadata: Frontmatter[] = posts.map(extractFrontmatter);

  // Calculate statistics
  const pillarCount: Record<string, number> = {};
  const tagCount: Record<string, number> = {};
  const genreCount: Record<string, number> = {};
  const monthCount: Record<string, number> = {};

  for (const fm of allMetadata) {
    if (fm.pillar) {
      pillarCount[fm.pillar] = (pillarCount[fm.pillar] || 0) + 1;
    }

    if (fm.tags) {
      for (const tag of fm.tags) {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      }
    }

    if (fm.genre) {
      genreCount[fm.genre] = (genreCount[fm.genre] || 0) + 1;
    }

    if (fm.publishedAt) {
      const date = new Date(fm.publishedAt);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthCount[month] = (monthCount[month] || 0) + 1;
    }
  }

  // Coverage statistics
  const noCover = allMetadata.filter((fm) => !fm.coverImage).length;
  const noCitation = allMetadata.filter((fm) => !fm.citation || fm.citation.length === 0).length;
  const noGenre = allMetadata.filter((fm) => !fm.genre).length;
  const noAbstract = allMetadata.filter((fm) => !fm.abstract).length;
  const noRelated = allMetadata.filter((fm) => !fm.relatedSlugs || fm.relatedSlugs.length === 0)
    .length;

  const coverage = {
    coverImage: ((posts.length - noCover) / posts.length) * 100,
    citation: ((posts.length - noCitation) / posts.length) * 100,
    genre: ((posts.length - noGenre) / posts.length) * 100,
    abstract: ((posts.length - noAbstract) / posts.length) * 100,
    relatedSlugs: ((posts.length - noRelated) / posts.length) * 100,
  };

  // Top tags
  const topTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  // Sort months chronologically
  const sortedMonths = Object.entries(monthCount).sort((a, b) => a[0].localeCompare(b[0]));

  // Featured and draft counts
  const featuredCount = allMetadata.filter((fm) => fm.featured === true).length;
  const draftCount = allMetadata.filter((fm) => fm.draft === true).length;

  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Metadati Blog</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #333;
      padding: 2rem;
      min-height: 100vh;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }

    h1 {
      color: #667eea;
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
    }

    .subtitle {
      color: #666;
      font-size: 1rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      text-align: center;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #666;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .chart-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .chart-title {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    canvas {
      max-height: 400px;
    }

    .tag-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding: 1rem 0;
    }

    .tag {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      white-space: nowrap;
    }

    .footer {
      text-align: center;
      color: white;
      margin-top: 3rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .charts-grid {
        grid-template-columns: 1fr;
      }

      body {
        padding: 1rem;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📊 Dashboard Metadati Blog</h1>
      <p class="subtitle">Analisi e visualizzazione metadati articoli · Generato il ${new Date().toLocaleDateString('it-IT')}</p>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${posts.length}</div>
        <div class="stat-label">Articoli Totali</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${posts.length - draftCount}</div>
        <div class="stat-label">Pubblicati</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${featuredCount}</div>
        <div class="stat-label">Featured</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${Object.keys(tagCount).length}</div>
        <div class="stat-label">Tag Unici</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${(Object.values(tagCount).reduce((a, b) => a + b, 0) / posts.length).toFixed(1)}</div>
        <div class="stat-label">Media Tag/Articolo</div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-container">
        <h2 class="chart-title">🏛️ Distribuzione Pillar</h2>
        <canvas id="pillarChart"></canvas>
      </div>

      <div class="chart-container">
        <h2 class="chart-title">📖 Distribuzione Genre</h2>
        <canvas id="genreChart"></canvas>
      </div>

      <div class="chart-container">
        <h2 class="chart-title">📅 Timeline Pubblicazioni</h2>
        <canvas id="timelineChart"></canvas>
      </div>

      <div class="chart-container">
        <h2 class="chart-title">✅ Coverage Metadati Opzionali</h2>
        <canvas id="coverageChart"></canvas>
      </div>
    </div>

    <div class="chart-container">
      <h2 class="chart-title">🏷️ Top 20 Tag</h2>
      <div class="tag-cloud">
        ${topTags.map(([tag, count]) => `<span class="tag">${tag} (${count})</span>`).join('')}
      </div>
    </div>

    <div class="footer">
      <p>Dashboard generata con scripts/generate-dashboard.ts</p>
    </div>
  </div>

  <script>
    // Pillar Chart
    new Chart(document.getElementById('pillarChart'), {
      type: 'doughnut',
      data: {
        labels: ${JSON.stringify(Object.keys(pillarCount))},
        datasets: [{
          data: ${JSON.stringify(Object.values(pillarCount))},
          backgroundColor: [
            '#667eea', '#764ba2', '#f093fb', '#4facfe',
            '#43e97b', '#fa709a'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });

    // Genre Chart
    new Chart(document.getElementById('genreChart'), {
      type: 'bar',
      data: {
        labels: ${JSON.stringify(Object.keys(genreCount))},
        datasets: [{
          label: 'Articoli',
          data: ${JSON.stringify(Object.values(genreCount))},
          backgroundColor: '#667eea'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    // Timeline Chart
    new Chart(document.getElementById('timelineChart'), {
      type: 'line',
      data: {
        labels: ${JSON.stringify(sortedMonths.map(([m]) => m))},
        datasets: [{
          label: 'Pubblicazioni',
          data: ${JSON.stringify(sortedMonths.map(([, c]) => c))},
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    // Coverage Chart
    new Chart(document.getElementById('coverageChart'), {
      type: 'bar',
      data: {
        labels: ['Cover Image', 'Citation', 'Genre', 'Abstract', 'Related'],
        datasets: [{
          label: 'Coverage %',
          data: [
            ${coverage.coverImage.toFixed(1)},
            ${coverage.citation.toFixed(1)},
            ${coverage.genre.toFixed(1)},
            ${coverage.abstract.toFixed(1)},
            ${coverage.relatedSlugs.toFixed(1)}
          ],
          backgroundColor: '#43e97b'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: function(value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  </script>
</body>
</html>`;

  // Ensure docs directory exists
  const docsDir = join(process.cwd(), 'docs');
  if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true });
  }

  // Write HTML file
  writeFileSync(OUTPUT_PATH, html, 'utf-8');

  console.log('\n📊 Dashboard HTML generata con successo!');
  console.log(`📁 Output: ${OUTPUT_PATH}\n`);
  console.log('Per visualizzare: apri il file nel browser\n');
}

// Run
generateHTML();
