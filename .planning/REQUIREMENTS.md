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
- [ ] **DARK-03**: `color-scheme: light dark` declaration added to theme root styles
- [ ] **DARK-04**: `.dark`/`.light` class overrides maintained for manual theme switching

### Color System (COLOR)

- [x] **COLOR-01**: Single base color per theme auto-generates full 100-900 oklch color scale
- [ ] **COLOR-02**: CSS output uses `oklch(from ...)` relative color expressions for runtime color variants
- [ ] **COLOR-03**: Alpha/transparent color variants generated using relative color syntax
- [x] **COLOR-04**: Auto-palette applies to grantcodes/base themes; grantina/todomap retain manual color definitions

### Fluid Typography (TYPE)

- [ ] **TYPE-01**: Static font-size tokens replaced with `clamp(min, fluid, max)` responsive values
- [ ] **TYPE-02**: Modular scale generated using `pow()` for consistent ratio-based type sizing
- [ ] **TYPE-03**: Separate scale ratios defined for small and large viewport breakpoints
- [ ] **TYPE-04**: Fluid typography values pass WCAG 1.4.4 (200% browser zoom)

## Future Requirements

Deferred to future release. Tracked but not in current roadmap.

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
| DARK-03 | Phase 12 | Pending |
| DARK-04 | Phase 12 | Pending |
| COLOR-01 | Phase 11 | Complete |
| COLOR-02 | Phase 13 | Pending |
| COLOR-03 | Phase 13 | Pending |
| COLOR-04 | Phase 11 | Complete |
| TYPE-01 | Phase 14 | Pending |
| TYPE-02 | Phase 14 | Pending |
| TYPE-03 | Phase 14 | Pending |
| TYPE-04 | Phase 14 | Pending |

**Coverage:**
- v3.0 requirements: 14 total
- Mapped to phases: 14
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-08*
*Last updated: 2026-04-08 after roadmap creation*
