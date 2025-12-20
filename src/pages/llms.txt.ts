/**
 * llms.txt - Indice semantico per LLM/agent
 * Formato pragmatico Markdown: overview + link principali + indice contenuti
 */
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@/consts/site';
import { PILLARS } from '@/lib/constants';

export async function GET(context: APIContext) {
  const site = context.site ?? new URL(SITE.url);

  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime());

  const lines: string[] = [];

  // Header
  lines.push(`# ${SITE.name}`);
  lines.push(`> ${SITE.description}`);
  lines.push('');

  // Primary endpoints
  lines.push('## Primary endpoints');
  lines.push(`- Home: ${new URL('/', site).toString()}`);
  lines.push(`- Blog: ${new URL('/blog/', site).toString()}`);
  lines.push(`- RSS: ${new URL(SITE.feeds.rssPath, site).toString()}`);
  lines.push(`- Atom: ${new URL(SITE.feeds.atomPath, site).toString()}`);
  lines.push(`- JSON Feed: ${new URL(SITE.feeds.jsonFeedPath, site).toString()}`);
  lines.push(`- Full content: ${new URL('/llms-full.txt', site).toString()}`);
  lines.push('');

  // Pillar structure
  lines.push('## Content pillars');
  for (const [key, pillar] of Object.entries(PILLARS)) {
    lines.push(`- ${pillar.name}: ${new URL(`/${pillar.slug}/`, site).toString()}`);
  }
  lines.push('');

  // Core content index
  lines.push('## Articles (most recent first)');
  for (const p of posts) {
    const url = new URL(`/blog/${p.slug}/`, site).toString();
    const pillarName = PILLARS[p.data.pillar as keyof typeof PILLARS]?.name ?? p.data.pillar;
    lines.push(`- [${pillarName}] ${p.data.title}`);
    lines.push(`  ${url}`);
  }
  lines.push('');

  // License
  lines.push('## License');
  lines.push(`- Human-readable: ${SITE.license.humanUrl}`);
  lines.push(`- Machine-readable (RSL): ${SITE.license.rslUrl}`);
  lines.push('');

  // Conventions
  lines.push('## Conventions');
  lines.push(`- Language: ${SITE.locale}`);
  lines.push('- Code snippets include language annotation');
  lines.push('- All examples are production-oriented');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
