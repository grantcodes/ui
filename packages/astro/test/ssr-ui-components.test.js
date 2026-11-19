import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { customElements as litCE, HTMLElement as litShimHTMLElement } from '@lit-labs/ssr-dom-shim';

// Mirrors shims/server-shim.ts; must run before any component module is imported.
globalThis.HTMLElement = litShimHTMLElement;
globalThis.customElements = litCE;
const litCeDefine = litCE.define.bind(litCE);
litCE.define = (tagName, Ctr) => {
  Ctr[Symbol.for('tagName')] = tagName;
  return litCeDefine(tagName, Ctr);
};

const { renderToStaticMarkup } = await import('../src/ssr/lit-renderer.ts');

const uiRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'ui');
const manifest = JSON.parse(fs.readFileSync(path.join(uiRoot, 'custom-elements.json'), 'utf8'));
const definitions = manifest.modules.flatMap((module) =>
  (module.exports ?? [])
    .filter((entry) => entry.kind === 'custom-element-definition')
    .map((entry) => ({ tagName: entry.name, file: module.path.replace(/^(src|dist)\//, '').replace(/\.ts$/, '.js') })),
);

async function register(tagName, file) {
  if (!customElements.get(tagName)) await import(`@grantcodes/ui/${file}`);
}

describe('@grantcodes/ui components under Lit SSR', () => {
  for (const { tagName, file } of definitions) {
    it(`renders ${tagName}`, async () => {
      await register(tagName, file);
      const { html } = await renderToStaticMarkup(tagName, {}, {});
      assert.match(html, /shadowrootmode="open"/);
    });
  }

  it('renders grantcodes-dialog with a header and a consumer name', async () => {
    await register('grantcodes-dialog', 'components/dialog/dialog.js');
    const { html } = await renderToStaticMarkup(
      'grantcodes-dialog',
      { open: true, 'aria-label': 'Review' },
      { header: '<h2>Review changes</h2>', default: '<p>Body</p>' },
    );
    assert.match(html, /<dialog/);
    assert.match(html, /<h2 slot="header">Review changes<\/h2>/);
  });

  it('renders grantcodes-avatar initials under its image without JS', async () => {
    await register('grantcodes-avatar', 'components/avatar/avatar.js');
    const { html } = await renderToStaticMarkup('grantcodes-avatar', { src: '/gone.jpg', name: 'Ada Lovelace' });
    assert.match(html, /role="img"[^>]*aria-label="Ada Lovelace"/);
    assert.match(html, /avatar__initials[^>]*>(<!--[^>]*-->)*AL/);
    assert.match(html, /background-image: url\(&quot;\/gone\.jpg&quot;\)/);
  });

  it('renders grantcodes-form-field with an error', async () => {
    await register('grantcodes-form-field', 'components/form-field/form-field.js');
    const { html } = await renderToStaticMarkup('grantcodes-form-field', { label: 'Email', error: 'Required' });
    assert.match(html, /form-field__error/);
  });

  it('renders grantcodes-sidebar named by aria-labelledby', async () => {
    await register('grantcodes-sidebar', 'components/sidebar/sidebar.js');
    const { html } = await renderToStaticMarkup('grantcodes-sidebar', { 'aria-labelledby': 'nav-title' });
    assert.match(html, /sidebar__panel/);
  });
});
