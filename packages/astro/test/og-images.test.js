import assert from 'node:assert';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import satori from 'satori';

import ui from '../src/index.ts';
import { getOgHooks, getOgMetadata, resolveOgOptions } from '../src/og-images.ts';
import { resolveTheme } from '../src/themes.ts';

const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScL3tAAAAABJRU5ErkJggg==',
  'base64',
);
const JPEG = Buffer.from(
  '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAH/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAEFAqf/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/Aaf/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/Aaf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/Aqf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/IV//2gAMAwEAAgADAAAAEP/EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8QH//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8QH//EABQQAQAAAAAAAAAAAAAAAAAAABD/2gAIAQEAAT8QH//Z',
  'base64',
);

async function withFixture(callback) {
  const directory = mkdtempSync(join(tmpdir(), 'astro-og-images-'));
  try {
    return await callback(directory);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

function pngDimensions(buffer) {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function grantinaOptions(overrides = {}) {
  return resolveOgOptions({
    ogImages: overrides,
    themeDefaults: resolveTheme('grantina'),
  }).options;
}

async function renderFixture(directory, options, hooks = getOgHooks(options)) {
  const htmlPath = join(directory, 'index.html');
  writeFileSync(
    htmlPath,
    '<title>Grant &amp; Ina | example.com</title><meta content="/og.png" property="og:image"><meta content="A &amp; B" name="description">',
  );
  const route = { pattern: /\// };
  const errors = [];
  await hooks['astro:build:start']();
  hooks['astro:routes:resolved']({ routes: [route] });
  await hooks['astro:build:done']({
    assets: new Map([[route.pattern, [new URL(`file://${htmlPath}`)]]]),
    logger: { info() {}, error(value) { errors.push(value); } },
  });
  assert.deepStrictEqual(errors, []);
  return readFileSync(join(directory, 'og.png'));
}

describe('resolveOgOptions', () => {
  it('disables OG hooks for false and omitted options', () => {
    assert.strictEqual(resolveOgOptions({ ogImages: false }).enabled, false);
    assert.strictEqual(resolveOgOptions().enabled, false);
    assert.ok(!('astro:build:start' in ui({ ogImages: false }).hooks));
    assert.ok(!('astro:build:start' in ui().hooks));
  });

  it('keeps the default title template when metadata has no template', () => {
    assert.strictEqual(resolveOgOptions({ ogImages: true }).options.titleTemplate, '%s');
  });

  it('honours explicit templates and logo precedence', () => {
    const result = resolveOgOptions({
      ogImages: { logo: './logo.svg', favicon: './favicon.png', titleTemplate: '%s & site' },
    });
    assert.strictEqual(result.options.logo, './logo.svg');
    assert.strictEqual(result.options.favicon, undefined);
    assert.strictEqual(result.options.titleTemplate, '%s & site');
  });

  it('uses shared font overrides before theme per-role defaults', () => {
    const theme = resolveTheme('grantina');
    const shared = resolveOgOptions({
      ogImages: { fontName: 'Shared', fontFile: '/shared.woff' },
      themeDefaults: theme,
    }).options;
    const role = resolveOgOptions({
      ogImages: { fontName: 'Shared', titleFontName: 'Title', bodyFontFile: '/body.woff' },
      themeDefaults: theme,
    }).options;

    assert.deepStrictEqual([shared.titleFontName, shared.bodyFontName], ['Shared', 'Shared']);
    assert.deepStrictEqual([shared.titleFontFile, shared.bodyFontFile], ['/shared.woff', '/shared.woff']);
    assert.deepStrictEqual([role.titleFontName, role.bodyFontName], ['Title', 'Shared']);
    assert.strictEqual(role.bodyFontFile, '/body.woff');
  });
});

describe('getOgMetadata', () => {
  it('decodes title and attributes exactly once through HTML parsing', () => {
    const metadata = getOgMetadata(`
      <meta content='An&nbsp;A &#38; &#x26; &unknown; &amp;lt;' name='description'>
      <title>Grant &amp; Ina &amp; site</title>
      <meta content='/og.png' property='og:image'>
    `);
    assert.deepStrictEqual(metadata, {
      title: 'Grant & Ina & site',
      description: 'An A & & &unknown; &lt;',
      hasOgImage: true,
    });
  });

  it('handles missing descriptions and preserves escaped template suffixes', () => {
    const metadata = getOgMetadata('<title>Grant &amp; Ina &amp; site</title><meta property="og:image" content="/og.png">');
    assert.strictEqual(metadata.description, '');
    assert.strictEqual(metadata.title.replace(' & site', ''), 'Grant & Ina');
  });
});

describe('Grantina fonts', () => {
  it('reads the resolved local font buffers and renders them with Satori', async () => {
    const theme = resolveTheme('grantina');
    const svg = await satori(
      { type: 'div', props: { children: 'Grant & Ina', style: { fontFamily: theme.titleFontName } } },
      {
        width: 400,
        height: 100,
        fonts: [{ name: theme.titleFontName, data: readFileSync(theme.titleFontFile), weight: 400 }],
      },
    );
    assert.match(svg, /<svg/);
    assert.strictEqual(theme.titleFontWeight, 400);
    assert.strictEqual(theme.bodyFontWeight, 500);
  });
});

describe('OG assets and hooks', () => {
  for (const [extension, asset] of [['svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 40"><path fill="currentColor" stroke="currentColor" d="M0 0h80v40H0z"/></svg>'], ['png', PNG], ['jpeg', JPEG]]) {
    it(`renders a ${extension} dedicated logo into a 1200×630 PNG`, async () => {
      await withFixture(async (directory) => {
        const logo = join(directory, `logo.${extension}`);
        writeFileSync(logo, asset);
        const options = grantinaOptions({ logo });
        const hooks = extension === 'svg' ? ui({ theme: 'grantina', ogImages: { logo } }).hooks : undefined;
        const image = await renderFixture(directory, options, hooks);
        assert.deepStrictEqual(pngDimensions(image), { width: 1200, height: 630 });
      });
    });
  }

  it('renders currentColor and explicitly coloured SVG marks without distortion errors', async () => {
    await withFixture(async (directory) => {
      const logo = join(directory, 'mark.svg');
      writeFileSync(logo, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><path fill="currentColor" stroke="currentColor" d="M0 0h120v40H0z"/></svg>');
      for (const foregroundColor of ['#ffffff', '#000000']) {
        const image = await renderFixture(directory, grantinaOptions({ logo, foregroundColor }));
        assert.deepStrictEqual(pngDimensions(image), { width: 1200, height: 630 });
      }
      writeFileSync(logo, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" color="#ff00ff"><path fill="#00ffff" d="M0 0h120v40H0z"/></svg>');
      assert.deepStrictEqual(
        pngDimensions(await renderFixture(directory, grantinaOptions({ logo }))),
        { width: 1200, height: 630 },
      );
    });
  });

  it('generates without an automatic favicon and rejects explicit bad assets', async () => {
    await withFixture(async (directory) => {
      const options = grantinaOptions();
      assert.strictEqual(options.favicon, undefined);
      const image = await renderFixture(directory, options);
      assert.deepStrictEqual(pngDimensions(image), { width: 1200, height: 630 });
      await assert.rejects(
        getOgHooks(grantinaOptions({ logo: join(directory, 'missing.svg') }))['astro:build:start'](),
        /missing\.svg/,
      );
      writeFileSync(join(directory, 'logo.ico'), 'not an icon');
      await assert.rejects(
        getOgHooks(grantinaOptions({ logo: join(directory, 'logo.ico') }))['astro:build:start'](),
        /logo\.ico/,
      );
      writeFileSync(join(directory, 'logo.png'), 'not a PNG');
      await assert.rejects(
        getOgHooks(grantinaOptions({ logo: join(directory, 'logo.png') }))['astro:build:start'](),
        /logo\.png/,
      );
    });
  });
});
