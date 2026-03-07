# @grantcodes/ui Monorepo

Monorepo for UI packages using pnpm workspaces and Turbo.

## Packages

- `@grantcodes/ui` - Web components library built with Lit
- `@grantcodes/style-dictionary` - Design tokens and theming

## Commands

```bash
# Development
pnpm dev:ui              # Start Storybook for UI
pnpm dev:style-dictionary  # Watch style-dictionary builds

# Build
pnpm build:style-dictionary  # Build tokens
pnpm build:ui               # Build UI package

# Testing
pnpm test:ui
pnpm test:style-dictionary
```

## Architecture

- `@grantcodes/ui` depends on `@grantcodes/style-dictionary` as a regular dependency
- Theme CSS files use package imports (`@grantcodes/style-dictionary/grantcodes/css`) for both monorepo development and published usage
- Style dictionary outputs CSS, JS, and JSON formats for each theme (grantcodes, wireframe, todomap)
