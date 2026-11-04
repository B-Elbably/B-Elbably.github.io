import type { APIRoute } from 'astro';
import profiles from '../data/profiles.json';
import projects from '../data/projects.json';
import rag from '../data/rag.json';
import stats from '../data/stats.json';
import volunteering from '../data/volunteering.json';
import { rangeLabel } from '../lib/dates.js';
import { CP_TOPICS, PAGES, STACK_GROUPS, TAGLINE, lastModified, url } from '../lib/site.js';

// /llms-full.txt: everything a language model needs to describe Belal Elbably accurately,
// in one markdown file. Built from src/data so it stays in sync with the site.
const statLine = (s: (typeof stats)[number]) =>
  `- ${s.label}: ${s.prefix ?? ''}${s.value.toLocaleString('en-US')}${s.suffix ?? ''} (${s.note})`;

export const GET: APIRoute = () => {
  const lines: string[] = [
    '# Belal Elbably: full profile',
    '',
    `> ${TAGLINE} Computer Science student at Damietta University (class of 2027), based in Damietta, Egypt.`,
    '',
    `Official site: ${url('/')}`,
    ...(lastModified ? [`Last updated: ${lastModified.slice(0, 10)}`] : []),
    '',
    '## Identity',
    '',
    `- Name: ${profiles.name}`,
    `- Also known as: ${profiles.handle} (GitHub), ${profiles.codeforces.main.handle} (Codeforces)`,
    '- Role: Backend engineer, competitive programmer, community leader',
    '- Education: Computer Science at Damietta University, class of 2027',
    '- Location: Damietta, Egypt (UTC+2)',
    ...(profiles.email ? [`- Email: ${profiles.email}`] : []),
    '- Open to: internships, collaboration, mentoring and contests',
    '',
    '## Key numbers',
    '',
    ...stats.map(statLine),
    '',
    '## Competitive programming',
    '',
    `Over 3,000 problems solved across major online judges. Codeforces Expert with a maximum rating of ${profiles.codeforces.maxRating} (main account ${profiles.codeforces.main.handle}, alternate account ${profiles.codeforces.alt.handle}).`,
    `Topics: ${CP_TOPICS.join(', ')}.`,
    '',
    `- [Codeforces](${profiles.codeforces.main.url})`,
    `- [CSES](${profiles.cses.url})`,
    `- [LeetCode](${profiles.leetcode.url})`,
    '',
    '## Projects',
    '',
    ...projects.flatMap((p) => [
      `### ${p.title}`,
      '',
      p.summary,
      ...(p.impact ? ['', p.impact] : []),
      '',
      `- Stack: ${p.tech.join(', ')}`,
      `- Source: ${p.repo}`,
      '',
    ]),
    `### ${rag.title}`,
    '',
    rag.summary,
    '',
    '## Tech stack',
    '',
    ...STACK_GROUPS.map((g) => `- ${g.name}: ${g.items.join(', ')}`),
    '',
    '## Leadership and volunteering',
    '',
    ...volunteering.flatMap((o) => [
      `### ${o.org}`,
      '',
      ...[...o.roles]
        .sort((a, b) => b.start.localeCompare(a.start))
        .map((r) => `- ${r.title} (${rangeLabel(r.start, r.end)}): ${r.text}`),
      '',
    ]),
    '## Links',
    '',
    `- GitHub: ${profiles.github}`,
    `- LinkedIn: ${profiles.linkedin}`,
    ...PAGES.map((p) => `- ${p.name}: ${url(p.path)}`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
