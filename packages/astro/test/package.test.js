import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));

function listFiles(directory, root = directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? listFiles(entryPath, root)
      : [path.relative(root, entryPath).split(path.sep).join('/')];
  });
}

function getPackedFiles() {
  const result = execFileSync('pnpm', ['pack', '--dry-run', '--json'], {
    cwd: packageRoot,
    encoding: 'utf8',
  });
  const inventory = JSON.parse(result);
  return new Set(inventory.files.map(({ path: filePath }) => filePath));
}

describe('@grantcodes/astro package contents', () => {
  it('ships every runtime source file and no development files', () => {
    const packedFiles = getPackedFiles();
    const runtimeFiles = ['src', 'client', 'shims'].flatMap((directory) =>
      listFiles(path.join(packageRoot, directory)).map((filePath) => `${directory}/${filePath}`),
    );
    const exportTargets = Object.values(packageJson.exports).map((filePath) => filePath.slice(2));

    for (const filePath of [...runtimeFiles, ...exportTargets, 'tsconfig.json']) {
      assert.ok(packedFiles.has(filePath), `${filePath} must be included in the package`);
    }

    for (const filePath of packedFiles) {
      assert.ok(!filePath.startsWith('.turbo/'), '.turbo must not be included in the package');
      assert.ok(!filePath.startsWith('scripts/'), 'generation scripts must not be included');
      assert.ok(!filePath.startsWith('test/'), 'tests must not be included');
      assert.ok(!filePath.endsWith('.log'), 'logs must not be included');
    }

    assert.ok(!packedFiles.has('AGENTS.md'), 'AGENTS.md must not be included');
  });
});
