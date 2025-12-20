/**
 * OpenSearch Description
 * Permette ai browser di aggiungere la ricerca del sito
 */
import type { APIContext } from 'astro';
import { SITE } from '@/consts/site';

function esc(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>${esc(SITE.name)}</ShortName>
  <Description>${esc('Cerca su ' + SITE.name)}</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Image width="16" height="16" type="image/svg+xml">${esc(new URL('/favicon.svg', site).toString())}</Image>
  <Url type="text/html" template="${esc(new URL('/search?q={searchTerms}', site).toString())}" />
</OpenSearchDescription>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/opensearchdescription+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=86400',
    },
  });
}
