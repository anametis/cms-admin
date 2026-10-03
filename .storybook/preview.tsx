/// <reference types="vite/client" />
import { useEffect, type ReactNode } from 'react'
import type { Preview } from '@storybook/react-vite'
import { applyTheme } from '../src/lib/theme'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/dm-sans/latin-600.css'
import '@fontsource/dm-sans/latin-700.css'
import '@fontsource/outfit/latin-600.css'
import '../src/index.css'

function ThemeFrame({
  theme,
  children,
}: {
  theme: 'light' | 'dark'
  children: ReactNode
}) {
  useEffect(() => {
    applyTheme(theme)
  }, [theme])
  return <div className='bg-background text-foreground'>{children}</div>
}

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
  globalTypes: {
    theme: {
      description: 'Folio color theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => (
      <ThemeFrame theme={context.globals.theme === 'dark' ? 'dark' : 'light'}>
        <Story />
      </ThemeFrame>
    ),
  ],
}

export default preview
