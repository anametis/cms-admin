import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Files,
  PencilLine,
} from 'lucide-react'
import { posts } from '@/content'
import { PostTable } from '@/components/post-table'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'

export const Route = createFileRoute('/')({
  loader: () => ({
    today: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    latest: posts.slice(0, 4),
    published: posts.filter((post) => post.status === 'published').length,
    drafts: posts.filter((post) => post.status === 'draft').length,
    review: posts.filter((post) => post.status === 'review'),
  }),
  component: Overview,
})

function Overview() {
  const { today, latest, published, drafts, review } = Route.useLoaderData()
  const stats = [
    { label: 'Total stories', value: posts.length, status: 'all', icon: Files },
    {
      label: 'Published',
      value: published,
      status: 'published',
      icon: CheckCircle2,
    },
    {
      label: 'In review',
      value: review.length,
      status: 'review',
      icon: Clock3,
    },
    { label: 'Drafts', value: drafts, status: 'draft', icon: PencilLine },
  ] as const

  return (
    <div className='page'>
      <div className='page-heading'>
        <div>
          <p className='mb-2 text-xs font-medium text-primary'>{today}</p>
          <h1>Your editorial desk</h1>
          <p>A little clarity for every idea, draft, and published story.</p>
        </div>
        <Button asChild className='min-h-11'>
          <Link to='/posts' search={{ q: '', status: 'all', sort: 'newest' }}>
            View all content
            <ArrowUpRight aria-hidden='true' />
          </Link>
        </Button>
      </div>
      <section aria-labelledby='stats-heading'>
        <h2 id='stats-heading' className='sr-only'>
          Story status
        </h2>
        <div className='grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4'>
          {stats.map(({ label, value, status, icon: Icon }) => (
            <Link
              key={status}
              to='/posts'
              search={{ q: '', status, sort: 'newest' }}
              className='rounded-xl'
            >
              <Card className='h-full gap-3 py-5 transition-colors hover:border-primary/50'>
                <CardHeader className='flex flex-row items-center justify-between gap-2 px-4 sm:px-5'>
                  <p className='text-sm text-muted-foreground'>{label}</p>
                  <Icon
                    className='size-4 shrink-0 text-primary'
                    aria-hidden='true'
                  />
                </CardHeader>
                <CardContent className='px-4 sm:px-5'>
                  <p className='font-heading text-3xl font-semibold tabular-nums'>
                    {value.toString().padStart(2, '0')}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <div className='grid gap-5 xl:grid-cols-5'>
        <Card className='relative justify-center overflow-hidden border-secondary bg-secondary shadow-none xl:col-span-3'>
          <CardContent className='relative z-10 py-3 sm:pr-36'>
            <BookOpen className='mb-4 size-6 text-primary' aria-hidden='true' />
            <h2 className='max-w-sm text-2xl leading-tight font-semibold text-secondary-foreground sm:text-3xl'>
              Stories worth sharing start here.
            </h2>
            <p className='mt-3 max-w-sm text-sm leading-relaxed text-secondary-foreground'>
              A home for every idea. Find your next draft, see what’s ready for
              review, and keep the good work moving.
            </p>
            <Button variant='link' asChild className='mt-4 min-h-11 px-0'>
              <Link
                to='/posts'
                search={{ q: '', status: 'draft', sort: 'newest' }}
              >
                Explore your drafts
                <ArrowUpRight aria-hidden='true' />
              </Link>
            </Button>
          </CardContent>
          <div
            className='pointer-events-none absolute top-14 -right-14 hidden size-52 rounded-full border-[24px] border-primary/10 sm:block'
            aria-hidden='true'
          />
        </Card>
        <Card className='gap-4 xl:col-span-2'>
          <CardHeader>
            <h2 className='text-lg font-semibold'>Ready for a closer look</h2>
            <CardDescription>
              {review.length} stories in the review queue.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-1'>
            {review.map((post) => (
              <Link
                key={post.id}
                to='/posts/$postId'
                params={{ postId: post.id }}
                className='flex items-start gap-3 rounded-lg py-3 hover:text-primary'
              >
                <span className='mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-status-review-bg text-status-review'>
                  <Clock3 className='size-4' aria-hidden='true' />
                </span>
                <span>
                  <span className='block text-sm leading-relaxed font-medium'>
                    {post.title}
                  </span>
                  <span className='mt-1 block text-xs text-muted-foreground'>
                    {post.author}
                  </span>
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
      <section aria-labelledby='recent-heading' className='space-y-4'>
        <div className='flex items-center justify-between gap-3'>
          <div>
            <h2 id='recent-heading' className='text-xl font-semibold'>
              Recent stories
            </h2>
            <p className='mt-1 text-sm text-muted-foreground'>
              Pick up where your team left off.
            </p>
          </div>
          <Button variant='ghost' asChild className='min-h-11'>
            <Link to='/posts' search={{ q: '', status: 'all', sort: 'newest' }}>
              View all
              <ArrowUpRight aria-hidden='true' />
            </Link>
          </Button>
        </div>
        <div className='overflow-hidden rounded-xl border bg-card'>
          <PostTable items={latest} caption='The four most recent stories' />
        </div>
      </section>
    </div>
  )
}
