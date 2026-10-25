# Text

Use for trusted Markdown prose; native Astro markup is preferable for application UI.

```astro
---
import { Text } from '@grantcodes/astro/blocks';
---
<Text content="## Our project\n\nBuilt by the community." />
```

Required content string. Parses Markdown with marked and renders the result through **set:html** inside UI Container align=prose. Markdown can contain raw HTML; this is **not a sanitizer**. Only pass trusted editorial content or sanitize before this boundary. Validate URLs too.

Static SSR; no slots/events. Respect page heading hierarchy. Uses spacing-2xl/body-font plus [Container](ui-layout.md). Schema: textBlock.
