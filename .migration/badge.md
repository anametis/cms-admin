# badge

2026-10-01, engine, migrated while preserving the customized legacy new-york styling.

## Changed

`src/components/ui/badge.tsx:2` replaces Slot with useRender and mergeProps, retaining badgeVariants and the span default.

The stock origin was fetched using the exact new-york style for classification only; all local wrappers differ from stock, so no registry overwrite or cross-style merge was used. `package.json`, `package-lock.json`, and `pnpm-lock.yaml` install @base-ui/react and remove direct Radix dependencies after the final wrapper. All app consumers were swept for asChild, old focus props, and old CSS variables. The component leftover scan (`grep -n "radix-ui\|@radix-ui"`) and the source-wide scan are clean. Build/typecheck and lint pass; `tests/sidebar-focus.mjs` and `tests/ui-migration.mjs` verify actual interaction behavior. Clean-tree and component commits were explicitly waived by the user; no commits were made.

## Left alone

`components.json:3` remains new-york to preserve the existing appearance. This legacy style has no matching Base variant; future shadcn add commands will still deliver Radix components unless you explicitly use Base registry URLs or choose a new Base style. Card, input, skeleton, and native table wrappers are unrelated and unchanged. No cmdk, vaul, sonner, input-otp, calendar, or chart wrappers are installed or touched. Existing unrelated staged, unstaged, and untracked changes were preserved.

## Behavior changes

The composition API is render rather than asChild; no existing badge consumer used asChild.

## Verify by hand

Check each story status pill and the Sample workspace badge in light and dark themes.
