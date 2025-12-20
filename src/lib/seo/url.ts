/**
 * Utility per gestione URL canoniche e assolute
 * Garantisce coerenza su tutto il sito
 */

export function ensureTrailingSlash(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function removeTrailingSlash(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function toAbsoluteUrl(input: string, site: URL): URL {
  try {
    return new URL(input);
  } catch {
    const p = input.startsWith('/') ? input : `/${input}`;
    return new URL(p, site);
  }
}

export function canonicalFromPath(pathname: string, site: URL): URL {
  return new URL(ensureTrailingSlash(pathname), site);
}

/**
 * Converte href/src relativi in assoluti (per RSS/JSON Feed)
 */
export function absolutizeHtml(html: string, site: URL): string {
  const replacer = (attr: 'href' | 'src') => (match: string, value: string) => {
    const v = value.trim();
    if (
      v.startsWith('http://') ||
      v.startsWith('https://') ||
      v.startsWith('mailto:') ||
      v.startsWith('data:') ||
      v.startsWith('#')
    ) {
      return match;
    }

    const abs = new URL(v, site).toString();
    return `${attr}="${abs}"`;
  };

  return html
    .replace(/href="([^"]+)"/g, replacer('href'))
    .replace(/src="([^"]+)"/g, replacer('src'));
}
