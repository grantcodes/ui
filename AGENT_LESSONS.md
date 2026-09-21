# Durable agent lessons

Confirmed lessons for this monorepo, distilled from `.planning/AGENT_NOTES.md` (ephemeral, gitignored working notes) and from review findings. Read this before non-trivial work in an area you have not touched before.

Promote a lesson here once it has held across two separate tasks or a code review; keep single observations in `.planning/AGENT_NOTES.md`.

## Tokens and theming

- Token layers are strict: `01-ref` holds every raw value, and `02-semantic`/`03-components` may only reference `{ref.*}` or their own layer. Adding a raw colour anywhere else breaks the boundary (`packages/style-dictionary/AGENTS.md` has the details).
- Core and theme files may define the same primitive on purpose (grantina's `ref.color.blue`/`yellow` collide with core's flattened utility colours); resolution is by source order and the theme wins. That is intended, not a bug.
- Known baselines, not regressions: ~41 style-dictionary token collisions and ~29 Biome lint warnings already exist in the tree. Compare against the baseline instead of reporting them as new.

## Astro and SSR

- Starlight tracks Astro's peer range — upgrade both in the same commit (Starlight v0.41+ requires Astro 7).
- Astro 7 changed `compressHTML`'s default to `'jsx'`; `apps/astro` sets `compressHTML: true` explicitly to keep the v6 whitespace behaviour.
- Starlight's sidebar `autogenerate` must be wrapped as `items: [{ autogenerate: {…} }]`.
- `@lit-labs/ssr` v4 `renderShadow()` returns a `ThunkedRenderResult` (strings and thunks); resolve it with `collectResultSync` from `@lit-labs/ssr/lib/render-result.js`.
- `@lit-labs/ssr-dom-shim` still calls the deprecated `module.register()` (Node 24 DEP0205) — upstream, harmless.

## OG images (Satori)

- Fonts must be read as concrete buffers: a theme token name does not resolve to a font file, so pair token defaults with explicit bundled file mappings.
- Satori does not resolve CSS custom properties, so an SVG logo using `currentColor` renders incorrectly.
- Decode HTML entities before handing text to Satori (the current decoder covers named entities and `&#39;`).
- A missing `logo`/`favicon` falls back silently and the build still succeeds.

## CMS (Sveltia)

- `config.yml` drifts from the Astro block schemas (10 of 16 block types were once missing); import block schemas from `@grantcodes/astro/blocks` instead of keeping a local copy.
- Never import a real component library (for example `@grantcodes/ui/react`) into a preview template: the CMS iframe supplies its own React via `window.h`, and a second React instance breaks hooks. Use plain simulated markup.
- Preview templates and CMS login cannot be unit-tested headlessly — verification is manual or browser-only.

## Tooling

- pnpm 11 defaults `minimumReleaseAge` to 24h; `pnpm-workspace.yaml` sets `minimumReleaseAge: 1440` to keep resolution fast.
- `lucide-static` is a runtime dependency of `@grantcodes/ui` (imported by the icon and feature-list components) — it belongs in `dependencies`.
- `marked` v18 `parse()` is async by default; the sync API needs `{ async: false }`.
- Biome's `migrate --write` renames rules mechanically, but promoted nursery rules need a lint-baseline comparison afterwards.

## Where ephemeral notes live

Plans, research, working notes and overnight reports belong in `.planning/`, which is gitignored and must never be committed. Promote what is durable into this file; keep the rest ephemeral.
