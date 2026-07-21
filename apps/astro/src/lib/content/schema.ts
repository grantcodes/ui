import { z } from 'astro/zod'
import {
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
  mapBlock,
  countdownBlock,
} from '@grantcodes/astro/blocks'

/**
 * formBlock is local-only — not defined in the @grantcodes/astro integration schemas.
 * It is maintained here alongside the imported shared blocks.
 */
export const formBlock = z.object({
  id: z.string().optional(),
  type: z.literal('form'),
  title: z.string().optional(),
  submitText: z.string().default('Submit'),
  successMessage: z.string().default('Thank you for your message!'),
  notifyEmail: z.string().email(),
  buttonText: z.string().default('Send Message'),
})

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
  mapBlock,
  countdownBlock,
  formBlock,
])

export const blogSchema = z.object({
  title: z.string(),
  date: z.date(),
  description: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
})

export const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  blocks: z.array(blockSchema).default([]),
})

export const navigationSchema = z.object({
  id: z.string(),
  label: z.string(),
  href: z.string(),
  order: z.number().default(0),
  locale: z.string().default('en'),
})

export const settingsSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
})
