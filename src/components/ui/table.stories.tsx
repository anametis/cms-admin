import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCaption,
} from './table'

const meta = {
  title: 'UI/Table',
  component: Table,
  render: (args) => (
    <Table {...args}>
      <TableCaption>Sample editorial queue</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope='col'>Story</TableHead>
          <TableHead scope='col'>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>The quiet art of getting things done</TableCell>
          <TableCell>Published</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>A guide to more considered living</TableCell>
          <TableCell>Draft</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
} satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
