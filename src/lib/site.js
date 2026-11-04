// Single source of truth for SEO and GEO: site constants, schema.org entity nodes and the
// facts reused by llms.txt. Everything personal is derived from src/data so it cannot drift.
import profiles from '../data/profiles.json';
import volunteering from '../data/volunteering.json';
import { gitLastModified } from './lastmod.js';

export const SITE = 'https://bably.me';
export const NAME = profiles.name;
export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;

export const TAGLINE = 'Backend engineer, Codeforces Expert and Community Leader at ACPC Damietta University.';
export const SITE_DESCRIPTION = `${TAGLINE} Real-time systems, algorithms and community building. Based in Damietta, Egypt.`;

export const OG_IMAGE = { path: '/og.png', width: 1200, height: 630 };
export const OG_IMAGE_ALT =
  'Belal Elbably, backend engineer and Codeforces Expert, shown beside a pixel-art ringed planet in space.';

export const lastModified = gitLastModified();

// Skills page content, shared with llms-full.txt.
export const CP_TOPICS = [
  'Graph theory',
  'Dynamic programming',
  'Bitmask DP',
  'Tree DP',
  'Convex hull trick',
  'Segment trees',
  'Sparse tables',
];

export const STACK_GROUPS = [
  { name: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'C++'] },
  { name: 'Backend', items: ['Node.js', 'Express', 'Socket.IO', 'REST APIs', 'JWT', 'Cron jobs'] },
  { name: 'Databases', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Neo4j', 'Redis', 'SQL Server'] },
  { name: 'Environment', items: ['Git', 'Docker', 'Linux', 'Vercel', 'Railway', 'Jest'] },
];

// Public pages with their canonical URLs (the site is built with directory URLs).
export const PAGES = [
  { path: '/', name: 'Home', blurb: 'Overview: stats, featured projects, tech stack and leadership roles.' },
  {
    path: '/skills/',
    name: 'Skills and experience',
    blurb: 'Competitive programming, software engineering (backend, web, mini RAG) and volunteering.',
  },
  {
    path: '/projects/',
    name: 'Projects',
    blurb: 'Real-time ranking backend, C++ algorithms library and the ACPC Damietta website.',
  },
  {
    path: '/cp/',
    name: 'Competitive programming profile',
    blurb: 'Codeforces, CSES and LeetCode profiles, contest results and strengths.',
  },
  {
    path: '/community/',
    name: 'Community leadership and mentoring',
    blurb: 'Roles at ACPC Damietta University and the IEEE Damietta Branch.',
  },
  { path: '/contact/', name: 'Contact', blurb: 'How to reach Belal about internships, collaboration, mentoring and contests.' },
];

export const url = (path = '/') => new URL(path, SITE).href;

const organizations = volunteering.map((o) => ({ '@type': 'Organization', name: o.org }));

export const sameAs = [
  profiles.github,
  profiles.linkedin,
  profiles.codeforces.main.url,
  profiles.leetcode.url,
  profiles.cses.url,
];

export const personNode = () => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: NAME,
  alternateName: [profiles.handle, profiles.codeforces.main.handle],
  url: url('/'),
  description: `${TAGLINE} Computer Science student at Damietta University, class of 2027, based in Damietta, Egypt.`,
  jobTitle: 'Backend Engineer',
  ...(profiles.email ? { email: profiles.email } : {}),
  address: { '@type': 'PostalAddress', addressLocality: 'Damietta', addressCountry: 'EG' },
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Damietta University' },
  memberOf: organizations,
  knowsAbout: [
    'Competitive programming',
    'Algorithms',
    'Data structures',
    'Graph theory',
    'Dynamic programming',
    'Backend development',
    'Real-time systems',
    'Node.js',
    'Socket.IO',
    'MongoDB',
    'PostgreSQL',
    'REST APIs',
    'C++',
    'TypeScript',
  ],
  sameAs,
});

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: url('/'),
  name: NAME,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
});

export const breadcrumbNode = (pageUrl, crumbName) => ({
  '@type': 'BreadcrumbList',
  '@id': `${pageUrl}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: url('/') },
    { '@type': 'ListItem', position: 2, name: crumbName, item: pageUrl },
  ],
});

// Serialize for an inline <script>: escape "<" so the JSON can never close the tag early.
export const serializeJsonLd = (graph) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
