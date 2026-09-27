# @grantcodes/astro — Validation Checklist

## Before publishing

1. Build the workspace so the UI CEM and style-dictionary outputs are current:
   ```bash
   pnpm build
   pnpm --filter @grantcodes/astro gen:props
   ```
2. Verify the packed inventory:
   ```bash
   pnpm --filter @grantcodes/astro test:package
   ```
   This checks every `src/`, `client/`, and `shims/` file, all export targets, generated typings, and `tsconfig.json`, while excluding development files.
3. Run the Astro suite:
   ```bash
   pnpm --filter @grantcodes/astro test
   ```
   The smoke test packs the Astro, UI, and style-dictionary units, installs them in temporary consumers outside the workspace, and builds them against exact `astro@7.0.0` and `astro@7.3.5`. It verifies config loading, a block import, generated component typings, Declarative Shadow DOM, and a `client:load` component.
4. Confirm generated files are committed:
   ```bash
   git diff --exit-code
   ```

CI and the release workflow run the post-build package-content test after generating Astro typings and before publishing.

## After publishing

Download the published Astro tarball, repeat the inventory check and both external consumer builds with registry dependencies, and report the released version and tested Astro pair on the tracking issue before closing it.
