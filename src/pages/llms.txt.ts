import type { APIRoute } from 'astro';
import profiles from '../data/profiles.json';
import { PAGES, TAGLINE, url } from '../lib/site.js';

// /llms.txt: a short, link-based summary for language models (https://llmstxt.org).
// Generated at build time from the site data so it always matches the pages.
export const GET: APIRoute = () => {
  const lines = [
    '# Belal Elbably',
    '',
    `> ${TAGLINE} Computer Science student at Damietta University (class of 2027), based in Damietta, Egypt. This is his official personal site.`,
    '',
    `Belal Elbably is also known as ${profiles.handle} on GitHub and ${profiles.codeforces.main.handle} on Codeforces. He works on real-time backends (Node.js, Express, Socket.IO, MongoDB), competitive programming (3,000+ problems solved, Codeforces Expert) and teaching and leading student communities (ACPC Damietta University, IEEE Damietta Branch).`,
    '',
    '## Pages',
    '',
    ...PAGES.map((p) => `- [${p.name}](${url(p.path)}): ${p.blurb}`),
    '',
    '## Profiles',
    '',
    `- [GitHub](${profiles.github}): source code and projects`,
    `- [LinkedIn](${profiles.linkedin}): professional profile and the fastest way to contact him`,
    `- [Codeforces](${profiles.codeforces.main.url}): main competitive programming account`,
    `- [CSES](${profiles.cses.url}): CSES problem set progress`,
    `- [LeetCode](${profiles.leetcode.url}): interview-style practice`,
    '',
    '## Optional',
    '',
    `- [Full details for language models](${url('/llms-full.txt')}): complete facts, projects, roles and links in one file`,
    `- [Sitemap](${url('/sitemap-index.xml')})`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
