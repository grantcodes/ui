# Technology Stack

**Analysis Date:** 2026-03-22

## Languages

**Primary:**
- JavaScript ES Modules - Primary language for all packages, using .js extensions with type: "module"
- TypeScript - Used for type definitions and some component templates

**Secondary:**
- Astro - For static site generation in apps/astro
- JSON - For configuration and token definitions

## Runtime

**Environment:**
- Node.js 24 - Specified in .nvmrc, CI uses Node.js 22

**Package Manager:**
- pnpm 10.32.1 - Lockfile: pnpm-lock.yaml present

## Frameworks

**Core:**
- Lit 3.3.1 - Web components framework for @grantcodes/ui
- Astro 5.5.2 - Static site generator for apps/astro
- Style Dictionary 5.0.1 - Design token management for @grantcodes/style-dictionary

**Testing:**
- Playwright 1.57.0 - E2E testing for UI components
- Node.js built-in test runner - Unit tests for JavaScript code

**Build/Dev:**
- Turbo 2.8.17 - Monorepo build orchestration and caching
- Vite 7.2.6 - Build tool for UI package
- Storybook 10.1.4 - Component development and documentation

## Key Dependencies

**Critical:**
- @grantcodes/style-dictionary workspace:^ - Shared design tokens across packages
- sanitize.css 13.0.0 - CSS reset/normalize for UI components
- colorjs.io 0.5.2 - Color manipulation in style dictionary

**Infrastructure:**
- @semantic-ui/astro-lit 5.1.0 - Astro integration for Lit components
- @astrojs/starlight 0.32.2 - Documentation theme for Astro app
- @astrojs/rss 4.0.11 - RSS feed generation
- @astrojs/sitemap 3.2.1 - Sitemap generation

## Configuration

**Environment:**
- No environment variables required - Static component library
- .env files: Not present

**Build:**
- turbo.json - Defines build dependencies and caching rules
- pnpm-workspace.yaml - Workspace configuration for packages and apps
- release-please-config.json - Automated release configuration

## Platform Requirements

**Development:**
- Node.js >=18.0.0 (engines in root package.json), .nvmrc specifies 24
- pnpm >=8.0.0

**Production:**
- Static hosting - No runtime requirements for published packages
- Astro app can be deployed to any static host (Vercel, Netlify, etc.)

---

*Stack analysis: 2026-03-22*</content>
<parameter name="filePath">/home/grantcodes/projects/ui/.planning/codebase/STACK.md