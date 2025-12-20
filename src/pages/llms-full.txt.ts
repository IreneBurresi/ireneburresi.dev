/**
 * llms-full.txt - Contenuto completo per bulk ingestion
 * Markdown grezzo di tutti i post per LLM
 */
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@/consts/site';
import { PILLARS } from '@/lib/constants';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime());

  const out: string[] = [];

  // Header
  out.push(`# ${SITE.name} - Full Content Export`);
  out.push(`> ${SITE.description}`);
  out.push('');
  out.push(`Generated: ${new Date().toISOString()}`);
  out.push(`Total articles: ${posts.length}`);
  out.push('');

  // Each post
  for (const p of posts) {
    const url = new URL(`/blog/${p.slug}/`, site).toString();
    const pillarName = PILLARS[p.data.pillar as keyof typeof PILLARS]?.name ?? p.data.pillar;

    out.push('---');
    out.push('');
    out.push(`## ${p.data.title}`);
    out.push('');
    out.push(`- URL: ${url}`);
    out.push(`- Pillar: ${pillarName}`);
    out.push(`- Published: ${p.data.publishedAt}`);
    if (p.data.updatedAt) {
      out.push(`- Updated: ${p.data.updatedAt}`);
    }
    out.push(`- Tags: ${p.data.tags.join(', ')}`);
    out.push(`- Author: ${p.data.author.name}`);
    out.push('');
    out.push(`> ${p.data.summary}`);
    out.push('');
    out.push(p.body ?? '');
    out.push('');
  }

  return new Response(out.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
