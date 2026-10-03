import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { applyTheme, parseTheme, readTheme, themeKey } from '@/lib/theme'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeSwitch() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(themeKey, theme)
    } catch {
      // The current selection still works when browser storage is unavailable.
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const update = () => applyTheme(theme)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [theme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='size-11'
            aria-label='Change theme'
          />
        }
      >
        <Sun className='dark:hidden' aria-hidden='true' />
        <Moon className='hidden dark:block' aria-hidden='true' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(parseTheme(value))}
        >
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuRadioItem value='light' className='min-h-11'>
            <Sun aria-hidden='true' />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='dark' className='min-h-11'>
            <Moon aria-hidden='true' />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='system' className='min-h-11'>
            <Monitor aria-hidden='true' />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
