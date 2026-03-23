# Requirements: CSS Import Attributes Migration

## v1 Requirements

### Build & Tooling (BUILD)

- **BUILD-01**: Vite/Storybook configuration supports CSS import attributes (`import ... with { type: "css" }`) so components render correctly in dev and build
- **BUILD-02**: Node.js test runner can execute tests for components using CSS import attributes (via loader, mock, or native support)

### Shared Styles (SHARED)

- **SHARED-01**: Focus-ring styles exist as a plain `.css` file importable via CSS import attributes
- **SHARED-02**: Components that use focus-ring import it as a CSSStyleSheet and include it in their `static styles` array

### Component Migration (COMP)

- **COMP-01**: Each component's styles are defined in a plain `.css` file instead of a `.styles.js` file using Lit's `css` tagged template literal
- **COMP-02**: Each component's `.component.js` imports its styles via `import styles from './component.styles.css' with { type: 'css' }` and uses the resulting CSSStyleSheet in `static styles`
- **COMP-03**: All 33 components are migrated (accordion, app-bar, avatar, badge, breadcrumb, button, button-group, card, code-preview, container, cta, dialog, dropdown, dropzone, feature-list, footer, form-field, gallery, hero, icon, loading, logo-cloud, media-text, newsletter, notice, pagination, pricing, sidebar, stats, tabs, testimonials, toast, tooltip)

### Package Exports (EXPORT)

- **EXPORT-01**: Component CSS files are exposed via package.json exports so external consumers can import individual component styles for use outside Lit
- **EXPORT-02**: Existing package exports (components, themes, base styles, fonts) continue to work unchanged

### Verification (VERIFY)

- **VERIFY-01**: All existing unit tests pass without modification to test assertions (test infrastructure changes are fine)
- **VERIFY-02**: Storybook renders all components correctly with their styles applied
- **VERIFY-03**: The old `.styles.js` files are removed (no dead code left behind)

## v2 (Deferred)

- Downstream consumers (astro-blocks, astro-starter) updated to use new CSS exports directly
- CSS-only usage documentation and examples
- Per-component CSS export documentation in Storybook

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BUILD-01 | Phase 1 | Pending |
| BUILD-02 | Phase 1 | Pending |
| SHARED-01 | Phase 2 | Pending |
| SHARED-02 | Phase 2 | Pending |
| COMP-01 | Phase 3 | Pending |
| COMP-02 | Phase 3 | Pending |
| COMP-03 | Phase 3 | Pending |
| EXPORT-01 | Phase 4 | Complete |
| EXPORT-02 | Phase 4 | Complete |
| VERIFY-01 | Phase 3 | Pending |
| VERIFY-02 | Phase 3 | Pending |
| VERIFY-03 | Phase 3 | Pending |
