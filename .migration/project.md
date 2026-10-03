# Project migration

2026-10-01. Whole-project migration using the transformation engine for customized legacy new-york wrappers. No commits made, as requested.

## Dependency swap

Installed @base-ui/react 1.8.0 alongside Radix, then removed all five direct @radix-ui packages after migrating every wrapper. npm is the documented package manager; npm installs explicitly include development dependencies in this environment. Both package-lock.json and pnpm-lock.yaml were synchronized, as required by README.md.

## App sweep

Migrated button, badge, separator, sheet, tooltip, dropdown-menu, and sidebar. All linked button/sidebar consumers and the theme menu now use render. Positioner props are explicitly forwarded. Customized mobile focus restoration is retained using initialFocus/finalFocus. There are no Radix imports, old CSS variables, asChild, or old focus props in src. Existing unrelated work was preserved.

## Configuration warning

components.json intentionally remains new-york. There is no base-new-york counterpart, and changing styles would restyle the app. Future shadcn add commands will still target Radix; add Base variants explicitly or choose a new Base style deliberately. This is flagged, not silently fixed.

## Verification

Baseline build/typecheck and both existing unit tests passed before dependency changes. Migration build/typecheck and lint pass. Real browser checks pass for mobile focus restoration, keyboard theme selection, radio menu staying open by default, Escape focus return, collapsed sidebar tooltip positioning, linked navigation, and absence of nested buttons. Added tests/ui-migration.mjs as a runnable regression check; run it with a running app URL.

## Remaining

0 wrappers remain on Radix. The requested TanStack Table v9 integration is complete in `src/components/post-table.tsx`, with typed columns, core features only, and the existing URL filtering/sorting preserved. Final `npm run check` and `npm run build` pass. All three browser regressions pass against production assets, including table row updates, empty-state recovery, details navigation, and responsive cells.
