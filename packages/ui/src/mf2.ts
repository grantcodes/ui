/** A parsed microformats2 item, e.g. an `h-entry`, `h-card` or `h-cite`. */
export interface Mf2Item {
  type: string[];
  properties: Record<string, Mf2Value[] | undefined>;
  value?: string;
  children?: Mf2Item[];
}

/** An `e-*` property value. */
export interface Mf2Html {
  html: string;
  value: string;
}

/** A property value: a plain string, an embedded item, `e-*` HTML, or a `u-photo` with `alt`. */
export type Mf2Value = string | Mf2Item | Mf2Html | { value: string; alt?: string };

export interface Mf2Author {
  name: string;
  url?: string;
  photo?: string;
}

export interface Mf2Photo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** Options shared by the Astro and React post renderers. */
export interface PostOptions {
  /** List view: articles show their summary and a link to the full post, and responses are left out. */
  compact?: boolean;
  /** Clip long content behind a "Show more" toggle. */
  collapsible?: boolean;
  /**
   * Cleans `content` HTML before it is rendered. Without it the plain-text value is rendered, so
   * untrusted HTML never reaches the page by default.
   */
  sanitize?: (html: string) => string;
  /** Text for `dt-published`; defaults to `formatRelativeDate`. */
  formatDate?: (iso: string) => string;
  /** Link for a category; without it categories render as text. */
  categoryHref?: (name: string) => string;
  /** Shown as the footer's `p-author h-card` when the entry has no author of its own. */
  author?: Mf2Author;
  /** Heading level of an article's name. Defaults to 2. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

/** Options for an embedded citation: compact, with its name one heading level below the post's. */
export const citationOptions = (options: PostOptions): PostOptions => ({
  ...options,
  compact: true,
  headingLevel: Math.min((options.headingLevel ?? 2) + 1, 6) as PostOptions['headingLevel'],
});

export type ContextType = 'reply' | 'rsvp' | 'like' | 'repost' | 'bookmark' | 'quotation';

export interface Mf2Context {
  type: ContextType;
  /** The mf2 property the URL belongs to, e.g. `in-reply-to`. */
  property: string;
  url: string;
  /** The embedded citation when the property holds an item rather than a URL. */
  citation?: Mf2Item;
}

const CONTEXT_PROPERTIES: [string, ContextType][] = [
  ['in-reply-to', 'reply'],
  ['like-of', 'like'],
  ['repost-of', 'repost'],
  ['bookmark-of', 'bookmark'],
  ['quotation-of', 'quotation'],
];

/** Past-tense verb for each context type, used in the footer ("Liked 2 days ago"). */
export const actionLabels: Record<ContextType, string> = {
  reply: 'Replied',
  rsvp: 'RSVPed',
  like: 'Liked',
  repost: 'Reposted',
  bookmark: 'Bookmarked',
  quotation: 'Quoted',
};

/** Label shown before a context link ("Replied to example.com"). */
export const contextLabels: Record<ContextType, string> = {
  reply: 'Replied to',
  rsvp: 'RSVPed to',
  like: 'Liked',
  repost: 'Reposted',
  bookmark: 'Bookmarked',
  quotation: 'Quoted',
};

export const isItem = (value: unknown): value is Mf2Item =>
  typeof value === 'object' && value !== null && 'properties' in value && 'type' in value;

/** Every value of a property. */
export const all = (entry: Mf2Item, property: string): Mf2Value[] => entry.properties[property] ?? [];

/** The first value of a property. */
export const first = (entry: Mf2Item, property: string): Mf2Value | undefined =>
  entry.properties[property]?.[0];

/** Plain text of a value: the string itself, `value`, or an item's name. */
export function text(value: Mf2Value | undefined): string {
  if (value === undefined) return '';
  if (typeof value === 'string') return value;
  if (isItem(value)) return value.value ?? text(first(value, 'name'));
  return value.value ?? '';
}

/** The URL when it is http(s), mailto or relative; '' for anything else, e.g. `javascript:`. */
export const safeUrl = (url: string) => {
  const trimmed = url.trim();
  return !/^[a-z][a-z\d+.-]*:/i.test(trimmed) || /^(https?|mailto):/i.test(trimmed) ? trimmed : '';
};

/** Safe URL of a value: the string itself, an item's `url`, or `value`. */
export function urlOf(value: Mf2Value | undefined): string {
  if (value === undefined) return '';
  if (typeof value === 'string') return safeUrl(value);
  if (isItem(value)) return urlOf(first(value, 'url')) || safeUrl(value.value ?? '');
  return safeUrl(value.value);
}

/** Host and path of a URL without the scheme, for link text. */
export const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

/** Host name of a URL, or the URL itself when it does not parse. */
export const hostOf = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

/** Category names; tagged people (`h-card` categories) by their name. */
export const categoriesOf = (entry: Mf2Item): string[] => all(entry, 'category').map(text).filter(Boolean);

/** Columns for a media grid: a row of up to three, a 2×2 square for four. */
export const mediaColumns = (count: number) => (count === 4 ? 2 : Math.min(Math.max(count, 1), 3));

/** The first `author` as a name, URL and photo. A bare URL becomes both name and URL. */
export function authorOf(entry: Mf2Item): Mf2Author | undefined {
  const author = first(entry, 'author');
  if (author === undefined) return undefined;
  if (!isItem(author)) {
    const value = text(author);
    if (!value) return undefined;
    return /^https?:\/\//.test(value) ? { name: displayUrl(value), url: value } : { name: value };
  }
  const url = urlOf(first(author, 'url')) || undefined;
  const name = text(first(author, 'name')) || (url ? displayUrl(url) : '');
  if (!name) return undefined;
  return { name, url, photo: urlOf(first(author, 'photo')) || undefined };
}

/** A `u-photo` value as an image source, alt text and (when the publisher recorded them) dimensions. */
export function photoOf(value: Mf2Value): Mf2Photo | undefined {
  const src = urlOf(value);
  if (!src) return undefined;
  if (typeof value === 'string' || isItem(value)) return { src, alt: '' };
  const { alt = '', width, height } = value as { alt?: string; width?: number; height?: number };
  return { src, alt, width, height };
}

/** `content` as HTML (when it has any) and plain text. */
export function contentOf(entry: Mf2Item): { html?: string; text: string } | undefined {
  const content = first(entry, 'content');
  if (content === undefined) return undefined;
  if (typeof content === 'object' && 'html' in content) return { html: content.html, text: content.value };
  const value = text(content);
  return value ? { text: value } : undefined;
}

/** The pages this entry responds to, in display order. */
export function contextsOf(entry: Mf2Item): Mf2Context[] {
  const rsvp = text(first(entry, 'rsvp'));
  return CONTEXT_PROPERTIES.flatMap(([property, kind]) =>
    all(entry, property).flatMap((value): Mf2Context[] => {
      const url = urlOf(value);
      if (!url) return [];
      const type = kind === 'reply' && rsvp ? 'rsvp' : kind;
      return [{ type, property, url, citation: isItem(value) ? value : undefined }];
    }),
  );
}

/** Past-tense verb for what the entry does: "Liked", "Replied", … or "Posted". */
export function actionLabel(entry: Mf2Item): string {
  const [context] = contextsOf(entry);
  if (context) return actionLabels[context.type];
  return text(first(entry, 'rsvp')) ? actionLabels.rsvp : 'Posted';
}

/** Post-type discovery's article check: a name that is not just the start of the content. */
export function isArticle(entry: Mf2Item): boolean {
  const name = text(first(entry, 'name')).replace(/\s+/g, ' ').trim();
  if (!name) return false;
  const content = (contentOf(entry)?.text ?? text(first(entry, 'summary'))).replace(/\s+/g, ' ').trim();
  return !content.startsWith(name);
}

/** Responses of one kind (`like`, `comment`, `mention`, …) that carry their own properties. */
export const responsesOf = (entry: Mf2Item, property: string): Mf2Item[] =>
  all(entry, property).filter(isItem);

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['day', 86_400],
  ['hour', 3_600],
  ['minute', 60],
];

/** "now", "5 minutes ago", "3 days ago"; a short absolute date from a week out. */
export function formatRelativeDate(iso: string, now = new Date(), locale?: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const seconds = Math.round((date.getTime() - now.getTime()) / 1000);
  if (Math.abs(seconds) >= 7 * 86_400) {
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  }
  const format = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return format.format(Math.trunc(seconds / size), unit);
  }
  return format.format(0, 'second');
}

/** A medium date and short time, for event start and end. */
export function formatDateTime(iso: string, locale?: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(locale, { dateStyle: 'medium', timeStyle: 'short' });
}

type Jf2 = Record<string, unknown>;

const PRIVATE_JF2_KEYS = new Set(['type', 'children', 'refs', 'references']);

const kebab = (key: string) => key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const isJf2Object = (value: unknown): value is Jf2 =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Converts a jf2 item (e.g. from a Microsub server) to mf2. camelCase keys become kebab-case,
 * `content` `{html, text}` becomes `{html, value}`, and response URLs found in `refs` (an
 * array) or `references` (keyed by URL) become embedded `h-cite`s.
 */
export function jf2ToMf2(item: Jf2): Mf2Item {
  const references = new Map<string, Jf2>();
  if (Array.isArray(item.refs)) {
    for (const ref of item.refs) if (isJf2Object(ref) && typeof ref.url === 'string') references.set(ref.url, ref);
  }
  if (isJf2Object(item.references)) {
    for (const [url, ref] of Object.entries(item.references)) if (isJf2Object(ref)) references.set(url, ref);
  }

  const contextProperties = new Set(CONTEXT_PROPERTIES.map(([property]) => property));
  const properties: Mf2Item['properties'] = {};
  for (const [key, raw] of Object.entries(item)) {
    if (key.startsWith('_') || PRIVATE_JF2_KEYS.has(key) || raw == null) continue;
    const property = kebab(key);
    const values = (Array.isArray(raw) ? raw : [raw]).flatMap((value): Mf2Value[] => {
      const ref = typeof value === 'string' && contextProperties.has(property) ? references.get(value) : undefined;
      if (ref) return [{ ...jf2ToMf2({ url: value, ...ref }), type: ['h-cite'] }];
      if (typeof value === 'string') return [value];
      if (typeof value === 'number' || typeof value === 'boolean') return [String(value)];
      if (!isJf2Object(value)) return [];
      if (typeof value.type === 'string') return [jf2ToMf2(value)];
      if (property === 'content' && (typeof value.html === 'string' || typeof value.text === 'string')) {
        const plain = String(value.text ?? value.value ?? '');
        return [typeof value.html === 'string' ? { html: value.html, value: plain } : plain];
      }
      if (typeof value.value === 'string') return [{ ...value, value: value.value }];
      return [];
    });
    if (values.length) properties[property] = values;
  }

  const type = typeof item.type === 'string' ? item.type : 'entry';
  const children = Array.isArray(item.children) ? item.children.filter(isJf2Object).map(jf2ToMf2) : undefined;
  return { type: [`h-${type}`], properties, ...(children?.length ? { children } : {}) };
}
