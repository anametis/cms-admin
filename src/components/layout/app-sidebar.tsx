import { Link, useRouterState } from '@tanstack/react-router'
import { BookOpen, Files, LayoutDashboard, X } from 'lucide-react'
import { posts } from '@/content'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar'

// Adapted from shadcn-admin's app sidebar, with only the existing CMS routes.
export function AppSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const { setOpenMobile } = useSidebar()
  const closeMobile = () => setOpenMobile(false)

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='gap-5 px-3 py-5 group-data-[collapsible=icon]:px-2'>
        <div className='flex items-center justify-between'>
          <Link
            to='/'
            onClick={closeMobile}
            aria-label='Folio home'
            className='flex items-center gap-3 rounded-md'
          >
            <span className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary font-heading text-xl font-semibold text-sidebar-primary-foreground'>
              f.
            </span>
            <span className='font-heading text-2xl font-semibold tracking-tight group-data-[collapsible=icon]:hidden'>
              folio.
            </span>
          </Link>
          <Button
            variant='ghost'
            size='icon'
            className='size-11 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground md:hidden'
            onClick={closeMobile}
            aria-label='Close navigation'
          >
            <X aria-hidden='true' />
          </Button>
        </div>
        <div className='rounded-lg border border-sidebar-border p-3 group-data-[collapsible=icon]:hidden'>
          <p className='text-sm font-semibold'>Folio Studio</p>
          <p className='mt-1 text-xs text-sidebar-foreground/75'>
            Editorial workspace
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <nav id='workspace-navigation' aria-label='Main navigation'>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    nativeButton={false}
                    isActive={pathname === '/'}
                    tooltip='Overview'
                    className='h-11'
                    render={
                      <Link
                        to='/'
                        activeOptions={{ exact: true }}
                        onClick={closeMobile}
                        aria-label='Overview'
                      />
                    }
                  >
                    <LayoutDashboard aria-hidden='true' />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    nativeButton={false}
                    isActive={pathname.startsWith('/posts')}
                    tooltip='Content'
                    className='h-11'
                    render={
                      <Link
                        to='/posts'
                        search={{ q: '', status: 'all', sort: 'newest' }}
                        onClick={closeMobile}
                        aria-label='Content'
                      />
                    }
                  >
                    <Files aria-hidden='true' />
                    <span>Content</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className='top-3'>
                    {posts.length}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </nav>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='gap-4 p-3 group-data-[collapsible=icon]:p-2'>
        <div className='rounded-lg bg-sidebar-accent p-4 group-data-[collapsible=icon]:hidden'>
          <BookOpen
            className='mb-3 size-5 text-sidebar-primary'
            aria-hidden='true'
          />
          <p className='text-sm font-medium'>A home for your stories.</p>
          <p className='mt-2 text-xs leading-relaxed text-sidebar-foreground/80'>
            Explore the sample library. Content editing will need a connected
            backend.
          </p>
        </div>
        <SidebarSeparator className='mx-0' />
        <div className='flex items-center gap-3 px-1 py-2'>
          <span
            className='flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-semibold text-sidebar-primary-foreground'
            aria-hidden='true'
          >
            OC
          </span>
          <div className='group-data-[collapsible=icon]:hidden'>
            <p className='text-sm font-medium'>Olivia Chen</p>
            <p className='text-xs text-sidebar-foreground/75'>
              Sample administrator
            </p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
