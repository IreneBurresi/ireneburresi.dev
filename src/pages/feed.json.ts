/**
 * JSON Feed full-text
 */
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { markdownToFeedHtml } from '@/lib/feed';
import { sortPostsByDate, toISOString } from '@/lib/utils';
import { SITE } from '@/consts/site';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const posts = sortPostsByDate(
    await getCollection('blog', ({ data }) => !data.draft)
  );

  const feedUrl = new URL('/feed.json', site).toString();

  const json = {
    version: 'https://jsonfeed.org/version/1.1',
    title: SITE.name,
    home_page_url: new URL('/', site).toString(),
    feed_url: feedUrl,
    description: SITE.description,
    language: SITE.locale,
    authors: [
      {
        name: SITE.author.name,
        url: SITE.author.url,
      },
    ],
    items: posts.map((p) => {
      const url = new URL(`/blog/${p.slug}/`, site).toString();
      return {
        id: url,
        url,
        title: p.data.title,
        summary: p.data.summary,
        date_published: toISOString(p.data.publishedAt),
        date_modified: p.data.updatedAt
          ? toISOString(p.data.updatedAt)
          : toISOString(p.data.publishedAt),
        tags: p.data.tags,
        content_html: markdownToFeedHtml(p.body ?? '', site, 'minimal'),
        authors: [{ name: p.data.author.name }],
      };
    }),
  };

  return new Response(JSON.stringify(json, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
