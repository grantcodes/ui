---
name: grantcodes-design-system
description: Choose, integrate, style, and troubleshoot @grantcodes/style-dictionary, @grantcodes/ui, and @grantcodes/astro in consumer projects. Use for Grantcodes tokens, themes, Lit/HTML components, React wrappers, Astro content blocks, schemas, and integration setup. Not for generic frontend design without these packages or for maintaining the libraries themselves.
---

# Grantcodes design system

## Workflow

1. Identify the consumer's framework, installed package versions, existing styles, and requested behaviour. Read its package manifest and relevant setup before changing anything. Do not automatically install or upgrade packages.
2. Choose the smallest layer from the matrix below. Prefer native HTML when the catalogue has no fit; do not invent a component from its name.
3. Read the matching setup guide and only the selected family's reference via the [catalogue](references/catalogue.md). Resolve these links relative to this SKILL.md, not the consumer's working directory. Do not load the whole reference collection.
4. Implement with the documented imports, data shapes, slots, and native controls. Preserve the consumer's theme and accessibility requirements.
5. Verify using the consumer's existing checks and, for interactive changes, keyboard/focus and actual browser behaviour. Report what was verified and any version mismatch; do not run library-maintainer commands.

These references describe UI 2.18.0, style-dictionary 1.11.1, and Astro integration 0.3.0 source contracts. Older published installations may differ. Installed exports, types, and implementation take precedence over these snapshots; do not silently upgrade to make an example work. No monorepo checkout is required.

## Choose by need

| Need | Recommendation | Alternative / boundary | Reference |
| --- | --- | --- | --- |
| Branded surface, no components | style-dictionary only | No UI or Astro dependency needed | [Tokens and theming](references/theming.md) |
| HTML/Lit components and global styles | Specific register files, one theme; base styles separately | Native HTML for unsupported behaviour | [HTML/Lit setup](references/setup-html-lit.md) |
| React components | Verified wrappers and separate SVG exports | Not an SSR/Next.js compatibility promise | [React setup](references/setup-react.md) |
| Astro site | `ui()` plus chosen blocks or UI constructors | Theme injection requires an explicit theme; base CSS stays manual | [Astro setup](references/setup-astro.md) |
| Individual / grouped actions | Button / ButtonGroup | Anchors navigate; ButtonGroup is not a toolbar or segmented selector | [Actions](references/ui-actions.md) |
| Site navigation | AppBar, Sidebar, Breadcrumb, Pagination, Footer | Native nav/anchors for custom routing | [Catalogue](references/catalogue.md) |
| Brief explanation | Tooltip | No interactive content; use Popover instead | [Tooltip](references/ui-tooltip.md) |
| Interactive anchored panel | Popover | Dropdown for action menus; Dialog for modal tasks | [Popover](references/ui-popover.md) |
| Action menu | Dropdown + DropdownItem | Not a select/combobox or general form panel | [Dropdown](references/ui-dropdown.md) |
| Modal confirmation / task | Dialog | Native dialog if its richer lifecycle is needed | [Dialog](references/ui-dialog.md) |
| Persistent / transient / compact feedback | Notice / Toast / Badge | Loading for in-progress work; not interchangeable live regions | [Feedback](references/ui-feedback.md) |
| Switch panels / disclose content | Tabs + Tab / Accordion + item | Native details for one disclosure | [Disclosure](references/ui-disclosure.md) |
| Inputs and grouped choices | FormField around native input/select/textarea | No Input, Select, Checkbox, or Switch wrapper exports | [Forms](references/ui-forms.md) |
| Custom composition | Card, Container and individual UI components | Astro blocks for structured content; BlockRenderer for validated heterogeneous data | [Catalogue](references/catalogue.md), [schemas](references/astro-renderer.md) |

## Essential constraints

- Import exact exported paths: `@grantcodes/ui/components/button/button.js`, not an extensionless component directory. `.component.js` exports a class without registration. The root UI barrel is not the full catalogue.
- A boolean HTML attribute means true even when its text is `"false"`. In Lit use `.prop=${value}` for default-true booleans; React wrappers take real booleans. Arrays/objects are not always object properties: several content components require JSON **strings**; SplitBar instead accepts an array.
- FormField styles and labels a native control; the control owns `name`, value, validation, and submission. Keep it as a direct child.
- Use semantic/component `--g-*` tokens and declared parts. Do not use obsolete `--g-theme-*`, reference-tier `--g-ref-*` in consumer component styles, or guessed shadow classes as styling APIs.
- Treat HTML/SVG injection and content URLs as trust boundaries. Schemas check shape, not sanitization or safe URLs. Detailed guides identify HTML-rendering paths.
- Do not assume React exports/events mirror every custom component or Astro props mirror HTML attributes. Use the relevant setup guide and family contract.
