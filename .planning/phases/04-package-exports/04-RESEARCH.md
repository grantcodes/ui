# Phase 4: Package Exports - Research

**Researched:** 2026-03-23
**Domain:** Node.js package.json exports field configuration for exposing CSS files
**Confidence:** HIGH

## Summary

This phase requires configuring the `exports` field in `packages/ui/package.json` to expose individual component CSS files for external consumption. Node.js exports field (introduced v12.7.0, 2019) is the standard mechanism for defining package entry points, supporting conditional exports for different environments. For CSS files, simple string mappings from subpaths to file paths are sufficient. All 33 components need explicit exports since wildcard patterns don't support nested file structures in exports. Existing exports must remain functional, with more specific CSS paths taking precedence.

**Primary recommendation:** Add 33 explicit subpath exports to `package.json` for each component's `.styles.css` file, following the pattern `"./components/{component}/{component}.styles.css": "./src/components/{component}/{component}.styles.css"`.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js exports field | v12.7.0+ (2019) | Define package entry points and conditional exports | Official Node.js mechanism since 2019, widely supported by bundlers (Vite, Webpack, Rollup), TypeScript, and package managers (npm, pnpm, yarn) |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| publint | latest | Validate package.json exports and entry points | For verifying exports configuration before publishing |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| exports field | "main" and "style" fields | "main"/"style" are legacy fields with limited subpath support; exports provides better encapsulation and multiple entry points |

**Installation:**
```bash
npm install -g publint  # optional, for validation
```

**Version verification:** Node.js exports field is part of Node.js core since v12.7.0 (July 2019). No package installation required.

## Architecture Patterns

### Recommended Project Structure
```
packages/ui/
├── package.json          # Add exports for CSS files
└── src/
    └── components/
        └── {component}/
            └── {component}.styles.css  # Files to be exported
```

### Pattern 1: Explicit Subpath Exports
**What:** Define each CSS file export individually using exact subpath mappings
**When to use:** When exposing specific files from a package with many components
**Example:**
```json
{
  "exports": {
    "./components/button/button.styles.css": "./src/components/button/button.styles.css",
    "./components/badge/badge.styles.css": "./src/components/badge/badge.styles.css"
  }
}
```

### Anti-Patterns to Avoid
- **Wildcard exports for nested files:** Node.js exports doesn't support wildcards like `"./components/*/*.styles.css": "./src/components/*/*.styles.css"` - requires explicit paths
- **Exposing entire directories:** Avoid `"./components/*": "./src/components/*"` for CSS if it conflicts with JS exports; use specific file paths

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Validating exports configuration | Manual testing of imports | publint.dev CLI or website | Catches invalid paths, missing files, and deprecated fields automatically; prevents publishing broken packages |

**Key insight:** Package export validation is complex due to conditional resolution rules - automated tools like publint ensure correctness across environments.

## Common Pitfalls

### Pitfall 1: Typos in File Paths
**What goes wrong:** Incorrect file paths in exports lead to "module not found" errors for consumers
**Why it happens:** Manual addition of 33+ export entries increases typo risk
**How to avoid:** Use publint validation and double-check paths against actual filesystem
**Warning signs:** Build/test failures when importing the CSS files

### Pitfall 2: Conflicts with Existing Exports
**What goes wrong:** New CSS exports break existing JS imports if paths overlap incorrectly
**Why it happens:** Node.js resolves more specific paths first, but conflicting globs can cause issues
**How to avoid:** Test existing imports after adding new exports; ensure CSS paths are more specific than JS paths
**Warning signs:** Existing Storybook builds or consumer apps fail

### Pitfall 3: Missing Files
**What goes wrong:** Export points to non-existent CSS file
**Why it happens:** Assumption that all components have .styles.css files without verification
**How to avoid:** Verify all 33 components have .styles.css files before configuring exports
**Warning signs:** publint reports "file does not exist"

## Code Examples

Verified patterns from Node.js documentation:

### Basic CSS Export
```json
{
  "exports": {
    "./components/button/button.styles.css": "./src/components/button/button.styles.css"
  }
}
```

### Conditional Export with Fallback
```json
{
  "exports": {
    "./components/button/button.styles.css": {
      "import": "./src/components/button/button.styles.css",
      "require": "./src/components/button/button.styles.css"
    }
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| "main" and "style" fields | "exports" field with subpaths | Node.js v12.7.0 (2019) | Enables multiple entry points, better encapsulation, conditional exports for different environments |

**Deprecated/outdated:**
- "style" field: Replaced by exports field for better control
- "main" field alone: Insufficient for multiple entry points

## Open Questions

1. **Verification approach**
   - What we know: publint can validate exports syntax and file existence
   - What's unclear: How to test CSS import resolution without bundlers
   - Recommendation: Add Node.js test that attempts to resolve the export paths

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Node.js native test runner |
| Config file | none — see Wave 0 |
| Quick run command | `npm test` |
| Full suite command | `npm test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| EXPORT-01 | CSS files exposed via exports | unit | `node --test src/**/*.test.js` | ❌ Wave 0 |
| EXPORT-02 | Existing exports work | unit | `node --test src/**/*.test.js` | ✅ existing tests |

### Sampling Rate
- **Per task commit:** `npm test`
- **Per wave merge:** `npm test`
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `src/exports.test.js` — validates package.json exports resolve correctly for all 33 CSS files
- [ ] Update existing tests to verify no regression in component imports

## Sources

### Primary (HIGH confidence)
- Node.js documentation on exports field - [nodejs.org/api/packages.html#exports](https://nodejs.org/api/packages.html#exports)
- Hiroki Osame's Guide to package.json exports - [hirok.io/posts/package-json-exports](https://hirok.io/posts/package-json-exports)

### Secondary (MEDIUM confidence)
- Stack Overflow: How to use "exports" for nested submodules - [stackoverflow.com/questions/70296652](https://stackoverflow.com/questions/70296652)
- Reddit discussion on exports guide - [reddit.com/r/javascript/comments/1l82caz](https://www.reddit.com/r/javascript/comments/1l82caz)

### Tertiary (LOW confidence)
- Medium article on package.json best practices - [medium.com/deno-the-complete-reference/package-json-best-practices](https://medium.com/deno-the-complete-reference/package-json-best-practices)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official Node.js feature with ecosystem support
- Architecture: HIGH - Established patterns from Node.js docs
- Pitfalls: HIGH - Common issues documented in guides and Stack Overflow

**Research date:** 2026-03-23
**Valid until:** 2027-03-23</content>
<parameter name="filePath">.planning/phases/04-package-exports/04-RESEARCH.md