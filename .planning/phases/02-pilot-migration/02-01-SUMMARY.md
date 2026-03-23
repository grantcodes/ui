---
phase: 02-pilot-migration
plan: 01
subsystem: ui
tags: [lit, css-import-attributes, web-components, storybook]

requires:
  - phase: 01-build-tooling
    provides: Vite importCSSSheet plugin, Node.js test runner CSS hook, _css-test fixture proving the pattern
provides:
  - focus-ring shared styles as plain CSS file with CSS import attribute
  - Badge component migrated to CSS import attributes
  - Button component migrated to CSS import attributes with shared focus-ring dependency
  - Proven migration pattern for both simple and shared-style cases
affects: [03-full-component-migration]

tech-stack:
  added: []
  patterns: [CSS import attributes for Lit components, CSSStyleSheet array in static styles for shared style composition]

key-files:
  created:
    - packages/ui/src/lib/styles/focus-ring.styles.css
    - packages/ui/src/components/badge/badge.styles.css
    - packages/ui/src/components/button/button.styles.css
  modified:
    - packages/ui/src/components/badge/badge.component.js
    - packages/ui/src/components/button/button.component.js

key-decisions:
  - "Shared styles (focus-ring) imported as separate CSSStyleSheet in static styles array rather than interpolated into component CSS"
  - "Old .styles.js files retained during pilot — cleanup deferred to Phase 3"

patterns-established:
  - "Simple migration: extract CSS from css`` literal to .styles.css, import with { type: 'css' }, keep static styles = [styles]"
  - "Shared style migration: import shared CSS separately, combine in static styles = [sharedStyles, componentStyles]"

requirements-completed: [SHARED-01, SHARED-02]

duration: 20min
completed: 2026-03-23
---

# Phase 2: Pilot Migration Summary

**Focus-ring, badge, and button migrated from Lit css template literals to plain CSS files with CSS import attributes, validating both simple and shared-style-dependency patterns**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-03-23T17:00:00Z
- **Completed:** 2026-03-23T17:20:00Z
- **Tasks:** 3 (2 auto + 1 visual checkpoint)
- **Files modified:** 5

## Accomplishments

- Migrated focus-ring shared styles to plain CSS file importable via CSS import attributes
- Migrated badge component (simple case — no shared style dependencies)
- Migrated button component (complex case — imports focus-ring as separate CSSStyleSheet in static styles array)
- All 237 tests pass, visual verification approved in Storybook

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate focus-ring and badge to CSS import attributes** - `becaad7` (feat)
2. **Task 2: Migrate button to CSS import attributes with shared focus-ring** - `a579ffd` (feat)
3. **Task 3: Visual checkpoint** - Approved by user (no commit needed)

## Files Created/Modified

- `packages/ui/src/lib/styles/focus-ring.styles.css` - Shared focus-ring styles as plain CSS
- `packages/ui/src/components/badge/badge.styles.css` - Badge component styles as plain CSS
- `packages/ui/src/components/badge/badge.component.js` - Updated to import CSS via import attributes
- `packages/ui/src/components/button/button.styles.css` - Button-specific styles as plain CSS (focus-ring excluded)
- `packages/ui/src/components/button/button.component.js` - Updated to import both focus-ring and button CSS via import attributes

## Decisions Made

- Shared styles (focus-ring) become separate CSSStyleSheet imports composed via `static styles = [focusRingStyles, buttonStyles]` rather than being interpolated into component CSS
- Old `.styles.js` files retained during pilot phase — other components still reference them, cleanup in Phase 3

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

- Merge conflict with `origin/main` (classMap refactor in badge.component.js) — resolved by keeping CSS import attribute + classMap changes

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Migration pattern validated for both simple and shared-style cases
- Ready to scale to all remaining ~30 components in Phase 3
- Footer component has two style files (noted in STATE.md) — needs special handling

---
*Phase: 02-pilot-migration*
*Completed: 2026-03-23*
