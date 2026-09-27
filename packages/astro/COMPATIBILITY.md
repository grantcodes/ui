# @grantcodes/astro — Compatibility Notes

## Verified versions

| Dependency | Version | Result |
| --- | --- | --- |
| Astro | 7.0.0 | Packed external consumer build passes |
| Astro | 7.3.5 | Packed external consumer build passes |
| `@lit-labs/ssr` | 4.1.0 | SSR diagnostics and Declarative Shadow DOM tests pass |

Verification uses Node 24 and pnpm 11.27.1. The Astro 7.3.5 endpoint is a tested endpoint, not a maximum supported version.

## Package availability

Version 0.2.9 declares Astro 7 support but omits `src/` from its published tarball, so it is not usable as an external consumer dependency. Use the next release containing the package-content fix.

The package test checks the `pnpm pack --dry-run --json` inventory for every runtime source file, export target, generated UI typings, and `tsconfig.json`; it also rejects tests, scripts, logs, `AGENTS.md`, and `.turbo/`.

## Reporting issues

Include the installed Astro and `@lit-labs/ssr` versions plus the result of `pnpm --filter @grantcodes/astro test`.
