# Tooltip

Use for brief noninteractive text. Put essential instructions visibly on the page; use Popover for links or controls.

```js
import '@grantcodes/ui/components/tooltip/tooltip.js';
```
```html
<grantcodes-tooltip description="Downloads a CSV file">
  <button type="button">Export</button>
</grantcodes-tooltip>
```

Choose **one** of `label` (accessible name via aria-labelledby) or `description` (supplemental text via aria-describedby). Providing both throws. The default slot contains the trigger, normally one focusable native button or link. It also locates the actual control inside supported shadow-root triggers.

Hover/focus reveals text; Escape suppresses it until exit. There is no public open property, trigger slot, rich-content slot, or event mapping. React exports Tooltip with the same properties. No declared parts; inherited tokens include `--g-spacing-sm`, `--g-border-radius-md`, `--g-typography-font-size-xs`, `--g-color-primary-900`, `--g-color-primary-100`.
