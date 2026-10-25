# HTML and Lit setup

Use a browser bundler that resolves package imports. Raw HTML alone cannot resolve npm specifiers.

```js
import '@grantcodes/ui/styles/themes/grantcodes.css';
import '@grantcodes/ui/styles/base.css';
import '@grantcodes/ui/components/button/button.js';
```

```html
<grantcodes-button type="button" color="primary" variant="solid">Save</grantcodes-button>
```

The theme supplies tokens and fonts, not the global reset/native-control styles in base.css. See [theming](theming.md) before overriding either. Base styles are optional if the app supplies equivalent styles.

Component JS imports CSS with `with { type: 'css' }`. In Vite use the shipped transform, not an invented raw-CSS loader:

```js
import { defineConfig } from 'vite';
import { cssImportAttributes } from '@grantcodes/ui/vite-plugin';

export default defineConfig({ plugins: [cssImportAttributes()] });
```

For TypeScript CSS import declarations, put `import '@grantcodes/ui/css-import-attributes';` in a declaration file. Other bundlers must support/transform CSS module import attributes into stylesheets; verify their output rather than assuming ordinary CSS imports suffice.

## Registration and binding

Register only what you use, including companions listed in a family guide. `.component.js` files do not register. Most family `index.js` files re-export register files, but do not mix the accordion `index.js` and `accordion.js` routes: both define the same names independently. Avoid the root barrel as a catch-all; it omits some families and can register unrelated components.

```js
import { html } from 'lit';
import '@grantcodes/ui/components/dialog/dialog.js';

const allowDismiss = false;
const view = html`<grantcodes-dialog .dismissible=${allowDismiss} aria-label="Review">
  <h2 slot="header">Review</h2>
  <p>Check your changes.</p>
</grantcodes-dialog>`;
```

String/number attributes work for primitive data. Use property assignment for runtime values, `@event=${handler}` in Lit, and `addEventListener` in plain JS. `?disabled=${false}` removes a default-false attribute; it cannot reliably reset a default-true property. Assign `.dismissible=${false}`, not `dismissible="false"`.

Named slots belong on direct light-DOM children. Style slotted content in the consumer; shadow descendants need a documented part or inherited token. Await `customElements.whenDefined(tag)` and `updateComplete` before imperative work that depends on rendering.

The library targets modern, Baseline newly available features. Do not promise older-browser parity or add polyfills by default; verify the required behaviour against the consumer's browser policy.
