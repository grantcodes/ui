# Testimonials

Use for attributed quotes; native blockquote gives finer structure.

```astro
---
import { Testimonials } from '@grantcodes/astro/blocks';
---
<Testimonials items={[{ quote: 'Easy to collaborate', name: 'Ada', company: 'Example' }]} layout="cards" />
```

Required items: { quote, name, role?, company?, avatar? }[]. Optional title, layout cards/list (cards default). Serializes to UI Testimonials, which composes Card/Person. Quote is escaped text, not HTML. Preserve attribution and image permissions. No slots/events; static SSR. [UI content hooks](ui-content.md). Schema: testimonialsBlock.
