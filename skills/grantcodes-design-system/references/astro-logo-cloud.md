# LogoCloud

Use for partner/customer marks; Gallery is for photos.

```astro
---
import { LogoCloud } from '@grantcodes/astro/blocks';
---
<LogoCloud title="Partners" logos={[{ name: 'Example', src: '/example.svg', href: '/partners/example' }]} />
```

Required logos: { name, src, alt?, href? }[]. Optional title. Serializes to UI LogoCloud; names label links and are the default alt. Supply real accessible names and approved image assets/URLs. No slots/events; static SSR. [UI content hooks](ui-content.md). Schema: logoCloudBlock.
