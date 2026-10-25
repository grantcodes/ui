# Accordion

Use for FAQ/disclosure sections; native details is an alternative for one item.

```astro
---
import { Accordion } from '@grantcodes/astro/blocks';
---
<Accordion items={[{ title: 'Delivery', content: 'Within three working days.' }]} />
```

items: array of { title, content?, htmlContent? }. Schema accordionItem requires at least content or htmlContent. content is escaped plain text; **htmlContent is rendered via set:html**, takes precedence when non-null, and must be trusted/sanitized before passing it. Shape validation is not sanitization.

Composes UI Container/Accordion/AccordionItem; wrapper uses client:visible. Inner native details supplies disclosure interaction; no exclusive-open mode or public block events/slots. Use meaningful summary titles. Uses spacing-2xl/body-font and [disclosure hooks](ui-disclosure.md). Schema: accordionBlock and accordionItem.
