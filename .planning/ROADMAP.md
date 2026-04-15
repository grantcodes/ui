# Roadmap: @grantcodes/style-dictionary

## Milestones

- ✅ **v1.0 CSS Import Attributes Migration** - Phases 1-4 (shipped 2026-03-23)
- ✅ **v1.1 Additional UI Features** - Phases 5-6 (shipped 2026-03-25)
- ✅ **v2.0 Grantina Theme** - Phases 3-6 (shipped 2026-04-05)
- ✅ **v2.1 Dark Theme Support & UI Improvements** - Phases 7-9 (shipped 2026-04-07)
- ✅ **v3.0 Token System Modernization** - Phases 10-15 (shipped 2026-04-14)
- 🚧 **v3.1 Theme Font Scale Parity** - Phase 16 (in progress)

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

<details>
<summary>✅ v1.0–v2.1 (Phases 1-9) — SHIPPED</summary>

See MILESTONES.md for details on completed phases 1-9.

</details>

### ✅ v3.0 Token System Modernization (Shipped 2026-04-14)

- [x] **Phase 10: Token Rename & Architecture Prep** - Rename "brand" tokens to "primary"/"secondary"/"tertiary" across all tiers and themes (completed 2026-04-08)
- [x] **Phase 11: Auto-Palette Generation** - Generate full oklch color scales from a single base color per theme (completed 2026-04-09)
- [x] **Phase 12: CSS light-dark() Integration** - Replace separate dark token files with inline light-dark() functions (completed 2026-04-09)
- [x] **Phase 13: Relative Colors & Runtime Generation** - Use CSS relative color syntax for runtime color variants and alpha transparency (completed 2026-04-09)
- [x] **Phase 14: Fluid Typography** - Replace static font-size tokens with responsive clamp()-based fluid values (completed 2026-04-09)
- [x] **Phase 15: Native-First CSS Output Simplification** - Consolidate theme CSS outputs to one file, resolve `default-variables.css` vs `tokens.css` contract issues, and remove unneeded custom Style Dictionary formatting/transforms while preserving consumer token contracts (completed 2026-04-14)

## Phase Details

### Phase 10: Token Rename & Architecture Prep

**Goal**: Consumers use standardized "primary"/"secondary"/"tertiary" token names instead of "brand"
**Depends on**: Phase 9 (v2.1 complete)
**Requirements**: RENAME-01, RENAME-02
**Success Criteria** (what must be TRUE):
  1. All tier-2 semantic tokens use `primary`/`secondary`/`tertiary` naming (e.g. `--color-background-primary` instead of `--color-background-brand`)
  2. All tier-1 primitive color tokens use `color.primary`/`color.secondary` naming instead of `color.brand.{color}`
  3. Style Dictionary build succeeds with zero unresolved references after rename
  4. All existing themes (grantcodes, wireframe, todomap, grantina) build correctly with the new naming
**Plans**: 3 plans

Plans:
- [x] 10-01-PLAN.md — Tier-1 rename (brand→named colors) + role-mapping files
- [x] 10-02-PLAN.md — Tier-2 semantic rename (brand→primary) + secondary/tertiary expansion
- [x] 10-03-PLAN.md — Tier-3 upgrade to tier-2 refs + CSS consumer rename + build verify

### Phase 11: Auto-Palette Generation

**Goal**: Theme authors define a single base color and get a complete 100-900 oklch color scale generated automatically
**Depends on**: Phase 10
**Requirements**: COLOR-01, COLOR-04
**Success Criteria** (what must be TRUE):
  1. A single base color value in a theme config produces a full 100-900 oklch color scale in tier-1 primitives
  2. Generated palette maintains perceptual uniformity across lightness steps (visually even spacing)
  3. Auto-palette applies to grantcodes/base themes; grantina and todomap themes retain their manually-defined color scales unchanged
  4. Style Dictionary build pipeline integrates palette generation without manual token file editing
**Plans**: 2 plans

Plans:
- [ ] 11-01-PLAN.md — Auto-palette generator + SD preprocessor integration
- [ ] 11-02-PLAN.md — Distinct secondary/tertiary colors for grantcodes + visual verification

### Phase 12: CSS light-dark() Integration

**Goal**: Consumers import one CSS file per theme and get both light and dark mode automatically — no separate dark imports
**Depends on**: Phase 11
**Requirements**: DARK-01, DARK-02, DARK-03, DARK-04
**Success Criteria** (what must be TRUE):
  1. Tier-2 token CSS files output `light-dark()` function calls that resolve to correct light/dark values in the browser
  2. Separate `dark/tier-2-usage/` directories are deleted from all four themes — no dark override files remain
  3. Theme root styles include `color-scheme: light dark` declaration so browser respects OS preference
  4. Adding `.dark` or `.light` class to an ancestor element overrides the OS color scheme preference correctly
  5. A single CSS import (e.g. `@import '@grantcodes/style-dictionary/grantcodes/css'`) provides both light and dark tokens
**Plans**: 2 plans

Plans:
- [ ] 12-01-PLAN.md — Merge dark tier-2 tokens into light files with light-dark() expressions across all 4 themes
- [ ] 12-02-PLAN.md — Remove dark build pipeline, add .dark/.light class overrides, verify build

### Phase 13: Relative Colors & Runtime Generation

**Goal**: Color variants and transparency are computed at runtime in the browser using CSS relative color syntax, reducing token count and enabling dynamic theming
**Depends on**: Phase 12
**Requirements**: COLOR-02, COLOR-03
**Success Criteria** (what must be TRUE):
  1. CSS output uses `oklch(from var(--base) ...)` expressions for runtime color variant generation
  2. Alpha/transparent color variants (e.g. semi-transparent primary) are generated using relative color syntax rather than separate static tokens
  3. Rendered colors in the browser match the expected oklch values (no visible color shift from relative color computation)
**Plans**: 2 plans

Plans:
- [ ] 13-01-PLAN.md — Background transparent tokens → CSS relative color syntax + remove static transparent tier-1 tokens
- [ ] 13-02-PLAN.md — Focus-ring rgba → CSS relative color syntax in all 4 themes + visual verification

### Phase 14: Fluid Typography

**Goal**: Typography scales responsively between viewport sizes using CSS-native fluid values — no JavaScript, no media query breakpoints
**Depends on**: Phase 10
**Requirements**: TYPE-01, TYPE-02, TYPE-03, TYPE-04
**Success Criteria** (what must be TRUE):
  1. Font-size tokens output `clamp(min, fluid, max)` values that scale smoothly between small and large viewports
  2. Type scale steps follow a modular ratio generated with `pow()` — each step is a consistent multiplier of the base
  3. Small and large viewport breakpoints use distinct scale ratios (e.g. tighter ratio on mobile, wider on desktop)
  4. All fluid typography values pass WCAG 1.4.4: text remains readable and reflows correctly at 200% browser zoom
**Plans**: 2 plans

Plans:
- [ ] 14-01-PLAN.md — TDD: fluid typography generator (generateFluidScale, DEFAULT_FLUID_CONFIG, DEFAULT_FLUID_STEPS)
- [ ] 14-02-PLAN.md — Wire preprocessor into Style Dictionary config, build all 4 themes, human verify

### Phase 15: Native-First CSS Output Simplification

**Goal**: Consumers import a single, reliable CSS file per theme with stable token contracts and no duplicated/conflicting variable layers
**Depends on**: Phase 14
**Requirements**: BUILD-01, BUILD-02, BUILD-03
**Success Criteria** (what must be TRUE):
  1. Each theme exposes exactly one supported CSS token entry file for consumers, and that file contains the complete token contract needed by downstream packages
  2. Token values exposed to consumers are consistent and conflict-free (no unresolved or contradictory definitions between `default-variables.css` and `tokens.css`)
  3. Existing required consumer-facing token names/contracts continue to resolve after migration (no breaking removal of required variables)
  4. Style Dictionary build output no longer depends on unnecessary custom formatters/transforms for CSS emission, while still producing the required token outputs for consumers
**Plans**: 2 plans

Plans:
- [x] 15-01-PLAN.md — Enforce single CSS consumer contract output (remove default-variables.css, add contract tests, update docs)
- [x] 15-02-PLAN.md — Simplify CSS build internals safely with parity-verified contract preservation

### 🚧 v3.1 Theme Font Scale Parity (In Progress)

- [x] **Phase 16: All-Theme Font Scale Parity** - Replace static font-size tokens in wireframe, todomap, and grantina with CSS-reference-based fluid scale matching the grantcodes/core token structure (completed 2026-04-15)

## Phase Details (continued)

### Phase 16: All-Theme Font Scale Parity

**Goal**: Wireframe, todomap, and grantina typography outputs use the same CSS-reference-based fluid scale as grantcodes — font sizes are computed at runtime via `calc(1rem * pow(var(--g-typography-font-scale-default), N))` and the scale ratio transitions fluidly between viewports
**Depends on**: Phase 15
**Requirements**: PARITY-01, PARITY-02, PARITY-03, PARITY-04
**Success Criteria** (what must be TRUE):
  1. Wireframe, todomap, and grantina CSS outputs contain `--g-typography-font-scale-sm`, `--g-typography-font-scale-lg`, and `--g-typography-font-size-root` tokens identical to grantcodes
  2. All wireframe, todomap, and grantina `font-size-*` tokens are CSS `calc()` expressions referencing `--g-typography-font-scale-default` — no static rem values remain in tier-1 typography
  3. Wireframe and todomap tier-2 typography tokens that reference oversized static steps (display, 6xl–8xl as plain rem) are updated to reference the calc-based scale steps instead
  4. `pnpm build` succeeds for all themes with zero Style Dictionary reference errors
  5. Todomap background tokens include the same full set as grantcodes: `default-hover`, `subtle-hover`, `disabled`, `transparent`, `transparent-strong`
**Plans**: 3 plans

Plans:
- [x] 16-01-PLAN.md — Update wireframe tier-1 typography to fluid scale + fix tier-2 oversized font-size refs
- [x] 16-02-PLAN.md — Update todomap tier-1 typography to fluid scale + fill missing background tokens
- [x] 16-03-PLAN.md — Update grantina tier-1 typography to fluid scale + add missing font-size keys + build verify all themes

## Progress

**Execution Order:**
Phases execute in numeric order: 10 → 11 → 12 → 13 → 14 → 15 → 16

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 10. Token Rename & Architecture Prep | v3.0 | 3/3 | Complete | 2026-04-09 |
| 11. Auto-Palette Generation | v3.0 | 2/2 | Complete | 2026-04-09 |
| 12. CSS light-dark() Integration | v3.0 | 2/2 | Complete | 2026-04-09 |
| 13. Relative Colors & Runtime Generation | v3.0 | 2/2 | Complete | 2026-04-09 |
| 14. Fluid Typography | v3.0 | 2/2 | Complete | 2026-04-09 |
| 15. Native-First CSS Output Simplification | v3.0 | 2/2 | Complete | 2026-04-14 |
| 16. All-Theme Font Scale Parity | v3.1 | 3/3 | Complete   | 2026-04-15 |
