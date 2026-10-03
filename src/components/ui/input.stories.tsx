import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'

const meta = {
  title: 'UI/Input',
  component: Input,
  args: {
    placeholder: 'Story title',
    'aria-label': 'Story title',
    className: 'max-w-sm',
  },
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'A saved draft' },
}
export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: 'Please revise this title' },
}
