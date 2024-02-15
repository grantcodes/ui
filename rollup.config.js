/**
 * @type {import('rollup').RollupOptions}
 */
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'
import postcssLit from 'rollup-plugin-postcss-lit'

const config = {
  input: 'src/main.ts',
  output: [
    {
      // dir: 'dist',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      file: 'dist/main.cjs',
      // TODO: Don't think I want this
      inlineDynamicImports: true,
    },
    // TODO: Want to make esm version too
    {
      // dir: 'dist',
      format: 'es',
      exports: 'named',
      sourcemap: true,
      file: 'dist/main.js',
      // TODO: Don't think I want this
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript(),
    postcss({
      use: ['sass'],
      writeDefinitions: true,
    }),
    postcssLit(),
  ],
}

export default config
