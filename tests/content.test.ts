import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getPost, listPosts, parsePostsSearch } from '../src/content.ts'

test('URL filters and story lookups', async () => {
  assert.deepEqual(parsePostsSearch({ q: 23, status: 'oops', sort: 'oops' }), { q: '', status: 'all', sort: 'newest' })
  const filtered = await listPosts({ q: 'olivia', status: 'published', sort: 'oldest' })
  assert.deepEqual(filtered.map((post) => post.id), [1038, 1042])
  assert.equal((await getPost(1042)).title, 'The quiet art of getting things done')
  await assert.rejects(getPost(9999), /not found/)
})
