# Catalogue

Every public component and content block in this snapshot. Import the exact register file shown; extensionless component-directory imports are not supported. Load only the family guide you need. Tags marked **internal** are implementation details even where an export exists.

## UI components (48 public; 49 registered including one internal)

| Element | Import | Family guide | Notes |
| --- | --- | --- | --- |
| `grantcodes-accordion` | `components/accordion/index.js` | [Disclosure](ui-disclosure.md) | Container for items |
| `grantcodes-accordion-item` | `components/accordion/index.js` | [Disclosure](ui-disclosure.md) | No React wrapper |
| `grantcodes-app-bar` | `components/app-bar/app-bar.js` | [Navigation](ui-navigation.md) | Logo/nav/actions slots |
| `grantcodes-nav-link` | `components/app-bar/nav-link.js` | [Navigation](ui-navigation.md) | Wraps a native anchor |
| `grantcodes-avatar` | `components/avatar/avatar.js` | [Media](ui-media.md) | Image or initials |
| `grantcodes-badge` | `components/badge/badge.js` | [Feedback](ui-feedback.md) | Compact status |
| `grantcodes-breadcrumb` | `components/breadcrumb/breadcrumb.js` | [Navigation](ui-navigation.md) | Defines item too |
| `grantcodes-breadcrumb-item` | `components/breadcrumb/breadcrumb.js` | [Navigation](ui-navigation.md) | `current` renders text |
| `grantcodes-button` | `components/button/button.js` | [Actions](ui-actions.md) | Action or link |
| `grantcodes-button-group` | `components/button-group/button-group.js` | [Actions](ui-actions.md) | Not a toolbar |
| `grantcodes-card` | `components/card/card.js` | [Layout](ui-layout.md) | Header/default/footer slots |
| `grantcodes-code-preview` | `components/code-preview/code-preview.js` | [Media](ui-media.md) | Escaped text, Shiki |
| `grantcodes-container` | `components/container/container.js` | [Layout](ui-layout.md) | Width/padding wrapper |
| `grantcodes-countdown` | `components/countdown/countdown.js` | [Content](ui-content.md) | Client timestamp display |
| `grantcodes-cta` | `components/cta/cta.js` | [Content](ui-content.md) | JSON action props |
| `grantcodes-dialog` | `components/dialog/dialog.js` | [Dialog](ui-dialog.md) | Modal task |
| `grantcodes-dropdown` | `components/dropdown/dropdown.js` | [Dropdown](ui-dropdown.md) | Action menu |
| `grantcodes-dropdown-item` | `components/dropdown/dropdown.js` | [Dropdown](ui-dropdown.md) | Emits `select` |
| `grantcodes-dropzone` | `components/dropzone/dropzone.js` | [Forms](ui-forms.md) | Requires file input |
| `grantcodes-feature-list` | `components/feature-list/feature-list.js` | [Content](ui-content.md) | JSON items |
| `grantcodes-footer` | `components/footer/footer.js` | [Navigation](ui-navigation.md) | Registers column too |
| `grantcodes-footer-column` | `components/footer/footer.js` | [Navigation](ui-navigation.md) | `footer/index.js` does not register it |
| `grantcodes-form-field` | `components/form-field/form-field.js` | [Forms](ui-forms.md) | Wraps native control |
| `grantcodes-gallery` | `components/gallery/index.js` | [Media](ui-media.md) | Grid or filmstrip |
| `grantcodes-gallery-image` | `components/gallery/index.js` | [Media](ui-media.md) | Caption/alt |
| `grantcodes-hero` | `components/hero/hero.js` | [Content](ui-content.md) | Renders h1 |
| `grantcodes-icon` | `components/icon/icon.js` | [Media](ui-media.md) | Slotted SVG only |
| `grantcodes-loading` | `components/loading/loading.js` | [Feedback](ui-feedback.md) | Busy indicator |
| `grantcodes-logo-cloud` | `components/logo-cloud/logo-cloud.js` | [Content](ui-content.md) | JSON logos |
| `grantcodes-map` | `components/map/map.js` | [Content](ui-content.md) | OSM iframe; React `MapEmbed` |
| `grantcodes-menu-toggle` | `components/menu-toggle/menu-toggle.js` | [Navigation](ui-navigation.md) | Controlled animated menu button |
| `grantcodes-media-text` | `components/media-text/media-text.js` | [Content](ui-content.md) | JSON media/cta |
| `grantcodes-newsletter` | `components/newsletter/newsletter.js` | [Content](ui-content.md) | Native email form |
| `grantcodes-notice` | `components/notice/notice.js` | [Feedback](ui-feedback.md) | Persistent message |
| `grantcodes-pagination` | `components/pagination/pagination.js` | [Navigation](ui-navigation.md) | Previous/next URLs only |
| `grantcodes-person` | `components/person/person.js` | [Media](ui-media.md) | Name/role/avatar |
| `grantcodes-popover` | `components/popover/popover.js` | [Popover](ui-popover.md) | Interactive panel |
| `grantcodes-pricing` | `components/pricing/pricing.js` | [Content](ui-content.md) | JSON tiers |
| `grantcodes-sidebar` | `components/sidebar/sidebar.js` | [Sidebar](ui-sidebar.md) | Responsive drawer |
| `grantcodes-sidebar-toggle` | `components/sidebar/sidebar.js` | [Sidebar](ui-sidebar.md) | Links by `for` |
| `grantcodes-split-bar` | `components/split-bar/split-bar.js` | [SplitBar](ui-split-bar.md) | Array segments |
| `grantcodes-stats` | `components/stats/stats.js` | [Content](ui-content.md) | JSON items |
| `grantcodes-tabs` | `components/tabs/index.js` | [Disclosure](ui-disclosure.md) | Direct Tab children |
| `grantcodes-tab` | `components/tabs/index.js` | [Disclosure](ui-disclosure.md) | Label + active |
| `grantcodes-testimonials` | `components/testimonials/testimonials.js` | [Content](ui-content.md) | JSON items |
| `grantcodes-toast` | `components/toast/toast.js` | [Feedback](ui-feedback.md) | Transient; removes itself |
| `grantcodes-toast-container` | `components/toast/toast.js` | [Feedback](ui-feedback.md) | Positioning wrapper |
| `grantcodes-tooltip` | `components/tooltip/tooltip.js` | [Tooltip](ui-tooltip.md) | Brief text |

### Internal

- `grantcodes-tabs-button` — register file at `components/tabs/internal/tabs-button.js`; Tabs renders it. The React `TabsButton` export does not make it a consumer primitive.
- `GrantCodesTabsItem` — unregistered base class in `components/tabs/internal/tabs-item.component.js`; no public tag.
- Classes exported from `.component.js` files are registration-free implementation classes. Importing one does not define the element.
- The root `@grantcodes/ui` barrel and `src/main.ts` are not the full catalogue: several families (for example app-bar, dropdown, footer, toast) are absent. Prefer family register files.

React wrapper availability and custom-event mappings are listed in [React setup](setup-react.md). Absence there means no wrapper export, not a naming guess.

## Astro content blocks (15)

All are exported from `@grantcodes/astro/blocks` (source `blocks/index.ts`), alongside `BlockRenderer` and the schemas.

| Block | Guide | Required data |
| --- | --- | --- |
| `Hero` | [Hero](astro-hero.md) | title |
| `Text` | [Text](astro-text.md) | content (trusted Markdown) |
| `Gallery` | [Gallery](astro-gallery.md) | images |
| `Accordion` | [Accordion](astro-accordion.md) | items (content or trusted htmlContent) |
| `Cards` | [Cards](astro-cards.md) | **cards** |
| `Cta` | [Cta](astro-cta.md) | title |
| `FeatureList` | [FeatureList](astro-feature-list.md) | items |
| `Stats` | [Stats](astro-stats.md) | items |
| `LogoCloud` | [LogoCloud](astro-logo-cloud.md) | logos |
| `Testimonials` | [Testimonials](astro-testimonials.md) | items |
| `Pricing` | [Pricing](astro-pricing.md) | tiers |
| `Newsletter` | [Newsletter](astro-newsletter.md) | title, action |
| `MediaText` | [MediaText](astro-media-text.md) | title, text, media |
| `MapEmbed` | [MapEmbed](astro-map.md) | lat, lng |
| `Countdown` | [Countdown](astro-countdown.md) | target |
| `BlockRenderer` | [Renderer and schemas](astro-renderer.md) | singular `block` |

`blockSchema` and the individual `*Block`/item schemas are exported from the same subpath; see the renderer guide.

There is no `Cards items` prop despite stale README text; use `cards`. There is no separate `@grantcodes/astro-blocks` package in current installs.

## Choosing beyond this catalogue

No Input, Select, Checkbox, Radio, Switch, Combobox, Menu (standalone), Slider, Table, or Tabs navigation wrapper exists. Use native HTML with FormField and semantic tokens. For no-fit custom UI, compose primitives rather than assuming an icon or property name.
