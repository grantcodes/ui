import esbuild from 'esbuild'
import stylePlugin from 'esbuild-style-plugin'

esbuild
  .build({
    logLevel: 'info',
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    color: true,
    // splitting: true,
    sourcemap: true,
    format: 'esm',
    target: ['esnext'],
    outdir: 'build',
    plugins: [stylePlugin()],
  })
  .catch(() => process.exit(1))
