# Roadmap: Dark Theme Support

**Milestone:** v2.1 — Dark Theme Support
**Created:** 2026-04-05

## Overview

Add dark mode variants for all themes (grantcodes, wireframe, todomap, grantina) in the style-dictionary package, with automatic media query detection and manual classname overrides in the UI package.

## Phases

### Phase 7: Dark Theme Support

**Goal:** All themes have dark variants that auto-apply via `prefers-color-scheme: dark` and support manual `.dark`/`.light` classname overrides
**Requirements:** [DARK-01, DARK-02, DARK-03, DARK-04, DARK-05, DARK-06, DARK-07, DARK-08, DARK-09, DARK-10]
**Plans:** 3 plans

Plans:
- [ ] 07-01-PLAN.md — Create dark tier-2 color token JSON files for all 4 themes
- [ ] 07-02-PLAN.md — Update Style Dictionary build config and package.json exports for dark/light CSS
- [ ] 07-03-PLAN.md — Update UI package theme CSS imports and verify in Storybook

### Phase 8: App Bar Improvements

**Goal:** Improve app bar component visual quality, responsive layout, and code hygiene — fix dead CSS, inconsistent tokens, accessibility gaps, and broken responsive behavior
**Requirements:** [APPBAR-01, APPBAR-02, APPBAR-03, APPBAR-04, APPBAR-05, APPBAR-06, APPBAR-07, APPBAR-08, APPBAR-09]
**Plans:** 2 plans

Plans:
- [ ] 08-01-PLAN.md — Fix CSS bugs, token consistency, sticky behavior, accessibility, and responsive layout
- [ ] 08-02-PLAN.md — Improve Storybook stories and verify with visual checkpoint

---
*Last updated: 2026-04-06*
