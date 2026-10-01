import { createFileRoute, Link } from '@tanstack/react-router'
import { getPost } from '../../content'

export const Route = createFileRoute('/posts/$postId')({
  params: {
    parse: ({ postId }) => {
      const id = Number(postId)
      if (!Number.isSafeInteger(id) || id < 1) throw new Error('Invalid story ID.')
      return { postId: id }
    },
    stringify: ({ postId }) => ({ postId: String(postId) }),
  },
  loader: ({ params }) => getPost(params.postId),
  pendingComponent: () => <div className="page pending" role="status">Opening story…</div>,
  component: StoryDetail,
})

function StoryDetail() {
  const post = Route.useLoaderData()
  return <div className="page detail-page"><Link to="/posts" search={{ q: '', status: 'all', sort: 'newest' }} className="back-link">← All content</Link><div className="detail-header"><div className="date-line">Story #{post.id} <span className="separator">/</span> {post.category}</div><h1>{post.title}</h1><p>{post.excerpt}</p><span className={`status status-${post.status}`}><i></i>{post.status === 'review' ? 'In review' : post.status}</span></div><div className="detail-grid"><article className="detail-article"><div className="detail-illustration" aria-hidden="true"><div className="art-sun"></div><div className="art-hill hill-one"></div><div className="art-hill hill-two"></div></div><div className="article-body"><h2>About this story</h2><p>{post.excerpt}</p><p>This story is part of the Folio Studio editorial collection. Bring your ideas together, collaborate with your team, and make room for work that matters.</p></div></article><aside className="detail-aside"><h2>Story details</h2><dl><div><dt>Author</dt><dd>{post.author}</dd></div><div><dt>Category</dt><dd>{post.category}</dd></div><div><dt>Updated</dt><dd>{new Date(`${post.date}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</dd></div><div><dt>Reading time</dt><dd>{post.readTime} min read</dd></div><div><dt>Views</dt><dd>{post.views}</dd></div></dl></aside></div></div>
}
