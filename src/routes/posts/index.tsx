import { createFileRoute, Link } from '@tanstack/react-router'
import { Search, SearchX } from 'lucide-react'
import { listPosts, parsePostsSearch, posts } from '@/content'
import type { PostsSearch } from '@/content'
import { PostTable } from '@/components/post-table'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/posts/')({
  validateSearch: parsePostsSearch,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => listPosts(deps),
  pendingComponent: () => (
    <output className='page block text-muted-foreground'>
      Loading stories…
    </output>
  ),
  component: ContentList,
})

const filters: { label: string; value: PostsSearch['status'] }[] = [
  { label: 'All content', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'In review', value: 'review' },
  { label: 'Drafts', value: 'draft' },
]

function ContentList() {
  const items = Route.useLoaderData()
  const { q, status, sort } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <div className='page'>
      <div className='page-heading'>
        <div>
          <h1>Content</h1>
          <p>Everything your team is working on, all in one place.</p>
        </div>
        <p className='text-sm text-muted-foreground'>
          {posts.length} stories in your workspace
        </p>
      </div>
      <Card className='gap-0 overflow-hidden py-0'>
        <div className='flex flex-wrap items-center justify-between gap-3 border-b p-4 sm:p-5'>
          <fieldset
            aria-label='Filter by status'
            className='flex w-full min-w-0 flex-wrap gap-1 xl:w-auto'
          >
            {filters.map(({ label, value }) => (
              <Button
                key={value}
                variant={status === value ? 'secondary' : 'ghost'}
                asChild
                className='min-h-11 px-3'
              >
                <Link
                  to='/posts'
                  search={{ q, sort, status: value }}
                  aria-current={status === value ? 'page' : undefined}
                  className={cn(status === value && 'font-semibold')}
                >
                  {label}
                  <span className='rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground tabular-nums'>
                    {value === 'all'
                      ? posts.length
                      : posts.filter((post) => post.status === value).length}
                  </span>
                </Link>
              </Button>
            ))}
          </fieldset>
          <div className='flex w-full flex-wrap gap-3 xl:w-auto'>
            <div className='relative min-w-40 flex-1 xl:w-52'>
              <Search
                className='pointer-events-none absolute top-3.5 left-3 size-4 text-muted-foreground'
                aria-hidden='true'
              />
              <label htmlFor='story-search' className='sr-only'>
                Search stories
              </label>
              <Input
                id='story-search'
                type='search'
                placeholder='Search stories…'
                className='h-11 pl-9'
                value={q}
                onChange={(event) =>
                  void navigate({
                    search: (prev) => ({ ...prev, q: event.target.value }),
                    replace: true,
                  })
                }
              />
            </div>
            <label className='sr-only' htmlFor='story-sort'>
              Sort stories
            </label>
            <select
              id='story-sort'
              className='h-11 rounded-md border border-input bg-card px-3 text-sm text-foreground'
              value={sort}
              onChange={(event) =>
                void navigate({
                  search: (prev) => ({
                    ...prev,
                    sort: event.target.value === 'oldest' ? 'oldest' : 'newest',
                  }),
                })
              }
            >
              <option value='newest'>Newest first</option>
              <option value='oldest'>Oldest first</option>
            </select>
          </div>
        </div>
        <output
          className='flex flex-wrap items-center gap-3 px-5 py-4 text-sm'
          aria-live='polite'
        >
          <strong>
            {items.length} {items.length === 1 ? 'story' : 'stories'}
          </strong>
          <span className='text-muted-foreground'>
            Showing{' '}
            {status === 'all'
              ? 'all content'
              : status === 'review'
                ? 'stories in review'
                : status + ' stories'}
          </span>
        </output>
        {items.length > 0 ? (
          <PostTable
            items={items}
            caption='Stories matching your current filters'
          />
        ) : (
          <div className='flex flex-col items-center gap-3 border-t px-5 py-16 text-center'>
            <SearchX
              className='mb-1 size-9 text-muted-foreground'
              aria-hidden='true'
            />
            <h2 className='text-xl font-semibold'>No stories found</h2>
            <p className='max-w-sm text-sm leading-relaxed text-muted-foreground'>
              Try another search or status to find what you’re looking for.
            </p>
            <Button variant='outline' asChild className='mt-2 min-h-11'>
              <Link
                to='/posts'
                search={{ q: '', status: 'all', sort: 'newest' }}
              >
                Clear filters
              </Link>
            </Button>
          </div>
        )}
        <p className='border-t px-5 py-4 text-xs text-muted-foreground'>
          Showing {items.length} of {posts.length} stories. This sample library
          is read only.
        </p>
      </Card>
    </div>
  )
}
