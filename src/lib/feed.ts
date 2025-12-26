/**
 * Utility condivise per la generazione dei feed (RSS, Atom, JSON Feed)
 */
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { absolutizeHtml } from '@/lib/seo/url';

const parser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

/**
 * Configurazione sanitizeHtml per contenuto feed completo
 */
const SANITIZE_CONFIG_FULL: sanitizeHtml.IOptions = {
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
    code: ['class'],
    pre: ['class'],
    '*': ['id', 'class'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
};

/**
 * Configurazione sanitizeHtml minimale per feed leggeri
 */
const SANITIZE_CONFIG_MINIMAL: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img',
    'pre',
    'code',
    'blockquote',
  ]),
  allowedAttributes: {
    a: ['href', 'rel'],
    img: ['src', 'alt'],
    code: ['class'],
    '*': ['id', 'class'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
};

export type SanitizeMode = 'full' | 'minimal';

/**
 * Converte markdown in HTML sicuro per i feed
 */
export function markdownToFeedHtml(
  markdownBody: string,
  siteUrl: URL,
  mode: SanitizeMode = 'full'
): string {
  const raw = parser.render(markdownBody);
  const config = mode === 'full' ? SANITIZE_CONFIG_FULL : SANITIZE_CONFIG_MINIMAL;
  const sanitized = sanitizeHtml(raw, config);
  return absolutizeHtml(sanitized, siteUrl);
}

/**
 * Escape XML per Atom feed
 */
export function escapeXml(str: string): string {
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

// Re-export per uso nei feed pillar
export { sortPostsByDate } from '@/lib/utils';
export { SITE } from '@/consts/site';
export { PILLARS } from '@/lib/constants';
export type { PillarKey } from '@/lib/constants';
