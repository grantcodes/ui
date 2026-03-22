# Codebase Structure

**Analysis Date:** 2026-03-22

## Directory Layout

```
./
├── .github/                    # GitHub Actions and templates
├── .planning/                  # Project planning documents
├── apps/
│   └── astro/                  # Personal website application
│       ├── src/
│       │   ├── components/     # Astro-specific components
│       │   ├── content/        # Content collections (docs, blog)
│       │   ├── layouts/        # Page layouts
│       │   ├── pages/          # Route definitions
│       │   └── styles/         # Global styles
│       ├── public/             # Static assets
│       └── astro.config.mjs    # Astro configuration
├── packages/
│   ├── astro-blocks/           # Reusable Astro content blocks
│   │   └── src/                # Astro component implementations
│   ├── astro-og-images/        # Open Graph image utilities
│   │   └── src/                # Image generation logic
│   ├── style-dictionary/       # Design tokens and theming
│   │   ├── lib/                # Build utilities
│   │   └── tokens/             # Token definitions
│   └── ui/                     # Web components library
│       └── src/
│           ├── components/     # Individual component directories
│           ├── css/            # Global styles and utilities
│           ├── lib/            # Shared utilities
│           └── test-utils/     # Testing helpers
├── pnpm-workspace.yaml         # Workspace configuration
├── turbo.json                  # Build pipeline configuration
└── package.json                # Root package manifest
```

## Directory Purposes

**[apps/astro]:**
- Purpose: Main application - personal website built with Astro
- Contains: Page routes, content, layouts, and site-specific logic
- Key files: `src/pages/index.astro`, `astro.config.mjs`

**[packages/ui]:**
- Purpose: Core web components library using Lit
- Contains: Component implementations, styles, and utilities
- Key files: `src/main.js`, `src/components/*/index.js`

**[packages/astro-blocks]:**
- Purpose: Higher-level content blocks for Astro applications
- Contains: Composable Astro components that use web components
- Key files: `src/index.ts`, `src/*.astro`

**[packages/style-dictionary]:**
- Purpose: Centralized design system with tokens and themes
- Contains: Token definitions and build system for CSS/JS output
- Key files: `tokens/*/tier-*/`, `lib/index.js`

**[packages/astro-og-images]:**
- Purpose: Utilities for generating Open Graph images
- Contains: Image generation and social media utilities
- Key files: `src/index.ts`

## Key File Locations

**Entry Points:**
- `apps/astro/src/pages/index.astro`: Main homepage
- `packages/ui/src/main.js`: UI library exports
- `packages/astro-blocks/src/index.ts`: Content blocks exports

**Configuration:**
- `astro.config.mjs`: Astro build configuration
- `turbo.json`: Build pipeline and task dependencies
- `pnpm-workspace.yaml`: Package workspace definitions

**Core Logic:**
- `packages/ui/src/components/`: Web component implementations
- `packages/astro-blocks/src/`: Content block components
- `packages/style-dictionary/tokens/`: Design token definitions

**Testing:**
- `packages/ui/src/test-utils/`: Component testing utilities

## Naming Conventions

**Files:**
- Components: `component-name.js`, `component-name.component.js`, `component-name.styles.js`
- Astro components: `ComponentName.astro`
- Configs: `kebab-case.config.js`, `camelCase.config.mjs`

**Directories:**
- Packages: `kebab-case` (astro-blocks, style-dictionary)
- Components: `kebab-case` (app-bar, button-group)
- Content: `camelCase` (getting-started, feature-list)

## Where to Add New Code

**New Web Component:**
- Implementation: `packages/ui/src/components/new-component/`
- Files: `new-component.component.js`, `new-component.styles.js`, `new-component.js`, `index.js`
- Export: Add to `packages/ui/src/main.js`

**New Content Block:**
- Implementation: `packages/astro-blocks/src/new-block.astro`
- Schema: `packages/astro-blocks/src/schemas/new-block.ts`
- Export: Add to `packages/astro-blocks/src/index.ts`

**New Theme Tokens:**
- Location: `packages/style-dictionary/tokens/theme-name/tier-X-*/`
- Rebuild: Run `pnpm build:style-dictionary`

**New Astro Page:**
- Location: `apps/astro/src/pages/new-route.astro`
- Layout: Use existing layouts from `apps/astro/src/layouts/`

**New Astro Component:**
- Location: `apps/astro/src/components/NewComponent.astro`

---

*Structure analysis: 2026-03-22*</content>
<parameter name="filePath">.planning/codebase/STRUCTURE.md