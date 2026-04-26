# @grantcodes/astro-blocks

Reusable Astro content blocks with theming support using `@grantcodes/ui` components.

## Installation

```bash
npm install @grantcodes/astro-blocks
```

## Exports

```javascript
// Main exports (all blocks)
import { Hero, Cards, Cta, Stats } from '@grantcodes/astro-blocks';

// Individual blocks
import Hero from '@grantcodes/astro-blocks/hero';
import Cards from '@grantcodes/astro-blocks/cards';

// Renderer for markdown content
import BlockRenderer from '@grantcodes/astro-blocks/renderer';

// Content schemas
import { heroBlock, cardsBlock, blockSchema } from '@grantcodes/astro-blocks/schemas';
```

## Available Blocks

- **Hero** - Full-width hero section with title, subtitle, image, and CTA
- **Text** - Rich text content block
- **Gallery** - Image gallery with optional captions
- **Cards** - Grid of card components
- **Accordion** - Collapsible accordion items
- **Cta** - Call-to-action section with primary/secondary buttons
- **FeatureList** - Grid of feature items with icons
- **Stats** - Statistics display with labels and values
- **LogoCloud** - Grid of partner/client logos
- **Testimonials** - Customer testimonials with quotes and avatars
- **Pricing** - Pricing tiers with features and CTAs
- **Newsletter** - Email subscription form
- **MediaText** - Side-by-side media and text block
- **Map** - Embedded map with coordinates
- **Countdown** - Countdown timer to a target date

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

## Content Schemas

All blocks export Zod schemas that can be used with Astro Content Collections:

```astro
---
import { z, defineCollection } from 'astro:content';
import { heroBlock, cardsBlock } from '@grantcodes/astro-blocks/schemas';

const blocks = defineCollection({
  type: 'data',
  schema: z.discriminatedUnion('type', [
    heroBlock,
    cardsBlock,
    // ... other blocks
  ]),
});
---
```

## Block Renderer

Use the renderer to dynamically render blocks from data:

```astro
---
import BlockRenderer from '@grantcodes/astro-blocks/renderer';
import { blockSchema } from '@grantcodes/astro-blocks/schemas';

const { data } = Astro.props;
---

{data.blocks.map((block) => (
  <BlockRenderer block={block} />
))}
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

## License

MIT
