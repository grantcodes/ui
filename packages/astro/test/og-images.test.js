import { describe, it } from 'node:test';
import assert from 'node:assert';

import {
  resolveOgOptions,
  decodeHtmlEntities,
} from '../src/og-images.ts';
import { resolveTheme } from '../src/themes.ts';

// ──────────────────────────────────────────────
// resolveOgOptions: ogImages false handling
// ──────────────────────────────────────────────
describe('resolveOgOptions', () => {
  it('disables OG when ogImages is false', () => {
    const result = resolveOgOptions({ ogImages: false });
    assert.strictEqual(result.enabled, false);
    assert.ok(result.options);
  });

  it('disables OG when ogImages is undefined (no options)', () => {
    const result = resolveOgOptions();
    assert.strictEqual(result.enabled, false);
    assert.ok(result.options);
  });

  it('disables OG when ogImages is undefined (explicit undefined)', () => {
    const result = resolveOgOptions({ ogImages: undefined });
    assert.strictEqual(result.enabled, false);
    assert.ok(result.options);
  });

  it('enables OG when ogImages is true', () => {
    const result = resolveOgOptions({ ogImages: true });
    assert.strictEqual(result.enabled, true);
    assert.ok(result.options);
  });

  it('enables OG when ogImages is an object', () => {
    const result = resolveOgOptions({
      ogImages: { fontName: 'CustomFont' },
    });
    assert.strictEqual(result.enabled, true);
    assert.strictEqual(result.options.fontName, 'CustomFont');
  });

  it('merges custom options with defaults', () => {
    const result = resolveOgOptions({
      ogImages: { fontName: 'CustomFont' },
    });
    assert.strictEqual(result.options.width, 1200);
    assert.strictEqual(result.options.height, 630);
    assert.strictEqual(result.options.fontName, 'CustomFont');
  });

  it('uses themeDefaults when provided', () => {
    const result = resolveOgOptions({
      ogImages: true,
      themeDefaults: { fontName: 'ThemeFont' },
    });
    assert.strictEqual(result.enabled, true);
    assert.strictEqual(result.options.fontName, 'ThemeFont');
    assert.strictEqual(result.options.titleFontName, 'ThemeFont');
    assert.strictEqual(result.options.bodyFontName, 'ThemeFont');
  });

  it('explicit ogImages object overrides themeDefaults', () => {
    const result = resolveOgOptions({
      ogImages: { fontName: 'ExplicitFont' },
      themeDefaults: { fontName: 'ThemeFont' },
    });
    assert.strictEqual(result.options.fontName, 'ExplicitFont');
    assert.strictEqual(result.options.titleFontName, 'ExplicitFont');
    assert.strictEqual(result.options.bodyFontName, 'ExplicitFont');
  });

  it('supports separate title and body font names', () => {
    const result = resolveOgOptions({
      ogImages: true,
      themeDefaults: { titleFontName: 'TitleFont', bodyFontName: 'BodyFont' },
    });
    assert.strictEqual(result.options.titleFontName, 'TitleFont');
    assert.strictEqual(result.options.bodyFontName, 'BodyFont');
  });
});

// ──────────────────────────────────────────────
// decodeHtmlEntities: HTML entity decoding
// ──────────────────────────────────────────────
describe('decodeHtmlEntities', () => {
  it('decodes &amp; to &', () => {
    assert.strictEqual(decodeHtmlEntities('Foo &amp; Bar'), 'Foo & Bar');
  });

  it('decodes &lt; and &gt;', () => {
    assert.strictEqual(decodeHtmlEntities('&lt;div&gt;'), '<div>');
  });

  it('decodes &quot;', () => {
    assert.strictEqual(
      decodeHtmlEntities('He said &quot;hello&quot;'),
      'He said "hello"',
    );
  });

  it('decodes &#39; (single quote)', () => {
    assert.strictEqual(decodeHtmlEntities("It&#39;s nice"), "It's nice");
  });

  it('handles strings with no entities', () => {
    assert.strictEqual(decodeHtmlEntities('Plain text'), 'Plain text');
  });

  it('decodes multiple entity types in one string', () => {
    assert.strictEqual(
      decodeHtmlEntities('&lt;title&gt;Foo &amp; Bar &quot;Baz&quot;&lt;/title&gt;'),
      '<title>Foo & Bar "Baz"</title>',
    );
  });

  it('decodes empty string', () => {
    assert.strictEqual(decodeHtmlEntities(''), '');
  });
});

describe('resolveTheme OG fonts', () => {
  it('uses package-managed local Grantina fonts for OG output', () => {
    const result = resolveTheme('grantina');
    assert.strictEqual(result.fontName, 'Albert Sans');
    assert.strictEqual(result.titleFontName, 'Vidaloka');
    assert.strictEqual(result.bodyFontName, 'Albert Sans');
    assert.match(result.titleFontFile, /vidaloka-latin-400-normal\.woff2$/);
    assert.match(result.bodyFontFile, /albert-sans-latin-wght-normal\.woff2$/);
  });

  it('uses a bundled local fallback font for wireframe OG output', () => {
    const result = resolveTheme('wireframe');
    assert.strictEqual(result.fontName, 'Greycliff');
    assert.match(result.titleFontFile, /greycliff-bold\.woff$/);
    assert.match(result.bodyFontFile, /greycliff-regular\.woff$/);
  });
});
