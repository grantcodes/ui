# @grantcodes/astro

Zero-config Astro integration that wires Lit SSR, the `@grantcodes/ui` styles and the OG-image hooks into one `ui()` integration.

## Structure

```text
src/
├── index.ts        # the ui() integration: renderer registration, theme injection, OG hooks
├── blocks.ts       # re-exports the content blocks (`@grantcodes/astro/blocks`)
├── blocks/         # .astro content blocks (accordion, hero, gallery, …) + schemas/
├── ssr/            # Lit SSR renderer and SSR constructor diagnostics
├── og-images.ts    # integration-managed OG image options and build hooks
├── themes.ts       # theme name + colour scheme → stylesheet import
├── vite-config.ts  # shared Vite config (ssr.noExternal, CSS import attributes)
├── generated/      # generated typings — never edit by hand
client/entry.ts     # client entrypoint for the renderer (hydration)
shims/              # hydration-support and the server shim
scripts/            # generate-astro-typings-from-cem.ts (runs on pretest)
test/               # node:test smoke / SSR / typings / OG tests
```

## What does NOT belong here

- Component classes, styles and tokens — those are `@grantcodes/ui` and `@grantcodes/style-dictionary`.
- App pages, content and `astro.config.mjs` — those are `apps/astro`.
- `src/generated/*`: change `scripts/generate-astro-typings-from-cem.ts` and regenerate instead.
- The retired standalone `@grantcodes/astro-blocks` package — see `packages/astro-blocks/AGENTS.md`.

## Where to look next

- Moving off `@semantic-ui/astro-lit` or the standalone blocks package: `MIGRATION.md`.
- What this package guarantees: `COMPATIBILITY.md`, `CHECKLIST.md`, `README.md`.
- Satori/OG font and SVG constraints: `AGENT_LESSONS.md` at the repo root.

## Conventions

- Tests are plain `.js` files run by `tsx --test`; a new test file must be added to the `test` script in `package.json` or it will not run.
- `pretest` regenerates `src/generated/ui-component-props.d.ts` from the CEM — keep the generator and the committed output in sync.
