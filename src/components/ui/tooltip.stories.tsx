import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './button'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from './tooltip'

const meta = {
  title: 'UI/Tooltip',
  component: TooltipContent,
  parameters: { layout: 'centered' },
  args: { side: 'top', sideOffset: 4 },
  argTypes: {
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
  },
  render: (args) => (
    <TooltipProvider delay={200}>
      <Tooltip>
        <TooltipTrigger render={<Button variant='outline' />}>
          Hover or focus me
        </TooltipTrigger>
        <TooltipContent {...args}>
          Preview your story before publishing.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta<typeof TooltipContent>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Right: Story = { args: { side: 'right' } }
