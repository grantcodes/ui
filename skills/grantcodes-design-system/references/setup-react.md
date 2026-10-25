# React setup

Use the [HTML/Lit setup](setup-html-lit.md) for theme/base CSS and the Vite CSS import-attribute plugin. Wrappers register their components and pass properties through `@lit/react`.

```tsx
import { FormField, Button, Popover, Icon } from '@grantcodes/ui/react';
import { Settings } from '@grantcodes/ui/icons/react';

export function SettingsForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <FormField label="Email" help="Used for receipts">
        <input type="email" name="email" autoComplete="email" required />
      </FormField>
      <Popover onToggle={(event) => console.log(event.detail.open)}>
        <button type="button" slot="trigger"><Icon><Settings aria-hidden="true" /></Icon> Options</button>
        <p>Changes apply when saved.</p>
      </Popover>
      <Button type="submit">Save</Button>
    </form>
  );
}
```

The example prevents submission only to demonstrate wiring; connect the consumer's actual save action. Native React input/change/submit handlers belong on native controls/forms. Avoid effects to mirror derivable form state.

## Exact wrapper surface

Exports from `@grantcodes/ui/react`:

Accordion, AppBar, NavLink, Avatar, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Card, CodePreview, Container, Countdown, Cta, Dialog, Dropdown, DropdownItem, Dropzone, FeatureList, Footer, FooterColumn, FormField, Gallery, GalleryImage, Hero, Icon, Loading, LogoCloud, MapEmbed, MediaText, Newsletter, Notice, Pagination, Popover, Person, Pricing, Sidebar, SidebarToggle, SplitBar, Tab, Tabs, Testimonials, Toast, ToastContainer, Tooltip.

`TabsButton` is also exported but is an internal Tabs companion; do not compose it yourself. There is **no AccordionItem React wrapper**. For React disclosures prefer native `details/summary`, or explicitly integrate the registered custom component with appropriate JSX typing; do not invent an export.

`MapEmbed`, not `Map`, is the map wrapper. SVG components come from `@grantcodes/ui/icons/react` (Lucide React); `@grantcodes/ui/icons` contains SVG **strings**. Icon has no `name` lookup property.

## Custom event mappings

| Wrapper | React prop | DOM event / detail |
| --- | --- | --- |
| AppBar | onMenuToggle | menu-toggle / { open } |
| Dropdown | onToggle | toggle / { open }; trigger click only, not every state change |
| DropdownItem | onSelect | select / no payload |
| Popover | onToggle | toggle / CustomEvent<{ open: boolean }> |
| Sidebar | onDrawerToggle | drawer-toggle / CustomEvent<{ open: boolean }>, cancelable |
| Toast | onDismiss | dismiss / no payload; component removes itself |

Only Popover and Sidebar explicitly type their custom-event details. Other mapped callbacks are Event-typed; narrow/cast a CustomEvent before reading detail. Dialog has no mapped `onOpenChange`, `onClose`, or `onDismiss`. Notice has no dismiss event. Do not invent wrapper callbacks.

Pass booleans as booleans: `<Dialog dismissible={false} />`. Properties such as `primaryAction`, `items`, `media`, and `tiers` on their UI wrappers are JSON strings, not Astro-style objects. SplitBar `segments` is an array. Map uses `directions-url`; Countdown uses `show-seconds`, `past-message`, and unit-label hyphenated properties.

Keep React state synchronized with self-removing Toasts via `onDismiss`; do not assume controlled Dialog state is notified when Escape closes it. Prefer native dialog when that lifecycle is essential. Native slots use `slot="header"` on children.

These are browser wrappers, not evidence of Next.js SSR/RSC support. Check the consumer's renderer and client boundary rather than claiming SSR compatibility.
