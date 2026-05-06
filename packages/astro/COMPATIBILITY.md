# @grantcodes/astro — Compatibility Notes

## @lit-labs/ssr Version Compatibility

The `@grantcodes/astro` integration depends on `@lit-labs/ssr` for server-side rendering of Lit components. Because `@lit-labs/ssr` is experimental and may introduce API changes between versions, this document tracks which versions have been verified.

### Tested Versions

| Version | Date Tested | Result | Notes |
|---------|-------------|--------|-------|
| 3.3.1   | —           | —      | Current dependency; run checklist to verify |
| 3.2.2   | —           | —      | Previous minor; run checklist to verify |

### Test Procedure

See [CHECKLIST.md](./CHECKLIST.md) section 3 "Multi-Version Compatibility" for the exact test steps.

### Known Limitations

- `@lit-labs/ssr` 4.0.0+ has not been tested. It may contain breaking API changes that require updates to `src/ssr/lit-renderer.ts`.
- Only the `check` and `renderToStaticMarkup` functions from `@lit-labs/ssr/lib/lit-element-renderer.js` are used. Changes to other APIs do not affect this integration.

### Reporting Issues

If you encounter compatibility issues with a specific `@lit-labs/ssr` version:

1. Note the exact version in your `package-lock.json` or `pnpm-lock.yaml`
2. Run the smoke test: `cd packages/astro && pnpm test`
3. If the smoke test fails, check `src/ssr/lit-renderer.ts` for API mismatches
