import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getPost, listPosts, parsePostsSearch, posts } from '../src/content.ts'

test('URL filters and story lookups', async () => {
  assert.deepEqual(parsePostsSearch({ q: 23, status: 'oops', sort: 'oops' }), {
    q: '',
    status: 'all',
    sort: 'newest',
  })
  assert.equal(parsePostsSearch({ q: 'x'.repeat(150) }).q.length, 100)
  const all = await listPosts(parsePostsSearch({}))
  assert.equal(all.length, posts.length)
  assert.deepEqual(
    all.map((post) => post.id),
    posts.map((post) => post.id)
  )
  assert.equal(
    (await listPosts({ q: '  OLIVIA  ', status: 'draft', sort: 'newest' }))
      .length,
    0
  )
  assert.equal(
    (await listPosts({ q: '', status: 'review', sort: 'newest' })).length,
    2
  )
  const filtered = await listPosts({
    q: 'olivia',
    status: 'published',
    sort: 'oldest',
  })
  assert.deepEqual(
    filtered.map((post) => post.id),
    [1038, 1042]
  )
  assert.equal(
    (await getPost(1042)).title,
    'The quiet art of getting things done'
  )
  await assert.rejects(getPost(9999), /not found/)
})
