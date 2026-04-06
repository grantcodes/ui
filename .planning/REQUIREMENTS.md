# Requirements: Grantina Theme

**Defined:** 2026-04-03
**Core Value:** Provide a complete grantina theme for @grantcodes/style-dictionary translating the GrantIna wedding brand into design tokens

## v1 Requirements

### Color Tokens (COLOR)

- [ ] **COLOR-01**: Tier-1 brand color palette defined in oklch format (primary blue, secondary yellow, accent gold, dark navy, light cream)
- [ ] **COLOR-02**: Tier-1 gradient color stops defined (blue #4c4afc -> light blue #818cf8 -> purple #dca9ff) in oklch
- [ ] **COLOR-03**: Tier-2 semantic color mappings (background, content, border, surface, interactive states) reference tier-1 tokens
- [ ] **COLOR-04**: Hex brand colors converted to oklch using colorjs.io for consistency with existing themes

### Typography Tokens (TYPE)

- [ ] **TYPE-01**: Tier-1 font-family tokens for Vidaloka (serif/headings), Garet (sans/body), Pinyon Script (script/accent) with appropriate fallback stacks
- [ ] **TYPE-02**: Tier-1 font-weight tokens for each family (Vidaloka 400, Garet 400-700, Pinyon Script 400)
- [ ] **TYPE-03**: Tier-1 type scale values defined for consistent text hierarchy
- [ ] **TYPE-04**: Tier-2 typography usage tokens (heading, body, accent styles) referencing tier-1 primitives

### Structure Tokens (STRUCT)

- [ ] **STRUCT-01**: Tier-1 spacing tokens defined with brand-appropriate values
- [ ] **STRUCT-02**: Tier-1 border tokens (width, radius, style) defined
- [ ] **STRUCT-03**: Tier-1 box-shadow tokens defined
- [ ] **STRUCT-04**: Tier-1 animation tokens (duration, easing) defined
- [ ] **STRUCT-05**: Tier-2 semantic usage tokens for borders, box-shadows, and animation referencing tier-1

### Component Tokens (COMP)

- [ ] **COMP-01**: Tier-3 button component tokens referencing tier-2 semantic tokens
- [ ] **COMP-02**: Tier-3 focus-ring component tokens referencing tier-2 semantic tokens
- [ ] **COMP-03**: Tier-3 form component tokens referencing tier-2 semantic tokens
- [ ] **COMP-04**: Tier-3 link component tokens referencing tier-2 semantic tokens

### Build & Packaging (BUILD)

- [ ] **BUILD-01**: "grantina" added to AVAILABLE_THEMES array in config.js
- [ ] **BUILD-02**: Package.json exports added for grantina theme (CSS, JS, JSON paths)
- [ ] **BUILD-03**: Font CSS file created for Vidaloka, Garet, Pinyon Script (self-hosted font files)
- [ ] **BUILD-04**: Font files downloaded and placed in assets/fonts/ following existing self-hosting pattern

### Verification (VERIFY)

- [ ] **VERIFY-01**: Style Dictionary build succeeds with grantina theme included
- [ ] **VERIFY-02**: All tier-2 and tier-3 token references resolve without errors
- [ ] **VERIFY-03**: Grantina theme output has file parity with existing themes (CSS, JS, JSON outputs)
- [ ] **VERIFY-04**: Existing themes (grantcodes, wireframe, todomap) build unchanged

### Dark Theme (DARK)

- [ ] **DARK-01**: Dark tier-2 color tokens for grantcodes theme (background, content, border JSON files) inverting light/dark neutral scale
- [ ] **DARK-02**: Dark tier-2 color tokens for wireframe theme (background, content, border JSON files) inverting light/dark neutral scale
- [ ] **DARK-03**: Dark tier-2 color tokens for todomap theme (background, content, border JSON files) inverting light/dark neutral scale
- [ ] **DARK-04**: Dark tier-2 color tokens for grantina theme (background, content, border JSON files) inverting light/dark neutral scale
- [ ] **DARK-05**: Build config updated to build dark variants — each theme gets a `-dark` build producing CSS with `@media (prefers-color-scheme: dark)` wrapper
- [ ] **DARK-06**: Package.json exports added for dark theme CSS (e.g. `./grantcodes/css/dark`, `./wireframe/css/dark`, etc.)
- [ ] **DARK-07**: UI package theme CSS files updated to import dark variant alongside light
- [ ] **DARK-08**: Manual override classnames (`.dark`, `.light`) work to force dark/light on any element
- [ ] **DARK-09**: Style Dictionary build succeeds with all dark variants included
- [ ] **DARK-10**: Existing light themes build unchanged — no regressions

### App Bar Improvements (APPBAR)

- [x] **APPBAR-01**: Remove dead CSS — delete `.app-bar__mobile-nav` rule (unused in component template) and clean up duplicate/conflicting container query blocks
- [x] **APPBAR-02**: Fix inconsistent token usage — replace `--g-spacing-12` with `--g-theme-spacing-sm` in `.app-bar__actions` and `::slotted(a)` padding
- [x] **APPBAR-03**: Fix sticky property — make `position: sticky` conditional on the `sticky` attribute instead of always-on; default to `position: relative`
- [x] **APPBAR-04**: Meet 44x44px touch target minimum on menu button (currently 2.5rem/40px)
- [x] **APPBAR-05**: Add `prefers-reduced-motion: reduce` to disable hamburger-to-X animation and slide-down keyframe
- [x] **APPBAR-06**: Replace `transition: all` on `::slotted(a)` with specific properties (`color`, `background-color`)
- [x] **APPBAR-07**: Mobile nav `::slotted(ul)` should stack vertically when inside `.app-bar__nav--mobile-open` (currently always row)
- [ ] **APPBAR-08**: Improve Storybook stories — remove inline styles, add responsive demo story, add story with `<ul>` nav pattern matching real Astro usage
- [x] **APPBAR-09**: All existing tests pass; add test for non-sticky default (position not sticky when `sticky` is false)

## v2 (Deferred)

- **COLOR-D1**: Extended color scale variations (100-900) if 5 primary colors prove insufficient
- **TYPE-D1**: Custom animation timings for wedding-specific interactions
- **INTEG-D1**: Downstream consumer updates (astro-starter, astro-blocks) to use grantina theme

## Out of Scope

| Feature | Reason |
|---------|--------|
| New UI components | Theme only, no component changes |
| Astro site or astro-blocks changes | Downstream updates deferred |
| Logo/monogram assets in tokens | Exist separately as SVG files, not as tokens |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| COLOR-01 | Phase 3 | Pending |
| COLOR-02 | Phase 3 | Pending |
| COLOR-03 | Phase 4 | Pending |
| COLOR-04 | Phase 3 | Pending |
| TYPE-01 | Phase 3 | Pending |
| TYPE-02 | Phase 3 | Pending |
| TYPE-03 | Phase 3 | Pending |
| TYPE-04 | Phase 4 | Pending |
| STRUCT-01 | Phase 3 | Pending |
| STRUCT-02 | Phase 3 | Pending |
| STRUCT-03 | Phase 3 | Pending |
| STRUCT-04 | Phase 3 | Pending |
| STRUCT-05 | Phase 4 | Pending |
| COMP-01 | Phase 5 | Pending |
| COMP-02 | Phase 5 | Pending |
| COMP-03 | Phase 5 | Pending |
| COMP-04 | Phase 5 | Pending |
| BUILD-01 | Phase 6 | Pending |
| BUILD-02 | Phase 6 | Pending |
| BUILD-03 | Phase 6 | Pending |
| BUILD-04 | Phase 6 | Pending |
| VERIFY-01 | Phase 6 | Pending |
| VERIFY-02 | Phase 6 | Pending |
| VERIFY-03 | Phase 6 | Pending |
| VERIFY-04 | Phase 6 | Pending |
| DARK-01 | Phase 7 | Pending |
| DARK-02 | Phase 7 | Pending |
| DARK-03 | Phase 7 | Pending |
| DARK-04 | Phase 7 | Pending |
| DARK-05 | Phase 7 | Pending |
| DARK-06 | Phase 7 | Pending |
| DARK-07 | Phase 7 | Pending |
| DARK-08 | Phase 7 | Pending |
| DARK-09 | Phase 7 | Pending |
| DARK-10 | Phase 7 | Pending |

| APPBAR-01 | Phase 8 | Complete |
| APPBAR-02 | Phase 8 | Complete |
| APPBAR-03 | Phase 8 | Complete |
| APPBAR-04 | Phase 8 | Complete |
| APPBAR-05 | Phase 8 | Complete |
| APPBAR-06 | Phase 8 | Complete |
| APPBAR-07 | Phase 8 | Complete |
| APPBAR-08 | Phase 8 | Pending |
| APPBAR-09 | Phase 8 | Complete |

**Coverage:**
- v1 requirements: 25 total
- Dark theme requirements: 10 total
- App bar requirements: 9 total
- Mapped to phases: 44
- Unmapped: 0

---
*Requirements defined: 2026-04-03*
*Last updated: 2026-04-06 after app bar improvements phase added*
