# Folio Studio

A small editorial workspace built with React, Vite, and TanStack Router. The existing story library is read only sample data, there is no backend or authentication.

## Run locally

Use Node.js 22.13 or newer (Vite 8 requires Node 22.12 or newer, and the tests use Node's TypeScript stripping).

```sh
npm ci
npm run dev
```

## Checks and formatting

```sh
npm run lint          # Oxlint, including hooks and accessibility rules
npm run lint:fix      # Apply safe lint fixes
npm run format        # Prettier, including Tailwind class sorting
npm run format:check  # Check without changing files
npm run typecheck     # Strict TypeScript checks
npm test             # URL filters, story lookups, and appearance preferences
npm run check        # All checks above, without formatting writes
npm run build        # Generate routes, build production assets, and check types
npm run preview      # Serve the production build
```

The optional mobile focus regression uses the `agent-browser` CLI (install it with `npm install -g agent-browser` and `agent-browser install`). With the app running on port 5173, run `npm run test:browser`. For another URL, run `npm run test:browser -- http://127.0.0.1:4173`. This check is separate from `npm run check` so normal checks do not require a browser.

Oxlint is retained instead of adding a second linter. The refresh rule is excluded only for TanStack route modules and the shadcn sidebar's shared hook. Generated routes, build output, agent state, and lockfiles are excluded from formatting.

Both existing lockfiles are maintained. `npm ci` is the documented installation path. If you use pnpm, use `pnpm install --frozen-lockfile`; keep both lockfiles current when changing dependencies.

## shadcn/ui

Tailwind CSS 4 is configured through its Vite plugin. `components.json` configures the New York style, Radix components, Lucide icons, CSS variables, and the `@/` alias. Vite and TypeScript resolve that alias to `src/`.

```sh
npx shadcn@latest add textarea
```

Components live in `src/components/ui/` and are owned by this project. Tokens for light and dark themes live in `src/index.css`. Folio's DM Sans and Outfit fonts are bundled locally, so the dashboard makes no Google Fonts requests. The appearance menu offers light, dark, or the system preference and remembers the selection when browser storage is available. The responsive sidebar supports a mobile sheet and Ctrl/Cmd+B; its desktop state is remembered in a cookie.

## Design system linting

[`@shadcn/lint`](https://github.com/shadcn-ui/lint) is registered with the existing Oxlint configuration in `.oxlintrc.json`. Run `npm run lint`, or `npm run check` to include the other project checks. No separate linter or command is needed.

Following the official setup, no new design system rules are enabled automatically, and existing lint policies are preserved. To enable enforcement, add `shadcn/*` entries to the existing `rules` object in `.oxlintrc.json`. `components.json` supplies component discovery and the Tailwind theme at `src/index.css`, so no extra discovery settings are needed.

See the [available rules](https://github.com/shadcn-ui/lint#rules) and [configuration examples](https://github.com/shadcn-ui/lint/blob/main/docs/design-systems.md) before choosing policies such as `shadcn/no-raw-colors` or `shadcn/no-arbitrary-values`.

## Existing CMS behavior

Routes live in `src/routes/`. The TanStack Vite plugin generates `src/routeTree.gen.ts` and splits route components into separate chunks. Do not edit the generated tree by hand.

The overview derives its counts and review queue from `src/content.ts`. The content list keeps search, status, and sort state in the URL. Story IDs are parsed as positive safe integers. Loaders read sample stories, links preload on intent, and pending, error, missing page, and empty search states are handled. Search matches titles, authors, and categories. No new backend, editing controls, fake metrics, or template demo modules are included.

## Template attribution

The UI primitives and responsive sidebar/dashboard composition are adapted from [satnaing/shadcn-admin](https://github.com/satnaing/shadcn-admin), revision `e16c87f213a5ba5e45964e9b67c792105ec74d26`, under the MIT license in `SHADCN-ADMIN-LICENSE`. The Folio routes, data, brand, and existing behavior are preserved. Layout configuration contexts, scroll listeners, demo charts, and unrelated authentication and state dependencies were not carried over. Folio's design direction is recorded in `design.md`.
