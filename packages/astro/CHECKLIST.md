# @grantcodes/astro — Validation Checklist

Run these checks before release or when dependency issues arise.

## 1. Cross-Browser DSD Verification

**Purpose:** Confirm Declarative Shadow DOM renders correctly in supported browsers.

**Prerequisites:**
- `apps/astro` dev server running (`pnpm dev:astro` from monorepo root)
- Access to Chrome 90+, Firefox 123+, and Safari 16.4+

**Steps:**
1. Open http://localhost:4321/ in Chrome 90+
2. Open DevTools → Elements panel
3. Locate a `<grantcodes-*>` custom element
4. Verify: the element contains a `<template shadowrootmode="open">` child
5. Verify: the template contains expected shadow DOM content (styles, slots)
6. Repeat steps 1-5 in Firefox 123+
7. Repeat steps 1-5 in Safari 16.4+

**Expected Result:** All three browsers show DSD templates with correct shadow content. No FOUC (flash of unstyled content) on initial load.

**Sign-off:**
- [ ] Chrome 90+ — DSD visible, no FOUC
- [ ] Firefox 123+ — DSD visible, no FOUC
- [ ] Safari 16.4+ — DSD visible, no FOUC

## 2. External Consumer Installation

**Purpose:** Verify the package installs and works outside the monorepo.

**Steps:**
1. From monorepo root, run: `pnpm pack --filter @grantcodes/astro`
2. Note the tarball path (e.g., `packages/astro/grantcodes-astro-0.0.1.tgz`)
3. Create a temporary directory outside the monorepo:
   ```bash
   mkdir -p /tmp/astro-external-test
   cd /tmp/astro-external-test
   ```
4. Initialize a project:
   ```bash
   npm init -y
   npm install astro@^6.0.0 lit@^3.2.0 <tarball-path>
   ```
5. Create `astro.config.mjs`:
   ```javascript
   import { defineConfig } from 'astro/config';
   import ui from '@grantcodes/astro';
   export default defineConfig({
     integrations: [ui()],
   });
   ```
6. Create `src/pages/index.astro`:
   ```astro
   ---
   import { GrantCodesButton } from '@grantcodes/ui/components/button/index.js';
   ---
   <html><body><grantcodes-button>Test</grantcodes-button></body></html>
   ```
7. Run: `npx astro build`
8. Inspect `dist/index.html` for `<template shadowrootmode="open">`

**Expected Result:** Build succeeds with no module resolution errors. DSD template present in output.

**Sign-off:**
- [ ] `npm install` completes without errors
- [ ] `astro build` exits 0
- [ ] `dist/index.html` contains `<template shadowrootmode="open">`
- [ ] No `@grantcodes/astro-blocks` or `@semantic-ui/astro-lit` references in output

## 3. Multi-Version Compatibility

**Purpose:** Verify the integration works with multiple `@lit-labs/ssr` minor versions.

**Recommended versions:** `3.2.2` and `3.3.1`

**Steps:**
1. Edit `packages/astro/package.json` dependencies:
   - Change `"@lit-labs/ssr": "^3.3.1"` to `"@lit-labs/ssr": "3.2.2"`
2. Run `pnpm install` from monorepo root
3. Run `pnpm test:astro` (or `cd packages/astro && pnpm test`)
4. Verify smoke test passes
5. Edit `packages/astro/package.json` again:
   - Change `"@lit-labs/ssr": "3.2.2"` to `"@lit-labs/ssr": "3.3.1"`
6. Run `pnpm install` again
7. Run `pnpm test:astro` again
8. Verify smoke test passes
9. Restore `package.json` to `"^3.3.1"` and run `pnpm install` one final time

**Expected Result:** Smoke test passes on both versions.

**Sign-off:**
- [ ] Version 3.2.2 — smoke test passes
- [ ] Version 3.3.1 — smoke test passes
- [ ] package.json restored to original version range

**Record results in COMPATIBILITY.md.**

## 4. Tarball Smoke Test

**Purpose:** Verify `pnpm pack` produces a valid, installable tarball.

**Steps:**
1. Run `pnpm pack --filter @grantcodes/astro`
2. Verify tarball exists at `packages/astro/grantcodes-astro-*.tgz`
3. Extract tarball to temp dir: `tar -xzf packages/astro/grantcodes-astro-*.tgz -C /tmp/astro-tarball-test`
4. Verify extracted contents include:
   - `package/package.json`
   - `package/src/index.ts`
   - `package/src/server.ts`
   - `package/src/ssr/lit-renderer.ts`
   - `package/src/vite-config.ts`
   - `package/src/blocks.ts`
   - `package/client/entry.ts`
   - `package/shims/*.ts`

**Expected Result:** All source files present. No build artifacts needed (source-based imports).

**Sign-off:**
- [ ] Tarball created successfully
- [ ] All required source files present in extracted tarball
- [ ] Can install tarball in fresh project (see Checklist 2)
