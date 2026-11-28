import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import { mf2 } from 'microformats-parser';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { jf2ToMf2, type Mf2Item, type PostOptions } from '../../mf2.js';
import * as fixtures from '../../test-utils/mf2-fixtures.js';
import { EntryFooter, Post } from './post.react.js';

const sanitize = (html: string) => html.replace(/<script[\s\S]*?<\/script>/gi, '');

const render = (entry: Mf2Item, options: PostOptions = { sanitize }) =>
  renderToStaticMarkup(createElement(Post, { entry, options }));

/** The first top-level item the parser finds in the rendered markup. */
const parse = (html: string) => mf2(html, { baseUrl: 'https://ada.example/' }).items[0];

describe('React Post mf2 output', () => {
  it('renders a note as an h-entry with author, permalink, content, categories and syndication', () => {
    const html = render(fixtures.note);
    // The card only detects slots on the client, so the footer must be marked for server rendering.
    assert.match(html, /<grantcodes-card hasFooter=""/i);
    const item = parse(html);
    assert.deepEqual(item.type, ['h-entry']);
    const { author, url, published, content, category, syndication } = item.properties as any;
    assert.equal(author[0].properties.name[0], 'Ada Lovelace');
    assert.equal(author[0].properties.photo[0], 'https://ada.example/me.jpg');
    assert.deepEqual(url, ['https://ada.example/notes/1']);
    assert.deepEqual(published, ['2026-01-08T12:00:00Z']);
    assert.equal(content[0].html, '<p>A short note about the <b>harbour</b>.</p>');
    assert.deepEqual(category, ['walks', 'harbour']);
    assert.deepEqual(syndication, ['https://social.example/@ada/1']);
  });

  it('renders content as plain text when no sanitize function is given', () => {
    const html = render(fixtures.note, {});
    assert.doesNotMatch(html, /<b>harbour<\/b>/);
    assert.equal((parse(html).properties.content[0] as any).value, 'A short note about the harbour.');
  });

  it('renders an article name, and only its summary when compact', () => {
    const full = parse(render(fixtures.article)).properties as any;
    assert.deepEqual(full.name, ['On the value of small tools']);
    assert.equal(full.content[0].value, 'Small tools do one thing well.');

    const html = render(fixtures.article, { compact: true, sanitize });
    const compact = parse(html).properties as any;
    assert.deepEqual(compact.summary, ['Why short feedback loops change how software is made.']);
    assert.equal(compact.content, undefined);
    assert.match(html, /<grantcodes-button href="https:\/\/ada.example\/articles\/small-tools"/);
  });

  it('keeps the name of a named response and its content in compact cards', () => {
    const props = parse(render(fixtures.namedBookmark, { compact: true, sanitize })).properties as any;
    assert.deepEqual(props.name, ['Worth reading']);
    assert.deepEqual(props['bookmark-of'], ['https://grace.example/posts/compilers']);
    assert.equal(props.content[0].value, 'Clear thinking about who programs are for.');
  });

  it('renders photos with alt text', () => {
    const photos = parse(render(fixtures.photo)).properties.photo as any[];
    assert.deepEqual(photos[0], { value: 'https://picsum.photos/seed/harbour-1/1200/800', alt: 'Boats at dusk' });
    assert.equal(photos.length, 3);
  });

  it('renders an embedded reply context as a u-in-reply-to h-cite', () => {
    const [cite] = parse(render(fixtures.reply)).properties['in-reply-to'] as any[];
    assert.deepEqual(cite.type, ['h-cite']);
    assert.deepEqual(cite.properties.url, ['https://grace.example/posts/compilers']);
    assert.equal(cite.properties.author[0].properties.name[0], 'Grace Hopper');
  });

  it('renders likes, reposts and RSVPs', () => {
    assert.deepEqual(parse(render(fixtures.like)).properties['like-of'], ['https://grace.example/posts/compilers']);
    assert.deepEqual(parse(render(fixtures.repost)).properties['repost-of'], ['https://grace.example/posts/nanoseconds']);
    const rsvp = parse(render(fixtures.rsvp)).properties as any;
    assert.deepEqual(rsvp.rsvp, ['yes']);
    assert.deepEqual(rsvp['in-reply-to'], ['https://grace.example/events/meetup']);
    assert.match(render(fixtures.like), /Liked <a class="u-url"/);
  });

  it('renders event times and location', () => {
    const props = parse(render(fixtures.event)).properties as any;
    assert.deepEqual(props.start, ['2026-02-01T18:00:00Z']);
    assert.deepEqual(props.end, ['2026-02-01T21:00:00Z']);
    assert.equal(props.location[0].properties.name[0], 'The Harbour Inn');
  });

  it('renders responses as h-cites and never renders a comment as HTML', () => {
    const html = render(fixtures.withResponses);
    const props = parse(html).properties as any;
    assert.equal(props.like[0].properties.author[0].properties.name[0], 'Grace Hopper');
    assert.deepEqual(props.like[0].properties.url, ['https://grace.example/likes/9']);
    assert.equal(props.comment[0].properties.content[0], 'Lovely');
    assert.deepEqual(props.mention[0].properties.name, ['A post that mentions this']);
    assert.doesNotMatch(html, /onerror/);
    assert.doesNotMatch(render(fixtures.withResponses, { compact: true }), /p-comment/);
  });

  it('drops javascript: URLs', () => {
    const entry = { ...fixtures.like, properties: { ...fixtures.like.properties, 'like-of': ['javascript:alert(1)'] } };
    assert.doesNotMatch(render(entry), /javascript:/);
  });

  it('uses the fallback author only when the entry has none', () => {
    const author = { name: 'Grant', url: 'https://grant.codes/' };
    const footer = (entry: Mf2Item) => renderToStaticMarkup(createElement(EntryFooter, { entry, options: { author } }));
    assert.match(footer(fixtures.repost), /class="p-author h-card" href="https:\/\/grant.codes\/">Grant/);
    assert.doesNotMatch(footer(fixtures.note), /Grant/);
  });

  it('keeps a hidden author h-card for parsers with hideAuthor', () => {
    const author = { name: 'Grant', url: 'https://grant.codes/', photo: 'https://grant.codes/me.jpg' };
    for (const [entry, expected] of [
      [fixtures.note, { name: ['Ada Lovelace'], url: ['https://ada.example/'], photo: ['https://ada.example/me.jpg'] }],
      [fixtures.repost, { name: ['Grant'], url: ['https://grant.codes/'], photo: ['https://grant.codes/me.jpg'] }],
    ] as const) {
      const html = render(entry, { author, hideAuthor: true });
      assert.equal(html.match(/p-author h-card/g)?.length, 1);
      assert.match(html, /<span class="p-author h-card" hidden="">/);
      assert.doesNotMatch(html, /<grantcodes-post-header|<grantcodes-avatar|>by </);
      assert.deepEqual((parse(html).properties.author[0] as any).properties, expected);
    }
  });

  it('shows a citation author with hideAuthor', () => {
    const html = render(fixtures.reply, { hideAuthor: true });
    const item = parse(html).properties as any;
    assert.equal(item.author[0].properties.name[0], 'Ada Lovelace');
    assert.equal(item['in-reply-to'][0].properties.author[0].properties.name[0], 'Grace Hopper');
    assert.match(html, /<grantcodes-post-header>.*Grace Hopper/);
  });

  it('lets a section be replaced or left out', () => {
    const html = renderToStaticMarkup(
      createElement(Post, {
        entry: fixtures.photo,
        media: null,
        actions: createElement('button', { type: 'button' }, 'Like'),
      }),
    );
    assert.doesNotMatch(html, /<img/);
    assert.match(html, /<div slot="footer"><button type="button">Like<\/button><\/div>/);
  });

  it('renders a converted jf2 item', () => {
    const props = parse(render(jf2ToMf2(fixtures.jf2Reply))).properties as any;
    assert.equal(props['in-reply-to'][0].properties.name[0], 'Compilers are for people');
    assert.equal(props.author[0].properties.name[0], 'Ada Lovelace');
  });
});
