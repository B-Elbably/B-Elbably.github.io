import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { gitLastModified } from './src/lib/lastmod.js';

const lastmod = gitLastModified();

// https://bably.me is served by GitHub Pages (user site repo B-Elbably.github.io).
export default defineConfig({
  site: 'https://bably.me',
  integrations: [
    sitemap({
      // The 404 page is noindex, so it stays out of the sitemap.
      filter: (page) => !/\/404\/?$/.test(page),
      // Site-wide last modified date taken from the latest commit.
      ...(lastmod ? { lastmod: new Date(lastmod) } : {}),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
});
