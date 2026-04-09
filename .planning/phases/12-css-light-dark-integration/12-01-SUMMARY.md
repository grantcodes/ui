---
phase: 12-css-light-dark-integration
plan: "01"
subsystem: design-tokens
tags: [style-dictionary, light-dark, css, tokens, themes, grantcodes, wireframe, todomap, grantina]

# Dependency graph
requires:
  - phase: 11-auto-palette
    provides: tier-1 color tokens (primary, secondary, tertiary scales) that tier-2 semantic tokens reference
  - phase: 10-token-rename
    provides: unified tier-2 semantic token structure across all four themes
provides:
  - All 16 tier-2 JSON token files merged with CSS light-dark() expressions
  - No separate dark/ token source files remain in any theme
  - Single source of truth for light and dark mode token values per token
affects:
  - 12-02 (CSS output configuration that reads these tier-2 files)
  - style-dictionary build pipeline
  - any consumer importing theme CSS variables

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "CSS light-dark() function embedded in Style Dictionary token values as string expressions"
    - "Tokens with identical light/dark values use plain references; only differing tokens use light-dark() wrapper"

key-files:
  created: []
  modified:
    - packages/style-dictionary/tokens/grantcodes/tier-2-usage/00-colors-background.json
    - packages/style-dictionary/tokens/grantcodes/tier-2-usage/00-colors-content.json
    - packages/style-dictionary/tokens/grantcodes/tier-2-usage/00-colors-border.json
    - packages/style-dictionary/tokens/grantcodes/tier-2-usage/shadows.json
    - packages/style-dictionary/tokens/wireframe/tier-2-usage/00-colors-background.json
    - packages/style-dictionary/tokens/wireframe/tier-2-usage/00-colors-content.json
    - packages/style-dictionary/tokens/wireframe/tier-2-usage/00-colors-border.json
    - packages/style-dictionary/tokens/wireframe/tier-2-usage/shadows.json
    - packages/style-dictionary/tokens/todomap/tier-2-usage/00-colors-background.json
    - packages/style-dictionary/tokens/todomap/tier-2-usage/00-colors-content.json
    - packages/style-dictionary/tokens/todomap/tier-2-usage/00-colors-border.json
    - packages/style-dictionary/tokens/todomap/tier-2-usage/shadows.json
    - packages/style-dictionary/tokens/grantina/tier-2-usage/00-colors-background.json
    - packages/style-dictionary/tokens/grantina/tier-2-usage/00-colors-content.json
    - packages/style-dictionary/tokens/grantina/tier-2-usage/00-colors-border.json
    - packages/style-dictionary/tokens/grantina/tier-2-usage/shadows.json

key-decisions:
  - "Tokens with identical light/dark values keep plain references — no unnecessary light-dark() wrapper"
  - "Grantina navy/cream color refs preserved exactly in light-dark() expressions (e.g. light-dark({color.primary.100}, {color.navy.700}))"
  - "Shadow positional properties (x, y, blur, spread) unchanged; only color sub-key gets light-dark() since it's the only differing property"
  - "All dark/ directories deleted including grantina's tier-3-components/link.json (redundant — tier-3 references tier-2 semantic tokens)"

patterns-established:
  - "light-dark() in token values: 'light-dark({light.ref}, {dark.ref})' with Style Dictionary {reference} syntax inside the expression"
  - "Merge algorithm: compare light/dark values per path; wrap differing values; keep identical values plain"

requirements-completed:
  - DARK-01
  - DARK-02

# Metrics
duration: 30 min
completed: 2026-04-09
---

# Phase 12 Plan 01: CSS Light-Dark Token Merge Summary

**Merged dark tier-2 token overrides into 16 light JSON files using CSS light-dark() expressions across all four themes, then deleted all dark/ directories**

## Performance

- **Duration:** ~30 min (continuation task)
- **Started:** 2026-04-09 (first agent session)
- **Completed:** 2026-04-09T08:21:58Z
- **Tasks:** 2
- **Files modified:** 16 modified, 17 deleted

## Accomplishments

- All 16 tier-2 JSON files (4 per theme: background, content, border, shadows) updated with `light-dark()` expressions where light and dark values differ
- Tokens with identical light/dark values retain plain references (no unnecessary wrapping)
- Grantina's theme-specific navy/cream color references preserved correctly within `light-dark()` expressions
- All 17 dark/ source files deleted across grantcodes, wireframe, todomap, and grantina — including grantina's tier-3-components/link.json
- All 72 remaining JSON token files validated as syntactically correct

## Task Commits

Each task was committed atomically:

1. **Task 1: Merge dark tokens for grantcodes and wireframe** - `e8675ce` (feat)
2. **Task 2: Merge todomap and grantina + delete all dark/ directories** - `c56642a` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified

- `packages/style-dictionary/tokens/grantcodes/tier-2-usage/00-colors-background.json` - 33 light-dark() expressions
- `packages/style-dictionary/tokens/grantcodes/tier-2-usage/00-colors-content.json` - 22 light-dark() expressions
- `packages/style-dictionary/tokens/grantcodes/tier-2-usage/00-colors-border.json` - 17 light-dark() expressions
- `packages/style-dictionary/tokens/grantcodes/tier-2-usage/shadows.json` - 2 light-dark() expressions (color only)
- `packages/style-dictionary/tokens/wireframe/tier-2-usage/00-colors-background.json` - 36 light-dark() expressions
- `packages/style-dictionary/tokens/wireframe/tier-2-usage/00-colors-content.json` - 22 light-dark() expressions
- `packages/style-dictionary/tokens/wireframe/tier-2-usage/00-colors-border.json` - 17 light-dark() expressions
- `packages/style-dictionary/tokens/wireframe/tier-2-usage/shadows.json` - 2 light-dark() expressions
- `packages/style-dictionary/tokens/todomap/tier-2-usage/00-colors-background.json` - 26 light-dark() expressions
- `packages/style-dictionary/tokens/todomap/tier-2-usage/00-colors-content.json` - 20 light-dark() expressions
- `packages/style-dictionary/tokens/todomap/tier-2-usage/00-colors-border.json` - 17 light-dark() expressions
- `packages/style-dictionary/tokens/todomap/tier-2-usage/shadows.json` - 2 light-dark() expressions
- `packages/style-dictionary/tokens/grantina/tier-2-usage/00-colors-background.json` - 33 light-dark() expressions (navy/cream refs)
- `packages/style-dictionary/tokens/grantina/tier-2-usage/00-colors-content.json` - 22 light-dark() expressions (navy/cream refs)
- `packages/style-dictionary/tokens/grantina/tier-2-usage/00-colors-border.json` - 16 light-dark() expressions (knockout same in both modes)
- `packages/style-dictionary/tokens/grantina/tier-2-usage/shadows.json` - 2 light-dark() expressions

**Deleted (17 files):** All `dark/tier-2-usage/` files for all 4 themes + `grantina/dark/tier-3-components/link.json`

## Decisions Made

- Plain references retained for tokens with identical light/dark values (e.g. `transparent`, `transparent-strong` in grantina background)
- Grantina's `border.knockout` kept as `{color.cream.700}` (same in both modes)
- Grantina navy/cream color system faithfully preserved in all light-dark() expressions
- Shadow x/y/blur/spread properties never wrapped in light-dark() — only the `color` sub-key differs between modes

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. The previous agent session had already completed the todomap token merging as uncommitted changes — these were picked up and committed as part of Task 2.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 16 tier-2 JSON source files carry both light and dark values via `light-dark()` expressions
- No dark/ directories remain anywhere in the token tree
- Ready for Plan 02: configure Style Dictionary to emit `light-dark()` values as-is in CSS output (rather than resolving references prematurely)
- The Style Dictionary build pipeline will need updating to handle the `light-dark(...)` string format in token values

---
*Phase: 12-css-light-dark-integration*
*Completed: 2026-04-09*

## Self-Check: PASSED

- ✅ `packages/style-dictionary/tokens/grantina/tier-2-usage/00-colors-background.json` — exists
- ✅ `packages/style-dictionary/tokens/todomap/tier-2-usage/shadows.json` — exists
- ✅ `packages/style-dictionary/tokens/grantcodes/dark/` — deleted (does not exist)
- ✅ `packages/style-dictionary/tokens/grantina/dark/` — deleted (does not exist)
- ✅ Commit `e8675ce` — found (Task 1: grantcodes + wireframe)
- ✅ Commit `c56642a` — found (Task 2: todomap + grantina + dark dir deletion)
- ✅ All 72 JSON token files parse without errors
