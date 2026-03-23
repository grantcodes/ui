# Phase 2: Pilot Migration - Research

**Researched:** 2026-03-23
**Domain:** Migrating Lit web components from CSS template literals to CSS import attributes for better separation of concerns and tooling support
**Confidence:** HIGH

## Summary

Phase 2 proves the CSS import attributes migration pattern end-to-end with real components. The migration moves styles from Lit's `css` tagged template literals in `.styles.js` files to plain `.css` files imported via `import ... with { type: 'css' }`. Shared styles like focus-ring are migrated first, then pilot components (button and badge) validate the pattern. This establishes the foundation for full component migration in Phase 3.

**Primary recommendation:** Use CSS import attributes for all component styles, combining shared and component-specific stylesheets in the `static styles` array. Ensure build tools (Vite) support the syntax.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Lit | 3.3.2 | Web component framework | Current version supports CSSStyleSheet in static styles array |
| Vite | 7.2.6 | Build tool | Configured with CSS import attributes plugin in Phase 1 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @arcmantle/vite-plugin-import-css-sheet | 1.0.12 | Vite plugin for CSS import attributes | Required for Vite to handle `with { type: 'css' }` syntax |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS import attributes | Manual CSSStyleSheet construction | Less declarative, error-prone, defeats purpose of migration |

**Installation:**
```bash
npm install lit@^3.3.0 vite@^7.0.0 @arcmantle/vite-plugin-import-css-sheet@^1.0.0
```

**Version verification:** Lit 3.3.2 is current as of 2026-03-23. Vite 7.2.6 is current. Plugin 1.0.12 is latest.

## Architecture Patterns

### Recommended Project Structure
```
packages/ui/src/
├── lib/styles/
│   └── focus-ring.styles.css    # Shared styles as plain CSS
├── components/
│   ├── button/
│   │   ├── button.component.js
│   │   ├── button.styles.css    # Component styles as plain CSS
│   │   └── button.js            # Exports and registration
│   └── badge/
│       ├── badge.component.js
│       ├── badge.styles.css     # Component styles as plain CSS
│       └── badge.js
```

### Pattern 1: Migrating Shared Styles
**What:** Move shared CSS from `css` tagged template to `.styles.css` file, import with attributes.
**When to use:** For reusable style fragments like focus-ring, base styles.
**Example:**
```javascript
// Before: lib/styles/focus-ring.styles.js
import { css } from "lit";
export const focusRingStyles = css`...`;

// After: lib/styles/focus-ring.styles.css
.focus-ring { outline: 0px solid transparent; ... }

// Usage in component:
import focusRingStyles from "../../lib/styles/focus-ring.styles.css" with { type: "css" };
static styles = [focusRingStyles];
```

### Pattern 2: Component Style Migration
**What:** Extract component CSS from template literal to dedicated file, import as CSSStyleSheet.
**When to use:** For all component-specific styles.
**Example:**
```javascript
// Before: button.styles.js
import { css } from "lit";
export const buttonStyles = css`...`;

// After: button.styles.css
.button { display: inline-flex; ... }

// Usage:
import buttonStyles from "./button.styles.css" with { type: "css" };
static styles = [buttonStyles];
```

### Anti-Patterns to Avoid
- **Manual CSSStyleSheet creation:** Don't use `new CSSStyleSheet()` and `replaceSync()` - use import attributes for declarative imports
- **Mixed styles:** Don't combine `css` template literals with CSS import attributes in the same component during migration

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Loading CSS as constructable stylesheet | Manual fetch/parse/CSSStyleSheet construction | `import styles from 'file.css' with { type: 'css' }` | Import attributes handle loading, parsing, and provide better tree-shaking and bundling |
| Combining shared and component styles | Manual array construction with unsafe operations | Array of imported CSSStyleSheets in static styles | Lit natively supports CSSStyleSheet arrays |

**Key insight:** CSS import attributes provide the platform-native way to import stylesheets as constructable stylesheets, avoiding manual DOM manipulation or unsafe CSS injection.

## Common Pitfalls

### Pitfall 1: Browser Support Assumptions
**What goes wrong:** Assuming CSS import attributes work everywhere since Phase 1 configured build tools.
**Why it happens:** Build tools polyfill the syntax, but runtime may fail in unsupported browsers.
**How to avoid:** Test in target browsers; consider fallbacks for Firefox (not supported as of 2026-03-23).
**Warning signs:** Components render unstyled in Firefox or Safari.

### Pitfall 2: Scoping Confusion
**What goes wrong:** Expecting automatic scoping like Lit's `css` template literals.
**Why it happens:** CSS import attributes load constructable stylesheets that apply to the shadow root, but selectors work as-written.
**How to avoid:** Use `:host` selectors for host-specific styles; test shadow DOM isolation.

### Pitfall 3: Build Tool Mismatch
**What goes wrong:** Vite configuration works in dev but fails in build, or vice versa.
**How to avoid:** Verify both `vite dev` and `vite build` work with CSS imports before starting migration.

## Code Examples

Verified patterns from official sources:

### Shared Style Migration
```css
/* Source: MDN CSS import attributes, Lit docs on styles */
.focus-ring,
:host(.focus-ring) {
  outline: 0px solid transparent;
  outline-offset: var(--g-theme-focus-ring-offset-default);
  transition-duration: var(--g-animation-duration-20);
  transition-properties: outline-color, width;
}

.focus-ring:focus-visible,
:host(.focus-ring):focus-visible {
  outline: var(--g-theme-focus-ring-width-default) solid
    var(--g-theme-focus-ring-color-default);
}
```

### Component Style Import
```javascript
// Source: Lit docs, MDN import attributes
import { LitElement } from "lit";
import buttonStyles from "./button.styles.css" with { type: "css" };
import focusRingStyles from "../../lib/styles/focus-ring.styles.css" with { type: "css" };

export class GrantCodesButton extends LitElement {
  static styles = [focusRingStyles, buttonStyles];
  // ... rest of component
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `css` tagged templates in .js files | CSS import attributes to .css files | CSS import attributes spec (2024) | Better separation, tooling support, tree-shaking |

**Deprecated/outdated:**
- Using `css` template literals for component styles: Migrate to CSS files for better maintainability

## Open Questions

1. **Firefox support timeline**
   - What we know: CSS import attributes supported in Chrome/Edge since 2024, not in Firefox
   - What's unclear: When Firefox will implement
   - Recommendation: Monitor caniuse.com; consider build-time fallbacks if needed

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node.js built-in test runner |
| Config file | none — see Wave 0 |
| Quick run command | `NODE_ENV=test node --import @lit-labs/ssr-dom-shim/register-css-hook.js --test src/components/{component}/{component}.test.js` |
| Full suite command | `npm run test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SHARED-01 | Focus-ring styles as importable .css file | unit | NODE_ENV=test node --import @lit-labs/ssr-dom-shim/register-css-hook.js --test src/components/button/button.test.js | ✅ |
| SHARED-02 | Components import focus-ring CSSStyleSheet | unit | NODE_ENV=test node --import @lit-labs/ssr-dom-shim/register-css-hook.js --test src/components/button/button.test.js | ✅ |

### Sampling Rate
- **Per task commit:** Quick run command for affected component
- **Per wave merge:** Full suite green before merge
- **Phase gate:** Full suite green before /gsd-verify-work

### Wave 0 Gaps
- None — existing test infrastructure covers all phase requirements

## Sources

### Primary (HIGH confidence)
- /lit/lit.dev - Lit documentation on styles and CSS support
- MDN Web Docs - CSS import attributes specification and usage

### Secondary (MEDIUM confidence)
- WebSearch results on Lit CSS import attributes migration patterns

### Tertiary (LOW confidence)
- GitHub issues and community discussions on CSS import attributes adoption

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Verified current versions and Lit support
- Architecture: HIGH - Based on Lit docs and spec
- Pitfalls: MEDIUM - Based on known browser support gaps

**Research date:** 2026-03-23
**Valid until:** 2026-09-23</content>
<parameter name="filePath">.planning/phases/02-pilot-migration/02-RESEARCH.md