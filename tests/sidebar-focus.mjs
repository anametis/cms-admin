import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'

// Optional browser regression: start the app first and install agent-browser.
const session = `folio-sidebar-focus-${process.pid}`
const run = (...args) =>
  execFileSync('agent-browser', ['--session', session, ...args], {
    encoding: 'utf8',
    timeout: 25000,
  }).trim()

try {
  run('set', 'viewport', '375', '812')
  run('open', process.argv[2] ?? 'http://127.0.0.1:5173')
  run('wait', 'button[data-sidebar="trigger"]')
  run('click', 'button[data-sidebar="trigger"]')
  run('wait', '[role="dialog"]')
  run('press', 'Escape')
  run('wait', '--fn', '!document.querySelector("[role=dialog]")')
  assert.equal(
    JSON.parse(
      run('eval', 'document.activeElement.getAttribute("data-sidebar")')
    ),
    'trigger',
    'Closing mobile navigation must return focus to its trigger'
  )
  console.log('PASS: mobile sidebar dismissal restores keyboard focus')
} finally {
  run('close')
}
