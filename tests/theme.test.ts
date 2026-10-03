import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseTheme, readTheme, resolveTheme } from '../src/lib/theme.ts'

test('appearance defaults and explicit preferences', () => {
  assert.equal(parseTheme(null), 'system')
  assert.equal(parseTheme('unexpected'), 'system')
  assert.equal(parseTheme('dark'), 'dark')
  assert.equal(parseTheme('light'), 'light')
  assert.equal(resolveTheme('system', true), 'dark')
  assert.equal(resolveTheme('system', false), 'light')
  assert.equal(resolveTheme('light', true), 'light')
  assert.equal(resolveTheme('dark', false), 'dark')
  assert.equal(readTheme(), 'system') // Node has no browser storage.
})
