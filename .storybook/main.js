export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-docs'],

  features: {
    storyStoreV7: true,
  },

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  }
};
