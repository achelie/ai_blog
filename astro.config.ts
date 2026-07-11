import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

const site = process.env.SITE_URL ?? 'https://www.evidique.com';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    icon(),
    sitemap({ filter: (page) => !page.endsWith('/search/') && !page.endsWith('/404/') }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
