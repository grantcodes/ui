# Pricing

Use for plan cards; use a table for dense feature comparisons.

```astro
---
import { Pricing } from '@grantcodes/astro/blocks';
---
<Pricing tiers={[{ name: 'Community', price: 'Free', features: [{ text: 'Projects', included: true }], cta: { label: 'Start', href: '/join' } }]} />
```

Required tiers: { name, price, period?, description?, features: { text, included }[], cta: { label, href }, highlighted? }[]. Optional title/subtitle. Direct props require the array/boolean fields; parsing pricingBlock can supply schema defaults for features/included/highlighted. Serializes to UI Pricing, not a billing service. Excluded features include “Not included” text. No slots/events, static SSR. [UI content hooks](ui-content.md). Schema: pricingBlock.
