# grant.codes UI

A personal component system.

Components are built with Lit web components using CSS modules for styles with theming provided by my custom style dictionary.

## Installing

In the future it should be something like `npm install @grantcodes/ui`.

## Usage

Everything should mostly just work out of the box, without much setup 🤞.

Components can be used directly in HTML or imported as ES modules.

```html
<grantcodes-button>Click me</grantcodes-button>
```

```javascript
import { GrantCodesButton } from '@grantcodes/ui/components/button';
```

## Creating a new component

To create a new component run `npm run generate`. Uses plop.js for scaffolding.
