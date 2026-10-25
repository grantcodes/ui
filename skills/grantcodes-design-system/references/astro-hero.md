# Hero

Use for a page introduction; Cta is for an in-page action. Import the Astro block, not the React wrapper.

```astro
---
import { Hero } from '@grantcodes/astro/blocks';
---
<Hero title="Build together" subtitle="Local projects" button="Explore" href="/projects" size="lg" center />
```

Required title. Optional subtitle, image, id, button, href, size sm/md/lg, center. The block passes primitives to UI Hero and puts an optional image plus its default slot into Hero's default slot. CTA needs both button and href. Image is lazy and decorative (alt=""); use custom composition for meaningful media or a prioritized LCP image. Hero renders h1; maintain page hierarchy. Static SSR, no hydration by default. See [UI content hooks](ui-content.md). Schema export: heroBlock.
