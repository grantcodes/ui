/**
 * @type {import('rollup').RollupOptions}
 */
// import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import styles from 'rollup-plugin-styles'
// import postcss from 'rollup-plugin-postcss'
// import copy from 'rollup-plugin-copy'
import pkg from './package.json'

const config = {
  input: 'src/main.ts',
  output: [
    {
      // dir: 'dist',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      file: pkg.main,
      // TODO: Don't think I want this
      inlineDynamicImports: true,
    },
    // TODO: Want to make esm version too
    {
      // dir: 'dist',
      format: 'es',
      exports: 'named',
      sourcemap: true,
      file: pkg.module,
      // TODO: Don't think I want this
      inlineDynamicImports: true,
    },
  ],
  external: Object.keys(pkg.peerDependencies || {}),
  plugins: [
    // peerDepsExternal(),
    resolve({ browser: true }),
    commonjs(),
    json(),
    typescript(),
    styles({
      // mode: 'extract',
      modules: true,
      autoModules: true,
    }),
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
