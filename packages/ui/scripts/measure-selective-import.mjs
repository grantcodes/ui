import { gzipSync } from 'node:zlib';
import { build } from 'esbuild';

const entries = [
  ['dialog', 'packages/ui/dist/components/dialog/index.js'],
  ['react', 'packages/ui/dist/react.js'],
];
const external = ['lit', 'lit/*', 'react', 'react-dom', 'react/jsx-runtime', '@lit/react', '*.css'];

for (const [name, entryPoint] of entries) {
  const result = await build({
    bundle: true,
    entryPoints: [entryPoint],
    external,
    format: 'esm',
    minify: true,
    write: false,
  });
  const output = result.outputFiles[0].contents;

  console.log(`${name}: ${output.byteLength} bytes raw, ${gzipSync(output).byteLength} bytes gzip`);
}
