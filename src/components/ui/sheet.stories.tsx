import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from './sheet'

const meta = {
  title: 'UI/Sheet',
  component: SheetContent,
  args: { side: 'right' },
  argTypes: {
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
  },
  render: (args) => (
    <Sheet>
      <SheetTrigger render={<Button variant='outline' />}>
        Open editorial notes
      </SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>Editorial notes</SheetTitle>
          <SheetDescription>
            Review the draft before sharing it.
          </SheetDescription>
        </SheetHeader>
        <p className='px-4 text-sm'>
          Make the introduction concise and double check the sources.
        </p>
        <SheetFooter>
          <SheetClose render={<Button />}>Done</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
} satisfies Meta<typeof SheetContent>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Left: Story = { args: { side: 'left' } }
