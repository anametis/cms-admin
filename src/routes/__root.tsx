import {
  createRootRoute,
  Link,
  Outlet,
  useRouterState,
} from '@tanstack/react-router'
import { AlertCircle, ChevronRight } from 'lucide-react'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { ThemeSwitch } from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'

function RootLayout() {
  const defaultOpen = !document.cookie
    .split('; ')
    .includes('sidebar_state=false')
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Workspace />
    </SidebarProvider>
  )
}

function Workspace() {
  const isLoading = useRouterState({
    select: (state) => state.status === 'pending',
  })
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const { isMobile, openMobile, open } = useSidebar()
  const page =
    pathname === '/'
      ? 'Overview'
      : pathname === '/posts' || pathname === '/posts/'
        ? 'Content'
        : pathname.startsWith('/posts/')
          ? 'Story details'
          : 'Workspace'

  return (
    <>
      <a
        href='#main-content'
        className='sr-only z-50 rounded-md bg-primary p-3 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4'
      >
        Skip to content
      </a>
      <AppSidebar />
      <SidebarInset className='min-w-0'>
        <header className='sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b bg-card px-4 sm:px-8'>
          <SidebarTrigger
            className='size-11'
            aria-expanded={isMobile ? openMobile : open}
            aria-controls={isMobile ? undefined : 'workspace-navigation'}
          />
          <Separator orientation='vertical' className='h-5' />
          <nav aria-label='Breadcrumb' className='min-w-0 text-sm'>
            <ol className='flex items-center gap-2'>
              <li className='hidden text-muted-foreground sm:block'>
                <Link to='/'>Folio Studio</Link>
              </li>
              <li className='hidden sm:block'>
                <ChevronRight
                  className='size-3 text-muted-foreground'
                  aria-hidden='true'
                />
              </li>
              <li className='truncate font-medium' aria-current='page'>
                {page}
              </li>
            </ol>
          </nav>
          <div className='ml-auto flex shrink-0 items-center gap-2 sm:gap-4'>
            <Badge
              variant='outline'
              className='hidden font-normal text-muted-foreground sm:inline-flex'
            >
              Sample workspace
            </Badge>
            <ThemeSwitch />
            <span
              className='flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground'
              aria-label='Sample administrator Olivia Chen'
            >
              OC
            </span>
          </div>
        </header>
        <main
          id='main-content'
          tabIndex={-1}
          aria-busy={isLoading}
          className='outline-none'
        >
          <Outlet />
        </main>
      </SidebarInset>
    </>
  )
}

function ErrorScreen({ error, reset }: { error: unknown; reset: () => void }) {
  return (
    <div className='boundary' role='alert'>
      <AlertCircle className='size-10 text-destructive' aria-hidden='true' />
      <h1>Something went wrong</h1>
      <p>{error instanceof Error ? error.message : 'Please try again.'}</p>
      <Button onClick={reset} className='min-h-11'>
        Try again
      </Button>
      <Button variant='link' asChild>
        <Link to='/'>Back to overview</Link>
      </Button>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  pendingComponent: () => (
    <output className='page block text-muted-foreground'>
      Loading your workspace…
    </output>
  ),
  errorComponent: ErrorScreen,
  notFoundComponent: () => (
    <div className='boundary'>
      <h1>Page not found</h1>
      <p>There’s nothing at this address.</p>
      <Button asChild className='min-h-11'>
        <Link to='/'>Back to overview</Link>
      </Button>
    </div>
  ),
})
