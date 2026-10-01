# Folio Studio

A small editorial workspace built with React, Vite, and TanStack Router.

```sh
npm ci
npm run dev
npm test
npm run build
```

Routes are defined in `src/routes/`. The TanStack Vite plugin generates `src/routeTree.gen.ts` and splits route components into separate chunks. The content list keeps its search, status, and sort state in the URL; story IDs are parsed as numbers. Loaders read the sample stories in `src/content.ts` (there is no backend). Links preload on intent, and slow or failed loads render pending/error screens.
