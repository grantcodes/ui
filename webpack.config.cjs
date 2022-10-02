const path = require('path')

module.exports = {
  entry: ['./src/main.ts'],
  mode: 'production',
  target: ['web', 'es6'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(s(a|c)ss)$/,
        // exclude: /node_modules/,
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
            options: { implementation: require('sass') },
          },
        ],
      },
      {
        test: /\.css$/i,
        // exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
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
            options: { implementation: require('sass') },
          },
        ],
      },
      {
        test: /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
        type: 'asset/resource',
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.cjs'],

    // Add support for typescript baseurl
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  experiments: {
    outputModule: true,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true,
    // enabledLibraryTypes: ['module'],
    library: {
      type: 'module',
    },
  },
  optimization: {
    mangleExports: false,
    mangleWasmImports: false,
    minimize: false,
    removeEmptyChunks: true,
  },
  externals: {
    react: 'react',
    reactDOM: 'react-dom',
  },
}
