# BlockRenderer and exported schemas

Use BlockRenderer for heterogeneous editorial data; use named blocks for fixed layouts.

```astro
---
import { BlockRenderer, blockSchema } from '@grantcodes/astro/blocks';
const blocks = [
  { type: 'hero', title: 'Local projects' },
  { type: 'cards', cards: [{ title: 'Garden', href: '/garden' }] },
].map((block) => blockSchema.parse(block));
---
{blocks.map((block) => <BlockRenderer block={block} />)}
```

The required prop is **block**, singular. Renderer switches on type and forwards known props to named blocks; unknown types render null. It does not validate data automatically. Schema validation is needed before rendering; use safeParse for recoverable authoring errors. No slots/events or own styling API.

All schemas are exported from the same subpath:
heroBlock, textBlock, galleryBlock, accordionItem, accordionBlock, cardItem, cardsBlock, ctaBlock, featureListBlock, statsBlock, logoCloudBlock, testimonialsBlock, pricingBlock, newsletterBlock, mediaTextBlock, mapBlock, countdownBlock, blockSchema.

blockSchema is a discriminated union of the fifteen block types. Reuse it rather than copying a local CMS schema. For an Astro content collection, integrate with the app's existing loader:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { blockSchema } from '@grantcodes/astro/blocks';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({ blocks: z.array(blockSchema) }),
});
export const collections = { pages };
```

Schema defaults are applied by parsing, not by passing arbitrary objects to BlockRenderer. Every block schema includes optional id, but renderer currently forwards id only to Hero; do not promise anchors for all blocks. Gallery's direct marquee prop is not in its schema/renderer and not implemented by UI.

Schemas validate structure, **not HTML or URL safety**. Text renders Markdown including raw HTML; Accordion renders htmlContent with set:html. Treat those as trusted/sanitized editorial fields. The renderer inherits each block's hydration decision; MapEmbed and Countdown are client-only, Accordion hydrates on visibility, other blocks are static.
