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
