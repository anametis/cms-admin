import { createRootRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'

function RootLayout() {
  const isLoading = useRouterState({ select: (state) => state.status === 'pending' })
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" className="brand" aria-label="Folio home"><span className="brand-mark">f<span>.</span></span><span>folio<span className="brand-dot">.</span></span></Link>
        <div className="workspace"><span className="workspace-avatar">F</span><span><strong>Folio Studio</strong><small>Free workspace</small></span><span className="workspace-chevron">⌄</span></div>
        <nav className="side-nav" aria-label="Main navigation">
          <div className="nav-heading">Workspace</div>
          <Link to="/" activeOptions={{ exact: true }} className="nav-link" activeProps={{ className: 'nav-link active' }}><span className="nav-icon">▦</span>Overview</Link>
          <Link to="/posts" search={{ q: '', status: 'all', sort: 'newest' }} className="nav-link" activeProps={{ className: 'nav-link active' }}><span className="nav-icon">▤</span>Content <span className="nav-count">07</span></Link>
        </nav>
        <div className="sidebar-bottom"><div className="help-card"><span className="help-icon">✳</span><strong>Your creative space.</strong><p>Great stories start here. Keep making things worth reading.</p></div><div className="profile"><span className="profile-avatar">OC</span><span><strong>Olivia Chen</strong><small>Administrator</small></span><span className="profile-menu">⋯</span></div></div>
      </aside>
      <div className="app-main">
        <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><span className="crumb-divider">/</span><strong>Folio Studio</strong></div><div className="top-actions"><span className="today">Editorial workspace</span><span className="top-avatar" aria-label="Olivia Chen">OC</span></div></header>
        <main id="main-content" aria-busy={isLoading}><Outlet /></main>
      </div>
    </div>
  )
}

function ErrorScreen({ error, reset }: { error: unknown; reset: () => void }) {
  return <div className="boundary"><span className="boundary-icon">!</span><h1>Something went wrong</h1><p>{error instanceof Error ? error.message : "Please try again."}</p><button className="button button-primary" onClick={reset}>Try again</button><Link to="/" className="text-link">Back to overview</Link></div>
}

export const Route = createRootRoute({
  component: RootLayout,
  pendingComponent: () => <div className="page pending" role="status">Loading your workspace…</div>,
  errorComponent: ErrorScreen,
  notFoundComponent: () => <div className="boundary"><h1>Page not found</h1><p>There’s nothing at this address.</p><Link to="/" className="button button-primary">Back to overview</Link></div>,
})
