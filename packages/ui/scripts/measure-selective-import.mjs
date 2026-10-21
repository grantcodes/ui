import { gzipSync } from 'node:zlib';
import { build } from 'esbuild';

const entries = [
  ['dialog', 'packages/ui/dist/components/dialog/index.js'],
  ['popover', 'packages/ui/dist/components/popover/index.js'],
  ['popover-react', 'packages/ui/dist/components/popover/popover.react.js'],
  ['react', 'packages/ui/dist/react.js'],
];
const external = ['lit', 'lit/*', 'react', 'react-dom', 'react/jsx-runtime', '@lit/react', '*.css'];

for (const [name, entryPoint] of entries) {
  const result = await build({
    bundle: true,
    entryPoints: [entryPoint],
    external,
    format: 'esm',
    metafile: true,
    minify: true,
    write: false,
  });
  const output = result.outputFiles[0].contents;
  const inputs = Object.keys(result.metafile.inputs);
  const unrelatedComponents = inputs.filter(
    (input) => input.includes('/components/') && !input.includes('/components/popover/'),
  );

  if (name.startsWith('popover') && unrelatedComponents.length) {
    throw new Error(`${name} imports unrelated components: ${unrelatedComponents.join(', ')}`);
  }

  console.log(`${name}: ${output.byteLength} bytes raw, ${gzipSync(output).byteLength} bytes gzip`);
}
