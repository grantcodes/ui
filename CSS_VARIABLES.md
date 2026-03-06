# CSS Variables Reference

Complete reference for all CSS custom properties available in @grantcodes/ui for theming and customization.

## Table of Contents

- [Global Variables](#global-variables)
  - [Colors](#colors)
  - [Typography](#typography)
  - [Spacing](#spacing)
  - [Layout](#layout)
  - [Borders](#borders)
  - [Focus](#focus)
- [Component Variables](#component-variables)

---

## Global Variables

Global variables are defined at the `:root` level and affect multiple components throughout the library.

### Colors

Base color palette using a numeric scale (50-900):

```css
:root {
  /* Primary Colors */
  --color-base-primary-50: #f5f3ff;
  --color-base-primary-100: #ede9fe;
  --color-base-primary-200: #ddd6fe;
  --color-base-primary-300: #c4b5fd;
  --color-base-primary-400: #a78bfa;
  --color-base-primary-500: #8b5cf6;
  --color-base-primary-600: #7c3aed;
  --color-base-primary-700: #6d28d9;
  --color-base-primary-800: #5b21b6;
  --color-base-primary-900: #4c1d95;

  /* Background Colors */
  --color-base-background-main: #ffffff;
  --color-base-background-alt: #f9fafb;

  /* Text Colors */
  --color-base-text-primary: #111827;
  --color-base-text-secondary: #6b7280;

  /* State Colors */
  --color-state-success: #10b981;
  --color-state-warning: #f59e0b;
  --color-state-error: #ef4444;
  --color-state-info: #3b82f6;
}
```

### Typography

Font families and sizes:

```css
:root {
  /* Font Families */
  --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-serif: Georgia, Cambria, 'Times New Roman', Times, serif;
  --font-family-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;

  /* Font Sizes */
  --font-size-xs: 0.75rem;       /* 12px */
  --font-size-small: 0.875rem;   /* 14px */
  --font-size-normal: 1rem;      /* 16px */
  --font-size-large: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;       /* 20px */
  --font-size-2xl: 1.5rem;       /* 24px */
  --font-size-3xl: 1.875rem;     /* 30px */
  --font-size-4xl: 2.25rem;      /* 36px */

  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
}
```

### Spacing

Spacing scale based on a base unit:

```css
:root {
  /* Base Unit */
  --size-space-unit: 1rem; /* 16px */

  /* Spacing Scale */
  --size-space-xs: calc(var(--size-space-unit) * 0.25);   /* 4px */
  --size-space-sm: calc(var(--size-space-unit) * 0.5);    /* 8px */
  --size-space-md: var(--size-space-unit);                /* 16px */
  --size-space-lg: calc(var(--size-space-unit) * 1.5);    /* 24px */
  --size-space-xl: calc(var(--size-space-unit) * 2);      /* 32px */
  --size-space-2xl: calc(var(--size-space-unit) * 3);     /* 48px */
  --size-space-3xl: calc(var(--size-space-unit) * 4);     /* 64px */
}
```

### Layout

Container widths and breakpoints:

```css
:root {
  /* Container Widths */
  --size-block-width-narrow: 600px;
  --size-block-width-normal: 800px;
  --size-block-width-wide: 1400px;
  --size-block-width-full: 100%;

  /* Breakpoints (for reference, use container queries in components) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### Borders

Border widths, radii, and styles:

```css
:root {
  /* Border Widths */
  --size-border-width-thin: 1px;
  --size-border-width-medium: 2px;
  --size-border-width-thick: 4px;

  /* Border Radius */
  --size-border-radius: 0.5rem;      /* 8px */
  --size-border-radius-sm: 0.25rem;  /* 4px */
  --size-border-radius-lg: 0.75rem;  /* 12px */
  --size-border-radius-full: 9999px;

  /* Border Colors */
  --color-border-default: #e5e7eb;
  --color-border-strong: #d1d5db;
}
```

### Focus

Focus ring styles for accessibility:

```css
:root {
  /* Focus Ring */
  --component-focus-ring-color: rgba(106, 91, 197, 0.4);
  --component-focus-ring-width: 2px;
  --component-focus-ring-offset: 2px;
  --component-focus-ring-style: solid;
}
```

---

## Component Variables

Component-specific CSS custom properties for fine-grained control.

### Avatar

```css
grantcodes-avatar {
  --component-avatar-size: 2.5rem;
  --component-avatar-border-radius: 50%;
  --component-avatar-background: var(--color-base-primary-100);
}
```

### Badge

```css
grantcodes-badge {
  --component-badge-background: var(--color-base-primary-100);
  --component-badge-color: var(--color-base-primary-800);
  --component-badge-padding: 0.25rem 0.75rem;
  --component-badge-font-size: var(--font-size-small);
  --component-badge-border-radius: var(--size-border-radius);
}
```

### Breadcrumb

```css
grantcodes-breadcrumb {
  --component-breadcrumb-separator: '/';
  --component-breadcrumb-separator-color: var(--color-base-primary-400);
  --component-breadcrumb-link-color: var(--color-base-primary-600);
  --component-breadcrumb-current-color: var(--color-base-primary-900);
}
```

### Button

```css
grantcodes-button {
  /* Base Button */
  --component-button-base-background: var(--color-base-primary-600);
  --component-button-base-color: white;
  --component-button-base-padding: 0.75rem 1.5rem;
  --component-button-base-border-radius: var(--size-border-radius);
  --component-button-base-font-size: var(--font-size-normal);
  --component-button-base-font-weight: var(--font-weight-medium);
  
  /* Hover State */
  --component-button-hover-background: var(--color-base-primary-700);
  
  /* Active State */
  --component-button-active-background: var(--color-base-primary-800);
  
  /* Disabled State */
  --component-button-disabled-opacity: 0.5;
}
```

### Card

```css
grantcodes-card {
  --component-card-background: white;
  --component-card-border: 1px solid var(--color-border-default);
  --component-card-border-radius: var(--size-border-radius-lg);
  --component-card-padding: 1.5rem;
  --component-card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  /* Header */
  --component-card-header-padding: 1.5rem;
  --component-card-header-border-bottom: 1px solid var(--color-border-default);
  
  /* Footer */
  --component-card-footer-padding: 1rem 1.5rem;
  --component-card-footer-background: var(--color-base-background-alt);
}
```

### Dialog

```css
grantcodes-dialog {
  --component-dialog-background: white;
  --component-dialog-max-width: 32rem;
  --component-dialog-padding: 1.5rem;
  --component-dialog-border-radius: var(--size-border-radius-lg);
  --component-dialog-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Backdrop */
  --component-dialog-backdrop-color: rgba(0, 0, 0, 0.5);
}
```

### Dropdown

```css
grantcodes-dropdown {
  --component-dropdown-background: white;
  --component-dropdown-border: 1px solid var(--color-border-default);
  --component-dropdown-border-radius: var(--size-border-radius);
  --component-dropdown-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --component-dropdown-min-width: 12rem;
  
  /* Items */
  --component-dropdown-item-padding: 0.5rem 1rem;
  --component-dropdown-item-hover-background: var(--color-base-primary-100);
}
```

### Form Field

```css
grantcodes-form-field {
  --component-form-field-label-color: var(--color-base-text-primary);
  --component-form-field-label-font-weight: var(--font-weight-medium);
  --component-form-field-help-color: var(--color-base-text-secondary);
  --component-form-field-help-font-size: var(--font-size-small);
  --component-form-field-error-color: var(--color-state-error);
  --component-form-field-spacing: 0.5rem;
}
```

### Notice

```css
grantcodes-notice {
  --component-notice-padding: 1rem;
  --component-notice-border-radius: var(--size-border-radius);
  --component-notice-border-width: 1px;
  
  /* Info Variant */
  --component-notice-info-background: #eff6ff;
  --component-notice-info-border-color: #3b82f6;
  --component-notice-info-color: #1e40af;
  
  /* Success Variant */
  --component-notice-success-background: #f0fdf4;
  --component-notice-success-border-color: #10b981;
  --component-notice-success-color: #065f46;
  
  /* Warning Variant */
  --component-notice-warning-background: #fffbeb;
  --component-notice-warning-border-color: #f59e0b;
  --component-notice-warning-color: #92400e;
  
  /* Error Variant */
  --component-notice-error-background: #fef2f2;
  --component-notice-error-border-color: #ef4444;
  --component-notice-error-color: #991b1b;
}
```

### Tabs

```css
grantcodes-tabs {
  --component-tabs-border-color: var(--color-border-default);
  
  /* Tab */
  --component-tabs-tab-padding: 0.75rem 1.5rem;
  --component-tabs-tab-color: var(--color-base-text-secondary);
  --component-tabs-tab-hover-color: var(--color-base-text-primary);
  
  /* Active Tab */
  --component-tabs-tab-active-color: var(--color-base-primary-600);
  --component-tabs-tab-active-border-color: var(--color-base-primary-600);
  --component-tabs-tab-active-border-width: 2px;
  
  /* Panel */
  --component-tabs-panel-padding: 1.5rem 0;
}
```

### Toast

```css
grantcodes-toast {
  --component-toast-background: white;
  --component-toast-border-radius: var(--size-border-radius);
  --component-toast-padding: 1rem 1.5rem;
  --component-toast-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --component-toast-max-width: 24rem;
  --component-toast-margin: 1rem;
}
```

### Tooltip

```css
grantcodes-tooltip {
  --component-tooltip-background: var(--color-base-primary-900);
  --component-tooltip-color: white;
  --component-tooltip-padding: 0.5rem 0.75rem;
  --component-tooltip-font-size: var(--font-size-small);
  --component-tooltip-border-radius: var(--size-border-radius-sm);
  --component-tooltip-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --component-tooltip-max-width: 16rem;
}
```

### App Bar

```css
grantcodes-app-bar {
  --component-app-bar-background: white;
  --component-app-bar-border-bottom: 1px solid var(--color-border-default);
  --component-app-bar-padding: 1rem;
  --component-app-bar-height: auto;
  --component-app-bar-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
```

### Footer

```css
grantcodes-footer {
  --component-footer-background: white;
  --component-footer-border-top: 1px solid var(--color-border-default);
  --component-footer-padding: 3rem 1rem 2rem;
  --component-footer-text-color: var(--color-base-text-secondary);
}
```

### Sidebar

```css
grantcodes-sidebar {
  --component-sidebar-width: 280px;
  --component-sidebar-background: white;
  --component-sidebar-border: 1px solid var(--color-border-default);
  --component-sidebar-collapsed-width: 60px;
  
  /* Mobile Drawer */
  --component-sidebar-overlay-background: rgba(0, 0, 0, 0.5);
}
```

---

## Usage Examples

### Creating a Dark Theme

```css
/* Dark theme overrides */
[data-theme="dark"] {
  /* Colors */
  --color-base-background-main: #111827;
  --color-base-background-alt: #1f2937;
  --color-base-text-primary: #f9fafb;
  --color-base-text-secondary: #d1d5db;
  --color-border-default: #374151;
  
  /* Component overrides */
  --component-card-background: #1f2937;
  --component-dialog-background: #1f2937;
  --component-dropdown-background: #1f2937;
}
```

### Per-Component Customization

```css
/* Blue primary buttons, green secondary buttons */
grantcodes-button[variant="primary"] {
  --component-button-base-background: #3b82f6;
  --component-button-hover-background: #2563eb;
}

grantcodes-button[variant="secondary"] {
  --component-button-base-background: #10b981;
  --component-button-hover-background: #059669;
}
```

### Contextual Styling

```css
/* Different card styles in different contexts */
.sidebar grantcodes-card {
  --component-card-padding: 1rem;
  --component-card-border-radius: var(--size-border-radius);
}

.hero-section grantcodes-card {
  --component-card-padding: 2rem;
  --component-card-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Responsive Variable Changes

```css
/* Adjust spacing on larger screens */
@media (min-width: 768px) {
  :root {
    --size-space-unit: 1.25rem; /* Increase base spacing */
    --component-card-padding: 2rem;
  }
}
```

---

## Best Practices

1. **Override at the Root** - Set global variables at `:root` for consistency
2. **Component Scoping** - Override component variables on the component itself
3. **Use Semantic Names** - Prefer semantic variables (e.g., `--color-base-primary-600`) over hard-coded values
4. **Maintain Contrast** - Ensure color combinations meet WCAG AA standards (4.5:1 for text)
5. **Test Themes** - Test custom themes across all components
6. **Document Changes** - Document theme customizations for maintainability
7. **Use calc()** - Build spacing scales with `calc()` for consistency
8. **Fallback Values** - Components include fallbacks for all variables

---

## Migration from v1.x

If you're upgrading from v1.x, note these variable name changes:

| Old Variable | New Variable |
|---|---|
| `--primary-color` | `--color-base-primary-600` |
| `--text-color` | `--color-base-text-primary` |
| `--bg-color` | `--color-base-background-main` |
| `--spacing` | `--size-space-unit` |
| `--border-radius` | `--size-border-radius` |

See [CHANGELOG.md](./CHANGELOG.md) for complete migration guide.

