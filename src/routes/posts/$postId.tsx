import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, BookOpen } from 'lucide-react'
import { getPost } from '@/content'
import { StatusBadge } from '@/components/post-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export const Route = createFileRoute('/posts/$postId')({
  params: {
    parse: ({ postId }) => {
      const id = Number(postId)
      if (!Number.isSafeInteger(id) || id < 1)
        throw new Error('Invalid story ID.')
      return { postId: id }
    },
    stringify: ({ postId }) => ({ postId: String(postId) }),
  },
  loader: ({ params }) => getPost(params.postId),
  pendingComponent: () => (
    <output className='page block text-muted-foreground'>Opening story…</output>
  ),
  component: StoryDetail,
})

function StoryDetail() {
  const post = Route.useLoaderData()
  return (
    <div className='page'>
      <Button
        variant='ghost'
        nativeButton={false}
        className='-ml-3 min-h-11'
        render={
          <Link to='/posts' search={{ q: '', status: 'all', sort: 'newest' }} />
        }
      >
        <ArrowLeft aria-hidden='true' />
        All content
      </Button>
      <div className='max-w-3xl space-y-4'>
        <div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
          <span>Story #{post.id}</span>
          <span aria-hidden='true'>/</span>
          <span>{post.category}</span>
          <StatusBadge status={post.status} />
        </div>
        <h1 className='font-heading text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl'>
          {post.title}
        </h1>
        <p className='max-w-prose text-base leading-relaxed text-muted-foreground'>
          {post.excerpt}
        </p>
      </div>
      <div className='grid items-start gap-5 lg:grid-cols-3'>
        <Card className='gap-0 overflow-hidden py-0 lg:col-span-2'>
          <div className='flex items-center gap-3 border-b bg-secondary px-6 py-5 text-secondary-foreground'>
            <BookOpen className='size-5' aria-hidden='true' />
            <h2 className='text-lg font-semibold'>Story preview</h2>
          </div>
          <CardContent className='space-y-4 py-8 text-sm leading-7'>
            <p>{post.excerpt}</p>
            <p className='text-muted-foreground'>
              This story is part of the Folio Studio editorial collection. Bring
              your ideas together, collaborate with your team, and make room for
              work that matters.
            </p>
            <p className='border-t pt-4 text-xs text-muted-foreground'>
              This is sample content, not a full article. Editing and publishing
              are not connected in this workspace.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className='text-lg font-semibold'>Story details</h2>
          </CardHeader>
          <CardContent>
            <dl className='space-y-4 text-sm'>
              {[
                ['Author', post.author],
                ['Category', post.category],
                [
                  'Updated',
                  new Date(`${post.date}T12:00:00`).toLocaleDateString(
                    'en-US',
                    { month: 'long', day: 'numeric', year: 'numeric' }
                  ),
                ],
                ['Reading time', `${post.readTime} min read`],
                ['Views', post.views],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className='flex flex-wrap justify-between gap-2 border-b pb-4 last:border-0 last:pb-0'
                >
                  <dt className='text-muted-foreground'>{label}</dt>
                  <dd className='font-medium'>{value}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
