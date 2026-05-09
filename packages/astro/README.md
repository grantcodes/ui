# @grantcodes/astro

[![npm version](https://img.shields.io/npm/v/@grantcodes/astro)](https://www.npmjs.com/package/@grantcodes/astro)
[![license](https://img.shields.io/npm/l/@grantcodes/astro)](https://github.com/grantcodes/ui/blob/main/packages/astro/LICENSE)

Zero-config Astro integration for `@grantcodes/ui` Lit web components. Replaces four manual configuration blocks and an external dependency with a single `integrations: [ui()]` import.

## Features

- **Lit SSR** with Declarative Shadow DOM (`<template shadowrootmode="open">`)
- **Automatic Vite configuration** — CSS import attributes, `ssr.noExternal`, `optimizeDeps.exclude`
- **Automatic hydration support** for `client:*` directives
- **Built-in `@grantcodes/astro-blocks` re-exports**
- **Config conflict detection and warnings**

## Installation

```bash
npm install @grantcodes/astro
```

Peer dependencies (must be installed separately):

- `astro` `^6.0.0`
- `lit` `^3.2.0`

## Quick Start

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import ui from '@grantcodes/astro';

export default defineConfig({
  integrations: [ui({ theme: 'grantcodes' })],
});
```

Passing `theme` auto-loads the matching `@grantcodes/ui` theme stylesheet for the site and gives bundled OG image generation a matching set of default colors and fonts.

## Usage

### Importing Components

Import the component class to register the custom element. All components render server-side by default with Declarative Shadow DOM:

```astro
---
import { GrantCodesButton } from '@grantcodes/ui/components/button/index.js';
---

<grantcodes-button variant="primary">Click me</grantcodes-button>
```

Components render on the server and hydrate automatically in the browser. Use Astro's `client:*` directives to control hydration timing when needed:

```astro
<!-- Hydrate as soon as the page loads -->
<grantcodes-button client:load>Click me</grantcodes-button>

<!-- Hydrate when scrolled into view -->
<grantcodes-button client:visible>Click me</grantcodes-button>

<!-- Never hydrate — static server-rendered output only -->
<grantcodes-button client:only="lit">Click me</grantcodes-button>
```

> Most components work fine without any directive. Add `client:load` or `client:visible` only when you need interactivity.

### Theme and Styles

Use this decision tree for styles after adopting `@grantcodes/astro`:

1. If you pass `theme` to `ui({ theme: 'grantcodes' })`, the integration loads the bundled theme stylesheet for you.
2. If your app still depends on the shared global UI base styles, keep `@grantcodes/ui/styles/base.css` as a manual app import.
3. Only remove the manual `base.css` import if your app already provides equivalent global UI base styles another way.
4. Do not document or expect automatic `base.css` injection from the integration. It does not happen.

Known-good split (this mirrors `apps/astro/src/layouts/Layout.astro`):

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import ui from '@grantcodes/astro';

export default defineConfig({
  integrations: [
    ui({
      theme: 'grantcodes',
      ogImages: {
        titleTemplate: '%s | grant.codes',
      },
    }),
  ],
});
```

Supported themes: `grantcodes`, `grantina`, `todomap`, `wireframe`.

```astro
---
import '@grantcodes/ui/styles/base.css';
---
```

If you prefer to manage theme styles manually, import the theme stylesheet yourself. Keep theme CSS and `base.css` as separate decisions:

```astro
---
import '@grantcodes/ui/styles/themes/grantcodes.css';
---
```

### OG Images

Bundled OG generation is enabled through the same `ui()` integration:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import ui from '@grantcodes/astro';

export default defineConfig({
  integrations: [
    ui({
      theme: 'grantcodes',
      ogImages: true,
    }),
  ],
});
```

## Blocks

The integration re-exports all `@grantcodes/astro-blocks` components via the `./blocks` subpath:

```astro
---
import { Hero, Cards, Cta } from '@grantcodes/astro/blocks';
---

<Hero title="Welcome" />
<Cards items={[...]} />
```

Available blocks: `accordion`, `cards`, `countdown`, `cta`, `feature-list`, `gallery`, `hero`, `logo-cloud`, `map`, `media-text`, `newsletter`, `pricing`, `stats`, `testimonials`, `text`

## Known Limitations

### Async Components Not SSRable

Components that perform asynchronous operations during render (for example, fetching data inside `render()`) cannot be server-side rendered by `@lit-labs/ssr`. Use `client:only="lit"` for these components.

### DOM Shim Interference

The integration applies a DOM shim on the server that patches `globalThis.HTMLElement` and `globalThis.customElements`. This may interfere with other Astro renderers that also modify global DOM APIs. If you use multiple UI frameworks in the same project, test thoroughly.

### Browser Support

This integration targets modern browsers with native Declarative Shadow DOM support:

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90 |
| Edge | 90 |
| Safari | 16.4 |
| Firefox | 123 |

### `@lit-labs/ssr` Experimental Status

The SSR renderer depends on `@lit-labs/ssr`, which is experimental and does not guarantee API stability. The integration isolates all `@lit-labs/ssr` imports to a single adapter module (`src/ssr/lit-renderer.ts`) to minimize the impact of future API changes.

## Migration

Migrating from `@semantic-ui/astro-lit`? See [MIGRATION.md](./MIGRATION.md).

## Architecture Overview

When initialized, the integration performs these actions:

1. **Registers Lit SSR renderer** via `addRenderer()` — tells Astro to use `@grantcodes/astro/server` for SSR and `@grantcodes/astro/client` for hydration
2. **Injects hydration support** via `injectScript('before-hydration', ...)` — imports `@lit-labs/ssr-client/lit-element-hydrate-support.js`
3. **Applies Vite config** via `updateConfig()` — registers `cssImportAttributes` plugin, sets `ssr.noExternal`, sets `optimizeDeps.exclude`
4. **Warns about conflicting config** via `astro:config:done` hook — detects `resolve.noExternal` duplication and warns

## License

MIT
