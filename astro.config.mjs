// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://santoriniimperial.com',
  vite: { plugins: [tailwindcss()] },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', el: 'el', de: 'de', fr: 'fr', it: 'it' },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'el', 'de', 'fr', 'it'],
    routing: { prefixDefaultLocale: false },
  },
  redirects: {
    '/gr': '/el',
  },
});
