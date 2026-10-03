# Folio Studio design

Source: existing Folio UI, adapted with [shadcn-admin](https://github.com/satnaing/shadcn-admin).

## Character

A quiet editorial desk, with a navy navigation column and indigo actions. Keep the existing Folio identity rather than the template's sales dashboard. DM Sans carries interface text, Outfit carries headings. Fonts are bundled locally.

## Build mandate

Use the template's collapsible sidebar, mobile sheet, compact header, and shadcn cards. Overview shows counts from the story library, the review queue, and recent stories. Content has URL backed filters above a semantic table. Story details remain a read only preview. Every visible action works, no pretend publishing, analytics, authentication, or settings.

## Component and usage rules

Tokens live only in `src/index.css`, including light and dark themes and labelled status colors. Shared shadcn primitives live in `src/components/ui/`. Use Base UI for menus and overlays, native controls for the two option sort selector, and TanStack links for navigation. Shared story rows and status badges live in `src/components/post-table.tsx`.

## Responsive behavior

Below 768px, navigation opens as a dismissible sheet and closes after navigation. The overview stacks, table titles wrap, and dates hide on small screens. Keep icon controls named, touch targets comfortable, keyboard focus visible, and reduced motion respected. Include loading, error, missing page, and empty search states.
