# Architecture

**Analysis Date:** 2026-03-22

## Pattern Overview

**Overall:** Monorepo architecture using pnpm workspaces with layered package structure

**Key Characteristics:**
- Component-driven development with web components
- Design system with tokenized theming
- Static site generation with Astro
- Modular packages for reusability

## Layers

**[Application Layer]:**
- Purpose: End-user applications and websites
- Location: `apps/astro/`
- Contains: Astro pages, layouts, content collections
- Depends on: `@grantcodes/astro-blocks`, `@grantcodes/ui`, `@grantcodes/style-dictionary`
- Used by: End users via deployment

**[Content Blocks Layer]:**
- Purpose: Reusable Astro components for content sections
- Location: `packages/astro-blocks/`
- Contains: Astro component files (.astro)
- Depends on: `@grantcodes/ui` for web components
- Used by: `apps/astro` for page composition

**[UI Components Layer]:**
- Purpose: Reusable web components built with Lit
- Location: `packages/ui/`
- Contains: Lit element classes, styles, component definitions
- Depends on: `@grantcodes/style-dictionary` for theming, `lit` framework
- Used by: `@grantcodes/astro-blocks`, external consumers

**[Design Tokens Layer]:**
- Purpose: Centralized design tokens and theming system
- Location: `packages/style-dictionary/`
- Contains: Token definitions, build configurations, generated CSS/JS
- Depends on: Style Dictionary tool
- Used by: `@grantcodes/ui` for styling

**[Utilities Layer]:**
- Purpose: Specialized utilities and tools
- Location: `packages/astro-og-images/`
- Contains: OG image generation logic
- Depends on: Astro ecosystem
- Used by: `apps/astro` for social media images

## Data Flow

**[Content Generation]:**

1. `apps/astro` defines page routes and content in `src/pages/`
2. Astro processes Markdown/content collections in `src/content/`
3. Content blocks from `@grantcodes/astro-blocks` render structured sections
4. Web components from `@grantcodes/ui` provide interactive elements
5. Design tokens from `@grantcodes/style-dictionary` apply consistent styling
6. Static HTML/CSS/JS generated for deployment

**State Management:**
- No client-side state management - static generation only
- Content managed through Astro's content collections API

## Key Abstractions

**[Web Components]:**
- Purpose: Cross-framework reusable UI elements
- Examples: `packages/ui/src/components/button/`, `packages/ui/src/components/card/`
- Pattern: LitElement class with reactive properties and scoped styles
- Registration: Custom elements defined in component .js files

**[Design Tokens]:**
- Purpose: Centralized theming and design values
- Examples: `packages/style-dictionary/tokens/grantcodes/tier-1-definitions/`
- Pattern: Hierarchical token structure (core → theme → usage → component)
- Output: CSS custom properties and JavaScript objects

**[Astro Components]:**
- Purpose: Server-side component composition
- Examples: `packages/astro-blocks/src/hero.astro`, `packages/astro-blocks/src/cards.astro`
- Pattern: TypeScript interfaces with props, server-side rendering

## Entry Points

**[Main Application]:**
- Location: `apps/astro/src/pages/index.astro`
- Triggers: HTTP requests to root path
- Responsibilities: Render homepage with hero and feature cards

**[UI Library]:**
- Location: `packages/ui/src/main.js`
- Triggers: Import of `@grantcodes/ui`
- Responsibilities: Export all web components for consumption

**[Content Blocks]:**
- Location: `packages/astro-blocks/src/index.ts`
- Triggers: Import of `@grantcodes/astro-blocks`
- Responsibilities: Export Astro components and schemas

**[Style Dictionary]:**
- Location: `packages/style-dictionary/lib/index.js`
- Triggers: Import of `@grantcodes/style-dictionary`
- Responsibilities: Export token generation utilities

## Error Handling

**Strategy:** Fail-fast approach with TypeScript strict mode

**Patterns:**
- Astro components use TypeScript interfaces for prop validation
- Web components use Lit's property types for runtime validation
- Build-time errors caught by TypeScript compiler and ESLint

## Cross-Cutting Concerns

**Logging:** None - static generation with no runtime logging

**Validation:** Content schemas in `packages/astro-blocks/src/schemas/`

**Authentication:** None - public static site

---

*Architecture analysis: 2026-03-22*</content>
<parameter name="filePath">.planning/codebase/ARCHITECTURE.md