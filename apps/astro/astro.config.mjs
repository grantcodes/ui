import { fileURLToPath } from 'node:url';
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import ui from '@grantcodes/astro';
import { envDefaults } from './integrations/env-defaults.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://grant.codes',
  output: 'static',
  vite: {
    server: {
      allowedHosts: ['.munchkin-beaver.ts.net'],
    },
    resolve: {
      alias: {
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@i18n': fileURLToPath(new URL('./src/i18n', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
        '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      },
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop',
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  env: {
    schema: {
      TITLE: envField.string({
        context: 'server',
        access: 'public',
        default: envDefaults.TITLE,
      }),
      META_TITLE_TEMPLATE: envField.string({
        context: 'server',
        access: 'public',
        default: envDefaults.META_TITLE_TEMPLATE,
      }),
      META_DESCRIPTION: envField.string({
        context: 'server',
        access: 'public',
        default: envDefaults.META_DESCRIPTION,
      }),
      META_TWITTER: envField.string({
        context: 'server',
        access: 'public',
        default: envDefaults.META_TWITTER,
      }),
    },
  },
  integrations: [
    ui({
      theme: envDefaults.UI_THEME,
      ogImages: {
        titleTemplate: envDefaults.META_TITLE_TEMPLATE,
      },
    }),
    starlight({
      logo: {
        src: './public/favicon.svg',
      },
      title: {
        en: 'grant.codes',
      },
      customCss: [
        './src/styles/style.css',
        './src/styles/docs.css',
      ],
      editLink: {
        baseUrl: 'https://github.com/grantcodes/ui/edit/main/apps/astro/',
      },
      sidebar: [
        {
          label: 'Getting started',
          autogenerate: { directory: 'docs/getting-started' },
        },
        { label: 'Extending', autogenerate: { directory: 'docs/extending' } },
        {
          label: 'Recommendations',
          autogenerate: { directory: 'docs/recommendations' },
        },
        { label: 'Tech choices', link: '/docs/tech-choices/' },
      ],
      social: [
        { label: 'GitHub', icon: 'github', href: 'https://github.com/grantcodes/ui' },
      ],
    }),
    sitemap(),
  ],
});
