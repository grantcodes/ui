# Button and ButtonGroup

Use Button for an action, or `href` for navigation. Use ButtonGroup for related actions; it is not a selection model or ARIA toolbar. A native button/anchor is appropriate when no custom styling is needed.

```js
import '@grantcodes/ui/components/button/button.js';
import '@grantcodes/ui/components/button-group/button-group.js';
import '@grantcodes/ui/components/icon/icon.js';
```
```html
<grantcodes-button-group variant="spaced" aria-label="Document actions">
  <grantcodes-button type="submit">Save</grantcodes-button>
  <grantcodes-button href="/documents" variant="ghost">Cancel</grantcodes-button>
</grantcodes-button-group>
```

Button: `color="primary|secondary|neutral|danger"`, `variant="solid|outline|ghost"`, `size="sm|md|lg"`, `disabled`, `href`, `type` (default button; submit/reset supported), `name`, `value`, and `form`. The default slot supplies its accessible name/content. Named `start` and `end` slots accept icons or other non-interactive content; placement, gaps, and edge padding are CSS-driven. A direct `grantcodes-icon` in the default slot (no `slot` attribute or `slot=""`) signals icon-only layout; no `icon-only` attribute is needed. Icons beside labels must use `start` or `end`, not the default slot. Native click bubbles; no custom action event. Submit/reset uses ElementInternals; links bypass form actions. Do not rely on `disabled` to disable link navigation or on native submitter-specific overrides; use native controls when those semantics matter.

```html
<grantcodes-button>
  <span slot="start" aria-hidden="true">★</span>
  Save
  <span slot="end">3</span>
</grantcodes-button>
<grantcodes-button>
  <grantcodes-icon role="img" aria-label="Close">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" />
    </svg>
  </grantcodes-icon>
</grantcodes-button>
```

Use static slot composition: Chromium can retain stale edge padding and icon-only styling after children or their `slot` attributes change. This is an accepted limitation of the shadow-CSS `@scope` workaround; there is no JS fallback. Empty named slots add no gaps. Do not put buttons, links, or other interactive content inside a button. With SSR-emitted shadow markup and styles, layout works before hydration; submit/reset still requires client-side JavaScript.

ButtonGroup: default `variant="joined"`, `orientation="horizontal"`; alternatives spaced/vertical. Default slot accepts buttons/links; joined corner styling targets grantcodes-button. Host defaults to group role; give it an accessible label. Tab visits each action; no arrow-key selection. Each action needs a name; for icon-only content provide accessible text inside the slot, not just a host label assumed to cross the shadow boundary.

Hooks: Button has no declared parts. It uses `--g-button-color-background`, `--g-button-color-border`, and corresponding secondary/neutral/danger tokens. ButtonGroup exposes `base` and `--g-button-group-gap` (fallback `--g-spacing-sm`). Preserve focus-ring space when changing overflow.

React: `Button`, `ButtonGroup` from `@grantcodes/ui/react`; use onClick, not an invented custom callback.
