# @grantcodes/style-dictionary

Design tokens and theming system for the UI packages. Built with Style Dictionary.

## Themes

Four themes are available:

- **grantcodes** - Default theme with Greycliff font
- **todomap** - Theme with Quicksand font
- **wireframe** - Minimal theme with system fonts
- **grantina** - Variant with custom role palette and component styling

## Token Structure

Tokens are organized by layer with a strict precedence order:

```
tokens/
├── core/                    # Shared defaults (ref, semantic, component)
│   ├── 01-ref/              # Reference tokens (colors, typography, spacing, etc.)
│   ├── 02-semantic/         # Shared semantic role tokens (background, content, border, etc.)
│   └── 03-components/       # Shared component defaults (button, focus-ring, form, link, etc.)
├── grantcodes/              # Grantcodes theme overrides
│   ├── 01-ref/              # Theme-specific reference token overrides
│   ├── 02-semantic/         # Theme-specific semantic token overrides
│   └── 03-components/       # Theme-specific component token overrides
├── todomap/                 # Todomap theme overrides
├── wireframe/               # Wireframe theme overrides
└── grantina/                # Grantina theme overrides
```

### Precedence (later sources win)

1. **Core ref** (`core/01-ref/`) — Base primitive values (colors, spacing, typography, shadows, etc.)
2. **Theme ref** (`{theme}/01-ref/`) — Theme overrides for primitive values
3. **Core semantic** (`core/02-semantic/`) — Shared semantic role tokens (background, content, border colors, etc.)
4. **Theme semantic** (`{theme}/02-semantic/`) — Theme overrides for semantic tokens
5. **Core component** (`core/03-components/`) — Shared component defaults (button, focus-ring, form, link)
6. **Theme component** (`{theme}/03-components/`) — Theme-specific component overrides

### Layer Rules

- **01-ref** - Reference/primitive tokens. Raw values (e.g. `oklch(...)`, `#hex`, `16px`) are **only** defined here.
- **02-semantic** - Semantic role tokens. **Must only reference 01-ref tokens** (e.g. `{ref.color.neutral.500}`). Never define raw color/spacing/font values directly — if the value you need doesn't exist in 01-ref, add it there first, then reference it.
- **03-components** - Component-specific tokens. **Must only reference 01-ref or 02-semantic tokens.** Same rule: no raw values.

## CSS Variable Naming

Generated CSS variable names follow a flat, clean naming scheme:

- **Ref tokens** (`01-ref/`): Prefix `--g-ref-` — only used in token definitions, never in component CSS.
- **Semantic tokens** (`02-semantic/`): Plain `--g-` prefix (e.g. `--g-color-content-default`, `--g-typography-h1-font`).
- **Component tokens** (`03-components/`): Plain `--g-` prefix (e.g. `--g-button-primary-color-background-default`, `--g-focus-ring-width-default`).

### Naming rules

1. **No `--g-theme-*` prefix.** Semantic and component variables use plain `--g-*` names. Only ref tokens use `--g-ref-*`.
2. **Ref variables must not be used in component CSS.** Components must always reference semantic or component-level tokens.
3. **Prefer semantic utility roles** over direct ref colors for status/role-based styling (e.g., success/warning/error/info).

### Ref token categories

| Category | Prefix | Example |
|----------|--------|---------|
| Colors | `--g-ref-color-{name}-{shade}` | `--g-ref-color-blue-500` |
| Typography | `--g-ref-typography-{name}` | `--g-ref-typography-font-size-root` |
| Spacing | `--g-ref-spacing-{name}` | `--g-ref-spacing-md` |
| Border | `--g-ref-border-radius-{name}` | `--g-ref-border-radius-500` |
| Shadow | `--g-ref-shadow-{size}-{prop}` | `--g-ref-shadow-sm-x` |
| Animation | `--g-ref-animation-{type}-{name}` | `--g-ref-animation-duration-20` |

### Semantic/component token examples

| Layer | Example | Old name (before rename) |
|-------|---------|--------------------------|
| Semantic color | `--g-color-content-default` | `--g-theme-color-content-default` |
| Semantic spacing | `--g-spacing-md` | `--g-theme-spacing-md` |
| Semantic typography | `--g-typography-h1-font` | `--g-theme-typography-h1-font` |
| Component focus-ring | `--g-focus-ring-width-default` | `--g-theme-focus-ring-width-default` |
| Component form | `--g-form-color-border-default` | `--g-theme-form-color-border-default` |
| Utility role (500 shade) | `--g-color-utility-success` | *(new)* |
| Background shimmer | `--g-color-background-shimmer` | *(new)* |
| Code font family | `--g-typography-font-family-code` | *(new)* |

### Migration from old tier model

Previously, tokens were organized as `tier-1-definitions`, `tier-2-usage`, and `tier-3-components` under each theme folder. The new model uses `01-ref`, `02-semantic`, and `03-components`. Key changes for consumers:

- **The `--g-theme-*` prefix is removed.** All semantic and component variables now use plain `--g-*`.
- **Direct primitive variables** (old `--g-color-utility-*`, `--g-color-neutral-*`, `--g-typography-*`, `--g-animation-duration-*`) now use the `--g-ref-*` prefix but should not be referenced directly in component CSS.
- **Semantic shorthand variables** (old `--g-typography-h1-font`) now use plain `--g-*` prefix (e.g. `--g-typography-h1-font`).
- **Utility colors** (`--g-color-utility-green-500`) were flattened to `--g-ref-color-green-500` (removing the `.utility.` tier). Prefer `--g-color-utility-success` semantic roles for status-based use.
- **Shadow var** `--g-theme-shadow-*` was corrected to `--g-box-shadow-*` to match generated output and remove the `--g-theme-` prefix.
- The old tier folder names (`tier-1-definitions`, `tier-2-usage`, `tier-3-components`) are no longer valid — all token files live under `01-ref`, `02-semantic`, or `03-components`.

### JS Export changes

The `GTheme*` prefix was removed for JS exports. All tokens now use a consistent `G*` prefix:

| Token type | Old JS export | New JS export |
|------------|---------------|---------------|
| Ref color | `GRefColorNeutral500` | `GRefColorNeutral500` (unchanged) |
| Semantic content | `GThemeColorContentDefault` | `GColorContentDefault` |
| Component focus-ring | `GThemeFocusRingWidthDefault` | `GFocusRingWidthDefault` |

## Exports

```javascript
// Theme tokens (CSS variables)
import '@grantcodes/style-dictionary/grantcodes/css';
import '@grantcodes/style-dictionary/todomap/css';
import '@grantcodes/style-dictionary/wireframe/css';

// Theme with component tokens
import '@grantcodes/style-dictionary/grantcodes/css/theme';

// JavaScript ref tokens
import { GRefColorNeutral100 } from '@grantcodes/style-dictionary/grantcodes/js';

// Fonts
import '@grantcodes/style-dictionary/assets/fonts/greycliff';
import '@grantcodes/style-dictionary/assets/fonts/quicksand';
```

## Adding New Tokens

1. Choose the appropriate theme folder
2. Add token to the correct layer (`01-ref`, `02-semantic`, or `03-components`)
3. Rebuild with `pnpm build`

## Building

```bash
# Build all themes
pnpm build

# Build single theme
pnpm build -- --theme=grantcodes
```
