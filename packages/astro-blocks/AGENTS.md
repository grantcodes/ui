# @grantcodes/astro-blocks

Reusable Astro content blocks with theming support using `@grantcodes/ui` components.

## Exports

```javascript
// Main exports
import { Hero, Cards } from '@grantcodes/astro-blocks';

// Renderer for markdown content
import { render } from '@grantcodes/astro-blocks/renderer';

// Content schemas
import { heroSchema, cardsSchema } from '@grantcodes/astro-blocks/schemas';
```

## Available Blocks

- **Hero** - Full-width hero section with title, subtitle, and CTA
- **Cards** - Grid of card components

## Usage

```astro
---
import { Hero, Cards } from '@grantcodes/astro-blocks';
---

<Hero
  title="Welcome"
  subtitle="Build sustainable websites"
  button="Get Started"
  href="/docs"
/>

<Cards
  cards={[
    { title: 'Feature 1', description: 'Description here' },
    { title: 'Feature 2', description: 'Description here' },
  ]}
/>
```

## Theming

Blocks use `@grantcodes/ui` components which respect the theme. Import a theme in your layout:

```astro
import '@grantcodes/ui/styles/themes/grantcodes.css';
```

Available themes:
- `grantcodes.css` - Default theme
- `wireframe.css` - Minimal theme
- `todomap.css` - Alternative theme

## Dependencies

- `astro` (peer dependency)
- `@grantcodes/ui` - UI components
- `@grantcodes/style-dictionary` - Design tokens
