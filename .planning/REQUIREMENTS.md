# Requirements: @grantcodes/style-dictionary v3.0

**Defined:** 2026-04-08
**Core Value:** Provide a single, coherent token system that any consumer can use to theme UI components — import one theme, get all the design decisions handled automatically.

## v3.0 Requirements

Requirements for Token System Modernization. Each maps to roadmap phases.

### Token Renaming (RENAME)

- [x] **RENAME-01**: Tier-2 semantic tokens renamed from "brand" to "primary"/"secondary"/"tertiary" (e.g. `color.background.brand` → `color.background.primary`)
- [x] **RENAME-02**: Tier-1 primitive tokens renamed from `color.brand.{color}` to `color.primary`/`color.secondary` etc.

### Dark Mode (DARK)

- [x] **DARK-01**: Dark tier-2 token files merged into main tier-2 files using CSS `light-dark()` function
- [x] **DARK-02**: Separate `dark/tier-2-usage/` directories eliminated from all themes
- [x] **DARK-03**: `color-scheme: light dark` declaration added to theme root styles
- [x] **DARK-04**: `.dark`/`.light` class overrides maintained for manual theme switching

### Color System (COLOR)

- [x] **COLOR-01**: Single base color per theme auto-generates full 100-900 oklch color scale
- [x] **COLOR-02**: CSS output uses `oklch(from ...)` relative color expressions for runtime color variants
- [x] **COLOR-03**: Alpha/transparent color variants generated using relative color syntax
- [x] **COLOR-04**: Auto-palette applies to grantcodes/base themes; grantina/todomap retain manual color definitions

### Fluid Typography (TYPE)

- [x] **TYPE-01**: Static font-size tokens replaced with `clamp(min, fluid, max)` responsive values
- [x] **TYPE-02**: Modular scale generated using `pow()` for consistent ratio-based type sizing
- [x] **TYPE-03**: Separate scale ratios defined for small and large viewport breakpoints
- [x] **TYPE-04**: Fluid typography values pass WCAG 1.4.4 (200% browser zoom)

### Build Simplification (BUILD)

- [x] **BUILD-01**: Resolve contract/output conflicts between `default-variables.css` and `tokens.css` so consumers have one consistent source of token values per theme
- [x] **BUILD-02**: Migrate theme CSS outputs to one supported CSS token file per theme while preserving required downstream token contracts
- [x] **BUILD-03**: Remove unnecessary custom Style Dictionary CSS formatters/transforms, keeping only what is required to emit consumer contract-compatible tokens

## Future Requirements

Deferred to future release. Tracked but not in current roadmap.

### Theme Parity (PARITY)

Requirements for v3.1 — updating wireframe, todomap, and grantina to match grantcodes' v3.0 token structure.

- [ ] **PARITY-01**: Wireframe and todomap tier-1 typography replaces static `font-size.*` tokens with `font-scale-sm/lg/default` and `calc(1rem * pow(...))` references matching the core token structure
- [x] **PARITY-02**: Wireframe and todomap tier-2 typography refs updated from removed static font-size steps (display, 6xl–8xl) to equivalent calc-based scale steps
- [x] **PARITY-03**: Todomap tier-2 background tokens expanded to include the full grantcodes set (`default-hover`, `subtle-hover`, `disabled`, `transparent`, `transparent-strong`)
- [x] **PARITY-04**: Grantina tier-1 typography replaces static `font-size.*` tokens with `font-scale-sm/lg/default` and `calc(1rem * pow(...))` references, including all missing font-size keys (display, 5xl–8xl)

### Migration

- **MIGRATE-01**: Consumer migration guide documenting old → new token mappings for downstream consumers

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Browser polyfills | Evergreen-only approach; modern CSS features require no polyfills |
| JS runtime token generation | CSS-only solutions cover use cases without build/runtime overhead |
| New UI components | Token system changes only for this milestone |
| Downstream consumer updates | Separate milestone for astro-starter, astro-blocks |
| Custom theme builder UI | Out of scope for v3.0 |
| Overly granular color variants | Auto-generate only needed variants from base colors |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| RENAME-01 | Phase 10 | Complete |
| RENAME-02 | Phase 10 | Complete |
| DARK-01 | Phase 12 | Complete |
| DARK-02 | Phase 12 | Complete |
| DARK-03 | Phase 12 | Complete |
| DARK-04 | Phase 12 | Complete |
| COLOR-01 | Phase 11 | Complete |
| COLOR-02 | Phase 13 | Complete |
| COLOR-03 | Phase 13 | Complete |
| COLOR-04 | Phase 11 | Complete |
| TYPE-01 | Phase 14 | Complete |
| TYPE-02 | Phase 14 | Complete |
| TYPE-03 | Phase 14 | Complete |
| TYPE-04 | Phase 14 | Complete |
| BUILD-01 | Phase 15 | Complete |
| BUILD-02 | Phase 15 | Complete |
| BUILD-03 | Phase 15 | Complete |
| PARITY-01 | Phase 16 | Pending |
| PARITY-02 | Phase 16 | Complete |
| PARITY-03 | Phase 16 | Complete |
| PARITY-04 | Phase 16 | Complete |

**Coverage:**
- v3.0 requirements: 17 total
- Mapped to phases: 17
- v3.1 requirements: 4 total
- Mapped to phases: 4
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-08*
*Last updated: 2026-04-15 after Phase 16 insertion*
