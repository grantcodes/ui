# @grantcodes/astro-starter

Personal website built with Astro, using `@grantcodes/ui` components and `@grantcodes/style-dictionary` for theming.

## Tech Stack

- **Astro** - Static site generator
- **Starlight** - Documentation theme
- **@grantcodes/ui** - Web components library
- **@grantcodes/astro-blocks** - Reusable content blocks

## Project Structure

```
apps/astro/
├── src/
│   ├── components/       # Astro components
│   ├── content/          # Content collections (docs, blog, pages)
│   ├── layouts/          # Page layouts
│   ├── pages/           # Route pages
│   └── styles/          # Global styles
├── public/              # Static assets
└── astro.config.mjs     # Astro configuration
```

## Theming

The site uses the grantcodes theme by default. Theme is configured in:

- `src/layouts/Layout.astro` - Main layout imports theme CSS
- `astro.config.mjs` - Starlight customCss

To swap themes, change the theme CSS import in layouts.

## Development

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Dependencies

- `@grantcodes/ui` - Web components
- `@grantcodes/style-dictionary` - Design tokens
- `@grantcodes/astro-blocks` - Content blocks
- `@grantcodes/astro-og-images` - Open Graph images
