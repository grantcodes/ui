# @grantcodes/style-dictionary

Design tokens and theming system for the UI packages. Built with Style Dictionary.

## Themes

Three themes are available:

- **grantcodes** - Default theme with Greycliff font
- **todomap** - Theme with Quicksand font
- **wireframe** - Minimal theme with system fonts

## Token Structure

Tokens are organized in tiers:

```
tokens/
├── core/                    # Shared tokens (z-index)
├── grantcodes/              # Grantcodes theme
│   ├── tier-1-definitions/  # Base tokens (colors, typography, etc.)
│   ├── tier-2-usage/        # Usage tokens (component-level)
│   └── tier-3-components/   # Component-specific tokens
├── todomap/                 # Todomap theme
└── wireframe/               # Wireframe theme
```

### Tier System

- **Tier 1** - Primitive/base tokens (colors, spacing, typography)
- **Tier 2** - Usage tokens (semantic, component-level)
- **Tier 3** - Component-specific tokens

## Exports

```javascript
// Theme tokens (CSS variables)
import '@grantcodes/style-dictionary/grantcodes/css';
import '@grantcodes/style-dictionary/todomap/css';
import '@grantcodes/style-dictionary/wireframe/css';

// Theme with component tokens
import '@grantcodes/style-dictionary/grantcodes/css/theme';

// JavaScript tokens
import { GColorNeutral100 } from '@grantcodes/style-dictionary/grantcodes/js';

// Fonts
import '@grantcodes/style-dictionary/assets/fonts/greycliff';
import '@grantcodes/style-dictionary/assets/fonts/quicksand';
```

## Adding New Tokens

1. Choose the appropriate theme folder
2. Add token to the correct tier (1, 2, or 3)
3. Rebuild with `pnpm build`

## Building

```bash
# Build all themes
pnpm build

# Build single theme
pnpm build -- --theme=grantcodes
```
