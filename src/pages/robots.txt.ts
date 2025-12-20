/**
 * robots.txt dinamico
 * Massima discoverability + licensing RSL
 */
import type { APIContext } from 'astro';
import { SITE } from '@/consts/site';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const lines: string[] = [];

  // Licensing RSL (alcuni crawler la leggono)
  lines.push(`License: ${SITE.license.rslUrl}`);
  lines.push('');

  // Massima discoverability - nessun blocco
  lines.push('User-agent: *');
  lines.push('Allow: /');
  lines.push('');

  // Disallow solo per utility pages
  lines.push('Disallow: /api/');
  lines.push('');

  // Sitemap generata da @astrojs/sitemap
  lines.push(`Sitemap: ${new URL('/sitemap-index.xml', site).toString()}`);

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
