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

### Before

```javascript
import { defineConfig } from 'astro/config';
import lit from '@semantic-ui/astro-lit';
import { cssImportAttributes } from '@grantcodes/ui/vite-plugin';

export default defineConfig({
  // ... other config
  vite: {
    optimizeDeps: {
      exclude: ['@grantcodes/ui'],
    },
    plugins: [cssImportAttributes()],
    ssr: {
      noExternal: ['@grantcodes/ui', '@grantcodes/astro-blocks'],
    },
    resolve: {
      noExternal: ['@grantcodes/ui', '@grantcodes/astro-blocks'],
      // ... aliases
    },
  },
  integrations: [
    lit(),
    // ... other integrations
  ],
});
```

### After

```javascript
import { defineConfig } from 'astro/config';
import ui from '@grantcodes/astro';

export default defineConfig({
  // ... other config (vite.resolve.alias can stay)
  integrations: [
    ui(),
    // ... other integrations
  ],
});
```

> You can safely remove `resolve.noExternal` — it was a known bug duplicating `ssr.noExternal`. The integration applies `ssr.noExternal` correctly for you.

## Step 4: Update component imports

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

## Step 5: Verify the migration

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

## What changed?

The integration absorbs these manual configuration items:

| Manual Config Item | What the integration does |
|--------------------|---------------------------|
| Lit SSR renderer (`@semantic-ui/astro-lit`) | Internal renderer via `addRenderer()` |
| CSS import attributes Vite plugin (`cssImportAttributes()`) | Registered automatically via `updateConfig()` |
| Vite `ssr.noExternal` | Applied for `@grantcodes/ui` and `@grantcodes/astro-blocks` |
| Vite `optimizeDeps.exclude` | Applied for `@grantcodes/ui` |
| Hydration support | Injected via `injectScript('before-hydration', ...)` |

## Troubleshooting

### "Warning about `resolve.noExternal`"

If you see this warning from `@grantcodes/astro`:

```
[@grantcodes/astro] WARNING: Your astro.config.mjs has `resolve.noExternal` which duplicates `ssr.noExternal`. This is a known config bug. Remove `resolve.noExternal` to avoid unexpected behavior.
```

**Fix:** Remove the `resolve.noExternal` array from your Vite config. It was incorrectly duplicating `ssr.noExternal` and is not needed.

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
