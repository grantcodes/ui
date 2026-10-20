import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const monorepoRoot = path.resolve(packageRoot, '..', '..');
const astroBin = path.join(packageRoot, 'node_modules', 'astro', 'bin', 'astro.mjs');

function fileUrl(...segments) {
  return pathToFileURL(path.join(...segments)).href;
}

function buildFixture() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-blocks-test-'));
  fs.cpSync(path.join(packageRoot, 'src'), path.join(directory, 'src'), { recursive: true });
  fs.mkdirSync(path.join(directory, 'src', 'pages'), { recursive: true });
  fs.mkdirSync(path.join(directory, 'node_modules', '@grantcodes'), { recursive: true });
  fs.symlinkSync(path.join(packageRoot, 'node_modules', 'astro'), path.join(directory, 'node_modules', 'astro'), 'dir');
  fs.symlinkSync(path.join(packageRoot, 'node_modules', 'marked'), path.join(directory, 'node_modules', 'marked'), 'dir');
  fs.symlinkSync(path.join(packageRoot, 'node_modules', 'lit'), path.join(directory, 'node_modules', 'lit'), 'dir');
  fs.symlinkSync(packageRoot, path.join(directory, 'node_modules', '@grantcodes', 'astro'), 'dir');
  fs.symlinkSync(path.join(monorepoRoot, 'packages', 'ui'), path.join(directory, 'node_modules', '@grantcodes', 'ui'), 'dir');
  fs.symlinkSync(path.join(monorepoRoot, 'packages', 'style-dictionary'), path.join(directory, 'node_modules', '@grantcodes', 'style-dictionary'), 'dir');

  fs.writeFileSync(
    path.join(directory, 'astro.config.mjs'),
    `import { defineConfig } from 'astro/config';\nimport ui from '${fileUrl(packageRoot, 'src', 'index.ts')}';\nexport default defineConfig({ integrations: [ui()] });\n`,
  );
  fs.writeFileSync(
    path.join(directory, 'src', 'pages', 'index.astro'),
    `---
import Gallery from '${fileUrl(directory, 'src', 'blocks', 'gallery.astro')}';
import BlockRenderer from '${fileUrl(directory, 'src', 'blocks', 'renderer.astro')}';
import { blockSchema } from '${fileUrl(directory, 'src', 'blocks', 'schemas', 'index.ts')}';
const gallery = blockSchema.parse({ type: 'gallery', filmstrip: true, images: [{ src: '/renderer.jpg', alt: 'Renderer image', caption: 'Renderer caption' }] });
const hero = blockSchema.parse({ type: 'hero', id: 'schema-hero', title: 'Schema hero', image: '/hero.jpg' });
---
<Gallery filmstrip images={[{ src: '/direct.jpg', alt: 'Direct image', caption: 'Direct caption' }]} />
<BlockRenderer block={gallery} />
<BlockRenderer block={hero} />
`,
  );

  try {
    execFileSync(process.execPath, [astroBin, 'build'], { cwd: directory, stdio: 'pipe' });
    return fs.readFileSync(path.join(directory, 'dist', 'index.html'), 'utf8');
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

let fixtureHtml;

function getFixtureHtml() {
  fixtureHtml ??= buildFixture();
  return fixtureHtml;
}

describe('@grantcodes/astro blocks', () => {
  it('renders gallery filmstrips and captions through direct and renderer use', () => {
    const html = getFixtureHtml();

    assert.equal((html.match(/<grantcodes-gallery[^>]*variant="filmstrip"/g) ?? []).length, 2);
    assert.match(html, /Direct caption/);
    assert.match(html, /Renderer caption/);
  });

  it('renders schema-supported hero images and block ids', () => {
    const html = getFixtureHtml();

    assert.match(html, /<grantcodes-hero[^>]*id="schema-hero"/);
    assert.match(html, /<img[^>]*src="\/hero.jpg"[^>]*alt=""/);
  });
});
