import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://bably.me is served by GitHub Pages (user site repo B-Elbably.github.io).
export default defineConfig({
  site: 'https://bably.me',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
