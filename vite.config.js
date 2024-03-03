// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    // lib: {
    //   entry: [
    //     resolve(__dirname, 'src/main.ts'),
    //     // resolve(__dirname, 'src/react.ts'),
    //     // resolve(__dirname, 'src/scss/base.scss'),
    //     // resolve(__dirname, 'src/scss/themes/grantcodes.scss'),
    //   ],
    //   name: 'GrantCodesUI',
    // },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main.ts'),
        react: resolve(__dirname, 'src/react.ts'),
        base: resolve(__dirname, 'src/scss/base.scss'),
        grantcodes: resolve(__dirname, 'src/scss/themes/grantcodes.scss'),
      },
      external: ['react'],
      output: {
        assetFileNames: `[name].[ext]`,
        entryFileNames: `[name].js`,
        inlineDynamicImports: false,
        globals: {
          react: 'React',
        },
      },
    },
    cssCodeSplit: true,
  },
})
