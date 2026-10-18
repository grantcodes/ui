# grant.codes UI

A personal component system.

Components are built with Lit web components using CSS modules for styles with theming provided by my custom style dictionary.

## Installing

```bash
npm install @grantcodes/ui
```

## Usage

Everything should mostly just work out of the box, without much setup 🤞.

Components can be used directly in HTML or imported as ES modules.

```html
<grantcodes-button>Click me</grantcodes-button>
```

```javascript
import { GrantCodesButton } from '@grantcodes/ui/components/button';
```

For Astro projects, pair this package with `@grantcodes/astro` for the lowest-friction setup.

### Vite CSS import attributes

Add the typed Vite plugin when components import CSS with `{ type: 'css' }`:

```javascript
import { cssImportAttributes } from '@grantcodes/ui/vite-plugin';

export default { plugins: [cssImportAttributes()] };
```

For TypeScript, opt in to the matching CSS declaration with:

```ts
import '@grantcodes/ui/css-import-attributes';
```

## Creating a new component

To create a new component run `npm run generate`. Uses plop.js for scaffolding.
