---
gsd_state_version: 1.0
milestone: v3.1
milestone_name: Theme Font Scale Parity
status: Phase added, ready for planning
stopped_at: Completed Phase 16 all 3 plans — theme font scale parity
last_updated: "2026-04-15T07:44:25.630Z"
last_activity: 2026-04-14
progress:
  total_phases: 7
  completed_phases: 7
  total_plans: 16
  completed_plans: 16
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-08)

**Core value:** Provide a single, coherent token system that any consumer can use to theme UI components
**Current focus:** Phase 16 — wireframe-todomap-font-scale-parity

## Current Position

Phase: 16
Plan: Not started

## Performance Metrics

**Velocity:**

- Total plans completed: 7
- Average duration: 6 min
- Total execution time: 29 min

| Phase | Plan | Duration | Tasks | Files |
| ----- | ---- | -------- | ----- | ----- |
| 10    | 01   | 2 min    | 2     | 8     |
| 10    | 02   | 3 min    | 2     | 24    |
| 10    | 03   | 4 min    | 2     | 33    |
| 11    | 01   | 19 min   | 2     | 4     |
| 11    | 02   | 1 min    | 2     | 2     |
| Phase 12 P01 | 30 min | 2 tasks | 33 files |
| Phase 12-css-light-dark-integration P02 | 20min | 3 tasks | 7 files |
| Phase 13-relative-colors-runtime-generation P01 | 11min | 2 tasks | 4 files |
| Phase 13-relative-colors-runtime-generation P02 | 10min | 2 tasks | 4 files |
| Phase 14 P01 | 1 min | 1 tasks | 2 files |
| Phase 14-fluid-typography P02 | 35 min | 3 tasks | 7 files |
| Phase 15 P02 | 4 min | 2 tasks | 2 files |
| Phase 16 P01 | 25 | 3 tasks | 3 files |
| Phase 16 P02 | 10 | 3 tasks | 4 files |
| Phase 16 P03 | 8 | 3 tasks | 2 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- v3.0 is a major version: breaking changes to token naming and dark mode structure are acceptable
- Token rename (brand → primary/secondary/tertiary) goes first — cross-cutting change that affects all subsequent work
- Auto-palette before light-dark() — Tier-2 semantic tokens reference Tier-1 primitives that palette generates
- Fluid typography depends only on Phase 10 (rename), not the color pipeline
- No integration phase needed — all 14 requirements map cleanly to phases 10-14 with verifiable criteria
- Todomap 'brand' key kept at tier-1 since 'brand' is the actual color name, not a role prefix
- Placeholder aliasing for single-color themes: grantcodes and wireframe map all three roles to same color pending Phase 11 auto-palette
- Wireframe content primary uses shade 700 (matching original brand gray value) while other themes use 600
- Dark mode secondary/tertiary background tokens use same inverted shade pattern as primary (900 for bg, 200 for knockout)
- Todomap expanded from minimal brand tokens to full primary/secondary/tertiary with all state variants
- [Phase 10]: Dark tier-3 overrides use same tier-2 semantic refs as light versions — dark tier-2 tokens handle color differentiation
- CSS consumer vars use `--g-theme-color-primary-{shade}` (tier-2 prefix), not `--g-color-primary-{shade}` — role-mapping outputs are tier-2
- [Phase 10 fix]: Dark knockout backgrounds corrected from shade 200→500 (and hover 300→600) across all 4 themes for visibility
- [Phase 10 fix]: CSS `content-secondary` replaced with `content-subtle` in 12 component files — `content.secondary` now means accent color, not muted text
- [Phase 11]: Apply autoPalette only to grantcodes — wireframe uses neutral refs
- [Phase 11]: Use colorjs.io (existing dep) instead of culori for color parsing
- [Phase 11]: Secondary teal (~195 hue) and tertiary amber (~75 hue) form triadic harmony with purple primary
- [Phase 11]: Wireframe achromatic identity confirmed as intentional — not a placeholder needing color
- [Phase 12]: Tokens with identical light/dark values keep plain references — no unnecessary light-dark() wrapper
- [Phase 12]: All dark/ directories deleted — single source of truth in tier-2 JSON files using CSS light-dark() expressions
- [Phase 13]: CSS relative color expressions (oklch(from var(...))) pass through Style Dictionary verbatim — transparent tokens now derive runtime alpha from actual background color
- [Phase 13-relative-colors-runtime-generation]: All 4 themes use same oklch(from var(--g-theme-color-primary-500) l c h / 0.4) expression for focus-ring — each theme's primary-500 CSS var provides the correct base color
- [Phase 14-fluid-typography]: Register fluid-typography as Style Dictionary preprocessor (not transformer) to replace rem values with clamp() at build time — Architectural pattern established in Plan 01
- [Phase 14-fluid-typography]: Display step minRem capped at 4rem: clamp(4rem, calc(2rem + 10vw), 10rem) after user feedback on oversized H1 on mobile — User accepted cap as safe default and may manually adjust in future
- [Phase 15-native-first-css-output-simplification]: Simplification must preserve required consumer token contracts while consolidating CSS output to one supported file per theme
- [Phase 15]: Retain tokens.css as canonical consumer contract and remove duplicate default-variables.css output
- [Phase 16]: Wireframe has static font-size tokens xs through display; need to remove and replace with calc references like grantcodes core. Tier-2 typography uses display/6xl-8xl which will need to map to equivalent scale steps (e.g. step 14 for display). Todomap same situation plus missing background tokens: default-hover, subtle-hover, disabled, transparent, transparent-strong. Core typography.json already has the correct font-scale + calc structure shared by all themes — wireframe/todomap tier-1 typography just needs static font-size block removed and replaced with font-scale tokens + relevant font-size refs. The wireframe animation.json has extra tokens not in grantcodes — leave those alone.
- [Phase 16]: outputReferences:true emits var() references; tier-2 font-size test assertions must match var() pattern not calc() directly
- [Phase 16]: custom/css-tokens transform group with name/css-theme-prefix produces --g-theme-* for tier-2/3 and --g-* for tier-1

### Pending Todos

None.

### Blockers/Concerns

None.

## Session Continuity

Last activity: 2026-04-14
Stopped at: Completed Phase 16 all 3 plans — theme font scale parity
Resume file: None
