# Migrating from `@semantic-ui/astro-lit` to `@grantcodes/astro`

`@grantcodes/astro` is a zero-config Astro integration that replaces `@semantic-ui/astro-lit`, manual Vite configuration, and the standalone `@grantcodes/astro-blocks` package with a single `integrations: [ui()]` import.

## Prerequisites

Before migrating, ensure your project meets these requirements:

- **Astro** `^6.0.0`
- **lit** `^3.2.0` (should already be installed)

## Step 1: Install the new package

```bash
npm install @grantcodes/astro
```

> `@grantcodes/ui` and `lit` should already be installed in your project.

## Step 2: Remove old dependencies

Remove the following packages from your project:

- `@semantic-ui/astro-lit`
- `@grantcodes/astro-blocks` (if you were using the standalone package)

### Before (`package.json`)

```json
{
  "dependencies": {
    "@semantic-ui/astro-lit": "^5.3.0",
    "@grantcodes/astro-blocks": "workspace:*",
    "@grantcodes/ui": "workspace:*",
    "astro": "^6.2.1",
    "lit": "^3.2.1",
    "marked": "^17.0.4"
  }
}
```

### After (`package.json`)

```json
{
  "dependencies": {
    "@grantcodes/astro": "^0.0.1",
    "@grantcodes/ui": "workspace:*",
    "astro": "^6.2.1",
    "lit": "^3.2.1"
  }
}
```

## Step 3: Update `astro.config.mjs`

`@grantcodes/astro` should become the only place that owns Lit SSR wiring for this package set.
Keep unrelated app config such as aliases, Starlight, sitemap, env schema, image settings, and other integrations.
Remove the manual migration leftovers that the integration already handles for you.

### Before

```javascript
import { fileURLToPath } from 'node:url';
import { defineConfig, envField } from 'astro/config';
import lit from '@semantic-ui/astro-lit';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import { cssImportAttributes } from '@grantcodes/ui/vite-plugin';

export default defineConfig({
  site: 'https://example.com',
  vite: {
    resolve: {
      alias: {
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      },
      noExternal: ['@grantcodes/ui', '@grantcodes/astro-blocks'],
    },
    plugins: [cssImportAttributes()],
    ssr: {
      noExternal: ['@grantcodes/ui', '@grantcodes/astro-blocks'],
    },
  },
  env: {
    schema: {
      TITLE: envField.string({ context: 'server', access: 'public' }),
    },
  },
  integrations: [
    lit(),
    starlight({
      title: 'Docs',
    }),
    sitemap(),
  ],
});
```

### After

Use a starter-like migrated config as the primary target shape:

```javascript
import { fileURLToPath } from 'node:url';
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';
import ui from '@grantcodes/astro';
import { envDefaults } from './integrations/env-defaults.ts';

export default defineConfig({
  site: 'https://example.com',
  vite: {
    resolve: {
      alias: {
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      },
    },
  },
  env: {
    schema: {
      TITLE: envField.string({
        context: 'server',
        access: 'public',
        default: envDefaults.TITLE,
      }),
    },
  },
  integrations: [
    ui({
      theme: 'grantcodes',
      ogImages: {
        titleTemplate: envDefaults.META_TITLE_TEMPLATE,
      },
    }),
    starlight({
      title: 'Docs',
    }),
    sitemap(),
  ],
});
```

If you want the smallest safe config reference, this is the minimal fallback shape:

```javascript
import { defineConfig } from 'astro/config';
import ui from '@grantcodes/astro';

export default defineConfig({
  integrations: [ui({ theme: 'grantcodes' })],
});
```

If your real app already has aliases, image settings, env schema, i18n, or other integrations, keep them. The migration is about removing obsolete Lit/Vite wiring, not flattening the rest of your app config.

### Remove the old integration-owned wiring

```diff
- import lit from '@semantic-ui/astro-lit';
- import { cssImportAttributes } from '@grantcodes/ui/vite-plugin';
  import ui from '@grantcodes/astro';

  export default defineConfig({
    vite: {
-     plugins: [cssImportAttributes()],
-     ssr: {
-       noExternal: ['@grantcodes/ui', '@grantcodes/astro-blocks'],
-     },
      resolve: {
-       noExternal: ['@grantcodes/ui', '@grantcodes/astro-blocks'],
        alias: {
          // keep app aliases
        },
      },
    },
    integrations: [
-     lit(),
-     manualLitRenderer(),
-     manualLitHydration(),
+     ui({ theme: 'grantcodes' }),
    ],
  })
```

### Remove these manual wiring leftovers

After migrating, delete these items from your old config if they were only there to support the previous Lit setup:

- `import lit from '@semantic-ui/astro-lit'`
- `import { cssImportAttributes } from '@grantcodes/ui/vite-plugin'`
- manual `vite.plugins` entries for `cssImportAttributes()`
- manual `vite.ssr.noExternal`
- duplicated `vite.resolve.noExternal`
- `vite.optimizeDeps.exclude` entries that only existed for `@grantcodes/ui`
- any standalone manual Lit SSR renderer or hydration wiring tied to the old integration

`vite.resolve.alias` and other app-specific config can stay.

> `@grantcodes/astro` already applies the Lit SSR renderer, `cssImportAttributes()`, `vite.ssr.noExternal`, and `vite.optimizeDeps.exclude` for `@grantcodes/ui`.
>
> If you pass `theme`, `@grantcodes/astro` loads the matching bundled theme stylesheet for you. That replaces a separate manual theme import, but it does not inject `@grantcodes/ui/styles/base.css`.

## What changed?

The integration absorbs these manual configuration items:

| Manual Config Item | What the integration does |
|--------------------|---------------------------|
| Lit SSR renderer (`@semantic-ui/astro-lit`) | Internal renderer via `addRenderer()` |
| CSS import attributes Vite plugin (`cssImportAttributes()`) | Registered automatically via `updateConfig()` |
| Vite `ssr.noExternal` | Applied for `@grantcodes/ui` and `@grantcodes/astro-blocks` |
| Vite `optimizeDeps.exclude` | Applied for `@grantcodes/ui` |
| Hydration support | Injected via `injectScript('before-hydration', ...)` |

## Step 4: Keep the style contract intact

Do **not** patch or strip `@grantcodes/ui` CSS imports to silence warnings or force a build through.
That is unsupported, breaks Lit shadow styles, and can surface `<style>undefined</style>` in rendered output.
The fix is to restore the original package CSS imports and trust the integration-owned Vite wiring instead of patching built package files.

Use this decision tree after migrating:

1. If you pass `theme` to `ui({ theme: 'grantcodes' })`, the integration loads the bundled theme stylesheet for you.
2. If your app still relies on `@grantcodes/ui` global base styles, keep `@grantcodes/ui/styles/base.css` as a manual app import.
3. Only remove the manual `base.css` import if your app already provides equivalent global UI base styles another way.
4. If styles disappear after migration, restore the package CSS imports and remove bad manual Vite wiring instead of patching package source.

Known-good split (this mirrors `apps/astro/src/layouts/Layout.astro`):

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import ui from '@grantcodes/astro';

export default defineConfig({
  integrations: [ui({ theme: 'grantcodes' })],
});
```

```astro
---
import '@grantcodes/ui/styles/base.css';
---
```

The integration-owned theme import and the app-owned `base.css` import solve different problems. Keep them separate in the docs and in migrated apps.

### Quick checklist

- `ui({ theme: 'grantcodes' })` owns the bundled theme stylesheet
- `@grantcodes/ui/styles/base.css` stays as a manual app import unless your app already replaces those base styles
- `@grantcodes/astro` owns `cssImportAttributes()`, `vite.ssr.noExternal`, and related Lit SSR wiring
- Restoring package CSS imports is the supported fix when you see `<style>undefined</style>`

## Step 5: Update component imports

If you were using `@grantcodes/astro-blocks`, change your imports:

```astro
---
// Before
import { Hero, Cards } from '@grantcodes/astro-blocks';

// After
import { Hero, Cards } from '@grantcodes/astro/blocks';
---
```

All other component imports from `@grantcodes/ui` remain unchanged.

## Step 6: Verify the migration

1. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Check that components render correctly with Declarative Shadow DOM templates.

2. **Run a static build:**
   ```bash
   npm run build
   ```
   Ensure the build completes without errors.

3. **Inspect the HTML output:**
   Look for `<template shadowrootmode="open">` inside your component tags in the rendered HTML. This confirms SSR is working.

## Troubleshooting

### "Warning about `resolve.noExternal`"

If you see this warning from `@grantcodes/astro`:

```
[@grantcodes/astro] WARNING: Your astro.config.mjs has `resolve.noExternal` which duplicates `ssr.noExternal`. This is a known config bug. Remove `resolve.noExternal` to avoid unexpected behavior.
```

**Fix:** Remove the `resolve.noExternal` array from your Vite config. It was incorrectly duplicating `ssr.noExternal` and is not needed.

### `<style>undefined</style>` or missing component styles

If a migrated app starts rendering `<style>undefined</style>` or web components lose their shadow styles, check for unsupported CSS import patching first.

**Common cause:** stripping or rewriting `@grantcodes/ui` CSS imports in built package files to quiet warnings.

**Fix path:**

1. Restore the original `@grantcodes/ui` package CSS imports.
2. Remove obsolete manual Vite wiring such as `cssImportAttributes()`, manual `vite.ssr.noExternal`, and duplicated `vite.resolve.noExternal`.
3. Keep `ui({ theme })` for bundled theme loading.
4. Keep `@grantcodes/ui/styles/base.css` as a manual app import unless equivalent global UI base styles already exist elsewhere in your app.
5. Re-test after restoring the package imports instead of carrying a patch against compiled package source.

Do not patch package source as the long-term fix.

### Build errors after migration

If you encounter module resolution errors, check that `lit` is not duplicated in your dependency tree:

```bash
npm ls lit
```

There should be only one version of `lit` installed. If duplicates exist, deduplicate them or use your package manager's resolution strategy (`overrides` in npm, `resolutions` in Yarn, or pnpm overrides).

### `astro-blocks` imports not found

If you get errors about `@grantcodes/astro-blocks` not being found, update the import path to `@grantcodes/astro/blocks`:

```astro
---
import { Hero, Cards, Cta } from '@grantcodes/astro/blocks';
---
```

If you are not using blocks, simply don't import them — they won't affect your build.
