/**
 * Sitemap helpers for SEO optimization
 *
 * Provides priority and changefreq calculation based on content metadata.
 */

import type { CollectionEntry } from 'astro:content';

/**
 * Get sitemap priority for a blog post.
 *
 * Uses frontmatter `sitemap_priority` if available,
 * otherwise calculates based on featured status and content tier.
 *
 * Priority scale (0.0 - 1.0):
 * - 1.0: Homepage (reserved)
 * - 0.9: Featured/Cornerstone content
 * - 0.8: Pillar content
 * - 0.7: Standard content (default)
 * - 0.6: Cluster/supporting content
 * - 0.5: News/dated content
 *
 * @param post - Blog post entry
 * @returns Priority value between 0.0 and 1.0
 */
export function getSitemapPriority(post: CollectionEntry<'blog'>): number {
  // Use explicit sitemap_priority if set
  if (post.data.sitemap_priority !== undefined) {
    return post.data.sitemap_priority;
  }

  // Featured posts get high priority
  if (post.data.featured) {
    return 0.9;
  }

  // Content tier-based priority
  if (post.data.content_tier) {
    switch (post.data.content_tier) {
      case 'cornerstone':
        return 0.9;
      case 'pillar':
        return 0.8;
      case 'cluster':
        return 0.6;
      case 'news':
        return 0.5;
    }
  }

  // Default for standard content
  return 0.7;
}

/**
 * Get sitemap changefreq for a blog post.
 *
 * Uses frontmatter `sitemap_changefreq` if available,
 * otherwise determines based on content type and evergreen status.
 *
 * @param post - Blog post entry
 * @returns Changefreq value
 */
export function getSitemapChangefreq(
  post: CollectionEntry<'blog'>
): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  // Use explicit sitemap_changefreq if set
  if (post.data.sitemap_changefreq) {
    return post.data.sitemap_changefreq;
  }

  // Evergreen content changes less frequently
  if (post.data.evergreen) {
    return 'monthly';
  }

  // Content type-based frequency
  if (post.data.editorial?.content_type) {
    switch (post.data.editorial.content_type) {
      case 'news-analysis':
        return 'weekly'; // News content may be updated with developments
      case 'roundup':
        return 'weekly'; // Roundups may be updated periodically
      case 'how-to':
      case 'analysis':
      case 'review':
        return 'monthly'; // Guides and analyses updated less often
      case 'opinion':
      case 'interview':
        return 'yearly'; // Opinion pieces rarely change
    }
  }

  // Default for standard blog posts
  return 'monthly';
}

/**
 * Get last modification date for sitemap.
 *
 * Uses `updatedAt` if available, otherwise `publishedAt`.
 *
 * @param post - Blog post entry
 * @returns ISO 8601 date string
 */
export function getSitemapLastMod(post: CollectionEntry<'blog'>): string {
  return post.data.updatedAt ?? post.data.publishedAt;
}

/**
 * Check if post should be included in sitemap.
 *
 * Excludes draft posts and archived content.
 *
 * @param post - Blog post entry
 * @returns True if post should be in sitemap
 */
export function shouldIncludeInSitemap(post: CollectionEntry<'blog'>): boolean {
  // Exclude drafts
  if (post.data.draft) {
    return false;
  }

  // Exclude archived content
  if (post.data.editorial?.status === 'archived') {
    return false;
  }

  return true;
}
