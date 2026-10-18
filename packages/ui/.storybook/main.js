import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { cssImportAttributes } from '../src/vite-plugin-css-import-attributes.ts';

export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

  core: {
    disableTelemetry: true,
    allowedHosts: true,
  },

  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-vitest'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {},
  },

  async viteFinal(config) {
    return {
      ...config,
      plugins: [...(config.plugins ?? []), cssImportAttributes()],
    };
  },
};

function getAbsolutePath(value) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
