import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { markdownToFeedHtml, sortPostsByDate, SITE, PILLARS } from '@/lib/feed';

const pillar = PILLARS.research;

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);
  const posts = sortPostsByDate(
    await getCollection('blog', ({ data }) => !data.draft && data.pillar === 'research')
  );

  return rss({
    title: `${pillar.name} | ${SITE.name}`,
    description: pillar.hero,
    site,
    items: posts.map((post) => ({
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
