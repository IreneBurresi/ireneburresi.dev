import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CollectionEntry } from 'astro:content';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Ordina i post per data di pubblicazione (più recenti prima)
 */
export function sortPostsByDate(
  posts: CollectionEntry<'blog'>[]
): CollectionEntry<'blog'>[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.data.publishedAt).getTime() -
      new Date(a.data.publishedAt).getTime()
  );
}

/**
 * Converte una data in formato ISO string
 */
export function toISOString(date: Date | string): string {
  return new Date(date).toISOString();
}

/**
 * Ottiene il timestamp di una data
 */
export function getTimestamp(date: Date | string): number {
  return new Date(date).getTime();
}

/**
 * Pulisce il contenuto markdown rimuovendo frontmatter, HTML e markup
 */
function cleanMarkdownContent(content: string): string {
  return content
    .replace(/---[\s\S]*?---/, '') // rimuove frontmatter
    .replace(/<[^>]*>/g, '') // rimuove HTML tags
    .replace(/!\[.*?\]\(.*?\)/g, '') // rimuove immagini markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // converti link in testo
    .replace(/[#*`~_>]/g, '') // rimuove caratteri markdown
    .replace(/\s+/g, ' ') // normalizza spazi
    .trim();
}

/**
 * Conta le parole in un contenuto markdown
 */
export function calculateWordCount(content: string): number {
  const cleanContent = cleanMarkdownContent(content);
  return cleanContent.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Calcola il tempo di lettura stimato
 */
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = calculateWordCount(content);
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

/**
 * Calcola wordCount e readingTime in un'unica chiamata
 */
export function calculateContentMetrics(content: string): { wordCount: number; readingTime: string } {
  const wordsPerMinute = 200;
  const wordCount = calculateWordCount(content);
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return {
    wordCount,
    readingTime: `${minutes} min`,
  };
}
