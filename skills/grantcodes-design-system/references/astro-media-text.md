# MediaText

Use for paired media/text, rather than a full-width Hero.

```astro
---
import { MediaText } from '@grantcodes/astro/blocks';
---
<MediaText title="Our space" text="Room to build together" media={{ src: '/space.jpg', alt: 'Workshop benches', kind: 'image' }} cta={{ label: 'Visit', href: '/visit' }} />
```

Required title/text/media { src, alt?, kind?: image|video }; optional reverse false, cta { label, href }. Block serializes media/cta to UI strings. Unlike UI MediaText, the Astro Props/schema do not expose width/height/poster/loading. Use custom composition if those are required, or native video when captions/tracks are needed. Supply alt and safe media URLs.

No slots/events, static SSR. h2 and paragraph text are escaped. [UI content hooks](ui-content.md). Schema: mediaTextBlock.
