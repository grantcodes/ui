# Popover

Use for arbitrary interactive anchored content, not an action menu or modal. [Dropdown](ui-dropdown.md) supplies menu keyboard semantics; [Tooltip](ui-tooltip.md) is noninteractive.

```js
import '@grantcodes/ui/components/popover/popover.js';
```
```html
<grantcodes-popover placement="bottom-end">
  <button type="button" slot="trigger">Filters</button>
  <label><input type="checkbox" name="archived" /> Include archived</label>
</grantcodes-popover>
```

Properties: `open` false; `placement` bottom-start (default), bottom-end, top-start, top-end. Slots: one interactive trigger in `trigger`; panel content in the **default** slot, not content/menu.

`toggle` bubbles/composes with `detail: { open }` after committed changes, including programmatic changes. React `Popover onToggle` is typed as CustomEvent. Assign `open` to control it; no public show/hide method.

Opening focuses the first focusable panel control or panel. Escape and outside click close it, returning focus when appropriate. Trigger aria-expanded is managed. Supply native controls with names; the panel is not automatically a dialog/menu and does not trap focus. Positioning is CSS-based, not native top-layer popover behaviour.

Part: `panel`. Tokens include `--g-color-background-default`, `--g-color-border-default`, `--g-border-radius-md`, `--g-spacing-md`, `--g-box-shadow-lg`. Do not target private anchor/view-transition properties.
