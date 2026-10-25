# Astro setup

Use `@grantcodes/astro`, not the retired `@grantcodes/astro-blocks` or the older `@semantic-ui/astro-lit` integration. Check installed peers (this snapshot requires Astro ^7.0.0 and Lit ^3.2.0).

```js
import { defineConfig } from 'astro/config';
import ui from '@grantcodes/astro';

export default defineConfig({
  integrations: [ui({ theme: 'grantcodes' })],
});
```

The integration supplies the Lit renderer, before-hydration support, Vite CSS import-attribute transform, `ssr.noExternal`, and `optimizeDeps.exclude`. Do not add duplicate manual config.

Only an explicit `theme` option injects the matching UI theme stylesheet. Bare `ui()` does not inject theme CSS. Import base.css yourself if you want global/native styles:

```astro
---
import '@grantcodes/ui/styles/base.css';
import { Hero, Cards } from '@grantcodes/astro/blocks';
---
<html lang="en" class="light">
  <body>
    <Hero title="Local projects" button="Browse" href="#projects" />
    <section id="projects" aria-label="Projects">
      <Cards cards={[{ title: 'Community garden', href: '/garden' }]} />
    </section>
  </body>
</html>
```

Without an explicit integration theme, import `@grantcodes/ui/styles/themes/grantcodes.css` manually. Theme and base CSS are distinct choices. `colorScheme` affects OG colour resolution, not the document's light/dark class.

## Constructors, custom tags, and hydration

For renderer-managed SSR/hydration, import a **registered constructor** and render that identifier:

```astro
---
import { GrantCodesButton } from '@grantcodes/ui/components/button/button.js';
---
<GrantCodesButton href="/about">About</GrantCodesButton>
```

A lowercase `<grantcodes-button>` tag is ordinary custom-element markup; importing a constructor does not turn it into an Astro renderer component. Do not attach Astro hydration directives to lowercase tags.

| Choice | When |
| --- | --- |
| Constructor, no directive | Static SSR output; no client lifecycle or event listeners |
| Constructor + client:load | SSR plus immediate browser interaction |
| Constructor + client:visible | SSR plus interaction deferred until visible |
| Constructor + client:only | Browser-only behaviour that cannot SSR; no initial SSR content |
| Lowercase tag + script register import | Explicit client upgrade without renderer-managed SSR |

Prefer static SSR for content, not blanket hydration. Native links/forms/details can work in SSR markup, but JS-dependent behaviour needs registration/hydration. Blocks already make their own decisions: Accordion hydrates its wrapper on visibility; MapEmbed and Countdown are client-only. Other blocks are static. Do not put `client:*` on the .astro block itself. Use the underlying registered UI constructor when a different lifecycle is required.

`.component.js` classes alone are not registration. Avoid mixing accordion's independently registering `index.js` and `accordion.js` paths in one app; blocks use `index.js`.

## Structured content and OG

Read [BlockRenderer and schemas](astro-renderer.md) for content collections and shape validation. Astro block object/array props are serialized internally where UI expects JSON strings. Do not stringify them yourself.

Optional OG generation: change the config to `ui({ theme: 'grantcodes', ogImages: true })`. It is off when omitted or false. A custom local logo and `titleTemplate` can be provided in `ogImages`; do not add the separate OG integration on top of it. Explicit invalid asset paths fail builds. Verify generated output in the consuming site's build.
