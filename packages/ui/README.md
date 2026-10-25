# grant.codes UI

A personal component system. Consumer agent guidance lives in the [`grantcodes-design-system` skill](https://github.com/grantcodes/ui/tree/main/skills/grantcodes-design-system); install it with `npx skills add grantcodes/ui --skill grantcodes-design-system`.

Components are built with Lit web components using CSS modules for styles with theming provided by my custom style dictionary.

## Installing

```bash
npm install @grantcodes/ui
```

## Usage

Everything should mostly just work out of the box, without much setup 🤞.

Components can be used directly in HTML or imported as ES modules.

```html
<grantcodes-button>Click me</grantcodes-button>
```

```javascript
import { GrantCodesButton } from '@grantcodes/ui/components/button/button.js';
```

For Astro projects, pair this package with `@grantcodes/astro` for the lowest-friction setup.

### Vite CSS import attributes

Add the typed Vite plugin when components import CSS with `{ type: 'css' }`:

```javascript
import { cssImportAttributes } from '@grantcodes/ui/vite-plugin';

export default { plugins: [cssImportAttributes()] };
```

For TypeScript, opt in to the matching CSS declaration with:

```ts
import '@grantcodes/ui/css-import-attributes';
```

### Button groups

`grantcodes-button-group` defaults to joined, horizontal buttons. Use `variant="spaced"`
for separate actions and `orientation="vertical"` to stack either variant. The default
slot accepts existing buttons and links; joined corner styling applies to `grantcodes-button`.

```html
<grantcodes-button-group variant="spaced" aria-label="Reader navigation">
  <grantcodes-button disabled>Previous</grantcodes-button>
  <grantcodes-button>Next</grantcodes-button>
  <grantcodes-button><span role="img" aria-label="Close reader">×</span></grantcodes-button>
</grantcodes-button-group>
```

The host defaults to `role="group"`; name it with `aria-label` or `aria-labelledby`.
Each action needs its own accessible name (including icon-only content, as above).
The group adds no tab stop or arrow-key handling: native Tab navigation and disabled
button behaviour remain unchanged. It is not an ARIA toolbar.

Spacing uses `--g-button-group-gap`, falling back to `--g-spacing-sm`. The `base` part
exposes the flex layout for wrapping and overflow overrides. Groups wrap by default
and leave overflow visible so focus indicators are not clipped. For a scrolling row:

```css
grantcodes-button-group.scrolling::part(base) {
  flex-wrap: nowrap;
  overflow: auto;
  padding: calc(var(--g-focus-ring-width-default) + var(--g-focus-ring-offset-default));
}
```

The existing React `ButtonGroup` export accepts the same `variant`, `orientation`,
and standard ARIA attributes.

### Icons

`grantcodes-icon` and its React `Icon` wrapper accept slotted SVG content; they do
not look up icon names. Use any SVG, including your own.

For Lit, `@grantcodes/ui/icons` re-exports Lucide SVG strings:

```ts
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Reply } from '@grantcodes/ui/icons';
import '@grantcodes/ui/components/icon/icon.js';

html`<grantcodes-icon aria-hidden="true">${unsafeHTML(Reply)}</grantcodes-icon>`;
```

For React, `@grantcodes/ui/icons/react` re-exports `lucide-react` components and types:

```tsx
import { Icon } from '@grantcodes/ui/react';
import { Reply } from '@grantcodes/ui/icons/react';

<Icon><Reply aria-hidden="true" /></Icon>;

// The SVG components also work without the wrapper.
<Reply size="1em" role="img" aria-label="Reply" />;
```

The wrapper sizes slotted SVGs to `1em`. Standalone Lucide components default to
24px; pass `size="1em"` to follow surrounding text. Colour inherits `currentColor`.
Hide decorative SVGs with `aria-hidden="true"`; give meaningful SVGs `role="img"`
and `aria-label`. Icon-only buttons still need an accessible name on the button.

Named imports from `@grantcodes/ui/icons/react` allow ESM bundlers to remove unused
icons. This entry is separate from `@grantcodes/ui/react` to avoid name collisions
such as `Icon`, `Menu`, and `Map`. The static SVG entry remains unchanged.

## Creating a new component

To create a new component run `npm run generate`. Uses plop.js for scaffolding.
