# Milestones

## v1.0 — CSS Import Attributes Migration (Shipped: 2026-03-23)

**Phases completed:** 4 phases, 4 plans

**Key accomplishments:**

- Configured Vite, Storybook, and Node.js test runner to handle CSS import attributes via `@arcmantle/vite-plugin-import-css-sheet` and `@lit-labs/ssr-dom-shim` — all three pipelines verified with a test fixture
- Migrated focus-ring shared styles and 2 pilot components (badge, button) to CSS import attributes, validating both simple and shared-style-composition patterns
- Migrated all 31 remaining components to CSS import attributes across 3 parallel batches; deleted all 35 old `.styles.js` files and removed the test fixture; all 233 tests pass
- Added 34 explicit CSS subpath exports to `package.json` plus `./styles/focus-ring.css`; export resolution test (77 assertions) validates all exports; full 310-test suite passes with 0 failures

---
