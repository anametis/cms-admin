import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { basename } from 'node:path'

const base = process.argv[2] ?? 'http://127.0.0.1:6006'
const session = `folio-storybook-${process.pid}`
const run = (...args) =>
  execFileSync('agent-browser', ['--session', session, ...args], {
    encoding: 'utf8',
    timeout: 25000,
  }).trim()
const evaluate = (code) => JSON.parse(run('eval', code))
const response = await fetch(new URL('/index.json', base))
assert.ok(response.ok, 'Start Storybook before running this check')
const { entries } = await response.json()
const defaults = Object.values(entries).filter(
  (entry) => entry.type === 'story' && entry.name === 'Default'
)
const components = readdirSync('src/components/ui').filter(
  (file) => file.endsWith('.tsx') && !file.endsWith('.stories.tsx')
)
assert.equal(
  defaults.length,
  components.length,
  'Every existing UI component needs a default story'
)
const stories = new Map(
  defaults.map((story) => [basename(story.importPath, '.stories.tsx'), story])
)
const triggerSlots = {
  'dropdown-menu': 'dropdown-menu-trigger',
  sheet: 'sheet-trigger',
  tooltip: 'tooltip-trigger',
  sidebar: 'sidebar-wrapper',
}
const openStory = (component, globals) => {
  const url = new URL('/iframe.html', base)
  url.searchParams.set('id', stories.get(component).id)
  url.searchParams.set('viewMode', 'story')
  if (globals) url.searchParams.set('globals', globals)
  run('open', url.href)
  run('wait', `[data-slot="${triggerSlots[component] ?? component}"]`)
}

try {
  run('set', 'viewport', '1280', '900')
  for (const file of components) {
    const name = basename(file, '.tsx')
    assert.ok(stories.has(name), `Missing story for ${name}`)
    assert.ok(
      Object.values(entries).some(
        (entry) =>
          entry.type === 'docs' && entry.title === stories.get(name).title
      ),
      `Missing generated docs for ${name}`
    )
    openStory(name)
    assert.equal(
      evaluate(
        '!!document.querySelector(".sb-errordisplay") && getComputedStyle(document.querySelector(".sb-errordisplay")).display !== "none"'
      ),
      false
    )
  }
  openStory('button')
  const lightColor = evaluate(
    'getComputedStyle(document.querySelector("[data-slot=button]")).backgroundColor'
  )
  assert.equal(
    lightColor,
    'rgb(69, 95, 196)',
    'App Tailwind tokens must style the story'
  )
  assert.ok(
    evaluate('getComputedStyle(document.body).fontFamily').includes('DM Sans')
  )
  openStory('button', 'theme:dark')
  run('wait', '--fn', 'document.documentElement.classList.contains("dark")')
  assert.notEqual(
    evaluate(
      'getComputedStyle(document.querySelector("[data-slot=button]")).backgroundColor'
    ),
    lightColor
  )

  openStory('input')
  run('fill', '[data-slot="input"]', 'A new story')
  assert.equal(evaluate('document.querySelector("input").value'), 'A new story')

  openStory('dropdown-menu')
  run('click', '[data-slot="dropdown-menu-trigger"]')
  run('wait', '[role="menu"]')
  run('press', 'p')
  run('press', 'Enter')
  run(
    'wait',
    '--fn',
    'document.querySelector("[role=menuitemradio][aria-checked=true]")?.textContent === "Published"'
  )
  run('press', 'Escape')
  run('wait', '--fn', '!document.querySelector("[role=menu]")')
  run(
    'wait',
    '--fn',
    'document.activeElement.getAttribute("data-slot") === "dropdown-menu-trigger"'
  )

  openStory('sheet')
  run('click', '[data-slot="sheet-trigger"]')
  run('wait', '[data-slot="sheet-title"]')
  assert.equal(
    evaluate('document.querySelector("[data-slot=sheet-title]").textContent'),
    'Editorial notes'
  )
  run('press', 'Escape')
  run('wait', '--fn', '!document.querySelector("[role=dialog]")')
  run(
    'wait',
    '--fn',
    'document.activeElement.getAttribute("data-slot") === "sheet-trigger"'
  )

  openStory('tooltip')
  run('hover', '[data-slot="tooltip-trigger"]')
  run('wait', '[data-slot="tooltip-content"]')
  assert.equal(
    evaluate(
      'document.querySelector("[data-slot=tooltip-content]").getAttribute("data-side")'
    ),
    'top'
  )

  run('set', 'viewport', '375', '812')
  openStory('sidebar')
  run('click', 'button[data-sidebar="trigger"]')
  run('wait', '[role="dialog"]')
  run('press', 'Escape')
  run('wait', '--fn', '!document.querySelector("[role=dialog]")')
  run(
    'wait',
    '--fn',
    'document.activeElement.getAttribute("data-sidebar") === "trigger"'
  )
  console.log(
    `PASS: ${components.length} components and docs, shared fonts/themes, input, menu, sheet, tooltip, and mobile sidebar`
  )
} finally {
  run('close')
}
