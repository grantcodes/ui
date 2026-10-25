# Cta

Use for a section-level call to action; Hero is the page introduction.

```astro
---
import { Cta } from '@grantcodes/astro/blocks';
---
<Cta title="Join us" primaryAction={{ label: 'Get started', href: '/join' }} />
```

Required title; optional eyebrow, text, primaryAction/secondaryAction { label, href }, align left/center (center). Objects are serialized by the block; don't stringify props. UI Cta renders h2 and links, not command buttons. No slots/events; static SSR. Supply useful action labels and safe URLs. [UI content](ui-content.md) lists tokens. Schema: ctaBlock.
