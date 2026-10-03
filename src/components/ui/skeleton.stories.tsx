import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './skeleton'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  args: { className: 'h-5 w-64' },
} satisfies Meta<typeof Skeleton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const StoryPreview: Story = {
  render: () => (
    <output className='flex max-w-sm items-center gap-4'>
      <span className='sr-only'>Loading story</span>
      <Skeleton className='size-12 rounded-lg' />
      <div className='flex flex-1 flex-col gap-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-3 w-2/3' />
      </div>
    </output>
  ),
}
