/**
 * Sveltia CMS Preview Templates — Main Entry
 *
 * Compiled by Vite's OXC JSX transform (classic runtime with h/Fragment).
 * Bundled via the inline <script type="module"> import in the admin page.
 *
 * Architecture:
 * - Per-block components (imported from blocks/) use JSX syntax compiled to
 *   h(...) calls against window.h (Sveltia's React.createElement alias).
 * - PagePreview and BlockRenderer use raw h() calls to bridge Sveltia's
 *   Immutable.js entry data to our flat JSX block components.
 *   This avoids JSX issues with Immutable.js props (.getIn, .toJS, .toArray).
 * - Theme CSS is imported as raw strings and injected into the preview
 *   iframe via CMS.registerPreviewStyle() with { raw: true }.
 */

// Side-effect import: ensures @sveltia/cms evaluates (setting window.h,
// window.CMS) before any per-block component's const h = window.h runs.
import '@sveltia/cms'

const h = window.h


import {
  HeroPreview,
  TextPreview,
  GalleryPreview,
  AccordionPreview,
  CardsPreview,
  CtaPreview,
  FeatureListPreview,
  StatsPreview,
  LogoCloudPreview,
  TestimonialsPreview,
  PricingPreview,
  NewsletterPreview,
  MediaTextPreview,
  MapPreview,
  CountdownPreview,
  FormPreview,
} from './blocks/index.jsx'


// ── Block component map ───────────────────────────────────────────
var BLOCK_COMPONENTS = {
  hero: HeroPreview,
  text: TextPreview,
  gallery: GalleryPreview,
  accordion: AccordionPreview,
  cards: CardsPreview,
  cta: CtaPreview,
  'feature-list': FeatureListPreview,
  stats: StatsPreview,
  'logo-cloud': LogoCloudPreview,
  testimonials: TestimonialsPreview,
  pricing: PricingPreview,
  newsletter: NewsletterPreview,
  'media-text': MediaTextPreview,
  map: MapPreview,
  countdown: CountdownPreview,
  form: FormPreview,
}

// ── Block Renderer ───────────────────────────────────────────────
// Uses raw h() calls because it bridges Immutable.js entry data to
// flat JSX per-block components.
function BlockRenderer(block) {
  var type = block && block.type
  var Component = BLOCK_COMPONENTS[type]
  if (!Component) {
    return h('div', { className: 'scms-block' },
      h('div', { style: { color: '#999', fontStyle: 'italic' } }, 'Unknown block: "' + type + '"'),
    )
  }
  return h(Component, { block: block })
}

// ── Page Preview Component ───────────────────────────────────────
// Uses raw h() calls because it normalises Immutable.Map/List data
// (.getIn, .toJS, .toArray) to plain JS objects for block components.
export function PagePreview(_ref) {
  var entry = _ref.entry
  var title = entry && entry.getIn && entry.getIn(['data', 'title'])
  var blocks = entry && entry.getIn && entry.getIn(['data', 'blocks'])
  var blockArray = (blocks && blocks.toArray ? blocks.toArray() : Array.isArray(blocks) ? blocks : [])
  var blockData = blockArray.map(function (b) { return (b && b.toJS ? b.toJS() : b) })

  return h('div', { className: 'scms-preview' },
    h('h1', {}, title || 'Untitled Page'),
    blockData.length > 0
      ? blockData.map(function (b) { return BlockRenderer(b) })
      : h('div', { className: 'scms-empty' }, 'No blocks defined yet.'),
  )
}
