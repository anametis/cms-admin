# sheet

2026-10-01, engine, migrated while preserving the customized legacy new-york styling.

## Changed

`src/components/ui/sheet.tsx:2` uses Dialog Popup and Backdrop with presence transitions. `src/components/ui/sidebar.tsx` maps the customized external opener capture to initialFocus and finalFocus without losing focus restoration.

The stock origin was fetched using the exact new-york style for classification only; all local wrappers differ from stock, so no registry overwrite or cross-style merge was used. `package.json`, `package-lock.json`, and `pnpm-lock.yaml` install @base-ui/react and remove direct Radix dependencies after the final wrapper. All app consumers were swept for asChild, old focus props, and old CSS variables. The component leftover scan (`grep -n "radix-ui\|@radix-ui"`) and the source-wide scan are clean. Build/typecheck and lint pass; `tests/sidebar-focus.mjs` and `tests/ui-migration.mjs` verify actual interaction behavior. Clean-tree and component commits were explicitly waived by the user; no commits were made.

## Left alone

`components.json:3` remains new-york to preserve the existing appearance. This legacy style has no matching Base variant; future shadcn add commands will still deliver Radix components unless you explicitly use Base registry URLs or choose a new Base style. Card, input, skeleton, and native table wrappers are unrelated and unchanged. No cmdk, vaul, sonner, input-otp, calendar, or chart wrappers are installed or touched. Existing unrelated staged, unstaged, and untracked changes were preserved.

## Behavior changes

The sheet uses transition-based presence animations instead of Radix animation utilities. Base UI selects initial focus according to interaction type. Duration is now 300ms for both opening and closing.

## Verify by hand

At a mobile width, open navigation, tab through it, dismiss using Escape and the close button, and confirm focus returns to Toggle Sidebar. Confirm the background is modal and navigation links close the sheet.
