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

## Retrying a package publish

In GitHub Actions, open **Create Release** → **Run workflow**, select `main`,
and choose `style-dictionary`, `ui`, or `astro`. The workflow runs the existing
checks and publishes only that package at its current version on `main`, with
provenance. It does not create a release or bump versions; use it to recover a
failed publish for a version that is not yet on npm. Runs on other branches are
skipped.

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


