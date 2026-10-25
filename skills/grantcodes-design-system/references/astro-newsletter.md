# Newsletter

Use for a simple email signup form; use native controls/FormField composition for additional fields or consent.

```astro
---
import { Newsletter } from '@grantcodes/astro/blocks';
---
<Newsletter title="Stay informed" action="/subscribe" method="post" buttonLabel="Subscribe" />
```

Required title/action; optional text, method get/post (post), placeholder (“Your email address”), buttonLabel (“Subscribe”), disclaimer. Maps camelCase buttonLabel to UI button-label. Uses a labelled required native email control named email; native form submission works in SSR, no client hydration needed.

No slots/custom events, backend, validation service, spam protection or consent model. Provide a real endpoint and server validation; placeholder is not a substitute for its label. [UI content hooks](ui-content.md). Schema: newsletterBlock.
