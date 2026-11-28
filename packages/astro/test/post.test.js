import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mf2 } from 'microformats-parser';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const monorepoRoot = path.resolve(packageRoot, '..', '..');
const astroBin = path.join(packageRoot, 'node_modules', 'astro', 'bin', 'astro.mjs');
const fixtures = pathToFileURL(path.join(monorepoRoot, 'packages', 'ui', 'src', 'test-utils', 'mf2-fixtures.ts')).href;

// One page per fixture so each parses as its own top-level h-entry.
const pages = {
  note: 'fixtures.note',
  plain: 'fixtures.note',
  article: 'fixtures.article',
  compact: 'fixtures.article',
  photo: 'fixtures.photo',
  reply: 'fixtures.reply',
  like: 'fixtures.like',
  bookmark: 'fixtures.namedBookmark',
  rsvp: 'fixtures.rsvp',
  event: 'fixtures.event',
  responses: 'fixtures.withResponses',
  jf2: 'jf2ToMf2(fixtures.jf2Reply)',
  overrides: 'fixtures.photo',
  hiddenAuthor: 'fixtures.note',
  hiddenFallback: 'fixtures.repost',
  hiddenCitation: 'fixtures.reply',
};

const options = {
  plain: '{}',
  compact: '{ compact: true, sanitize }',
  bookmark: '{ compact: true, sanitize }',
  hiddenAuthor: '{ hideAuthor: true }',
  hiddenFallback:
    "{ hideAuthor: true, author: { name: 'Grant', url: 'https://grant.codes/', photo: 'https://grant.codes/me.jpg' } }",
  hiddenCitation: '{ hideAuthor: true }',
};

function buildFixture() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-post-test-'));
  fs.cpSync(path.join(packageRoot, 'src'), path.join(directory, 'src'), { recursive: true });
  fs.mkdirSync(path.join(directory, 'src', 'pages'), { recursive: true });
  fs.mkdirSync(path.join(directory, 'node_modules', '@grantcodes'), { recursive: true });
  for (const name of ['astro', 'lit', 'marked']) {
    fs.symlinkSync(path.join(packageRoot, 'node_modules', name), path.join(directory, 'node_modules', name), 'dir');
  }
  fs.symlinkSync(packageRoot, path.join(directory, 'node_modules', '@grantcodes', 'astro'), 'dir');
  fs.symlinkSync(path.join(monorepoRoot, 'packages', 'ui'), path.join(directory, 'node_modules', '@grantcodes', 'ui'), 'dir');
  fs.symlinkSync(
    path.join(monorepoRoot, 'packages', 'style-dictionary'),
    path.join(directory, 'node_modules', '@grantcodes', 'style-dictionary'),
    'dir',
  );
  fs.writeFileSync(
    path.join(directory, 'astro.config.mjs'),
    `import { defineConfig } from 'astro/config';\nimport ui from '${pathToFileURL(path.join(packageRoot, 'src', 'index.ts')).href}';\nexport default defineConfig({ integrations: [ui()] });\n`,
  );

  const post = pathToFileURL(path.join(directory, 'src', 'post', 'post.astro')).href;
  for (const [name, entry] of Object.entries(pages)) {
    const slots =
      name === 'overrides'
        ? '<p slot="media" class="custom-media">Gallery</p><button slot="actions" type="button">Like</button>'
        : '';
    fs.writeFileSync(
      path.join(directory, 'src', 'pages', `${name}.astro`),
      `---
import Post from '${post}';
import * as fixtures from '${fixtures}';
import { jf2ToMf2 } from '@grantcodes/ui/mf2';
const sanitize = (html) => html.replace(/<script[\\s\\S]*?<\\/script>/gi, '');
---
<Post entry={${entry}} options={${options[name] ?? '{ sanitize }'}}>${slots}</Post>
`,
    );
  }

  try {
    try {
      execFileSync(process.execPath, [astroBin, 'build'], { cwd: directory, stdio: 'pipe' });
    } catch (error) {
      throw new Error(`astro build failed:\n${error.stderr}`);
    }
    return Object.fromEntries(
      Object.keys(pages).map((name) => {
        const file = name === 'index' ? 'index.html' : path.join(name, 'index.html');
        return [name, fs.readFileSync(path.join(directory, 'dist', file), 'utf8')];
      }),
    );
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

let built;
const html = (name) => {
  built ??= buildFixture();
  return built[name];
};
const parse = (name) => mf2(html(name), { baseUrl: 'https://ada.example/' }).items[0];

describe('@grantcodes/astro Post mf2 output', () => {
  it('renders a note as an h-entry in light DOM', () => {
    const item = parse('note');
    assert.deepEqual(item.type, ['h-entry']);
    const { author, url, published, content, category, syndication } = item.properties;
    assert.equal(author[0].properties.name[0], 'Ada Lovelace');
    assert.equal(author[0].properties.photo[0], 'https://ada.example/me.jpg');
    assert.deepEqual(url, ['https://ada.example/notes/1']);
    assert.deepEqual(published, ['2026-01-08T12:00:00Z']);
    assert.equal(content[0].html, '<p>A short note about the <b>harbour</b>.</p>');
    assert.deepEqual(category, ['walks', 'harbour']);
    assert.deepEqual(syndication, ['https://social.example/@ada/1']);
    // The section components are server-rendered with declarative shadow DOM.
    assert.match(html('note'), /<grantcodes-post-footer[^>]*slot="footer"[^>]*><template shadowroot/);
    // Without hydration the card cannot detect its footer slot, so the attribute must be in the SSR HTML.
    assert.match(html('note'), /<grantcodes-card[^>]*hasfooter/);
  });

  it('renders content as plain text without sanitize', () => {
    assert.doesNotMatch(html('plain'), /<b>harbour<\/b>/);
    assert.equal(parse('plain').properties.content[0].value, 'A short note about the harbour.');
  });

  it('renders articles in full and as a compact summary', () => {
    assert.deepEqual(parse('article').properties.name, ['On the value of small tools']);
    const compact = parse('compact').properties;
    assert.deepEqual(compact.summary, ['Why short feedback loops change how software is made.']);
    assert.equal(compact.content, undefined);
    assert.match(html('compact'), /Read full post/);
  });

  it('renders photos, contexts, RSVPs and events', () => {
    assert.deepEqual(parse('photo').properties.photo[0], { value: 'https://picsum.photos/seed/harbour-1/1200/800', alt: 'Boats at dusk' });
    assert.match(html('photo'), /<grantcodes-gallery[^>]*style="--gallery-columns: 3"/);
    const [cite] = parse('reply').properties['in-reply-to'];
    assert.deepEqual(cite.type, ['h-cite']);
    assert.equal(cite.properties.author[0].properties.name[0], 'Grace Hopper');
    assert.deepEqual(parse('like').properties['like-of'], ['https://grace.example/posts/compilers']);
    assert.deepEqual(parse('rsvp').properties.rsvp, ['yes']);
    const event = parse('event').properties;
    assert.deepEqual(event.start, ['2026-02-01T18:00:00Z']);
    assert.equal(event.location[0].properties.name[0], 'The Harbour Inn');
  });

  it('renders responses as h-cites and comments as text only', () => {
    const props = parse('responses').properties;
    assert.equal(props.like[0].properties.author[0].properties.name[0], 'Grace Hopper');
    assert.deepEqual(props.like[0].properties.url, ['https://grace.example/likes/9']);
    assert.equal(props.comment[0].properties.content[0], 'Lovely');
    assert.deepEqual(props.mention[0].properties.name, ['A post that mentions this']);
    assert.doesNotMatch(html('responses'), /onerror/);
  });

  it('keeps the name of a named response and its content in compact cards', () => {
    const props = parse('bookmark').properties;
    assert.deepEqual(props.name, ['Worth reading']);
    assert.equal(props.content[0].value, 'Clear thinking about who programs are for.');
  });

  it('renders a converted jf2 item', () => {
    assert.equal(parse('jf2').properties['in-reply-to'][0].properties.name[0], 'Compilers are for people');
  });

  it('keeps a hidden author h-card for parsers with hideAuthor', () => {
    for (const [name, expected] of [
      ['hiddenAuthor', { name: ['Ada Lovelace'], url: ['https://ada.example/'], photo: ['https://ada.example/me.jpg'] }],
      ['hiddenFallback', { name: ['Grant'], url: ['https://grant.codes/'], photo: ['https://grant.codes/me.jpg'] }],
    ]) {
      assert.equal(html(name).match(/p-author h-card/g)?.length, 1);
      assert.match(html(name), /<span class="p-author h-card" hidden(="")?>/);
      assert.doesNotMatch(html(name), /<grantcodes-post-header|<grantcodes-avatar|>by </);
      assert.deepEqual(parse(name).properties.author[0].properties, expected);
    }
    const reply = parse('hiddenCitation').properties;
    assert.equal(reply['in-reply-to'][0].properties.author[0].properties.name[0], 'Grace Hopper');
    assert.match(html('hiddenCitation'), /<grantcodes-post-header[\s\S]*Grace Hopper/);
  });

  it('replaces sections through named slots and puts actions in the card footer', () => {
    assert.doesNotMatch(html('overrides'), /<img class="u-photo"/);
    assert.match(html('overrides'), /class="custom-media"/);
    assert.match(html('overrides'), /<div slot="footer">\s*<button[^>]*type="button"[^>]*>Like<\/button>/);
  });
});
