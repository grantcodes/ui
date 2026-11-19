# Avatar, Person, Gallery, Icon, CodePreview

Use these for media/identity composition; prefer native img/figure/pre when their extra presentation isn't needed.

## Avatar and Person

```js
import '@grantcodes/ui/components/avatar/avatar.js';
import '@grantcodes/ui/components/person/person.js';
```
```html
<grantcodes-avatar name="Ada Lovelace" src="/ada.jpg" alt="Ada Lovelace" size="small"></grantcodes-avatar>
<grantcodes-person name="Ada Lovelace" company="Analytical Engine" avatar="/ada.jpg">
  <p slot="description">Computing pioneer</p>
</grantcodes-person>
```

Avatar: src/name/alt/initials, size small/medium/large (medium default). No slots. Initials (from `initials` or name) scale with the avatar size (h6 family and weight, about 40% of its width), stay on one line, and sit under the image as a CSS background, so a missing, loading or failed src shows them without JS; the image loads eagerly, and its inline `style` needs `style-src 'unsafe-inline'` under a strict CSP. The accessible name (alt, then name/initials) is on the wrapper (`role="img"`). Person: name, role (job text, not an ARIA role), company, avatar, alt, size; description slot. Supply meaningful identification and avoid confusing the job-text role property with accessibility semantics.

No declared parts. Avatar uses primary-200/900, spacing and typography tokens; Person uses `--g-color-content-subtle`, body typography and spacing.

## Gallery and GalleryImage

```js
import '@grantcodes/ui/components/gallery/index.js';
```
```html
<grantcodes-gallery variant="filmstrip">
  <grantcodes-gallery-image src="/garden.jpg" alt="Community garden in spring" caption="Spring planting" width="800" height="600"></grantcodes-gallery-image>
</grantcodes-gallery>
```

Gallery: variant default/filmstrip, default slot for GalleryImages. Filmstrip supplies a named, focusable scroll region. GalleryImage: src/alt/caption/width/height/thumbnail. Its image uses src; thumbnail is not consumed by rendering. Supply nonzero intrinsic dimensions and useful alt (empty only for decorative images). There is no lightbox, slide-change event, or implemented marquee property. No declared parts or direct semantic-token hooks in gallery CSS.

## Icon

```js
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Reply } from '@grantcodes/ui/icons';
import '@grantcodes/ui/components/icon/icon.js';

const icon = html`<grantcodes-icon aria-hidden="true">${unsafeHTML(Reply)}</grantcodes-icon>`;
```

Default slot takes SVG, not an icon name. Use unsafeHTML only with trusted bundled SVG strings; never user SVG without sanitization. Icons inherit currentColor and size slotted SVG to 1em; no declared parts/tokens. Give meaningful SVGs role=img and a name; hide decorative ones. React SVG exports are separate at `@grantcodes/ui/icons/react`.

## CodePreview

```js
import '@grantcodes/ui/components/code-preview/code-preview.js';
```
```html
<grantcodes-code-preview language="html" theme="aurora-x">&lt;p&gt;Hello&lt;/p&gt;</grantcodes-code-preview>
```

Default slot contains **escaped text**, not live HTML. language defaults html; theme is a Shiki theme (aurora-x default), not a design-system theme. Browser first update lazily loads Shiki; later changes do not automatically rehighlight. `doHighlight()` is async and may be called after rendering when needed. No editing/copy event API. Tokens include code font family, border-radius-md, box-shadow-sm and spacing-md; no parts.

React exports Avatar, Person, Gallery, GalleryImage, Icon, CodePreview. None maps custom events.
