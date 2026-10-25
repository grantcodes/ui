# Card and Container

Use Card for a content surface and Container for width/padding, not interactive behaviour. Native sections/articles are better when their semantics or fully custom layout are the only requirement.

```js
import '@grantcodes/ui/components/card/card.js';
import '@grantcodes/ui/components/container/container.js';
```
```html
<grantcodes-container align="prose">
  <grantcodes-card>
    <h2 slot="header">Account</h2>
    <p>Your account details.</p>
    <a slot="footer" href="/account">Manage account</a>
  </grantcodes-card>
</grantcodes-container>
```

Card slots: header/default/footer. hasHeader/hasFooter are internally derived from slots, not consumer switches. Card is a div, not a button/link; give navigation a real anchor and avoid nested interactive surfaces. No custom events.

Container: align default/wide/full/prose/viewport; nopad boolean false; default slot. It renders a div, not a landmark. No custom methods/events.

React exports Card and Container. Neither declares parts. Card consumes `--g-color-background-default`, `--g-color-border-default`, `--g-border-radius-md`, `--g-box-shadow-md`, `--g-spacing-md`. Container uses `--g-spacing-md`; do not invent max-width tokens.
