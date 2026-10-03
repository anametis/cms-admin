import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: { builder: { viteConfigPath: '.storybook/vite.config.ts' } },
  },
  core: { disableTelemetry: true },
  // The builder replaces server options before viteFinal. Ignore agent-state churn here.
  viteFinal: (config) =>
    mergeConfig(config, {
      server: { watch: { ignored: /\/(?:\.pi|storybook-static)(?:\/|$)/ } },
    }),
}

export default config
