# @grantcodes/ui

A personal web components library built with Lit, featuring a custom design system with theming support.

## Technology Stack

- **Lit** - Web components framework
- **Custom Style Dictionary** - Design tokens and theming
- **Storybook** - Component development and documentation

## Project Structure

```
packages/ui/
├── src/
│   ├── components/          # Web component implementations
│   │   ├── app-bar/
│   │   ├── badge/
│   │   ├── breadcrumb/
│   │   ├── button/
│   │   ├── button-group/
│   │   ├── card/
│   │   ├── code-preview/
│   │   ├── container/
│   │   ├── dialog/
│   │   ├── dropdown/
│   │   ├── dropzone/
│   │   ├── footer/
│   │   ├── form-field/
│   │   ├── gallery/
│   │   ├── icon/
│   │   ├── loading/
│   │   ├── notice/
│   │   ├── pagination/
│   │   ├── sidebar/
│   │   ├── tabs/
│   │   └── toast/
│   ├── css/                 # Global styles and themes
│   ├── icons.js             # Icon definitions
│   ├── lib/                 # Utilities
│   └── test-utils/          # Testing utilities
├── custom-elements.json     # Web component manifest
└── package.json
```

## Using Components

### Importing

```javascript
import { GrantCodesButton } from '@grantcodes/ui/components/button';
import { GrantCodesDropdown } from '@grantcodes/ui/components/dropdown';
```

### HTML Usage

```html
<grantcodes-button>Click me</grantcodes-button>
<grantcodes-dropdown>
  <grantcodes-button slot="trigger">Open Menu</grantcodes-button>
  <div slot="content">Menu items...</div>
</grantcodes-dropdown>
```

## Theming

Components use CSS custom properties for theming. Import a theme:

```javascript
import '@grantcodes/ui/styles/themes/grantcodes.css';
```

### Key Theme Variables

- `--g-theme-color-background-default` - Main background
- `--g-theme-color-background-subtle` - Subtle background
- `--g-theme-color-background-brand` - Brand background
- `--g-theme-color-content-default` - Main text color
- `--g-theme-color-content-secondary` - Secondary text
- `--g-theme-color-border-default` - Default border
- `--g-theme-border-radius-md` - Medium border radius
- `--g-theme-shadow-sm`, `--g-theme-shadow-lg` - Shadow utilities

See `CSS_VARIABLES.md` for complete reference.

## Component Patterns

### Slot Usage

Many components use slots for content projection:

```html
<grantcodes-card>
  <div slot="header">Card Title</div>
  <p>Card content</p>
</grantcodes-card>
```

### Properties

Components use reactive properties. Pass them as attributes:

```html
<grantcodes-button disabled variant="primary">Disabled</grantcodes-button>
```

## Development

```bash
npm run dev        # Start Storybook
npm run test       # Run tests
npm run fix:lint   # Fix linting issues
```

## Design Tokens

Tokens are defined in `packages/style-dictionary/tokens/` and built into CSS variables. The style dictionary supports multiple themes (grantcodes, wireframe, todomap).

## Adding New Components

When adding a new component, follow these steps:

### 1. Create Component Files

Create the following files in `src/components/<component-name>/`:

- `<component-name>.component.js` - Main component class
- `<component-name>.styles.js` - Component styles
- `<component-name>.js` - Export and register custom element
- `<component-name>.stories.js` - Storybook stories

### Shared Styles

Use relative paths (not `#styles/` subpath imports) for shared CSS files like focus-ring styles. This ensures components work in all environments including Vite dev mode and `<script>` tag imports:

```javascript
import focusRingStyles from "../../lib/styles/focus-ring.css" with { type: "css" };
```

### 2. Register Custom Element

In the `.js` file, register the custom element:

```javascript
import { GrantCodesComponent } from "./component-name.component.js";

export * from "./component-name.component.js";
export default GrantCodesComponent;

customElements.define("grantcodes-component-name", GrantCodesComponent);
```

### 3. Create Storybook Story

Create stories following the pattern in existing components:

```javascript
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import { html } from "lit/static-html.js";
import "./component-name.js";

const { events, args, argTypes, template } =
  getStorybookHelpers("grantcodes-component-name");

const meta = {
  title: "Components/ComponentName",
  component: "grantcodes-component-name",
  args,
  argTypes,
  parameters: {
    actions: { handles: events },
  },
};

export default meta;

export const Default = {};
```

### 4. Update Package Exports

Ensure `package.json` exports are set up:

```json
"./components/*": {
  "import": "./src/components/*",
  "require": "./src/components/*"
}
```

### 5. Regenerate Custom Elements Manifest

After adding the component, regenerate the CEM:

```bash
cd packages/ui
pnpm cem
```

This updates `custom-elements.json` which is used by Storybook and the CEM validator.
