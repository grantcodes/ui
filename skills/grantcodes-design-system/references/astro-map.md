# MapEmbed

Use for a location embed, not a map SDK. Provide a textual address and a normal map link as an accessible/no-JS alternative.

```astro
---
import { MapEmbed } from '@grantcodes/astro/blocks';
---
<MapEmbed lat={51.5} lng={-0.12} label="Workshop location" zoom={14} height="20rem" directionsUrl="https://www.openstreetmap.org/" />
```

Required lat/lng (number|string). Optional zoom (14; schema integer 1–18), label, directionsUrl, height. Converts coordinates to strings and directionsUrl to UI directions-url. Uses UI Map with **client:only** because of browser APIs, so there is no SSR map content. No slots/events. OpenStreetMap iframe is a third-party request: consider consent and frame-src policy. [UI map hooks](ui-content.md). Schema: mapBlock.
