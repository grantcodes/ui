/**
 * @type {import('rollup').RollupOptions}
 */
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import postcss from 'rollup-plugin-postcss'

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
  external: ['react', 'react-dom'],
  plugins: [
    // peerDepsExternal(),
    resolve(),
    commonjs(),
    json(),
    typescript(),
    postcss({
      modules: true,
      // extract: true,
      use: ['sass'],
      writeDefinitions: true,
    }),
    // styles({
    //   // mode: 'extract',
    //   modules: true,
    //   autoModules: true,
    // }),
    // postcss(),
    // copy({
    //   targets: [
    //     {
    //       src: "src/variables.scss",
    //       dest: "build",
    //       rename: "variables.scss"
    //     },
    //     {
    //       src: "src/typography.scss",
    //       dest: "build",
    //       rename: "typography.scss"
    //     }
    //   ]
    // })
  ],
}

export default config
