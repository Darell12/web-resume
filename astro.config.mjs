import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://darell.co',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
