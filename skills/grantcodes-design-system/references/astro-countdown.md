# Countdown

Use for a time-until-event display; always show the actual date/time separately.

```astro
---
import { Countdown } from '@grantcodes/astro/blocks';
---
<Countdown target="2030-06-01T12:00:00Z" pastMessage="The event has started!" />
```

Required target ISO datetime with timezone. Optional daysLabel/hoursLabel/minutesLabel/secondsLabel, pastMessage, showSeconds (false). Translates camelCase to hyphenated UI properties. Uses UI Countdown **client:only**; no initial SSR countdown. No completion event/slots. Validate the date yourself; schema only checks string shape. Avoid per-second live announcements. [UI content hooks](ui-content.md). Schema: countdownBlock.
