/**
 * RSS Feed per singolo pillar
 * Route dinamica: /ingegneria-ai/rss.xml, /ricerca/rss.xml, etc.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { markdownToFeedHtml } from '@/lib/feed';
import { sortPostsByDate } from '@/lib/utils';
import { SITE } from '@/consts/site';
import { PILLARS } from '@/lib/constants';

export function getStaticPaths() {
  return Object.values(PILLARS).map((pillar) => ({
    params: { pillar: pillar.slug },
  }));
}

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);
  const pillarSlug = context.params.pillar;

  const pillarEntry = Object.entries(PILLARS).find(
    ([_, p]) => p.slug === pillarSlug
  );

  if (!pillarEntry) {
    return new Response('Pillar not found', { status: 404 });
  }

  const [pillarKey, pillarData] = pillarEntry;

  const blog = sortPostsByDate(
    await getCollection('blog', ({ data }) => !data.draft && data.pillar === pillarKey)
  );

  return rss({
    title: `${pillarData.name} | ${SITE.name}`,
    description: pillarData.hero,
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
