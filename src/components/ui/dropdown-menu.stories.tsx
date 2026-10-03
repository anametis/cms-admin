import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from './dropdown-menu'

const meta = {
  title: 'UI/Dropdown Menu',
  component: DropdownMenu,
  render: function MenuExample(args) {
    const [status, setStatus] = useState('draft')
    const [notify, setNotify] = useState(false)
    return (
      <DropdownMenu {...args}>
        <DropdownMenuTrigger render={<Button variant='outline' />}>
          Story actions
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Story</DropdownMenuLabel>
            <DropdownMenuItem onClick={fn()}>View details</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuRadioItem value='draft'>Draft</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='review'>
              In review
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='published'>
              Published
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={notify}
            onCheckedChange={setNotify}
          >
            Notify team
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
} satisfies Meta<typeof DropdownMenu>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
