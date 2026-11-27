import { html } from 'lit';
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { jf2ToMf2, type Mf2Item, type PostOptions } from '../../mf2.js';
import * as fixtures from '../../test-utils/mf2-fixtures.js';
import { Post, type PostProps } from './post.react.js';
import './index.js';
import '../avatar/avatar.js';
import '../card/card.js';

// The fixtures are trusted, so the stories pass their HTML through unchanged.
const sanitize = (markup: string) => markup;

/** Renders the React `Post` renderer, the same markup the Astro renderer produces. */
const renderPost = (entry: Mf2Item, options: PostOptions = {}, props: Partial<PostProps> = {}) => {
  const container = document.createElement('div');
  container.style.maxInlineSize = '36rem';
  createRoot(container).render(createElement(Post, { entry, options: { sanitize, ...options }, ...props }));
  return container;
};

const meta = {
  title: 'Components/Post',
  parameters: {
    docs: {
      description: {
        component:
          'mf2 post renderers (`Post` from `@grantcodes/ui/react` and `@grantcodes/astro/post`) built from the `grantcodes-post-*` section components and `grantcodes-card`. All microformats are in light DOM.',
      },
    },
  },
};

export default meta;

export const Note = { render: () => renderPost(fixtures.note) };

export const Article = { render: () => renderPost(fixtures.article) };

/** List view: an article shows its summary and a link to the full post. */
export const ArticleCompact = { render: () => renderPost(fixtures.article, { compact: true }) };

export const Photos = { render: () => renderPost(fixtures.photo) };

/** Four photos form a 2×2 square. */
export const FourPhotos = {
  render: () =>
    renderPost({
      ...fixtures.photo,
      properties: { ...fixtures.photo.properties, photo: [1, 2, 3, 4].map((n) => `https://picsum.photos/seed/four-${n}/800/800`) },
    }),
};

/** An embedded `h-cite` renders as a compact post inside the context band. */
export const ReplyWithCitation = { render: () => renderPost(fixtures.reply) };

/** A bare URL context, and a post without an author falling back to `options.author`. */
export const Repost = {
  render: () => renderPost(fixtures.repost, { author: { name: 'Grant Richmond', url: 'https://grant.codes/' } }),
};

export const Like = { render: () => renderPost(fixtures.like) };

export const Rsvp = { render: () => renderPost(fixtures.rsvp) };

export const Event = { render: () => renderPost(fixtures.event) };

export const Responses = { render: () => renderPost(fixtures.withResponses) };

/** Compact posts show response counts in the footer instead. */
export const ResponseCounts = { render: () => renderPost(fixtures.withResponses, { compact: true }) };

/** Long content is clipped behind "Show more"; focusing a link inside it expands it too. */
export const Collapsible = {
  render: () =>
    renderPost(
      {
        ...fixtures.note,
        properties: {
          ...fixtures.note.properties,
          content: [
            {
              html: Array.from(
                { length: 12 },
                (_, n) => `<p>Paragraph ${n + 1} of a long post, with <a href="#p${n}">a link</a> to tab into.</p>`,
              ).join(''),
              value: 'A long post',
            },
          ],
        },
      },
      { collapsible: true },
    ),
};

/** A Microsub jf2 item converted with `jf2ToMf2`, its `refs` becoming the citation. */
export const FromJf2 = { render: () => renderPost(jf2ToMf2(fixtures.jf2Reply)) };

/** `flat` drops the card frame; `actions` go in the card footer after the post footer. */
export const FlatWithActions = {
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding: 1rem; background: var(--g-color-background-subtle);';
    wrapper.append(
      renderPost(fixtures.note, {}, { flat: true, actions: createElement('button', { type: 'button' }, 'Like') }),
    );
    return wrapper;
  },
};

/** The section components are usable on their own with hand-written mf2 markup. */
export const SectionsOnly = {
  render: () => html`
    <div style="display: grid; gap: 1rem; max-inline-size: 36rem;">
      <grantcodes-post-header>
        <grantcodes-avatar slot="avatar" name="Ada Lovelace"></grantcodes-avatar>
        <a class="p-author h-card" href="https://ada.example/">Ada Lovelace</a>
        <span slot="meta">ada.example</span>
      </grantcodes-post-header>
      <grantcodes-post-context type="bookmark">
        Bookmarked <a class="u-bookmark-of" href="https://example.com/">example.com</a>
      </grantcodes-post-context>
      <grantcodes-post-footer>
        <span>Posted <a class="u-url" href="#"><time class="dt-published" datetime="2026-01-08">8 Jan 2026</time></a></span>
        <span>#<span class="p-category">walks</span></span>
        <span>Also on <a class="u-syndication" href="#">social.example</a></span>
      </grantcodes-post-footer>
    </div>
  `,
};
