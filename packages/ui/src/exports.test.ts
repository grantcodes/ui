import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgPath = path.resolve(__dirname, '..', 'package.json');
const pkgRoot = path.dirname(pkgPath);
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const exports = pkg.exports;

// All 34 component CSS files expected to exist on disk
// These are resolved via the ./components/* wildcard export
const expectedComponentCss = [
  'accordion/accordion.css',
  'app-bar/app-bar.css',
  'avatar/avatar.css',
  'badge/badge.css',
  'breadcrumb/breadcrumb.css',
  'button/button.css',
  'button-group/button-group.css',
  'card/card.css',
  'code-preview/code-preview.css',
  'container/container.css',
  'cta/cta.css',
  'dialog/dialog.css',
  'dropdown/dropdown.css',
  'dropzone/dropzone.css',
  'feature-list/feature-list.css',
  'footer/footer.css',
  'footer/footer-column.css',
  'form-field/form-field.css',
  'gallery/gallery.css',
  'hero/hero.css',
  'icon/icon.css',
  'loading/loading.css',
  'logo-cloud/logo-cloud.css',
  'media-text/media-text.css',
  'newsletter/newsletter.css',
  'notice/notice.css',
  'pagination/pagination.css',
  'pricing/pricing.css',
  'sidebar/sidebar.css',
  'stats/stats.css',
  'tabs/tabs.css',
  'testimonials/testimonials.css',
  'toast/toast.css',
  'tooltip/tooltip.css',
];

describe('package.json exports', () => {
  describe('component CSS files exist (resolved via ./components/* wildcard)', () => {
    for (const cssFile of expectedComponentCss) {
      it(`src/components/${cssFile} exists on disk`, () => {
        const fullPath = path.resolve(pkgRoot, 'src', 'components', cssFile);
        assert.ok(fs.existsSync(fullPath), `CSS file does not exist: ${fullPath}`);
      });
    }

    it('has ./components/* wildcard export that covers CSS files', () => {
      assert.ok(exports['./components/*'], 'Missing ./components/* wildcard export');
    });
  });

  describe('focus-ring shared styles export', () => {
    it('has export for ./styles/focus-ring.css', () => {
      assert.ok(
        exports['./styles/focus-ring.css'] !== undefined,
        'Missing export for ./styles/focus-ring.css',
      );
    });

    it('./styles/focus-ring.css points at the built path and the source file exists', () => {
      const exportValue = exports['./styles/focus-ring.css'];
      const filePath = typeof exportValue === 'string' ? exportValue : exportValue?.import;
      assert.ok(filePath, 'No file path found for ./styles/focus-ring.css');
      assert.ok(
        filePath.endsWith('lib/styles/focus-ring.css'),
        `Unexpected focus-ring export path: ${filePath}`,
      );
      const sourcePath = path.resolve(pkgRoot, 'src', 'lib', 'styles', 'focus-ring.css');
      assert.ok(fs.existsSync(sourcePath), `Source file does not exist: ${sourcePath}`);
    });
  });

  describe('React icon exports', () => {
    it('re-exports Lucide components without changing their identity', async () => {
      const icons = await import('@grantcodes/ui/icons/react');
      const lucide = await import('lucide-react');
      assert.equal(icons.Reply, lucide.Reply);
      assert.equal(icons.createLucideIcon, lucide.createLucideIcon);
      assert.deepEqual(exports['./icons/react'], {
        types: './dist/icons.react.d.ts',
        import: './dist/icons.react.js',
      });
    });

    it('only bundles the selected React icon and no web components', async () => {
      const result = await build({
        stdin: {
          contents: "export { Reply } from '@grantcodes/ui/icons/react';",
          resolveDir: pkgRoot,
        },
        bundle: true,
        write: false,
        metafile: true,
        format: 'esm',
        platform: 'browser',
        external: ['react'],
      });
      const inputs = Object.values(result.metafile.outputs).flatMap((output) =>
        Object.entries(output.inputs)
          .filter(([, input]) => input.bytesInOutput > 0)
          .map(([name]) => name),
      );
      const iconFiles = inputs.filter((name) => name.includes('lucide-react/dist/esm/icons/'));
      assert.equal(iconFiles.length, 1);
      assert.match(iconFiles[0], /\/reply\.mjs$/);
      assert.ok(!inputs.some((name) => name.includes('lucide-static')));
      assert.ok(!inputs.some((name) => name.includes('components/icon')));
    });

    it('keeps static icons independent of React', async () => {
      const result = await build({
        stdin: {
          contents: "export { Reply } from '@grantcodes/ui/icons';",
          resolveDir: pkgRoot,
        },
        bundle: true,
        write: false,
        metafile: true,
        format: 'esm',
        platform: 'browser',
      });
      assert.ok(!Object.keys(result.metafile.inputs).some((name) => name.includes('react')));
    });
  });

  describe('existing exports preserved', () => {
    it('has root export (.)', () => {
      assert.ok(exports['.'], 'Missing root export');
      assert.ok(exports['.'].import, 'Missing root import');
    });

    it('has ./icons export', () => {
      assert.ok(exports['./icons'], 'Missing ./icons export');
    });

    it('has ./styles/base.css export', () => {
      assert.ok(exports['./styles/base.css'], 'Missing ./styles/base.css export');
    });

    it('has ./styles/themes/* export', () => {
      assert.ok(exports['./styles/themes/*'], 'Missing ./styles/themes/* export');
    });

    it('has ./components/* wildcard export', () => {
      assert.ok(exports['./components/*'], 'Missing ./components/* wildcard export');
    });

    it('ships the built dist directory', () => {
      assert.ok(Array.isArray(pkg.files), 'Missing files array in package.json');
      assert.ok(pkg.files.includes('dist/**/*'), 'files must include "dist/**/*"');
    });
  });
});
