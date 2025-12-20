/**
 * Utility per la selezione deterministica di pattern OG
 * Basata sull'hash dello slug dell'articolo per consistenza
 */

const PATTERN_COUNT = 30;

/**
 * Genera un hash numerico semplice da una stringa
 * Usato per selezionare deterministicamente un pattern per ogni articolo
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Ottiene il path del pattern SVG per un dato slug
 * La selezione è deterministica: stesso slug = stesso pattern
 */
export function getPatternForSlug(slug: string): string {
  const patternIndex = (hashString(slug) % PATTERN_COUNT) + 1;
  const paddedIndex = patternIndex.toString().padStart(2, '0');
  return `/images/og-patterns/pattern-${paddedIndex}.svg`;
}

/**
 * Ottiene l'URL completo del pattern per un dato slug
 */
export function getPatternUrlForSlug(slug: string, siteUrl: string): string {
  return `${siteUrl}${getPatternForSlug(slug)}`;
}

/**
 * Verifica se un'immagine è un'immagine valida (non undefined/null/empty)
 */
export function hasValidCoverImage(coverImage: string | undefined | null): boolean {
  return !!(coverImage && coverImage.trim().length > 0);
}

/**
 * Ottiene l'immagine OG da usare: coverImage se valida, altrimenti pattern
 */
export function getOgImage(coverImage: string | undefined | null, slug: string): string {
  if (hasValidCoverImage(coverImage)) {
    return coverImage!;
  }
  return getPatternForSlug(slug);
}

/**
 * Ottiene l'URL completo dell'immagine OG
 */
export function getOgImageUrl(coverImage: string | undefined | null, slug: string, siteUrl: string): string {
  const imagePath = getOgImage(coverImage, slug);
  // Se l'immagine inizia con http, è già un URL completo
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  // Altrimenti, costruisci l'URL completo
  return `${siteUrl.replace(/\/$/, '')}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
}
