# tooltip

2026-10-01, engine, migrated while preserving the customized legacy new-york styling.

## Changed

`src/components/ui/tooltip.tsx:2` uses Tooltip Portal > Positioner > Popup, forwards all four positioning props, renames delay, and uses a correctly oriented SVG arrow. `src/components/ui/sidebar.tsx` uses delay=0 and render triggers.

The stock origin was fetched using the exact new-york style for classification only; all local wrappers differ from stock, so no registry overwrite or cross-style merge was used. `package.json`, `package-lock.json`, and `pnpm-lock.yaml` install @base-ui/react and remove direct Radix dependencies after the final wrapper. All app consumers were swept for asChild, old focus props, and old CSS variables. The component leftover scan (`grep -n "radix-ui\|@radix-ui"`) and the source-wide scan are clean. Build/typecheck and lint pass; `tests/sidebar-focus.mjs` and `tests/ui-migration.mjs` verify actual interaction behavior. Clean-tree and component commits were explicitly waived by the user; no commits were made.

## Left alone

`components.json:3` remains new-york to preserve the existing appearance. This legacy style has no matching Base variant; future shadcn add commands will still deliver Radix components unless you explicitly use Base registry URLs or choose a new Base style. Card, input, skeleton, and native table wrappers are unrelated and unchanged. No cmdk, vaul, sonner, input-otp, calendar, or chart wrappers are installed or touched. Existing unrelated staged, unstaged, and untracked changes were preserved.

## Behavior changes

The wrapper now defaults to sideOffset=4, matching the Base registry, instead of the previous zero offset. Base UI owns popup accessibility attributes; tests target data-slot rather than assuming role=tooltip. The shared provider no longer gets shadowed by a provider around every root.

## Verify by hand

Collapse desktop navigation and hover or focus both items. Confirm tooltips appear on the right without clipping, their arrows face the trigger, and expanded/mobile navigation does not show them.
