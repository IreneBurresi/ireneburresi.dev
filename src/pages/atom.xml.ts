/**
 * Atom Feed full-text
 */
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { markdownToFeedHtml, escapeXml } from '@/lib/feed';
import { sortPostsByDate, toISOString } from '@/lib/utils';
import { SITE } from '@/consts/site';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const posts = sortPostsByDate(
    await getCollection('blog', ({ data }) => !data.draft)
  );

  const latestPost = posts[0];
  const updated = latestPost?.data.updatedAt
    ? toISOString(latestPost.data.updatedAt)
    : latestPost?.data.publishedAt
      ? toISOString(latestPost.data.publishedAt)
      : new Date().toISOString();

  const feedUrl = new URL('/atom.xml', site).toString();
  const homeUrl = new URL('/', site).toString();

  const entries = posts
    .map((p) => {
      const url = new URL(`/blog/${p.slug}/`, site).toString();
      const html = markdownToFeedHtml(p.body ?? '', site, 'minimal');
      const published = toISOString(p.data.publishedAt);
      const modified = p.data.updatedAt ? toISOString(p.data.updatedAt) : published;

      const categories = p.data.tags
        .map((tag: string) => `  <category term="${escapeXml(tag)}"/>`)
        .join('\n');

      return `<entry>
  <title>${escapeXml(p.data.title)}</title>
  <link href="${escapeXml(url)}"/>
  <id>${escapeXml(url)}</id>
  <published>${escapeXml(published)}</published>
  <updated>${escapeXml(modified)}</updated>
  <summary>${escapeXml(p.data.summary)}</summary>
  <content type="html">${escapeXml(html)}</content>
  <author><name>${escapeXml(p.data.author.name)}</name></author>
${categories}
</entry>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE.name)}</title>
  <subtitle>${escapeXml(SITE.description)}</subtitle>
  <id>${escapeXml(homeUrl)}</id>
  <link href="${escapeXml(homeUrl)}"/>
  <link rel="self" href="${escapeXml(feedUrl)}"/>
  <updated>${escapeXml(updated)}</updated>
  <author><name>${escapeXml(SITE.author.name)}</name></author>
${entries}
</feed>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
