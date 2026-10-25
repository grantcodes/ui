# Gallery

Use for a photo grid or horizontal filmstrip, not a lightbox/carousel.

```astro
---
import { Gallery } from '@grantcodes/astro/blocks';
---
<Gallery images={[{ src: '/garden.jpg', alt: 'Community garden', caption: 'Spring planting' }]} filmstrip />
```

images: { src, alt?, caption? }[]. filmstrip defaults false. Composes UI Gallery/GalleryImage and, outside filmstrip, Container. Provide useful alt; omitted alt becomes empty. The block does not expose intrinsic dimensions, so use UI GalleryImage or native figures if dimensions are required. A direct marquee prop exists but the UI component does not implement marquee behaviour; do not recommend it. No lightbox events/slots.

Static SSR; filmstrip provides native scrolling/focusable region. Uses spacing-xl/2xl; [UI gallery](ui-media.md) has no declared parts. Schema: galleryBlock (images, filmstrip; no marquee).
