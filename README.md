# Portfolio

A TanStack Start portfolio with static prerendering and local TypeScript-backed content.

## Prerequisites

- Node.js 22.12+
- pnpm 11+

## Development

```bash
pnpm install
pnpm dev
```

Content lives in `src/config/` and domain types live in `src/types/`.

Required public env vars:

```bash
VITE_CONTACT_EMAIL="you@example.com"
VITE_SITE_URL="https://your-domain.com"
```

## Build

```bash
pnpm build
pnpm preview
```

`pnpm build` prerenders the static routes discovered by TanStack Start.

## Quality

Vite+ provides the project tooling, including Oxlint, Oxfmt, and type-aware
TypeScript checks:

```bash
pnpm check
pnpm lint
pnpm format:check
pnpm typecheck
```

The pre-commit hook runs the relevant Vite+ checks on staged files.
