# dropdown-menu

2026-10-01, engine, migrated while preserving the customized legacy new-york styling.

## Changed

`src/components/ui/dropdown-menu.tsx:2` uses Menu parts, a Positioner and Popup, separate radio/checkbox indicators, GroupLabel, SubmenuRoot, and SubmenuTrigger. SubContent composes Content with documented submenu defaults. `src/components/theme-switch.tsx` uses render and puts Appearance inside its radio group.

The stock origin was fetched using the exact new-york style for classification only; all local wrappers differ from stock, so no registry overwrite or cross-style merge was used. `package.json`, `package-lock.json`, and `pnpm-lock.yaml` install @base-ui/react and remove direct Radix dependencies after the final wrapper. All app consumers were swept for asChild, old focus props, and old CSS variables. The component leftover scan (`grep -n "radix-ui\|@radix-ui"`) and the source-wide scan are clean. Build/typecheck and lint pass; `tests/sidebar-focus.mjs` and `tests/ui-migration.mjs` verify actual interaction behavior. Clean-tree and component commits were explicitly waived by the user; no commits were made.

## Left alone

`components.json:3` remains new-york to preserve the existing appearance. This legacy style has no matching Base variant; future shadcn add commands will still deliver Radix components unless you explicitly use Base registry URLs or choose a new Base style. Card, input, skeleton, and native table wrappers are unrelated and unchanged. No cmdk, vaul, sonner, input-otp, calendar, or chart wrappers are installed or touched. Existing unrelated staged, unstaged, and untracked changes were preserved.

## Behavior changes

Checkbox and radio items no longer close the menu on selection by default. The theme menu intentionally keeps the Base UI default; dismiss with Escape or outside click. Highlight styling now follows data-highlighted.

## Verify by hand

Open Change theme, use arrows and typeahead to select Light/Dark/System, confirm the theme changes and its indicator updates. Escape must restore focus to Change theme. Check alignment near the screen edge.
