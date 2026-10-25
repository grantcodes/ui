# @grantcodes/ui Monorepo

Monorepo for grantcodes UI packages and tools.

## Packages

- [`packages/ui`](./packages/ui) - Web components library built with Lit
- [`packages/style-dictionary`](./packages/style-dictionary) - Design tokens and style dictionary

## Getting Started

This monorepo uses [pnpm workspaces](https://pnpm.io/workspaces) and [Turborepo](https://turbo.build/) for package management and build orchestration.

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
pnpm install
```

### Development

Run development servers for all packages:

```bash
pnpm dev
```

Run a specific package:

```bash
pnpm --filter @grantcodes/ui dev
pnpm --filter @grantcodes/style-dictionary build
```

### Building

Build all packages:

```bash
pnpm build
```

### Testing

Run tests for all packages:

```bash
pnpm test
```

### Linting

Lint all packages:

```bash
pnpm lint
```

## Agent skills

The consumer-facing `grantcodes-design-system` skill lives in [`skills/grantcodes-design-system`](./skills/grantcodes-design-system). It covers tokens, themes, UI components, React wrappers, and Astro blocks. Install it with:

```bash
npx skills add grantcodes/ui --skill grantcodes-design-system
```

Validate bundled skills with `pnpm test:skills` (after a UI build has generated `packages/ui/custom-elements.json`).

## Package Structure

```
packages/
  ├── ui/              # Web components
  └── style-dictionary/ # Design tokens
skills/                # Consumer agent skills
```

## License

MIT


