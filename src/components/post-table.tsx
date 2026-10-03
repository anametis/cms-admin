import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { tableFeatures, useTable, type ColumnDef } from '@tanstack/react-table'
import { FileText } from 'lucide-react'
import type { posts, Status } from '@/content'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Post = (typeof posts)[number]

const statuses = {
  published: {
    label: 'Published',
    className: 'bg-status-published-bg text-status-published',
  },
  review: {
    label: 'In review',
    className: 'bg-status-review-bg text-status-review',
  },
  draft: { label: 'Draft', className: 'bg-status-draft-bg text-status-draft' },
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge variant='secondary' className={statuses[status].className}>
      <span className='size-1.5 rounded-full bg-current' aria-hidden='true' />
      {statuses[status].label}
    </Badge>
  )
}

const features = tableFeatures({})
const columns: ColumnDef<typeof features, Post>[] = [
  {
    accessorKey: 'title',
    header: 'Story',
    cell: ({ row: { original: post } }) => (
      <div className='flex items-center gap-3'>
        <span className='hidden size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground lg:flex'>
          <FileText className='size-4' aria-hidden='true' />
        </span>
        <div>
          <Link
            to='/posts/$postId'
            params={{ postId: post.id }}
            className='inline-block rounded-sm py-1 font-medium hover:text-primary hover:underline'
          >
            {post.title}
          </Link>
          <p className='mt-1 text-xs leading-relaxed text-muted-foreground'>
            {post.category} <span aria-hidden='true'>·</span> {post.author}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: 'date',
    header: 'Last updated',
    cell: ({ row }) => (
      <time dateTime={row.original.date}>
        {new Date(`${row.original.date}T12:00:00`).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </time>
    ),
  },
]

const columnClasses: Record<string, string> = {
  title: 'px-5',
  status: 'px-4',
  date: 'hidden px-5 sm:table-cell',
}

export function PostTable({
  items,
  caption,
}: {
  items: ReadonlyArray<Post>
  caption: string
}) {
  const data = useMemo(() => [...items], [items])
  const table = useTable({
    features,
    data,
    columns,
    getRowId: (post) => String(post.id),
  })

  // URL loaders still own filtering and sorting; both overview and content use this row model.
  return (
    <Table>
      <TableCaption className='sr-only'>{caption}</TableCaption>
      <TableHeader className='bg-muted/40'>
        {table.getHeaderGroups().map((group) => (
          <TableRow key={group.id}>
            {group.headers.map((header) => (
              <TableHead
                key={header.id}
                scope='col'
                colSpan={header.colSpan}
                className={cn(
                  'text-muted-foreground',
                  columnClasses[header.column.id]
                )}
              >
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getAllCells().map((cell) => (
              <TableCell
                key={cell.id}
                className={cn(
                  columnClasses[cell.column.id],
                  cell.column.id === 'title' && 'py-4 whitespace-normal',
                  cell.column.id === 'date' && 'text-xs text-muted-foreground'
                )}
              >
                <table.FlexRender cell={cell} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
