/**
 * RSS Feed full-text (English)
 */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getLocalizedPosts, getBaseSlug } from '@/lib/content';
import { markdownToFeedHtml } from '@/lib/feed';
import { sortPostsByDate } from '@/lib/utils';
import { SITE } from '@/consts/site';
import { useTranslations } from '@/lib/i18n/translations';

const t = useTranslations('en');

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const blog = sortPostsByDate(await getLocalizedPosts('en'));

  return rss({
    title: `${SITE.name} - English`,
    description: t.hero.description,
    site,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: new Date(post.data.publishedAt),
      link: `/en/blog/${getBaseSlug(post.slug)}/`,
      content: markdownToFeedHtml(post.body ?? '', site, 'full'),
      categories: post.data.tags,
    })),
    customData: `<language>en</language>`,
  });
}
