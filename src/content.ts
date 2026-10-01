export type Status = 'published' | 'draft' | 'review'
export type PostsSearch = {
  q: string
  status: 'all' | Status
  sort: 'newest' | 'oldest'
}

export const posts = [
  {
    id: 1042,
    title: 'The quiet art of getting things done',
    excerpt:
      'A closer look at the small rituals that make creative work possible.',
    category: 'Culture',
    status: 'published',
    author: 'Olivia Chen',
    date: '2026-05-14',
    readTime: 6,
    views: '2.4k',
  },
  {
    id: 1041,
    title: 'Inside the new wave of independent publishing',
    excerpt: 'Meet the people building a different kind of media landscape.',
    category: 'Industry',
    status: 'review',
    author: 'James Miller',
    date: '2026-05-12',
    readTime: 8,
    views: '—',
  },
  {
    id: 1040,
    title: 'A guide to more considered living',
    excerpt: 'What happens when we make space for the things that matter?',
    category: 'Lifestyle',
    status: 'draft',
    author: 'Sofia Patel',
    date: '2026-05-10',
    readTime: 5,
    views: '—',
  },
  {
    id: 1039,
    title: 'The places we return to',
    excerpt: 'On the familiar corners that feel like home, wherever we go.',
    category: 'Travel',
    status: 'published',
    author: 'Daniel Reyes',
    date: '2026-05-08',
    readTime: 7,
    views: '1.8k',
  },
  {
    id: 1038,
    title: 'Designing for a slower internet',
    excerpt: 'How thoughtful digital spaces can help us find our focus again.',
    category: 'Design',
    status: 'published',
    author: 'Olivia Chen',
    date: '2026-05-06',
    readTime: 9,
    views: '3.1k',
  },
  {
    id: 1037,
    title: 'An afternoon with the makers',
    excerpt:
      'A visit to the studios where patient craftsmanship still thrives.',
    category: 'Culture',
    status: 'review',
    author: 'Sofia Patel',
    date: '2026-05-04',
    readTime: 4,
    views: '—',
  },
  {
    id: 1036,
    title: 'Notes from the neighborhood',
    excerpt: 'The local stories that connect us to the places we call ours.',
    category: 'Community',
    status: 'draft',
    author: 'James Miller',
    date: '2026-05-01',
    readTime: 5,
    views: '—',
  },
] as const satisfies ReadonlyArray<{
  id: number
  title: string
  excerpt: string
  category: string
  status: Status
  author: string
  date: string
  readTime: number
  views: string
}>

export function parsePostsSearch(search: Record<string, unknown>): PostsSearch {
  return {
    q: typeof search.q === 'string' ? search.q.slice(0, 100) : '',
    status:
      search.status === 'published' ||
      search.status === 'draft' ||
      search.status === 'review'
        ? search.status
        : 'all',
    sort: search.sort === 'oldest' ? 'oldest' : 'newest',
  }
}

export async function listPosts({ q, status, sort }: PostsSearch) {
  await new Promise((resolve) => setTimeout(resolve, 180))
  return posts
    .filter(
      (post) =>
        (status === 'all' || post.status === status) &&
        `${post.title} ${post.author} ${post.category}`
          .toLowerCase()
          .includes(q.trim().toLowerCase())
    )
    .sort((a, b) => (sort === 'newest' ? b.id - a.id : a.id - b.id))
}

export async function getPost(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 180))
  const post = posts.find((item) => item.id === id)
  if (!post) throw new Error(`Story #${id} was not found.`)
  return post
}
