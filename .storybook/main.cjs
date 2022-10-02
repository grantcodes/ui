const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.module.rules.push(
      // {
      //   test: /\.css$/i,
      //   use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.lazy\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'lazyAutoStyleTag',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /.storybook\/preview.js/,
        resolve: { fullySpecified: false },
      }
    )

    // Add support for typescript baseurl
    config.resolve.modules.push(path.resolve(__dirname, '../src'))

    // Return the altered config
    return config
  },
}
