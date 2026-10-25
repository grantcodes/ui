# Stats

Use for headline metrics; SplitBar is for proportions.

```astro
---
import { Stats } from '@grantcodes/astro/blocks';
---
<Stats title="Our impact" items={[{ label: 'Projects', value: '42', context: 'This year' }]} />
```

Required items: { label, value, context? }[]; value is a string. Optional title, columns (default 4; schema integer 1–6). Serializes to UI Stats; no arithmetic, slots or events. Pair every value with a meaningful label. Static SSR. [UI content hooks](ui-content.md). Schema: statsBlock.
