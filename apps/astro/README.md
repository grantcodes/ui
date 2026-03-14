# grant.codes

An Astro starter with web components, designed for fast, accessible, and sustainable websites.

## Features

- Built with [Astro](https://astro.build)
- Uses [@grantcodes/ui](https://github.com/grantcodes/ui) web components
- Includes [@grantcodes/astro-blocks](https://github.com/grantcodes/ui) for content blocks
- Starlight documentation integration
- Internationalization support (en, es)
- OG image generation

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Documentation

Documentation is built with Starlight and available at `/docs` when running the dev server.

## Customization

### Theming

The starter uses design tokens from [@grantcodes/style-dictionary](https://github.com/grantcodes/ui). Import themes in your layout:

```js
import '@grantcodes/ui/styles/themes/grantcodes.css'
```

### Blocks

Import and use content blocks:

```astro
---
import { Hero, Cards, Text } from '@grantcodes/astro-blocks'
---

<Hero title="Welcome" subtitle="Hello world" />
```
