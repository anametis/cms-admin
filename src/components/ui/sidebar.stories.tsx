import type { Meta, StoryObj } from '@storybook/react-vite'
import { Files, LayoutDashboard } from 'lucide-react'
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from './sidebar'

const meta = {
  title: 'UI/Sidebar',
  component: Sidebar,
  args: { collapsible: 'icon' },
  argTypes: {
    collapsible: { control: 'select', options: ['icon', 'offcanvas', 'none'] },
  },
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, height: '500px' } },
  },
  render: (args) => (
    <SidebarProvider>
      <Sidebar {...args}>
        <SidebarHeader className='p-4'>
          <span className='font-heading text-xl font-semibold group-data-[collapsible=icon]:hidden'>
            Folio Studio
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive
                    tooltip='Overview'
                    render={<a href='#overview' aria-label='Overview' />}
                    nativeButton={false}
                  >
                    <LayoutDashboard aria-hidden='true' />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip='Content'
                    render={<a href='#content' aria-label='Content' />}
                    nativeButton={false}
                  >
                    <Files aria-hidden='true' />
                    <span>Content</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className='px-2 text-xs group-data-[collapsible=icon]:hidden'>
            Sample workspace
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className='flex items-center gap-3 border-b p-4'>
          <SidebarTrigger />
          <h1 className='text-xl font-semibold'>Component workspace</h1>
        </header>
        <main className='flex flex-col gap-4 p-6'>
          <section id='overview'>
            <h2>Overview</h2>
            <p>Toggle the sidebar or try a mobile viewport.</p>
          </section>
          <section id='content'>
            <h2>Content</h2>
            <p>These links stay inside the preview, without the CMS router.</p>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  ),
} satisfies Meta<typeof Sidebar>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
