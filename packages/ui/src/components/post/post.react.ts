import { createElement as h, Fragment, type ReactNode } from 'react';
import {
  actionLabel,
  all,
  authorOf,
  categoriesOf,
  citationOptions,
  contentOf,
  contextLabels,
  contextsOf,
  displayUrl,
  first,
  formatDateTime,
  formatRelativeDate,
  hostOf,
  isArticle,
  isItem,
  type Mf2Item,
  mediaColumns,
  type PostOptions,
  photoOf,
  responsesOf,
  text,
  urlOf,
} from '../../mf2.js';
import '../avatar/avatar.js';
import '../button/button.js';
import '../card/card.js';
import '../gallery/gallery.js';
import './index.js';

interface EntryProps {
  entry: Mf2Item;
  options?: PostOptions;
}

const published = (entry: Mf2Item, options: PostOptions) => {
  const iso = text(first(entry, 'published'));
  if (!iso) return null;
  return h('time', { className: 'dt-published', dateTime: iso }, (options.formatDate ?? formatRelativeDate)(iso));
};

/** The entry's author (`p-author h-card`) beside their avatar; nothing when the entry has no author. */
export function EntryHeader({ entry }: EntryProps) {
  const author = authorOf(entry);
  if (!author) return null;
  return h(
    'grantcodes-post-header',
    null,
    h('grantcodes-avatar', { slot: 'avatar', src: author.photo, name: author.name, alt: '', size: 'small' }),
    h(
      author.url ? 'a' : 'span',
      { className: 'p-author h-card', href: author.url },
      h('span', { className: 'p-name' }, author.name),
      author.photo ? h('data', { className: 'u-photo', value: author.photo }) : null,
    ),
  );
}

/** One band per page the entry responds to; embedded citations render as compact `h-cite` posts. */
export function EntryContexts({ entry, options = {} }: EntryProps): ReactNode {
  const contexts = contextsOf(entry);
  if (!contexts.length) return null;
  const rsvp = text(first(entry, 'rsvp'));
  return h(
    Fragment,
    null,
    contexts.map(({ type, property, url, citation }, index): ReactNode =>
      h(
        'grantcodes-post-context',
        { key: `${property}-${url}`, type },
        type === 'rsvp' && index === contexts.findIndex((context) => context.type === 'rsvp')
          ? h(Fragment, null, 'RSVPed ', h('span', { className: 'p-rsvp' }, rsvp), ' to ')
          : `${contextLabels[type]} `,
        // An embedded citation carries the property itself, so the link must not repeat it.
        h('a', { className: citation ? undefined : `u-${property}`, href: url }, displayUrl(url)),
        citation
          ? h(
              'div',
              { slot: 'citation' },
              h(Post, { entry: citation, className: `u-${property} h-cite`, options: citationOptions(options) }),
            )
          : null,
      ),
    ),
  );
}

/** A `grantcodes-gallery` with a fixed column count, so the grid is right before any JS runs. */
const gallery = (columns: number, children: ReactNode, key?: string) =>
  h('grantcodes-gallery', { key, style: { '--gallery-columns': columns } }, children);

/** The featured image, photos, videos and audio, each kind in its own edge-to-edge gallery. */
export function EntryMedia({ entry }: EntryProps) {
  const featured = urlOf(first(entry, 'featured'));
  const photos = all(entry, 'photo').flatMap((value) => photoOf(value) ?? []);
  const video = all(entry, 'video').map(urlOf).filter(Boolean);
  const audio = all(entry, 'audio').map(urlOf).filter(Boolean);
  return h(
    Fragment,
    null,
    featured ? gallery(1, h('img', { className: 'u-featured', src: featured, alt: '' })) : null,
    photos.length
      ? gallery(
          mediaColumns(photos.length),
          photos.map((photo) =>
            h('img', {
              key: photo.src,
              className: 'u-photo',
              src: photo.src,
              alt: photo.alt,
              width: photo.width,
              height: photo.height,
              loading: 'lazy',
            }),
          ),
        )
      : null,
    video.map((src) => gallery(1, h('video', { className: 'u-video', src, controls: true, preload: 'metadata' }), src)),
    audio.map((src) => gallery(1, h('audio', { className: 'u-audio', src, controls: true, preload: 'metadata' }), src)),
  );
}

/**
 * An article's name, then its content: sanitised HTML when `sanitize` is given, else plain text.
 * Compact articles show their summary and a link to the full post instead.
 */
export function EntryContent({ entry, options = {}, children }: EntryProps & { children?: ReactNode }) {
  const article = isArticle(entry);
  const content = contentOf(entry);
  const summary = text(first(entry, 'summary'));
  const url = urlOf(first(entry, 'url'));
  const preview = options.compact && article;

  let body: ReactNode = null;
  if (preview || !content) {
    body = summary ? h('p', { className: 'p-summary' }, summary) : null;
  } else if (content.html !== undefined && options.sanitize) {
    // biome-ignore lint/security/noDangerouslySetInnerHtml: only HTML that went through the caller's sanitize()
    body = h('div', { className: 'e-content', dangerouslySetInnerHTML: { __html: options.sanitize(content.html) } });
  } else {
    body = h('p', { className: 'e-content' }, content.text);
  }

  return h(
    Fragment,
    null,
    article
      ? h(
          'grantcodes-post-title',
          { level: options.headingLevel ?? 2 },
          h('span', { className: 'p-name' }, text(first(entry, 'name'))),
        )
      : null,
    body || children
      ? h('grantcodes-post-content', { collapsible: (options.collapsible && !preview) || undefined }, body, children)
      : null,
    preview && content && url ? h('grantcodes-button', { href: url, variant: 'outline' }, 'Read full post') : null,
  );
}

/** Event times, location or check-in, and an RSVP that is not attached to a reply. */
export function EntryDetails({ entry }: EntryProps) {
  const start = text(first(entry, 'start'));
  const end = text(first(entry, 'end'));
  const rsvp = text(first(entry, 'rsvp'));
  const place = (property: 'location' | 'checkin') => {
    const value = first(entry, property);
    if (value === undefined) return null;
    const name = text(value);
    const url = urlOf(value);
    if (!name) return null;
    const isCard = isItem(value);
    return h(
      'p',
      { key: property },
      'At ',
      h(
        url ? 'a' : 'span',
        { className: `p-${property}${isCard ? ' h-card' : ''}`, href: url || undefined },
        isCard ? h('span', { className: 'p-name' }, name) : name,
      ),
    );
  };
  const rows = [
    start ? h('p', { key: 'start' }, 'Starts ', h('time', { className: 'dt-start', dateTime: start }, formatDateTime(start))) : null,
    end ? h('p', { key: 'end' }, 'Ends ', h('time', { className: 'dt-end', dateTime: end }, formatDateTime(end))) : null,
    place('location'),
    place('checkin'),
    rsvp && !first(entry, 'in-reply-to') ? h('p', { key: 'rsvp' }, 'RSVP: ', h('span', { className: 'p-rsvp' }, rsvp)) : null,
  ].filter(Boolean);
  return rows.length ? h(Fragment, null, rows) : null;
}

const RESPONSE_COUNTS: [string[], string][] = [
  [['like'], 'likes'],
  [['repost'], 'reposts'],
  [['comment'], 'comments'],
  [['mention', 'webmention'], 'mentions'],
];

/** Action and permalink date, fallback author, response counts (compact), categories, syndication. */
export function EntryFooter({ entry, options = {} }: EntryProps) {
  const url = urlOf(first(entry, 'url'));
  const date = published(entry, options);
  const fallbackAuthor = authorOf(entry) ? undefined : options.author;
  const categories = categoriesOf(entry);
  const syndication = all(entry, 'syndication').map(urlOf).filter(Boolean);
  const counts = options.compact
    ? RESPONSE_COUNTS.flatMap(([keys, label]) => {
        const count = keys.reduce((sum, key) => sum + responsesOf(entry, key).length, 0);
        return count ? [`${count} ${label}`] : [];
      })
    : [];

  return h(
    'grantcodes-post-footer',
    { slot: 'footer' },
    h('span', null, `${actionLabel(entry)} `, url ? h('a', { className: 'u-url', href: url }, date ?? 'Permalink') : date),
    fallbackAuthor
      ? h(
          'span',
          null,
          'by ',
          h(fallbackAuthor.url ? 'a' : 'span', { className: 'p-author h-card', href: fallbackAuthor.url }, fallbackAuthor.name),
        )
      : null,
    counts.map((count) => h('span', { key: count }, count)),
    categories.length
      ? h(
          'span',
          null,
          categories.map((name, index) =>
            h(
              Fragment,
              { key: name },
              index ? ' ' : null,
              options.categoryHref
                ? h('a', { href: options.categoryHref(name) }, '#', h('span', { className: 'p-category' }, name))
                : h(Fragment, null, '#', h('span', { className: 'p-category' }, name)),
            ),
          ),
        )
      : null,
    syndication.length
      ? h(
          'span',
          null,
          'Also on ',
          syndication.map((href, index) =>
            h(Fragment, { key: href }, index ? ', ' : null, h('a', { className: 'u-syndication', href }, hostOf(href))),
          ),
        )
      : null,
  );
}

const FACES = [
  { key: 'like', title: 'Likes', verb: 'Liked by' },
  { key: 'repost', title: 'Reposts', verb: 'Reposted by' },
  { key: 'bookmark', title: 'Bookmarks', verb: 'Bookmarked by' },
];

const heading = (title: string, count: number) => `${title} (${count})`;

/**
 * Likes, reposts and bookmarks as faces; comments and mentions as a list. Comments show plain
 * text only: third-party HTML is never rendered.
 */
export function EntryResponses({ entry, options = {} }: EntryProps) {
  if (options.compact) return null;
  const comments = responsesOf(entry, 'comment');
  const mentions = [...responsesOf(entry, 'mention'), ...responsesOf(entry, 'webmention')];
  const faces = FACES.map((group) => ({ ...group, items: responsesOf(entry, group.key) })).filter(({ items }) => items.length);
  if (!faces.length && !comments.length && !mentions.length) return null;

  return h(
    Fragment,
    null,
    faces.map(({ key, title, verb, items }) =>
      h(
        'grantcodes-post-responses',
        { key, variant: 'faces', heading: heading(title, items.length) },
        items.map((item, index) => {
          const author = authorOf(item);
          const label = `${verb} ${author?.name ?? 'someone'}`;
          const href = urlOf(first(item, 'url')) || author?.url;
          return h(
            'a',
            { key: index, className: `p-${key} h-cite`, href, title: label },
            h('grantcodes-avatar', { src: author?.photo, name: author?.name, alt: label, size: 'small' }),
            // The nested h-card blocks the implied u-url, so state it.
            href ? h('data', { className: 'u-url', value: href }) : null,
            author
              ? h(
                  'span',
                  { className: 'p-author h-card', hidden: true },
                  h('span', { className: 'p-name' }, author.name),
                  author.url ? h('data', { className: 'u-url', value: author.url }) : null,
                )
              : null,
          );
        }),
      ),
    ),
    comments.length
      ? h(
          'grantcodes-post-responses',
          { heading: heading('Comments', comments.length) },
          comments.map((item, index) => {
            const author = authorOf(item);
            const url = urlOf(first(item, 'url'));
            const content = contentOf(item)?.text ?? text(first(item, 'name'));
            return h(
              'div',
              { key: index, className: 'p-comment h-cite' },
              h(
                'grantcodes-post-header',
                null,
                h('grantcodes-avatar', { slot: 'avatar', src: author?.photo, name: author?.name, alt: '', size: 'small' }),
                h(
                  author?.url ? 'a' : 'span',
                  { className: 'p-author h-card', href: author?.url },
                  h('span', { className: 'p-name' }, author?.name ?? 'Someone'),
                ),
                url ? h('a', { slot: 'meta', className: 'u-url', href: url }, published(item, options) ?? 'View') : null,
              ),
              h('p', { className: 'p-content' }, content),
            );
          }),
        )
      : null,
    mentions.length
      ? h(
          'grantcodes-post-responses',
          { heading: heading('Mentions', mentions.length) },
          mentions.map((item, index) => {
            const url = urlOf(first(item, 'url'));
            return h(
              url ? 'a' : 'span',
              { key: index, className: 'p-mention h-cite', href: url || undefined },
              text(first(item, 'name')) || authorOf(item)?.name || displayUrl(url),
            );
          }),
        )
      : null,
  );
}

export interface PostProps extends EntryProps {
  /** Root classes; `h-entry` by default, `u-like-of h-cite` and the like for an embedded citation. */
  className?: string;
  /** Renders the card without its frame. */
  flat?: boolean;
  /** Each section replaces the default renderer when given; `null` leaves the section out. */
  header?: ReactNode;
  contexts?: ReactNode;
  media?: ReactNode;
  content?: ReactNode;
  details?: ReactNode;
  responses?: ReactNode;
  footer?: ReactNode;
  /** Controls (like, reply, …) placed in the card's footer after the post's own footer. */
  actions?: ReactNode;
}

const section = (override: ReactNode | undefined, fallback: ReactNode) => (override === undefined ? fallback : override);

/** A microformats2 entry as a card: every mf2 class is in light DOM, so parsers and SSR see it. */
export function Post(props: PostProps): ReactNode {
  const { entry, options = {}, className = 'h-entry', flat, actions } = props;
  const entryProps = { entry, options };
  return h(
    'article',
    { className },
    h(
      'grantcodes-card',
      // The card only detects its footer slot on the client; set it so server-rendered HTML shows it.
      { flat: flat || undefined, hasFooter: props.footer !== null || Boolean(actions) || undefined },
      section(props.header, h(EntryHeader, entryProps)),
      section(props.contexts, h(EntryContexts, entryProps)),
      section(props.media, h(EntryMedia, entryProps)),
      section(props.content, h(EntryContent, entryProps)),
      section(props.details, h(EntryDetails, entryProps)),
      section(props.responses, h(EntryResponses, entryProps)),
      section(props.footer, h(EntryFooter, entryProps)),
      actions ? h('div', { slot: 'footer' }, actions) : null,
    ),
  );
}
