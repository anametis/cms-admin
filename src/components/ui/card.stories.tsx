import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card'

const meta = {
  title: 'UI/Card',
  component: Card,
  args: { className: 'max-w-sm' },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Editorial notes</CardTitle>
        <CardDescription>A home for your next story.</CardDescription>
      </CardHeader>
      <CardContent>
        Collect ideas, refine your draft, and share it with your team.
      </CardContent>
      <CardFooter className='text-sm text-muted-foreground'>
        Last updated today
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
