# Accordion and Tabs

Accordion permits independent expanded sections; Tabs switches one selected panel. Prefer native details for a lone disclosure or when React needs a simple accordion without custom JSX integration.

```js
import '@grantcodes/ui/components/accordion/index.js';
import '@grantcodes/ui/components/tabs/index.js';
```
```html
<grantcodes-accordion>
  <grantcodes-accordion-item title="Delivery">Within three working days.</grantcodes-accordion-item>
</grantcodes-accordion>
<grantcodes-tabs label="Account sections">
  <grantcodes-tab label="Profile" active>Profile details</grantcodes-tab>
  <grantcodes-tab label="Security">Security details</grantcodes-tab>
</grantcodes-tabs>
```

Accordion has only a default slot. AccordionItem has title, open (false default), and default content slot; it renders native details/summary. Multiple items may open; no single-open mode or custom toggle event. User toggling the native details does not synchronize the host open property. Do not treat open as a live state feed. Do not mix accordion index.js with accordion.js: both register the same components.

Tabs has label for its tablist and default slot for **direct Tab children**. Tab has label and active (false default); the parent chooses the first if none are active. Parent `activeTab` gets/sets the selected Tab instance, not an index; await rendering before access. The parent owns index/containerId/buttonId/panelId; do not set those internals. Left/Right move focus, clicking/activating selects; no custom change event or automatic-selection promise.

`grantcodes-tabs-button` is **internal**, even though TabsButton is exported for React and a register file exists at `@grantcodes/ui/components/tabs/internal/tabs-button.js`. Tabs creates it. Do not render it as a consumer primitive. The unregistered TabsItem base is also internal and is not a consumer tag.

React exports Accordion, Tabs, Tab, and internal TabsButton, but **not AccordionItem**. Do not invent that wrapper; use native disclosure or explicit typed custom-tag integration.

Give sections useful titles and Tabs a meaningful label. Keep focusable content in active panels, test keyboard activation, and do not put unrelated children directly in Tabs. No declared parts. Accordion uses spacing/border/background semantic tokens; Tabs uses `--g-color-border-default`, `--g-color-content-default`, `--g-color-primary-100`, `--g-color-primary-200`, `--g-color-primary-500`, `--g-spacing-md`.
