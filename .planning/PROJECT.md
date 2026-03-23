# Project: CSS Import Attributes Migration

## Core Value

Enable CSS reuse across plain HTML and other JS frameworks by migrating @grantcodes/ui Lit web components from inline CSS template literals (`css\`...\``) to CSS import attributes (`import styles from './styles.css' with { type: 'css' }`).

## Problem Statement

Currently, component styles are locked inside Lit's `css` tagged template literals in `.styles.js` files. This means:
- Styles can only be consumed by Lit components
- No way to use component CSS in plain HTML pages or non-Lit frameworks
- Shared styles (focus-ring) also trapped in JS template literals
- CSS tooling (syntax highlighting, linting) works poorly inside JS strings

## Solution

Migrate all component styles to plain `.css` files and import them using CSS import attributes (`with { type: "css" }`), which are well-supported in modern browsers and build tools. Lit's `static styles` accepts CSSStyleSheet objects, which is exactly what CSS import attributes return.

## Scope

**In scope (this project):**
- Migrate 33 component `.styles.js` files to `.css` files
- Migrate 1 shared style utility (focus-ring) to `.css`
- Update all component `.component.js` files to use CSS import attributes
- Update build tooling (Vite/Storybook) if needed
- Update package exports to expose component CSS files
- Ensure all existing tests pass
- Ensure Storybook continues to work

**Out of scope:**
- Changing component behavior or markup
- Adding new components
- Modifying the design tokens / style-dictionary package
- Changing the Astro site or astro-blocks packages

## Constraints

- Must maintain backward compatibility for existing consumers
- Must work with current Vite/Storybook toolchain
- CSS import attributes browser support: Chrome 123+, Safari 17.5+, Firefox 128+ (all current)
- Node.js test runner needs to handle CSS imports (may need loader/mock)

## Architecture Context

```
style-dictionary (tokens) → ui (components) → astro-blocks → astro-starter
                                          ↗ external consumers
```

Only the `@grantcodes/ui` package is modified. Downstream packages benefit from new CSS exports.

## Key Decisions

| # | Decision | Rationale | Date |
|---|----------|-----------|------|
| - | - | - | - |
