# Coding Conventions

**Analysis Date:** 2026-03-22

## Languages

**Primary:**
- JavaScript (ES2022) - Web components and utilities - `packages/ui/src/`, `packages/style-dictionary/lib/`
- TypeScript (ES2022) - Astro components and schemas - `packages/astro-blocks/src/`, `apps/astro/src/`

**Secondary:**
- Astro - Static site generation - `apps/astro/`, `packages/astro-blocks/`

## Runtime

**Environment:**
- Node.js ES modules ("type": "module") - All packages use ES module syntax

**Package Manager:**
- pnpm workspaces - Monorepo management
- Lockfile: pnpm-lock.yaml

## Frameworks

**Core:**
- Lit - Web components framework - `packages/ui/`
- Astro - Static site generator - `apps/astro/`, `packages/astro-blocks/`
- Style Dictionary - Design token processing - `packages/style-dictionary/`

**Testing:**
- Node.js built-in test runner - All packages

**Build/Dev:**
- Biome - Linting and formatting - Root and package configs
- Vite - Development and build for UI package

## Key Dependencies

**Critical:**
- lit@^3.3.1 - Web components - `packages/ui/`
- @grantcodes/style-dictionary - Design tokens - All packages
- astro - Static site generation - `apps/astro/`, `packages/astro-blocks/`

**Infrastructure:**
- style-dictionary - Token processing - `packages/style-dictionary/`
- @custom-elements-manifest/analyzer - Component manifest generation - `packages/ui/`

## Configuration

**Environment:**
- No environment variables used in core packages
- Apps may use env vars for deployment

**Build:**
- biome.json - Root config with formatting and linting rules
- tsconfig.json - TypeScript config in apps/astro

## Platform Requirements

**Development:**
- Node.js with ES modules support
- pnpm for workspace management

**Production:**
- Modern browsers with ES2022 support
- Web components support

## Naming Patterns

**Files:**
- kebab-case.js - Component files (button.js, button.component.js)
- PascalCase.ts - TypeScript interfaces and types
- camelCase.js - Utility files (index.js, fixture.js)

**Functions:**
- camelCase - All functions and methods (render, getLightnessScale, fixture)

**Variables:**
- camelCase - Local variables and properties (element, href, shadowRoot)
- UPPER_SNAKE_CASE - Constants (AVAILABLE_THEMES, BASE_FONT_SIZE)

**Types:**
- PascalCase - Classes (GrantCodesButton, LitElement)
- PascalCase - Interfaces (Props, accordionItem)
- camelCase - Type aliases (baseBlockFields)

## Code Style

**Formatting:**
- Biome formatter - 2-space indentation, single quotes, trailing commas "all", line width 100
- Semicolons: Not used at statement ends (despite Biome config specifying "always")

**Linting:**
- Biome linter - Recommended rules enabled
- Config: biome.json (root extends to packages)

## Import Organization

**Order:**
1. Lit framework imports (lit, lit/static-html.js)
2. Local component imports (./button.styles.js)
3. Utility imports (@grantcodes/style-dictionary)

**Path Aliases:**
- None observed - Relative imports used throughout

## Error Handling

**Patterns:**
- Early returns for invalid states
- Optional chaining (?.) for property access
- Nullish coalescing (??) for defaults
- Try/catch not commonly used - minimal error handling in components

## Logging

**Framework:** console (not explicitly imported)

**Patterns:**
- Minimal logging - primarily for build scripts
- No structured logging framework

## Comments

**When to Comment:**
- JSDoc for public APIs and complex logic
- Inline comments for complex transformations
- Component file headers not used

**JSDoc/TSDoc:**
- Used for function parameters and return types in JavaScript
- @param, @returns, @type annotations

## Function Design

**Size:** Small to medium functions (10-50 lines typical)

**Parameters:** 1-5 parameters, destructured where appropriate

**Return Values:** TemplateResult for render methods, void for side effects

## Module Design

**Exports:** Named exports preferred, default for main entry points

**Barrel Files:** Used in test-utils (index.js exports all utilities)

---

*Convention analysis: 2026-03-22*</content>
<parameter name="filePath">.planning/codebase/CONVENTIONS.md