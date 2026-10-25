# SplitBar

Use for relative composition, not time-series charts or an editable slider. A native table/list is preferable when exact values matter more than proportions.

```js
import { html } from 'lit';
import '@grantcodes/ui/components/split-bar/split-bar.js';

const view = html`<grantcodes-split-bar .segments=${[
  { id: 'solar', label: 'Solar', value: 3, color: 'var(--g-color-utility-success)' },
  { id: 'grid', label: 'Grid', value: 1 }
]}></grantcodes-split-bar>`;
```

segments is an **array** property (or JSON array attribute), unlike the string data props of most content components. Items: id, label, numeric value, optional CSS color. Provide stable unique IDs and nonnegative finite weights; inspect consumer data before binding. The component computes shares and a visible percentage legend; it has no selection event or slots. Do not claim raw-value labels or custom formatter support.

The visual bar is aria-hidden and the legend provides text. Keep the legend visible and meaningful; colour alone is insufficient.

React exports SplitBar with array segments. Parts: bar, segment, legend. Hooks include `--g-border-radius-md`, `--g-color-background-subtle`, `--g-color-content-default`, `--g-color-content-secondary`, and spacing tokens.
