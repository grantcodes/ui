const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  core: { builder: 'webpack5' },
  // Add any Storybook addons you want here: https://storybook.js.org/addons/
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-toolbars',
    'storybook-design-token',
  ],

  webpackFinal: async (config, { configType }) => {
    // Add SCSS support for CSS Modules
    config.module.rules.push(
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        resourceQuery: { not: [/raw/] },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader',
        ],
        include: path.resolve(__dirname, '../src'),
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      }
    )

    // Add support for typescript baseurl
    config.resolve.modules.push(path.resolve(__dirname, '../src'))

    return config
  },
}
