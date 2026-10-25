# Structured content components

Use these for fixed content patterns; compose Card/Container/native HTML when the structure doesn't fit. In Astro prefer the corresponding block from the [catalogue](catalogue.md): blocks take objects/arrays, whereas these UI components mostly take JSON **strings**. React wrappers have the same UI string contracts.

Each section gives an exact register import and minimum HTML. JSON examples use single-quoted attributes containing valid JSON. In Lit/React use JSON.stringify(data) for these string properties. Malformed JSON is usually swallowed; valid JSON with the wrong shape can still throw. Validate data and safe URLs first. None of these supplies custom events or declared parts. Except Hero's default slot, they render from data rather than slots.

## Hero

Import `@grantcodes/ui/components/hero/hero.js`; React: Hero.

```html
<grantcodes-hero title="Build together" subtitle="Tools for local teams" button="Explore" href="/projects" size="md" center></grantcodes-hero>
```

Properties title/subtitle/button/href, size sm/md/lg (md), center false. CTA appears only with both button and href. Default slot accepts extra media/content; no image property. Renders h1: use an appropriate page heading hierarchy, not multiple decorative h1s. Alternatives: Cta for an in-page call to action, MediaText for paired media. Tokens include `--g-color-background-primary-knockout`, `--g-color-content-primary-knockout`, `--g-typography-h1-font`, `--g-spacing-2xl`.

## Cta

Import `@grantcodes/ui/components/cta/cta.js`; React: Cta.

```html
<grantcodes-cta title="Join the project" text="Help your neighbourhood" primary-action='{"label":"Join","href":"/join"}' align="center"></grantcodes-cta>
```

Properties eyebrow/title/text, primaryAction/secondaryAction JSON strings (attributes primary-action/secondary-action), align left/center (center). Action shape { label, href }. Renders h2 and links, not form actions. Use ButtonGroup for actual command buttons. Tokens: `--g-color-background-subtle`, `--g-color-content-default`, `--g-color-content-primary`, `--g-spacing-3xl`.

## FeatureList

Import `@grantcodes/ui/components/feature-list/feature-list.js`; React: FeatureList.

```html
<grantcodes-feature-list title="Included" items='[{"title":"Private projects","description":"Invite your team","icon":"lock","href":"/privacy"}]' columns="3"></grantcodes-feature-list>
```

Properties title/subtitle, items JSON array of { title, description?, icon?, href? }, columns (3 default; choose 1–4). Icon resolves a bundled Lucide kebab-case name; unknown names render no icon. This is not Icon's API. Optional section h2 and item h3; provide meaningful headings/link text. Alternatives: plain list or Cards for richer content. Tokens: `--g-color-content-primary`, `--g-color-background-primary`, `--g-spacing-xl`, `--g-typography-h5-font`.

## Stats

Import `@grantcodes/ui/components/stats/stats.js`; React: Stats.

```html
<grantcodes-stats title="Our impact" items='[{"label":"Projects","value":"42","context":"This year"}]' columns="4"></grantcodes-stats>
```

Properties title, items JSON array of { label, value, context? }, columns (4 default; choose 1–6). Value is display text, not a calculated number. Pair every value with a meaningful label/context. Alternative: SplitBar for proportions, table for comparisons. Tokens: `--g-color-background-subtle`, `--g-color-content-primary`, `--g-typography-h2-font`, `--g-spacing-xl`.

## LogoCloud

Import `@grantcodes/ui/components/logo-cloud/logo-cloud.js`; React: LogoCloud.

```html
<grantcodes-logo-cloud title="Partners" logos='[{"name":"Example","src":"/example.svg","alt":"Example","href":"/partners/example"}]'></grantcodes-logo-cloud>
```

Properties title and logos JSON array of { name, src, alt?, href? }. Name labels linked logos; alt falls back to name. Check image rights and useful accessible names. Alternative: Gallery for photos/captions. Tokens: `--g-color-border-default`, `--g-color-content-subtle`, `--g-spacing-lg`.

## Testimonials

Import `@grantcodes/ui/components/testimonials/testimonials.js`; React: Testimonials.

```html
<grantcodes-testimonials title="From our community" items='[{"quote":"Easy to collaborate","name":"Ada","company":"Example"}]' layout="cards"></grantcodes-testimonials>
```

Properties title, items JSON array { quote, name, role?, company?, avatar? }, layout cards/list (cards). Composes Card and Person. Keep attribution meaningful and quotes as text; no HTML injection. Alternative: native blockquote for a bespoke testimonial. Tokens: `--g-color-content-default`, `--g-typography-h3-font`, `--g-spacing-xl`.

## Pricing

Import `@grantcodes/ui/components/pricing/pricing.js`; React: Pricing.

```html
<grantcodes-pricing title="Plans" tiers='[{"name":"Community","price":"Free","features":[{"text":"Shared projects","included":true}],"cta":{"label":"Start","href":"/join"},"highlighted":false}]'></grantcodes-pricing>
```

Properties title/subtitle and tiers JSON array: { name, price, period?, description?, features: [{ text, included }], cta: { label, href }, highlighted? }. Include cta and explicit included booleans; raw UI data does not apply Astro schema defaults. Textual “Not included” accompanies excluded features. No billing/toggle/checkout logic. Alternative: table for detailed comparisons. Tokens: `--g-color-border-primary`, `--g-color-background-subtle`, `--g-color-content-primary`, `--g-box-shadow-lg`.

## Newsletter

Import `@grantcodes/ui/components/newsletter/newsletter.js`; React: Newsletter.

```html
<grantcodes-newsletter title="Stay informed" action="/subscribe" method="post" button-label="Subscribe" disclaimer="Unsubscribe at any time."></grantcodes-newsletter>
```

Properties title/text/action, method get/post (post), placeholder (“Your email address”), buttonLabel (“Subscribe”, attribute button-label), disclaimer. Contains a labelled required native email control named email and native submit button. Supply a real endpoint with server validation/abuse protection; this is not a subscription service. Alternative: FormField composition for custom fields or consent. Tokens: `--g-color-background-primary-knockout`, `--g-color-content-knockout`, `--g-button-color-background`, `--g-button-color-border`.

## MediaText

Import `@grantcodes/ui/components/media-text/media-text.js`; React: MediaText.

```html
<grantcodes-media-text title="Our space" text="Room to build together" media='{"src":"/space.jpg","alt":"Workshop benches","width":800,"height":600,"loading":"lazy"}'></grantcodes-media-text>
```

Properties title/text, media JSON object { src, alt?, kind?: image|video, width?, height?, poster?, loading? }, reverse false, cta JSON { label, href }. Image loading defaults eager. Video has controls and an accessible label from alt, but there is no caption-track prop/slot; use native video composition when captions are needed. Alternative: Hero for the page introduction. Tokens: `--g-border-radius-md`, `--g-color-content-default`, `--g-color-content-subtle`, `--g-spacing-3xl`.

## Map

Import `@grantcodes/ui/components/map/map.js`; React: **MapEmbed**.

```html
<grantcodes-map lat="51.5" lng="-0.12" zoom="14" label="Workshop location" directions-url="https://www.openstreetmap.org/" height="20rem"></grantcodes-map>
```

lat/lng are strings, zoom defaults 14 (use 1–18), label defaults Map, height accepts CSS length. `directions-url` is also the literal JS property name, not directionsUrl (Astro translates its own camelCase prop). Without coordinates renders nothing. Uses a lazy OpenStreetMap iframe and external directions link; consider consent/CSP and provide a textual address/link alternative. Not a programmable map SDK. Browser APIs require client-only handling in Astro. Hooks: `--g-map-filter` is set by the component from colour scheme, plus `--g-color-border-default`, `--g-border-radius-md`.

## Countdown

Import `@grantcodes/ui/components/countdown/countdown.js`; React: Countdown.

```html
<grantcodes-countdown target="2030-06-01T12:00:00Z" past-message="The event has started!"></grantcodes-countdown>
```

target is an ISO datetime including timezone. Unit properties and attributes are literally days-label/hours-label/minutes-label/seconds-label; past-message and show-seconds also remain hyphenated in JS/React. show-seconds false; otherwise ticks every second rather than minute. No finish event or slot. Missing target renders nothing; invalid date is not validated. Give the event date visibly outside the timer and avoid per-second live announcements. Browser lifecycle means Astro's block uses client-only. Tokens: `--g-color-content-default`, `--g-color-content-subtle`, `--g-typography-h1-font-size`, `--g-spacing-lg`.
