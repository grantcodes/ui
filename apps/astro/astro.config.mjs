import { fileURLToPath } from 'node:url';
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import lit from '@semantic-ui/astro-lit';
import astroOgImages from '@grantcodes/astro-og-images';
import { cssImportAttributes } from '@grantcodes/ui/vite-plugin';
import { envDefaults } from './integrations/env-defaults.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://grant.codes',
  output: 'static',
  vite: {
    server: {
      allowedHosts: ['.munchkin-beaver.ts.net'],
    },
    optimizeDeps: {
      exclude: ['@grantcodes/ui'],
    },
    plugins: [cssImportAttributes()],
    ssr: {
      noExternal: ['@grantcodes/ui', '@grantcodes/astro-blocks'],
    },
    resolve: {
      noExternal   : ['@grantcodes/ui', '@grantcodes/astro-blocks'],
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
    lit(),
    astroOgImages({
      titleTemplate: envDefaults.META_TITLE_TEMPLATE,
      backgroundColor: envDefaults.OG_IMAGE_BACKGROUND_COLOR,
      foregroundColor: envDefaults.OG_IMAGE_COLOR,
      fontName: envDefaults.OG_IMAGE_FONT_NAME,
      titleFontFile: envDefaults.OG_IMAGE_TITLE_FONT_FILE,
      bodyFontFile: envDefaults.OG_IMAGE_BODY_FONT_FILE,
      titleFontWeight: envDefaults.OG_IMAGE_TITLE_FONT_WEIGHT,
      bodyFontWeight: envDefaults.OG_IMAGE_BODY_FONT_WEIGHT,
    }),
    starlight({
      logo: {
        src: './public/favicon.svg',
      },
      title: {
        en: 'grant.codes',
      },
      customCss: [
        '@grantcodes/ui/styles/themes/grantcodes.css',
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
