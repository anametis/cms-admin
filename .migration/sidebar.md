# sidebar

2026-10-01, engine, migrated while preserving the customized legacy new-york styling.

## Changed

`src/components/ui/sidebar.tsx:2` replaces all Slot parts with Base UI Button or useRender/mergeProps while preserving all sidebar variants and classes. `src/components/layout/app-sidebar.tsx` composes links with render and nativeButton=false. Mobile sheet focus restoration and tooltip delay/trigger props are migrated.

The stock origin was fetched using the exact new-york style for classification only; all local wrappers differ from stock, so no registry overwrite or cross-style merge was used. `package.json`, `package-lock.json`, and `pnpm-lock.yaml` install @base-ui/react and remove direct Radix dependencies after the final wrapper. All app consumers were swept for asChild, old focus props, and old CSS variables. The component leftover scan (`grep -n "radix-ui\|@radix-ui"`) and the source-wide scan are clean. Build/typecheck and lint pass; `tests/sidebar-focus.mjs` and `tests/ui-migration.mjs` verify actual interaction behavior. Clean-tree and component commits were explicitly waived by the user; no commits were made.

## Left alone

`components.json:3` remains new-york to preserve the existing appearance. This legacy style has no matching Base variant; future shadcn add commands will still deliver Radix components unless you explicitly use Base registry URLs or choose a new Base style. Card, input, skeleton, and native table wrappers are unrelated and unchanged. No cmdk, vaul, sonner, input-otp, calendar, or chart wrappers are installed or touched. Existing unrelated staged, unstaged, and untracked changes were preserved.

## Behavior changes

The component's own expanded/collapsed data-state remains unchanged because it is not a Radix state. Linked menu buttons receive Base UI button semantics while retaining anchors. Tooltip and sheet behavior deltas are described in their component reports.

## Verify by hand

Collapse/expand desktop navigation, hover and focus its tooltips, navigate to Content, and check the active marker. At mobile width, open and dismiss navigation and confirm keyboard focus returns.
