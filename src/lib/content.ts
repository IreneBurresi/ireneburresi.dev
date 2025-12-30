/**
 * Content collection helpers for multilingual blog
 * Provides utilities for filtering and querying content by locale
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n/translations';

/**
 * Get all posts for a specific locale, excluding drafts
 *
 * @param locale - The locale to filter by ('it' or 'en')
 * @param additionalFilter - Optional additional filter function
 * @returns Array of blog posts for the specified locale
 *
 * @example
 * const italianPosts = await getLocalizedPosts('it');
 * const englishEngineeringPosts = await getLocalizedPosts('en', ({ data }) => data.pillar === 'engineering');
 */
export async function getLocalizedPosts(
  locale: Locale,
  additionalFilter?: (entry: CollectionEntry<'blog'>) => boolean,
): Promise<CollectionEntry<'blog'>[]> {
  const allPosts = await getCollection('blog', (entry) => {
    // Filter by locale and draft status
    const isLocaleMatch = entry.data.locale === locale;
    const isNotDraft = !entry.data.draft;
    const customFilter = additionalFilter ? additionalFilter(entry) : true;

    return isLocaleMatch && isNotDraft && customFilter;
  });

  return allPosts;
}

/**
 * Get the slug for a post's translation in a different locale
 * For English posts, removes the .en suffix
 * For Italian posts seeking English, adds the .en suffix
 *
 * @param slug - The current slug
 * @param targetLocale - The target locale
 * @returns The translated slug
 *
 * @example
 * getTranslationSlug('article.en', 'it') // 'article'
 * getTranslationSlug('article', 'en') // 'article.en'
 */
export function getTranslationSlug(slug: string, targetLocale: Locale): string {
  // If target is Italian, remove .en suffix
  if (targetLocale === 'it') {
    return slug.replace(/\.en$/, '');
  }

  // If target is English, add .en suffix if not present
  return slug.endsWith('.en') ? slug : `${slug}.en`;
}

/**
 * Get the base slug without locale suffix
 * Useful for matching translations
 *
 * @param slug - Slug with potential .en suffix
 * @returns Base slug
 *
 * @example
 * getBaseSlug('article.en') // 'article'
 * getBaseSlug('article') // 'article'
 */
export function getBaseSlug(slug: string): string {
  return slug.replace(/\.en$/, '');
}

/**
 * Find a post's translation by slug
 *
 * @param baseSlug - The base slug (without .en)
 * @param targetLocale - The locale to find
 * @returns The translated post or undefined
 *
 * @example
 * const translation = await findTranslation('my-article', 'en');
 */
export async function findTranslation(
  baseSlug: string,
  targetLocale: Locale,
): Promise<CollectionEntry<'blog'> | undefined> {
  const targetSlug = getTranslationSlug(baseSlug, targetLocale);
  const posts = await getLocalizedPosts(targetLocale);

  return posts.find((post) => {
    const postBaseSlug = getBaseSlug(post.slug);
    return postBaseSlug === baseSlug || post.slug === targetSlug;
  });
}

/**
 * Get posts by pillar for a specific locale
 *
 * @param pillarKey - The pillar to filter by
 * @param locale - The locale
 * @returns Array of posts in that pillar and locale
 *
 * @example
 * const engineeringPosts = await getPostsByPillar('engineering', 'it');
 */
export async function getPostsByPillar(
  pillarKey: string,
  locale: Locale,
): Promise<CollectionEntry<'blog'>[]> {
  return await getLocalizedPosts(locale, ({ data }) => data.pillar === pillarKey);
}

/**
 * Get posts by pillar and subsection for a specific locale
 *
 * @param pillarKey - The pillar
 * @param subsectionSlug - The subsection slug
 * @param locale - The locale
 * @returns Array of posts matching criteria
 *
 * @example
 * const posts = await getPostsBySubsection('engineering', 'implementations', 'en');
 */
export async function getPostsBySubsection(
  pillarKey: string,
  subsectionSlug: string,
  locale: Locale,
): Promise<CollectionEntry<'blog'>[]> {
  return await getLocalizedPosts(
    locale,
    ({ data }) => data.pillar === pillarKey && data.subsection === subsectionSlug,
  );
}

/**
 * Get related posts for a given post
 * First tries to use relatedSlugs, then falls back to same pillar
 *
 * @param post - The current post
 * @param locale - The locale to find related posts in
 * @param limit - Max number of related posts (default: 3)
 * @returns Array of related posts
 */
export async function getRelatedPosts(
  post: CollectionEntry<'blog'>,
  locale: Locale,
  limit: number = 3,
): Promise<CollectionEntry<'blog'>[]> {
  const allPosts = await getLocalizedPosts(locale);

  // First, try to use relatedSlugs if they exist
  if (post.data.relatedSlugs && post.data.relatedSlugs.length > 0) {
    const relatedPosts = allPosts.filter((p) => {
      const baseSlug = getBaseSlug(p.slug);
      return post.data.relatedSlugs?.includes(baseSlug);
    });

    if (relatedPosts.length > 0) {
      return relatedPosts.slice(0, limit);
    }
  }

  // Fallback: same pillar, excluding current post
  const currentBaseSlug = getBaseSlug(post.slug);
  const samePillarPosts = allPosts.filter((p) => {
    const pBaseSlug = getBaseSlug(p.slug);
    return p.data.pillar === post.data.pillar && pBaseSlug !== currentBaseSlug;
  });

  // Return random selection
  return samePillarPosts
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}
