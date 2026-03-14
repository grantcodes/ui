import { z } from 'astro:content';

const baseBlockFields = z.object({
  id: z.string().optional(),
});

export const heroBlock = baseBlockFields.extend({
  type: z.literal('hero'),
  title: z.string(),
  subtitle: z.string().optional(),
  image: z.string().optional(),
  button: z.string().optional(),
  href: z.string().optional(),
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  center: z.boolean().default(false),
});

export const textBlock = baseBlockFields.extend({
  type: z.literal('text'),
  content: z.string(),
});

export const galleryBlock = baseBlockFields.extend({
  type: z.literal('gallery'),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
      }),
    )
    .default([]),
});

export const accordionItem = z.object({
  title: z.string(),
  content: z.string(),
});

export const accordionBlock = baseBlockFields.extend({
  type: z.literal('accordion'),
  items: z.array(accordionItem).default([]),
});

export const cardItem = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  href: z.string().optional(),
});

export const cardsBlock = baseBlockFields.extend({
  type: z.literal('cards'),
  cards: z.array(cardItem).default([]),
});

// --- New blocks ---

export const ctaBlock = baseBlockFields.extend({
  type: z.literal('cta'),
  eyebrow: z.string().optional(),
  title: z.string(),
  text: z.string().optional(),
  primaryAction: z.object({ label: z.string(), href: z.string() }).optional(),
  secondaryAction: z.object({ label: z.string(), href: z.string() }).optional(),
  align: z.enum(['left', 'center']).default('center'),
});

const featureItem = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  href: z.string().optional(),
});

export const featureListBlock = baseBlockFields.extend({
  type: z.literal('feature-list'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(featureItem).default([]),
  columns: z.number().int().min(1).max(4).default(3),
});

const statItem = z.object({
  label: z.string(),
  value: z.string(),
  context: z.string().optional(),
});

export const statsBlock = baseBlockFields.extend({
  type: z.literal('stats'),
  title: z.string().optional(),
  items: z.array(statItem).default([]),
  columns: z.number().int().min(1).max(6).default(4),
});

const logoItem = z.object({
  name: z.string(),
  src: z.string(),
  alt: z.string().optional(),
  href: z.string().optional(),
});

export const logoCloudBlock = baseBlockFields.extend({
  type: z.literal('logo-cloud'),
  title: z.string().optional(),
  logos: z.array(logoItem).default([]),
});

const testimonialItem = z.object({
  quote: z.string(),
  name: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().optional(),
});

export const testimonialsBlock = baseBlockFields.extend({
  type: z.literal('testimonials'),
  title: z.string().optional(),
  items: z.array(testimonialItem).default([]),
  layout: z.enum(['cards', 'list']).default('cards'),
});

const pricingFeature = z.object({
  text: z.string(),
  included: z.boolean().default(true),
});

const pricingTier = z.object({
  name: z.string(),
  price: z.string(),
  period: z.string().optional(),
  description: z.string().optional(),
  features: z.array(pricingFeature).default([]),
  cta: z.object({ label: z.string(), href: z.string() }),
  highlighted: z.boolean().default(false),
});

export const pricingBlock = baseBlockFields.extend({
  type: z.literal('pricing'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  tiers: z.array(pricingTier).default([]),
});

export const newsletterBlock = baseBlockFields.extend({
  type: z.literal('newsletter'),
  title: z.string(),
  text: z.string().optional(),
  action: z.string(),
  method: z.enum(['get', 'post']).default('post'),
  placeholder: z.string().default('Your email address'),
  buttonLabel: z.string().default('Subscribe'),
  disclaimer: z.string().optional(),
});

export const mediaTextBlock = baseBlockFields.extend({
  type: z.literal('media-text'),
  title: z.string(),
  text: z.string(),
  media: z.object({
    src: z.string(),
    alt: z.string().optional(),
    kind: z.enum(['image', 'video']).default('image'),
  }),
  reverse: z.boolean().default(false),
  cta: z.object({ label: z.string(), href: z.string() }).optional(),
});

export const blockSchema = z.discriminatedUnion('type', [
  heroBlock,
  textBlock,
  galleryBlock,
  accordionBlock,
  cardsBlock,
  ctaBlock,
  featureListBlock,
  statsBlock,
  logoCloudBlock,
  testimonialsBlock,
  pricingBlock,
  newsletterBlock,
  mediaTextBlock,
]);
