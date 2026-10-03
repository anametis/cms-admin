import assert from 'node:assert/strict'
import test from 'node:test'
import config from '../vite.config.ts'

test('Vite shares React and ignores agent runtime reloads', () => {
  assert.deepEqual(config.resolve?.dedupe, ['react', 'react-dom'])
  const ignored = config.server?.watch?.ignored
  assert.ok(ignored instanceof RegExp)
  assert.ok(ignored.test('/project/.pi/fabric/mesh/state.json'))
  assert.ok(ignored.test('/project/storybook-static/index.html'))
  assert.ok(!ignored.test('/project/src/components/ui/button.tsx'))
})
