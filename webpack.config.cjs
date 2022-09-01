const path = require('path')

module.exports = {
  entry: ['./src/main.ts', './src/scss/all.scss'],
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
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        // resourceQuery: { not: [/raw/] },
      },
      {
        test: /\.s[ac]ss$/i,
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
      },
      // {
      //   resourceQuery: /raw/,
      //   type: 'asset/source',
      // },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],

    // Add support for typescript baseurl
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
    ],
  },
  experiments: {
    outputModule: true,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // enabledLibraryTypes: ['module'],
    library: {
      type: 'module',
    },
  },
  // externals: {
  //   react: {
  //     root: 'React',
  //     commonjs2: 'react',
  //     commonjs: 'react',
  //     amd: 'react',
  //   },
  //   'react-dom': {
  //     root: 'ReactDOM',
  //     commonjs2: 'react-dom',
  //     commonjs: 'react-dom',
  //     amd: 'react-dom',
  //   },
  // },
}
