import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './separator'

const meta = {
  title: 'UI/Separator',
  component: Separator,
  args: { orientation: 'horizontal' },
  render: (args) => (
    <div className='flex max-w-sm flex-col gap-4'>
      <p>Editorial workspace</p>
      <Separator {...args} />
      <p className='text-sm text-muted-foreground'>Stories worth sharing.</p>
    </div>
  ),
} satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div className='flex h-8 items-center gap-4'>
      <span>Overview</span>
      <Separator {...args} className='h-full' />
      <span>Content</span>
    </div>
  ),
}
