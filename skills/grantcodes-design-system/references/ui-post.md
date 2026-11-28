# Posts (microformats2)

Render IndieWeb posts as cards that carry microformats2 (`h-entry`, `h-card`, `h-cite`). mf2 parsers ignore shadow DOM, so every mf2 class lives in light DOM: the `grantcodes-post-*` section components only lay out what is slotted into them.

## Renderers (preferred)

Pass a parsed mf2 item (`{ type, properties }`) to `Post`. It renders `<article class="h-entry">` around a `grantcodes-card` with header, contexts, media, content, details, responses and footer.

```astro
---
import { Post, jf2ToMf2 } from '@grantcodes/astro/post'
---
<Post entry={entry} options={{ compact: true, sanitize, categoryHref: (name) => `/tags/${name}` }}>
  <Fragment slot="media"><MyGallery photos={entry.properties.photo} /></Fragment>
</Post>
```

```tsx
import { Post } from '@grantcodes/ui/react'
import { jf2ToMf2 } from '@grantcodes/ui/mf2'

<Post entry={jf2ToMf2(item)} options={{ collapsible: true, sanitize }} actions={<LikeButton />} />
```

- **Options** (`PostOptions` from `@grantcodes/ui/mf2`):
  - `compact`: list view. Articles show `p-summary` plus "Read full post", responses are hidden, and the footer shows response counts.
  - `collapsible`: clip long content behind "Show more".
  - `sanitize(html)`: required for `content` HTML; without it the plain-text value renders.
  - `formatDate(iso)`: defaults to relative ("2 days ago", absolute after a week).
  - `categoryHref(name)`: without it categories render as text.
  - `author`: footer `h-card` for entries without an author.
  - `hideAuthor`: keep the author's `p-author h-card` (with `u-url`/`u-photo`) as a `hidden` element for parsers, with no avatar row or "by …" footer item. Citations still show their author.
  - `headingLevel`: for an article's `p-name`; default 2.
- **Sections:** `EntryHeader`, `EntryContexts`, `EntryMedia`, `EntryContent`, `EntryDetails`, `EntryFooter`, `EntryResponses` — each takes `{ entry, options }` and can be used alone.
- **Replacing a section:** Astro uses a named slot of the same name (`header`, `contexts`, `media`, `content`, `details`, `responses`, `footer`). React uses a prop of the same name; `null` leaves the section out. To leave a section out in Astro, compose the `Entry*` sections yourself.
- **Actions:** the `actions` slot/prop goes in the card footer after the post footer. React's `EntryFooter` already carries `slot="footer"`; give a replacement footer the same slot.
- **Flat:** `flat` drops the card frame.
- **Citations:** embedded citations (a context property holding an `h-cite`) render as nested compact `h-cite` posts.
- **jf2:** `jf2ToMf2()` converts Microsub items, turning `refs`/`references` into citations.

## Trust boundaries

- `content` HTML renders only through the caller's `sanitize`. Comments and mentions always render as plain text.
- URLs pass through `safeUrl`: only http(s), mailto and relative URLs are kept; `javascript:` and other schemes are dropped.

## Section components

| Element | Slots / attributes | Notes |
| --- | --- | --- |
| `grantcodes-post-header` | `avatar`, default (name), `meta` | Author row; also used for comments |
| `grantcodes-post-context` | default (label + link), `citation`; `type` = reply, rsvp, like, repost, bookmark, quotation | Edge-to-edge band with an icon |
| `grantcodes-post-content` | default; `collapsible` | Clips after JS measures overflow; content stays visible without JS; focusing inside expands |
| `grantcodes-post-footer` | default | Dot separators between slotted elements; place it in the card's `footer` slot |
| `grantcodes-post-responses` | default; `heading`, `variant` = list or faces | One group of likes, comments, …; full-width section under a divider inside a card |
| `grantcodes-post-title` | default (title text); `level` 1–6 | Heading in shadow DOM at the h3 size, so page heading styles do not blow it up; put `p-name` on a slotted span |

Media renders in `grantcodes-gallery` (`--gallery-columns` set inline; plain `<img class="u-photo">` children, never `grantcodes-gallery-image`, whose image is in shadow DOM where mf2 parsers miss it). Edge-to-edge sections and the gallery read `--g-card-padding`, which `grantcodes-card` sets on its content, so they only bleed inside a card.

The header shows the author only when the entry has one (hidden with `hideAuthor`); `header={null}` (React) or a `header` slot (Astro) removes or replaces it. Page styles reach light-DOM content (`e-content`, paragraphs) and beat `::slotted()`, so content typography is the consumer's.
