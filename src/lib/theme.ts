export type Theme = 'light' | 'dark' | 'system'
export const themeKey = 'folio-theme'

export function parseTheme(value: unknown): Theme {
  return value === 'light' || value === 'dark' ? value : 'system'
}

export function resolveTheme(theme: Theme, systemDark: boolean) {
  return theme === 'system' ? (systemDark ? 'dark' : 'light') : theme
}

export function readTheme(): Theme {
  try {
    return parseTheme(localStorage.getItem(themeKey))
  } catch {
    return 'system'
  }
}

export function applyTheme(theme: Theme) {
  const resolved = resolveTheme(
    theme,
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  document.documentElement.classList.toggle('dark', resolved === 'dark')
  document.documentElement.style.colorScheme = resolved
}
