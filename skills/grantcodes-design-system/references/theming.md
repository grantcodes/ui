# Tokens, themes, and colour scheme

Use tokens alone when no component is needed. Four themes exist: `grantcodes` (Greycliff), `todomap` (Quicksand), `wireframe` (system fonts), and `grantina` (Albert Sans, Vidaloka, Pinyon Script).

## Tokens only

```css
@import '@grantcodes/style-dictionary/grantcodes/css';
@import '@grantcodes/style-dictionary/assets/fonts/greycliff';

:root { color-scheme: light dark; }
.brand-surface {
  background: var(--g-color-background-default);
  color: var(--g-color-content-default);
  border: 1px solid var(--g-color-border-default);
  padding: var(--g-spacing-lg);
  border-radius: var(--g-border-radius-md);
  font: var(--g-typography-body-font);
}
```

Replace the theme segment to use another theme. Do not import all themes together: each defines root tokens, so later CSS wins. Font entrypoints are `@grantcodes/style-dictionary/assets/fonts/greycliff`, `.../quicksand`, and `.../grantina`; wireframe needs none. Font loading is separate from token definitions.

Each theme exports `/<theme>/css` (tokens), `/<theme>/css/theme` (generated component theme rules), `/<theme>/js` (named constants), and `/<theme>/json` (token data). These suffixes belong to `@grantcodes/style-dictionary`, not UI. JS values can be CSS expressions such as `light-dark(...)`, not pre-resolved browser colours.

```js
import { GColorContentDefault } from '@grantcodes/style-dictionary/grantcodes/js';
import tokens from '@grantcodes/style-dictionary/grantcodes/json' with { type: 'json' };
```

JSON import-attribute support depends on the consumer toolchain; neither import requires UI or Astro.

## UI styles

```js
import '@grantcodes/ui/styles/themes/grantcodes.css';
import '@grantcodes/ui/styles/base.css';
```

The UI theme bundles that theme's token CSS, generated component theme rules, and fonts. Base CSS separately adds reset, typography, native element styles, utilities, and view-transition styles. Import one theme at the app boundary, not repeatedly in every component.

A **theme** is a token set; **colour scheme** is light/dark within it. Base CSS defines `.light` and `.dark`; otherwise set `color-scheme` explicitly. In Astro, `ui({ colorScheme: 'light' })` resolves OG defaults; it does not set your document class or CSS colour scheme.

## Overrides

Prefer semantic roles for the surface, component tokens for narrower changes, then declared parts for structural styling:

```css
.checkout {
  --g-color-background-default: #fff;
  --g-color-content-default: #17212b;
}
grantcodes-button-group {
  --g-button-group-gap: var(--g-spacing-lg);
}
grantcodes-popover::part(panel) { max-inline-size: 24rem; }
```

Choose paired foreground/background roles and check contrast in both schemes. Scoped semantic overrides inherit into descendants. Generated theme rules may set component tokens on hosts, so put targeted component overrides on that host after theme CSS. Token-authoring layer restrictions are maintainer rules; consumer overrides may supply their own brand values.

Use the actual hooks listed in each family guide; CSS class names inside shadow roots are not public parts. Omitted parts mean none are declared. Never infer a token from a component name. `--g-ref-*` is the primitive/reference layer, not a consumer component styling API; `--g-theme-*` is obsolete.
