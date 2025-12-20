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
