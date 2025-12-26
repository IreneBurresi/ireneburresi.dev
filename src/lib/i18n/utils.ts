/**
 * i18n utility functions for URL handling and locale management
 */

import type { Locale } from './translations';

/**
 * Extract locale from URL pathname
 * Italian URLs don't have prefix, English URLs have /en/ prefix
 *
 * @param url - The URL object to extract locale from
 * @returns 'it' or 'en'
 *
 * @example
 * getLocaleFromUrl(new URL('https://example.com/blog/')) // 'it'
 * getLocaleFromUrl(new URL('https://example.com/en/blog/')) // 'en'
 */
export function getLocaleFromUrl(url: URL): Locale {
  const pathname = url.pathname;
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  return 'it';
}

/**
 * Get localized path with appropriate language prefix
 *
 * @param path - The base path (e.g., '/blog/article/')
 * @param locale - Target locale ('it' or 'en')
 * @returns Localized path
 *
 * @example
 * getLocalizedPath('/blog/article/', 'it') // '/blog/article/'
 * getLocalizedPath('/blog/article/', 'en') // '/en/blog/article/'
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Italian is default, no prefix
  if (locale === 'it') {
    return normalizedPath;
  }

  // English gets /en/ prefix
  return `/en${normalizedPath}`;
}

/**
 * Remove locale prefix from path
 *
 * @param path - Path potentially with /en/ prefix
 * @returns Path without locale prefix
 *
 * @example
 * removeLocaleFromPath('/en/blog/article/') // '/blog/article/'
 * removeLocaleFromPath('/blog/article/') // '/blog/article/'
 */
export function removeLocaleFromPath(path: string): string {
  return path.replace(/^\/en\//, '/').replace(/^\/en$/, '/');
}

/**
 * Get URL for the alternate language version of the current page
 *
 * @param currentUrl - Current URL object
 * @param targetLocale - Target locale to switch to
 * @returns URL path for the alternate language
 *
 * @example
 * getAlternateLanguageUrl(new URL('https://example.com/blog/'), 'en') // '/en/blog/'
 * getAlternateLanguageUrl(new URL('https://example.com/en/blog/'), 'it') // '/blog/'
 */
export function getAlternateLanguageUrl(currentUrl: URL, targetLocale: Locale): string {
  const pathname = currentUrl.pathname;

  if (targetLocale === 'it') {
    // Remove /en/ prefix to get Italian version
    return removeLocaleFromPath(pathname);
  } else {
    // Add /en/ prefix if not present
    if (pathname.startsWith('/en/') || pathname === '/en') {
      return pathname;
    }
    return pathname === '/' ? '/en/' : `/en${pathname}`;
  }
}

/**
 * Build absolute URL with locale prefix
 *
 * @param path - Relative path
 * @param locale - Locale
 * @param siteUrl - Base site URL (default from env)
 * @returns Absolute URL
 *
 * @example
 * getAbsoluteLocalizedUrl('/blog/', 'en', 'https://example.com') // 'https://example.com/en/blog/'
 */
export function getAbsoluteLocalizedUrl(
  path: string,
  locale: Locale,
  siteUrl: string = 'https://ireneburresi.dev',
): string {
  const localizedPath = getLocalizedPath(path, locale);
  return new URL(localizedPath, siteUrl).toString();
}

/**
 * Check if a path is for a specific locale
 *
 * @param path - Path to check
 * @param locale - Locale to check against
 * @returns True if path matches locale
 *
 * @example
 * isLocalePath('/en/blog/', 'en') // true
 * isLocalePath('/blog/', 'it') // true
 * isLocalePath('/blog/', 'en') // false
 */
export function isLocalePath(path: string, locale: Locale): boolean {
  if (locale === 'en') {
    return path.startsWith('/en/') || path === '/en';
  }
  return !path.startsWith('/en/');
}

/**
 * Get the opposite locale
 *
 * @param locale - Current locale
 * @returns Opposite locale
 *
 * @example
 * getAlternateLocale('it') // 'en'
 * getAlternateLocale('en') // 'it'
 */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'it' ? 'en' : 'it';
}

/**
 * Normalize slug by removing .en suffix for English content
 *
 * @param slug - Content slug (may include .en suffix)
 * @param locale - Current locale
 * @returns Normalized slug
 *
 * @example
 * normalizeSlug('article.en', 'en') // 'article'
 * normalizeSlug('article', 'it') // 'article'
 */
export function normalizeSlug(slug: string, locale: Locale): string {
  if (locale === 'en' && slug.endsWith('.en')) {
    return slug.slice(0, -3);
  }
  return slug;
}
