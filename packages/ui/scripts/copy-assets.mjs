import { copyFile, mkdir, readdir, watch } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

const SRC = 'src';
const DEST = 'dist';

async function copyCss(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const from = join(dir, entry.name);
    if (entry.isDirectory()) {
      await copyCss(from);
      continue;
    }
    if (!entry.name.endsWith('.css')) continue;
    const to = join(DEST, relative(SRC, from));
    await mkdir(dirname(to), { recursive: true });
    await copyFile(from, to);
  }
}

await copyCss(SRC);
if (process.argv.includes('--watch')) {
  for await (const event of watch(SRC, { recursive: true })) {
    if (event.filename?.endsWith('.css')) await copyCss(SRC);
  }
}
