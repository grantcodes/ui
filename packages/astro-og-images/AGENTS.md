# @grantcodes/astro-og-images

Standalone Astro integration that reads built pages, renders an OpenGraph image per page with Satori and writes `og.png` next to each `index.html`.

## Structure

```text
src/integration.ts   # the whole package: options, defaults, build hooks
```

There is no build step (`build` is a no-op) and no test suite (`test` is a no-op): the package is source-imported by consumers.

## What does NOT belong here

- Component or block code, tokens and themes — `@grantcodes/ui`, `@grantcodes/style-dictionary`, `@grantcodes/astro`.
- New OG-image work for consumers of the integration: option resolution and hooks now live in `packages/astro/src/og-images.ts` and are reached through `ui({ ogImages: … })`. This package is the pre-integration standalone entry point and is only kept for existing consumers.
- Anything requiring an Astro integration test — this package has no test harness.

## Where to look next

- The integration-managed path: `packages/astro/src/og-images.ts`, `packages/astro/src/index.ts`.
- OG image tests: `packages/astro/test/og-images.test.js`.
- Satori/SVG/font pitfalls: `AGENT_LESSONS.md` at the repo root.

## Gotchas

- Font files must be read as concrete buffers; theme token names do not resolve to font files.
- Satori does not resolve CSS custom properties, so a logo using `currentColor` renders incorrectly, and a missing `logo`/`favicon` silently falls back.
