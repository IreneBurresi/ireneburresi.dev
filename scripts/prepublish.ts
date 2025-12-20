#!/usr/bin/env npx tsx
/**
 * Script di pre-pubblicazione
 *
 * Esegue tutti i controlli necessari prima di pubblicare:
 * 1. Build del sito
 * 2. Test della build
 * 3. Report finale
 *
 * Uso: npx tsx scripts/prepublish.ts
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');

interface CheckResult {
  name: string;
  passed: boolean;
  message?: string;
  duration?: number;
}

const results: CheckResult[] = [];

function log(message: string): void {
  console.log(`\n${'='.repeat(60)}`);
  console.log(message);
  console.log('='.repeat(60));
}

function runCheck(name: string, fn: () => void): void {
  const start = Date.now();
  try {
    fn();
    results.push({
      name,
      passed: true,
      duration: Date.now() - start,
    });
    console.log(`✅ ${name}`);
  } catch (error) {
    results.push({
      name,
      passed: false,
      message: error instanceof Error ? error.message : String(error),
      duration: Date.now() - start,
    });
    console.log(`❌ ${name}`);
    if (error instanceof Error) {
      console.log(`   ${error.message}`);
    }
  }
}

function execCommand(command: string): string {
  return execSync(command, {
    cwd: ROOT,
    encoding: 'utf-8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });
}

// ============================================================================
// CHECKS
// ============================================================================

log('🔨 FASE 1: BUILD');

runCheck('Build del sito', () => {
  execCommand('npm run build');
});

runCheck('Directory dist esiste', () => {
  if (!existsSync(DIST)) {
    throw new Error('Directory dist non trovata');
  }
});

log('🧪 FASE 2: TEST');

runCheck('Test suite', () => {
  execCommand('npm run test');
});

log('📋 FASE 3: CONTROLLI AGGIUNTIVI');

runCheck('robots.txt', () => {
  if (!existsSync(join(DIST, 'robots.txt'))) {
    throw new Error('robots.txt non trovato');
  }
});

runCheck('sitemap-index.xml', () => {
  if (!existsSync(join(DIST, 'sitemap-index.xml'))) {
    throw new Error('sitemap-index.xml non trovato');
  }
});

runCheck('RSS feed', () => {
  if (!existsSync(join(DIST, 'rss.xml'))) {
    throw new Error('rss.xml non trovato');
  }
});

runCheck('Atom feed', () => {
  if (!existsSync(join(DIST, 'atom.xml'))) {
    throw new Error('atom.xml non trovato');
  }
});

runCheck('JSON feed', () => {
  if (!existsSync(join(DIST, 'feed.json'))) {
    throw new Error('feed.json non trovato');
  }
});

runCheck('favicon', () => {
  if (!existsSync(join(DIST, 'favicon.svg'))) {
    throw new Error('favicon.svg non trovato');
  }
});

// ============================================================================
// REPORT FINALE
// ============================================================================

log('📊 REPORT FINALE');

const passed = results.filter((r) => r.passed).length;
const failed = results.filter((r) => !r.passed).length;
const totalDuration = results.reduce((acc, r) => acc + (r.duration || 0), 0);

console.log(`\nRisultati: ${passed}/${results.length} check passati`);
console.log(`Tempo totale: ${(totalDuration / 1000).toFixed(2)}s\n`);

if (failed > 0) {
  console.log('❌ CHECK FALLITI:');
  for (const result of results.filter((r) => !r.passed)) {
    console.log(`   - ${result.name}: ${result.message}`);
  }
  console.log('\n⛔ Pubblicazione NON consigliata\n');
  process.exit(1);
} else {
  console.log('✅ Tutti i check passati!');
  console.log('🚀 Pronto per la pubblicazione\n');
  process.exit(0);
}
