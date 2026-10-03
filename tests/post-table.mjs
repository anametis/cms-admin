import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'

const session = `folio-table-${process.pid}`
const base = process.argv[2] ?? 'http://127.0.0.1:5173'
const run = (...args) =>
  execFileSync('agent-browser', ['--session', session, ...args], {
    encoding: 'utf8',
    timeout: 25000,
  }).trim()
const evaluate = (code) => JSON.parse(run('eval', code))
const rows = 'document.querySelectorAll("tbody tr")'

try {
  run('set', 'viewport', '1280', '900')
  run('open', new URL('/posts', base).href)
  run('wait', '--load', 'networkidle')
  run('wait', '#story-search')
  run('wait', 'tbody tr')
  const count = evaluate(`${rows}.length`)
  assert.ok(count > 0)
  assert.deepEqual(
    evaluate(
      'Array.from(document.querySelectorAll("thead th"), h => h.textContent)'
    ),
    ['Story', 'Status', 'Last updated']
  )
  const newest = evaluate('document.querySelector("tbody a").textContent')
  run('select', '#story-sort', 'oldest')
  run(
    'wait',
    '--fn',
    `document.querySelector("tbody a").textContent !== ${JSON.stringify(newest)}`
  )
  const dates = evaluate(
    'Array.from(document.querySelectorAll("tbody time"), t => t.dateTime)'
  )
  assert.deepEqual(
    dates,
    [...dates].sort(),
    'URL sorting must update the TanStack row model'
  )
  run('click', 'fieldset a[href*="status=draft"]')
  run(
    'wait',
    '--fn',
    'new URLSearchParams(location.search).get("status") === "draft" && Array.from(document.querySelectorAll("tbody tr"), r => r.cells[1].textContent.trim()).every(s => s === "Draft")'
  )
  assert.ok(evaluate(`${rows}.length`) > 0)
  run('fill', '#story-search', 'no story could match this query')
  run('wait', '--text', 'No stories found')
  assert.equal(evaluate(`${rows}.length`), 0)
  run('wait', 'main a[data-slot="button"]:not(fieldset a)')
  run('click', 'main a[data-slot="button"]:not(fieldset a)')
  run('wait', '--fn', `${rows}.length === ${count}`)
  run('fill', '#story-search', newest)
  run('wait', '--fn', `${rows}.length === 1`)
  assert.equal(
    evaluate('document.querySelector("tbody a").textContent'),
    newest
  )
  run('click', 'tbody a')
  run(
    'wait',
    '--fn',
    `document.querySelector("h1")?.textContent === ${JSON.stringify(newest)}`
  )
  run('open', base)
  run('wait', 'tbody tr')
  assert.equal(evaluate(`${rows}.length`), Math.min(4, count))
  run('set', 'viewport', '375', '812')
  run(
    'wait',
    '--fn',
    'getComputedStyle(document.querySelector("tbody tr td:last-child")).display === "none"'
  )
  assert.equal(
    evaluate(
      'getComputedStyle(document.querySelector("tbody tr td:first-child")).display'
    ),
    'table-cell'
  )
  console.log(
    'PASS: TanStack headers, URL sorting/filtering/search, empty-state recovery, detail links, overview rows, and responsive cells'
  )
} finally {
  run('close')
}
