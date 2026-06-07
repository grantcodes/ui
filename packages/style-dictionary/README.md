# @grantcodes/style-dictionary

Personal design token system built with [Style Dictionary](https://github.com/amzn/style-dictionary).

## Token model

Tokens are organized into three layers:

- `01-ref` - primitive/reference tokens
- `02-semantic` - semantic role tokens
- `03-components` - component defaults

```text
tokens/
├── core/
│   ├── 01-ref/
│   ├── 02-semantic/
│   └── 03-components/
├── grantcodes/
├── todomap/
├── wireframe/
└── grantina/
```

### Precedence

Later layers override earlier ones:

1. `core/01-ref`
2. `{theme}/01-ref`
3. `core/02-semantic`
4. `{theme}/02-semantic`
5. `core/03-components`
6. `{theme}/03-components`

### Naming examples

| Layer | Token path | CSS variable |
| --- | --- | --- |
| Ref | `ref.color.neutral.500` | `--g-ref-color-neutral-500` |
| Ref | `ref.typography.font-weight.700` | `--g-ref-typography-font-weight-700` |
| Semantic | `color.content.default` | `--g-color-content-default` |
| Semantic | `typography.h1.font` | `--g-typography-h1-font` |
| Component | `button.primary.color.background.default` | `--g-button-primary-color-background-default` |

## Migration notes

This repo now uses a **clean-break** token model. Old names do not get compatibility aliases.

| Old | New |
| --- | --- |
| `tier-1-definitions/` | `01-ref/` |
| `tier-2-usage/` | `02-semantic/` |
| `tier-3-components/` | `03-components/` |
| `color.neutral.500` | `ref.color.neutral.500` |
| `color.utility.green.500` | `ref.color.green.500` |
| `--g-color-neutral-500` | `--g-ref-color-neutral-500` |
| `--g-color-utility-green-500` | `--g-ref-color-green-500` |
| `--g-typography-font-weight-700` | `--g-ref-typography-font-weight-700` |
| `--g-theme-typography-h1-font` | `--g-typography-h1-font` |
| `--g-animation-duration-20` | `--g-ref-animation-duration-20` |
| `--g-theme-shadow-lg` | `--g-box-shadow-lg` |
| `GColorNeutral500` | `GRefColorNeutral500` |
| `GColorUtilityGreen500` | `GRefColorGreen500` |

### Authoring rules

- Raw values belong only in `01-ref`
- `02-semantic` should reference `ref.*`
- `03-components` should reference `ref.*` or semantic tokens
- Themes override or extend core at the same layer

## Usage

Supported CSS entrypoints:

- `@grantcodes/style-dictionary/grantcodes/css`
- `@grantcodes/style-dictionary/wireframe/css`
- `@grantcodes/style-dictionary/todomap/css`
- `@grantcodes/style-dictionary/grantina/css`

```css
@import "@grantcodes/style-dictionary/grantcodes/css";
@import "@grantcodes/style-dictionary/wireframe/css";
@import "@grantcodes/style-dictionary/todomap/css";
@import "@grantcodes/style-dictionary/grantina/css";
```

Import exactly one theme stylesheet per surface unless you are intentionally comparing themes side by side.

## Exports

```js
import '@grantcodes/style-dictionary/grantcodes/css';
import { GRefColorNeutral100 } from '@grantcodes/style-dictionary/grantcodes/js';
```

## Build

```bash
pnpm build:style-dictionary
pnpm test:style-dictionary
```
