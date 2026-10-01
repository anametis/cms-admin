import { createFileRoute, Link } from '@tanstack/react-router'
import { listPosts, parsePostsSearch, posts } from '../../content'
import type { PostsSearch } from '../../content'

export const Route = createFileRoute('/posts/')({
  validateSearch: parsePostsSearch,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => listPosts(deps),
  pendingComponent: () => <div className="page pending" role="status">Loading stories…</div>,
  component: ContentList,
})

const filters: { label: string; value: PostsSearch['status'] }[] = [
  { label: 'All content', value: 'all' }, { label: 'Published', value: 'published' }, { label: 'In review', value: 'review' }, { label: 'Drafts', value: 'draft' },
]

function ContentList() {
  const items = Route.useLoaderData()
  const { q, status, sort } = Route.useSearch()
  const navigate = Route.useNavigate()
  return <div className="page">
    <div className="page-heading"><div><div className="date-line">Your library</div><h1>Content</h1><p>Everything your team is working on, all in one place.</p></div><div className="heading-count">{posts.length} stories in your workspace</div></div>
    <div className="content-panel"><div className="filter-bar"><div className="tabs" role="group" aria-label="Filter by status">{filters.map(({ label, value }) => <Link key={value} to="/posts" search={{ q, sort, status: value }} className={`tab${status === value ? ' selected' : ''}`} aria-current={status === value ? 'page' : undefined}>{label}<span>{value === 'all' ? posts.length : posts.filter((p) => p.status === value).length}</span></Link>)}</div><div className="filter-controls"><label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">Search stories</span><input type="search" placeholder="Search stories..." value={q} onChange={(event) => void navigate({ search: (prev) => ({ ...prev, q: event.target.value }), replace: true })} /></label><label className="sort-box"><span className="sr-only">Sort stories</span><select value={sort} onChange={(event) => void navigate({ search: (prev) => ({ ...prev, sort: event.target.value === 'oldest' ? 'oldest' : 'newest' }) })}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label></div></div>
      <div className="list-caption"><strong>{items.length} {items.length === 1 ? 'story' : 'stories'}</strong><span>Showing {status === 'all' ? 'all content' : status === 'review' ? 'stories in review' : status + ' stories'}</span></div>
      <div className="story-table"><div className="table-head"><span>Story</span><span>Status</span><span>Last updated</span><span></span></div>{items.map((post) => <Link key={post.id} to="/posts/$postId" params={{ postId: post.id }} className="story-row"><span className="story-title"><span className="story-mini-icon">▤</span><span><strong>{post.title}</strong><small>{post.category} <span className="separator">·</span> {post.author}</small></span></span><span><span className={`status status-${post.status}`}><i></i>{post.status === 'review' ? 'In review' : post.status}</span></span><span className="row-date">{new Date(`${post.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span><span className="row-arrow">↗</span></Link>)}{items.length === 0 && <div className="empty-state"><strong>No stories found</strong><p>Try another search or status to find what you’re looking for.</p><Link to="/posts" search={{ q: '', status: 'all', sort: 'newest' }} className="text-link">Clear filters</Link></div>}</div>
      <div className="panel-footer">Showing {items.length} of {posts.length} stories</div>
    </div>
  </div>
}
