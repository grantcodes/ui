# Roadmap: CSS Import Attributes Migration

## Overview

Migrate @grantcodes/ui from Lit `css` template literals to plain CSS files imported via CSS import attributes. Starts with build tooling, proves the pattern with shared styles and pilot components, scales to all 33 components, then exposes CSS exports for external consumers.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Build Tooling** - Configure Vite, Storybook, and test runner to support CSS import attributes
- [ ] **Phase 2: Pilot Migration** - Migrate shared styles and 2-3 pilot components to validate the pattern end-to-end
- [ ] **Phase 3: Full Component Migration** - Migrate all remaining components, remove old .styles.js files, verify everything
- [ ] **Phase 4: Package Exports** - Expose component CSS files via package.json exports for external consumers

## Phase Details

### Phase 1: Build Tooling
**Goal**: The dev/test/build pipeline handles CSS import attributes without errors
**Depends on**: Nothing (first phase)
**Requirements**: BUILD-01, BUILD-02
**Success Criteria** (what must be TRUE):
  1. A `.js` file using `import styles from './test.css' with { type: 'css' }` works in Storybook dev server without errors
  2. A `.js` file using CSS import attributes works in Vite build without errors
  3. Unit tests can run against a component that uses CSS import attributes (even if that component is a throwaway test fixture)
**Plans:** 1 plan

Plans:
- [ ] 01-01-PLAN.md — Configure Vite, Storybook, and test runner for CSS import attributes with test fixture

### Phase 2: Pilot Migration
**Goal**: The migration pattern is proven end-to-end with real components that pass tests and render in Storybook
**Depends on**: Phase 1
**Requirements**: SHARED-01, SHARED-02
**Success Criteria** (what must be TRUE):
  1. `focus-ring.styles.css` exists and is imported via CSS import attributes by pilot components
  2. Button component renders correctly in Storybook using CSS import attributes (button uses focus-ring, so it validates the shared style chain)
  3. Badge component renders correctly in Storybook using CSS import attributes (badge has no shared style dependencies, validates the simple case)
  4. Existing tests for pilot components (button, badge) pass without changing test assertions
**Plans**: TBD

### Phase 3: Full Component Migration
**Goal**: All 33 components use CSS import attributes and old `.styles.js` files are removed
**Depends on**: Phase 2
**Requirements**: COMP-01, COMP-02, COMP-03, VERIFY-01, VERIFY-02, VERIFY-03
**Success Criteria** (what must be TRUE):
  1. Every component directory has a `.styles.css` file and no `.styles.js` file
  2. Every component's `.component.js` imports styles via `import ... with { type: 'css' }` (no more `import { css } from 'lit'` in style files)
  3. All 23 existing unit tests pass (`pnpm test:unit` in packages/ui)
  4. All 33 components render correctly in Storybook with styles applied
**Plans**: TBD

### Phase 4: Package Exports
**Goal**: External consumers can import individual component CSS files for use outside Lit web components
**Depends on**: Phase 3
**Requirements**: EXPORT-01, EXPORT-02
**Success Criteria** (what must be TRUE):
  1. A consumer can `import '@grantcodes/ui/components/button/button.styles.css'` to get button styles as a plain CSS file
  2. All existing package exports (`./components/*`, `./styles/*`, `./fonts/*`) continue to resolve correctly
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Build Tooling | 0/? | Not started | - |
| 2. Pilot Migration | 0/? | Not started | - |
| 3. Full Component Migration | 0/? | Not started | - |
| 4. Package Exports | 0/? | Not started | - |
