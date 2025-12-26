import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getLocalizedPosts, getBaseSlug } from '@/lib/content';
import { markdownToFeedHtml, sortPostsByDate, SITE } from '@/lib/feed';
import { useTranslations } from '@/lib/i18n/translations';

const t = useTranslations('en');
const pillar = t.pillars.methodology;

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);
  const posts = sortPostsByDate(
    await getLocalizedPosts('en', ({ data }) => data.pillar === 'methodology')
  );

  return rss({
    title: `${pillar.name} | ${SITE.name}`,
    description: pillar.hero,
    site,
    items: posts.map((post) => ({
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
