# Dropdown and DropdownItem

Use for an action menu; not a select/combobox or form panel. Prefer [Popover](ui-popover.md) for mixed content.

```js
import '@grantcodes/ui/components/dropdown/dropdown.js';
```
```html
<grantcodes-dropdown placement="bottom-start">
  <button type="button" slot="trigger">Document actions</button>
  <grantcodes-dropdown-item slot="menu" id="duplicate">Duplicate</grantcodes-dropdown-item>
  <grantcodes-dropdown-item slot="menu" disabled>Archive</grantcodes-dropdown-item>
</grantcodes-dropdown>
```

The register file defines both components. Parent slots: trigger and **menu** (not content/default). Item default slot is its label; avoid nesting another interactive control in it. Parent `open` defaults false; placement defaults bottom-start (CSS supports bottom-start/end and top-start/end). Item `disabled` defaults false.

Item `select` bubbles/composes without a payload. Listen on the specific item to execute its action; selection closes the parent and restores trigger focus. Parent `toggle` carries { open } but fires on trigger click, not every close or direct property change. Do not use it as a complete controlled-state feed.

The parent sets menu/menuitem roles and manages ArrowUp/Down, Home/End and disabled-item skipping. Give the trigger a native button and clear name. Escape closes; test focus return.

React exports Dropdown and DropdownItem; mappings onToggle and onSelect are Event-typed. No declared parts. Tokens include `--g-color-background-default`, `--g-color-content-default`, `--g-color-background-subtle-hover`, `--g-color-content-disabled`, and focus-ring tokens.
