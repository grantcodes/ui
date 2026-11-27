import type { Mf2Item } from '../mf2.js';

// Shared by the React (packages/ui) and Astro (packages/astro) mf2 contract tests and the stories.

const ada = {
  type: ['h-card'],
  properties: { name: ['Ada Lovelace'], url: ['https://ada.example/'], photo: ['https://ada.example/me.jpg'] },
};

const grace = {
  type: ['h-card'],
  properties: { name: ['Grace Hopper'], url: ['https://grace.example/'], photo: ['https://grace.example/me.jpg'] },
};

export const note: Mf2Item = {
  type: ['h-entry'],
  properties: {
    author: [ada],
    url: ['https://ada.example/notes/1'],
    published: ['2026-01-08T12:00:00Z'],
    content: [{ html: '<p>A short note about the <b>harbour</b>.</p>', value: 'A short note about the harbour.' }],
    category: ['walks', 'harbour'],
    syndication: ['https://social.example/@ada/1'],
  },
};

export const article: Mf2Item = {
  type: ['h-entry'],
  properties: {
    author: [ada],
    name: ['On the value of small tools'],
    summary: ['Why short feedback loops change how software is made.'],
    url: ['https://ada.example/articles/small-tools'],
    published: ['2026-01-01T09:00:00Z'],
    content: [{ html: '<p>Small tools do one thing well.</p>', value: 'Small tools do one thing well.' }],
  },
};

export const photo: Mf2Item = {
  type: ['h-entry'],
  properties: {
    author: [ada],
    url: ['https://ada.example/photos/1'],
    published: ['2026-01-05T18:00:00Z'],
    photo: [
      { value: 'https://picsum.photos/seed/harbour-1/1200/800', alt: 'Boats at dusk' },
      'https://picsum.photos/seed/harbour-2/1200/800',
      'https://picsum.photos/seed/harbour-3/1200/800',
    ],
    content: ['Harbour at dusk.'],
  },
};

export const reply: Mf2Item = {
  type: ['h-entry'],
  properties: {
    author: [ada],
    url: ['https://ada.example/replies/1'],
    published: ['2026-01-09T10:00:00Z'],
    'in-reply-to': [
      {
        type: ['h-cite'],
        properties: {
          url: ['https://grace.example/posts/compilers'],
          name: ['Compilers are for people'],
          author: [grace],
          content: ['Programs are written for people to read.'],
        },
      },
    ],
    content: ['Agreed — and for the people who maintain them.'],
  },
};

export const like: Mf2Item = {
  type: ['h-entry'],
  properties: {
    author: [ada],
    url: ['https://ada.example/likes/1'],
    published: ['2026-01-09T11:00:00Z'],
    'like-of': ['https://grace.example/posts/compilers'],
  },
};

export const repost: Mf2Item = {
  type: ['h-entry'],
  properties: {
    url: ['https://ada.example/reposts/1'],
    published: ['2026-01-09T11:30:00Z'],
    'repost-of': ['https://grace.example/posts/nanoseconds'],
  },
};

export const rsvp: Mf2Item = {
  type: ['h-entry'],
  properties: {
    author: [ada],
    url: ['https://ada.example/rsvps/1'],
    published: ['2026-01-09T12:00:00Z'],
    'in-reply-to': ['https://grace.example/events/meetup'],
    rsvp: ['yes'],
    content: ['See you there!'],
  },
};

export const event: Mf2Item = {
  type: ['h-entry'],
  properties: {
    author: [ada],
    name: ['Harbour meetup'],
    url: ['https://ada.example/events/1'],
    published: ['2026-01-02T08:00:00Z'],
    start: ['2026-02-01T18:00:00Z'],
    end: ['2026-02-01T21:00:00Z'],
    location: [{ type: ['h-card'], properties: { name: ['The Harbour Inn'], url: ['https://harbour.example/'] } }],
    content: [{ html: '<p>Drinks and small tools.</p>', value: 'Drinks and small tools.' }],
  },
};

export const withResponses: Mf2Item = {
  type: ['h-entry'],
  properties: {
    ...note.properties,
    like: [{ type: ['h-cite'], properties: { url: ['https://grace.example/likes/9'], author: [grace] } }],
    comment: [
      {
        type: ['h-cite'],
        properties: {
          url: ['https://grace.example/replies/9'],
          author: [grace],
          published: ['2026-01-09T09:00:00Z'],
          content: [{ html: '<img src=x onerror=alert(1)>Lovely', value: 'Lovely' }],
        },
      },
    ],
    mention: [{ type: ['h-cite'], properties: { url: ['https://blog.example/post'], name: ['A post that mentions this'] } }],
  },
};

/** A jf2 timeline item as a Microsub server returns it. */
export const jf2Reply = {
  _id: 'reply-1',
  _is_read: false,
  type: 'entry',
  url: 'https://ada.example/replies/2',
  published: '2026-01-09T10:00:00Z',
  author: { type: 'card', name: 'Ada Lovelace', url: 'https://ada.example/', photo: 'https://ada.example/me.jpg' },
  inReplyTo: ['https://grace.example/posts/compilers'],
  content: { html: '<p>Agreed.</p>', text: 'Agreed.' },
  refs: [{ type: 'entry', url: 'https://grace.example/posts/compilers', name: 'Compilers are for people' }],
};
