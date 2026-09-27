import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const monorepoRoot = path.resolve(packageRoot, '..', '..');
const packagePaths = {
  astro: packageRoot,
  ui: path.join(monorepoRoot, 'packages', 'ui'),
  styleDictionary: path.join(monorepoRoot, 'packages', 'style-dictionary'),
};

function packPackages(tarballDirectory) {
  return Object.fromEntries(
    Object.entries(packagePaths).map(([key, packagePath]) => {
      const packageJson = JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json'), 'utf8'));
      execFileSync('pnpm', ['pack', '--pack-destination', tarballDirectory], {
        cwd: packagePath,
        stdio: 'pipe',
      });
      const filename = `${packageJson.name.replace('@', '').replace('/', '-')}-${packageJson.version}.tgz`;
      return [key, path.join(tarballDirectory, filename)];
    }),
  );
}

function findInjectedTypes(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory() && findInjectedTypes(entryPath)) return true;
    if (
      entry.isFile() &&
      entry.name.endsWith('.d.ts') &&
      fs.readFileSync(entryPath, 'utf8').includes('grantcodes-ui-component-props')
    ) {
      return true;
    }
  }
  return false;
}

function buildConsumer(astroVersion) {
  const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-smoke-test-'));

  try {
    const tarballDirectory = path.join(tempDirectory, 'tarballs');
    fs.mkdirSync(tarballDirectory);
    const tarballs = packPackages(tarballDirectory);
    fs.mkdirSync(path.join(tempDirectory, 'src', 'pages'), { recursive: true });

    const localDependencies = {
      '@grantcodes/astro': `file:${tarballs.astro}`,
      '@grantcodes/ui': `file:${tarballs.ui}`,
      '@grantcodes/style-dictionary': `file:${tarballs.styleDictionary}`,
    };
    fs.writeFileSync(
      path.join(tempDirectory, 'package.json'),
      JSON.stringify(
        {
          name: 'astro-smoke-test',
          private: true,
          type: 'module',
          dependencies: {
            ...localDependencies,
            astro: astroVersion,
            lit: '^3.2.0',
          },
          overrides: localDependencies,
        },
        null,
        2,
      ),
    );
    fs.writeFileSync(
      path.join(tempDirectory, 'astro.config.mjs'),
      [
        "import { defineConfig } from 'astro/config';",
        "import ui from '@grantcodes/astro';",
        'export default defineConfig({ integrations: [ui()] });',
      ].join('\n'),
    );
    fs.mkdirSync(path.join(tempDirectory, 'src', 'components'));
    fs.writeFileSync(
      path.join(tempDirectory, 'src', 'components', 'smoke-button.js'),
      [
        "import { LitElement, html } from 'lit';",
        'export class SmokeButton extends LitElement {',
        '  render() {',
        '    return html`<button><slot></slot></button>`;',
        '  }',
        '}',
        "customElements.define('smoke-button', SmokeButton);",
        '',
      ].join('\n'),
    );
    fs.writeFileSync(
      path.join(tempDirectory, 'src', 'pages', 'index.astro'),
      [
        '---',
        "import type { Hero } from '@grantcodes/astro/blocks';",
        "import { SmokeButton } from '../components/smoke-button.js';",
        '---',
        '<html>',
        '  <body>',
        '    <SmokeButton client:load>Smoke Test</SmokeButton>',
        '  </body>',
        '</html>',
        '',
      ].join('\n'),
    );

    execFileSync('npm', ['install'], { cwd: tempDirectory, stdio: 'pipe', timeout: 300000 });
    execFileSync(path.join(tempDirectory, 'node_modules', '.bin', 'astro'), ['build'], {
      cwd: tempDirectory,
      stdio: 'pipe',
      timeout: 300000,
    });

    const html = fs.readFileSync(path.join(tempDirectory, 'dist', 'index.html'), 'utf8');
    assert.match(html, /<template shadowroot="open" shadowrootmode="open">/);
    assert.ok(findInjectedTypes(path.join(tempDirectory, '.astro')));
  } finally {
    fs.rmSync(tempDirectory, { recursive: true, force: true });
  }
}

describe('@grantcodes/astro tarball smoke test', () => {
  for (const astroVersion of ['7.0.0', '7.3.5']) {
    it(`builds an external consumer with Astro ${astroVersion}`, () => {
      buildConsumer(astroVersion);
    });
  }
});
