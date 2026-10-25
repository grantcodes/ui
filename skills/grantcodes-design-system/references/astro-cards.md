# Cards

Use for a grid of linked summaries; use individual UI Cards for custom slots/actions.

```astro
---
import { Cards } from '@grantcodes/astro/blocks';
---
<Cards cards={[{ title: 'Garden', description: 'Grow together', image: '/garden.jpg', href: '/garden' }]} />
```

Required **cards**, not items: array of { title, description?, image?, href? }. Composes UI Container/Card; href wraps the whole card in a native anchor, otherwise a div. No consumer slots/events. Titles render h3; images are decorative/lazy with empty alt. Supply meaningful link titles and use custom composition if images need descriptions or nested actions. Static SSR. Uses spacing-xl/2xl and typography-h4-font plus [Card hooks](ui-layout.md). Schema: cardsBlock; item schema: cardItem.
