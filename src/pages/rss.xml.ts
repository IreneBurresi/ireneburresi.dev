/**
 * RSS Feed full-text
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { markdownToFeedHtml } from '@/lib/feed';
import { sortPostsByDate } from '@/lib/utils';
import { SITE } from '@/consts/site';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const blog = sortPostsByDate(
    await getCollection('blog', ({ data }) => !data.draft)
  );

  return rss({
    title: SITE.name,
    description: SITE.description,
    site,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: new Date(post.data.publishedAt),
      link: `/blog/${post.slug}/`,
      content: markdownToFeedHtml(post.body ?? '', site, 'full'),
      categories: post.data.tags,
    })),
    customData: `<language>${SITE.locale}</language>`,
  });
}
