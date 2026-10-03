import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'

const session = `folio-base-ui-${process.pid}`
const run = (...args) =>
  execFileSync('agent-browser', ['--session', session, ...args], {
    encoding: 'utf8',
    timeout: 25000,
  }).trim()
const evaluate = (code) => JSON.parse(run('eval', code))

try {
  run('set', 'viewport', '1280', '900')
  run('open', process.argv[2] ?? 'http://127.0.0.1:5173')
  run('wait', '--load', 'networkidle')
  run('wait', 'button[aria-label="Change theme"]')
  run('click', 'button[aria-label="Change theme"]')
  run('wait', '[role="menu"]')
  run('press', 'd')
  run('press', 'Enter')
  run('wait', '--fn', 'document.documentElement.classList.contains("dark")')
  assert.equal(
    evaluate('!!document.querySelector("[role=menu]")'),
    true,
    'Base UI radio selection keeps its menu open by default'
  )
  run('press', 'Escape')
  run('wait', '--fn', '!document.querySelector("[role=menu]")')
  assert.equal(
    evaluate('document.activeElement.getAttribute("aria-label")'),
    'Change theme'
  )
  run('click', 'button[data-sidebar="trigger"]')
  run(
    'wait',
    '--fn',
    'document.querySelector("[data-slot=sidebar-container]").getBoundingClientRect().width <= 49'
  )
  run('hover', '[data-sidebar="menu-button"][aria-label="Content"]')
  run('wait', '[data-slot="tooltip-content"]')
  assert.equal(
    evaluate(
      'document.querySelector("[data-slot=tooltip-content]").textContent'
    ),
    'Content'
  )
  assert.equal(
    evaluate(
      'document.querySelector("[data-slot=tooltip-content]").getAttribute("data-side")'
    ),
    'right'
  )
  assert.equal(
    evaluate(
      'document.querySelectorAll("button button,button a,a button").length'
    ),
    0
  )
  run('click', '[data-sidebar="menu-button"][aria-label="Content"]')
  run('wait', '#story-search')
  console.log(
    'PASS: menu keyboard selection and focus return, sidebar tooltip positioning and linked navigation'
  )
} finally {
  run('close')
}
