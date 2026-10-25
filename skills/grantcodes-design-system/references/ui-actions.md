# Button and ButtonGroup

Use Button for an action, or `href` for navigation. Use ButtonGroup for related actions; it is not a selection model or ARIA toolbar. A native button/anchor is appropriate when no custom styling is needed.

```js
import '@grantcodes/ui/components/button/button.js';
import '@grantcodes/ui/components/button-group/button-group.js';
```
```html
<grantcodes-button-group variant="spaced" aria-label="Document actions">
  <grantcodes-button type="submit">Save</grantcodes-button>
  <grantcodes-button href="/documents" variant="ghost">Cancel</grantcodes-button>
</grantcodes-button-group>
```

Button: `color="primary|secondary|neutral|danger"`, `variant="solid|outline|ghost"`, `size="sm|md|lg"`, `disabled`, `href`, `type` (default button; submit/reset supported), `name`, `value`, and `form`. The default slot supplies its accessible name/content. Native click bubbles; no custom action event. Submit/reset uses ElementInternals; links bypass form actions. Do not rely on `disabled` to disable link navigation or on native submitter-specific overrides; use native controls when those semantics matter.

ButtonGroup: default `variant="joined"`, `orientation="horizontal"`; alternatives spaced/vertical. Default slot accepts buttons/links; joined corner styling targets grantcodes-button. Host defaults to group role; give it an accessible label. Tab visits each action; no arrow-key selection. Each action needs a name; for icon-only content provide accessible text inside the slot, not just a host label assumed to cross the shadow boundary.

Hooks: Button has no declared parts. It uses `--g-button-color-background`, `--g-button-color-border`, and corresponding secondary/neutral/danger tokens. ButtonGroup exposes `base` and `--g-button-group-gap` (fallback `--g-spacing-sm`). Preserve focus-ring space when changing overflow.

React: `Button`, `ButtonGroup` from `@grantcodes/ui/react`; use onClick, not an invented custom callback.
