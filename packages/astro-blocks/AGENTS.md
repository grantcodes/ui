# @grantcodes/astro-blocks (retired)

This directory is all that is left of the standalone `@grantcodes/astro-blocks` package: its `CHANGELOG.md`. There is no `package.json` and no `src` here, so it is not a workspace package any more.

## What does NOT belong here

- Everything. Do not add sources, tests or a `package.json` to this directory.
- Block schemas and `.astro` blocks: they live in `packages/astro/src/blocks`.

## Where to look next

- The blocks and their schema: `packages/astro/src/blocks/`, re-exported by `packages/astro/src/blocks.ts` and published as `@grantcodes/astro/blocks`.
- Why the package went away and what replaced it: `packages/astro/MIGRATION.md`.
- Consumer schema imports: import block schemas from `@grantcodes/astro/blocks`, never from a local copy (drift).
