import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';
import {
  actionLabel,
  authorOf,
  contentOf,
  contextsOf,
  formatRelativeDate,
  hasTitle,
  isArticle,
  jf2ToMf2,
  type Mf2Item,
  photoOf,
} from './mf2.js';

const entry = (properties: Mf2Item['properties']): Mf2Item => ({ type: ['h-entry'], properties });

describe('mf2 helpers', () => {
  it('reads an author from an h-card, a bare URL or a name', () => {
    const card = { type: ['h-card'], properties: { name: ['Ada'], url: ['https://ada.example/'], photo: ['https://ada.example/me.jpg'] } };
    assert.deepEqual(authorOf(entry({ author: [card] })), {
      name: 'Ada',
      url: 'https://ada.example/',
      photo: 'https://ada.example/me.jpg',
    });
    assert.deepEqual(authorOf(entry({ author: ['https://ada.example/'] })), { name: 'ada.example', url: 'https://ada.example/' });
    assert.deepEqual(authorOf(entry({ author: ['Ada'] })), { name: 'Ada' });
    assert.equal(authorOf(entry({})), undefined);
  });

  it('lists response contexts in order, keeping embedded citations', () => {
    const cite = { type: ['h-cite'], properties: { url: ['https://b.example/'], name: ['B'] } };
    const contexts = contextsOf(entry({ 'like-of': [cite], 'in-reply-to': ['https://a.example/'] }));
    assert.deepEqual(
      contexts.map(({ type, url, citation }) => [type, url, citation?.properties.name?.[0]]),
      [
        ['reply', 'https://a.example/', undefined],
        ['like', 'https://b.example/', 'B'],
      ],
    );
  });

  it('turns a reply with an rsvp into an rsvp context', () => {
    const rsvp = entry({ 'in-reply-to': ['https://event.example/'], rsvp: ['yes'] });
    assert.equal(contextsOf(rsvp)[0].type, 'rsvp');
    assert.equal(actionLabel(rsvp), 'RSVPed');
    assert.equal(actionLabel(entry({ 'repost-of': ['https://a.example/'] })), 'Reposted');
    assert.equal(actionLabel(entry({ content: ['Hi'] })), 'Posted');
  });

  it('reads photos with alt text and recorded dimensions', () => {
    assert.deepEqual(photoOf('https://a.example/1.jpg'), { src: 'https://a.example/1.jpg', alt: '' });
    assert.deepEqual(photoOf({ value: 'https://a.example/2.jpg', alt: 'Harbour', width: 800, height: 600 } as never), {
      src: 'https://a.example/2.jpg',
      alt: 'Harbour',
      width: 800,
      height: 600,
    });
  });

  it('tells articles from notes by whether the name repeats the content', () => {
    assert.equal(isArticle(entry({ name: ['Small tools'], content: [{ html: '<p>Body</p>', value: 'Body' }] })), true);
    assert.equal(isArticle(entry({ name: ['A short note'], content: ['A short note about the morning'] })), false);
    assert.equal(isArticle(entry({ content: ['No name'] })), false);
    // Post-type discovery: responses and media win over a name.
    const named = { name: ['Worth reading'], content: ['Some thoughts.'] };
    assert.equal(isArticle(entry({ ...named, 'bookmark-of': ['https://a.example/'] })), false);
    assert.equal(isArticle(entry({ ...named, photo: ['https://a.example/1.jpg'] })), false);
    // ...but their name is still a title.
    assert.equal(hasTitle(entry({ ...named, photo: ['https://a.example/1.jpg'] })), true);
    assert.equal(hasTitle(entry({ name: ['A short note'], content: ['A short note about the morning'] })), false);
  });

  it('formats recent dates relatively and older ones absolutely', () => {
    const now = new Date('2026-01-10T12:00:00Z');
    assert.equal(formatRelativeDate('2026-01-10T11:59:50Z', now, 'en'), 'now');
    assert.equal(formatRelativeDate('2026-01-10T11:55:00Z', now, 'en'), '5 minutes ago');
    assert.equal(formatRelativeDate('2026-01-08T12:00:00Z', now, 'en'), '2 days ago');
    assert.equal(formatRelativeDate('2025-12-01T12:00:00Z', now, 'en-GB'), '1 Dec 2025');
    assert.equal(formatRelativeDate('not a date', now, 'en'), 'not a date');
  });
});

describe('jf2ToMf2', () => {
  it('converts a microsub entry, embedding its refs as citations', () => {
    const mf2 = jf2ToMf2({
      _id: 'x',
      _is_read: false,
      type: 'entry',
      name: 'Re: tools',
      url: 'https://me.example/1',
      published: '2026-01-01T00:00:00Z',
      author: { type: 'card', name: 'Ada', url: 'https://ada.example/', photo: 'https://ada.example/me.jpg' },
      content: { html: '<p>Hi</p>', text: 'Hi' },
      category: ['tools', 'craft'],
      inReplyTo: ['https://b.example/post'],
      likeOf: 'https://c.example/',
      refs: [{ type: 'entry', url: 'https://b.example/post', name: 'Original', content: { text: 'Original text' } }],
    });

    assert.deepEqual(mf2.type, ['h-entry']);
    assert.equal(mf2.properties._id, undefined);
    assert.equal(mf2.properties.refs, undefined);
    assert.deepEqual(mf2.properties.content, [{ html: '<p>Hi</p>', value: 'Hi' }]);
    assert.deepEqual(mf2.properties.category, ['tools', 'craft']);
    assert.deepEqual(mf2.properties['like-of'], ['https://c.example/']);
    assert.deepEqual(authorOf(mf2), { name: 'Ada', url: 'https://ada.example/', photo: 'https://ada.example/me.jpg' });
    assert.deepEqual(contentOf(mf2), { html: '<p>Hi</p>', text: 'Hi' });

    const [reply] = contextsOf(mf2);
    assert.equal(reply.url, 'https://b.example/post');
    assert.deepEqual(reply.citation?.type, ['h-cite']);
    assert.deepEqual(reply.citation?.properties.content, ['Original text']);
  });

  it('accepts references keyed by URL and plain-text content', () => {
    const mf2 = jf2ToMf2({
      type: 'entry',
      'repost-of': 'https://b.example/',
      content: 'Plain',
      references: { 'https://b.example/': { type: 'entry', name: 'B' } },
    });
    assert.deepEqual(mf2.properties.content, ['Plain']);
    assert.equal(contextsOf(mf2)[0].citation?.properties.url?.[0], 'https://b.example/');
  });
});
