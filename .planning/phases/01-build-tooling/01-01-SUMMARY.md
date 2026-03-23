---
phase: 01-build-tooling
plan: 01
subsystem: build
tags: [vite, lit, css-import-attributes, storybook, node-test-runner]

requires: []
provides:
  - Vite plugin for CSS import attributes (importCSSSheet)
  - Node.js test runner CSS hook via @lit-labs/ssr-dom-shim
  - _css-test fixture component proving all three pipelines work
affects: [02-pilot-migration, 03-full-component-migration]

tech-stack:
  added: ["@arcmantle/vite-plugin-import-css-sheet", "@lit-labs/ssr-dom-shim"]
  patterns: ["CSS import attributes: import styles from './x.css' with { type: 'css' }"]

key-files:
  created:
    - packages/ui/src/components/_css-test/css-test.component.js
    - packages/ui/src/components/_css-test/css-test.styles.css
    - packages/ui/src/components/_css-test/css-test.js
    - packages/ui/src/components/_css-test/css-test.stories.js
    - packages/ui/src/components/_css-test/css-test.test.js
  modified:
    - packages/ui/vite.config.js
    - packages/ui/package.json

key-decisions:
  - "Used @arcmantle/vite-plugin-import-css-sheet for Vite/Storybook CSS import attribute support — intercepts with { type: 'css' } and returns CSSStyleSheet objects compatible with Lit's static styles"
  - "Used @lit-labs/ssr-dom-shim/register-css-hook.js via --import flag for Node.js test runner — Lit team's official solution, worked without conflicts with happy-dom"

patterns-established:
  - "CSS import pattern: import styles from './component.styles.css' with { type: 'css' }"
  - "Static styles assignment: static styles = [styles] (array form, single CSSStyleSheet from import)"
  - "Test runner invocation: node --import @lit-labs/ssr-dom-shim/register-css-hook.js --test"

requirements-completed: [BUILD-01, BUILD-02]

duration: 5min
completed: 2026-03-23
---

# Phase 1: Build Tooling Summary

**Vite, Storybook, and Node.js test runner all handle CSS import attributes via importCSSSheet plugin and ssr-dom-shim hook**

## Performance

- **Duration:** 5 min
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Vite build processes `import styles from './x.css' with { type: 'css' }` without errors via importCSSSheet plugin
- Node.js test runner handles CSS import attributes via `--import @lit-labs/ssr-dom-shim/register-css-hook.js`
- All 237 tests pass (236 pass + 1 pre-existing skip), including 4 new _css-test fixture tests
- _css-test fixture component demonstrates the complete CSS import attributes pattern end-to-end

## Files Created/Modified

- `packages/ui/vite.config.js` — Added importCSSSheet plugin
- `packages/ui/package.json` — Added devDependencies, updated test:unit script with --import CSS hook
- `packages/ui/src/components/_css-test/css-test.styles.css` — Plain CSS file with :host and component styles
- `packages/ui/src/components/_css-test/css-test.component.js` — Lit component using CSS import attributes
- `packages/ui/src/components/_css-test/css-test.js` — Custom element registration
- `packages/ui/src/components/_css-test/css-test.stories.js` — Storybook stories
- `packages/ui/src/components/_css-test/css-test.test.js` — Unit tests proving CSS imports work in Node.js

## Decisions Made

- Used `@arcmantle/vite-plugin-import-css-sheet` for Vite/Storybook — intercepts `with { type: 'css' }` and returns CSSStyleSheet objects
- Used `@lit-labs/ssr-dom-shim/register-css-hook.js` for test runner — Lit team's official Node.js customization hook, no conflicts with happy-dom
- Prefixed fixture component with underscore (`_css-test`) to signal it's a test fixture, not a real component

## Deviations from Plan

None — plan executed exactly as written. Both the primary Vite plugin and ssr-dom-shim approaches worked on first attempt.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Build tooling is ready for Phase 2 (Pilot Migration)
- Pattern established: create `.styles.css`, import with `with { type: 'css' }`, assign to `static styles`
- The _css-test fixture will be removed in Phase 3 after all real components are migrated

---
*Phase: 01-build-tooling*
*Completed: 2026-03-23*
