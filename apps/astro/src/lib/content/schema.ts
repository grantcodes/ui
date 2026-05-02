import { z } from 'astro/zod'

const baseBlockFields = z.object({
  id: z.string().optional(),
})

export const heroBlock = baseBlockFields.extend({
  type: z.literal('hero'),
  title: z.string(),
  subtitle: z.string().optional(),
  image: z.string().optional(),
  button: z.string().optional(),
  href: z.string().optional(),
  size: z.enum(['sm', 'md', 'lg']).default('md'),
  center: z.boolean().default(false),
})

export const textBlock = baseBlockFields.extend({
  type: z.literal('text'),
  content: z.string(),
})

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
})

export const accordionItem = z
  .object({
    title: z.string(),
    content: z.string().optional(),
    htmlContent: z.string().optional(),
  })
  .superRefine((item, ctx) => {
    if (item.content === undefined && item.htmlContent === undefined) {
      ctx.addIssue({
        code: 'custom',
        message: 'Accordion item requires content or htmlContent',
      })
    }
  })

export const accordionBlock = baseBlockFields.extend({
  type: z.literal('accordion'),
  items: z.array(accordionItem).default([]),
})

export const cardItem = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  href: z.string().optional(),
})

export const cardsBlock = baseBlockFields.extend({
  type: z.literal('cards'),
  cards: z.array(cardItem).default([]),
})

export const formBlock = baseBlockFields.extend({
  type: z.literal('form'),
  title: z.string().optional(),
  submitText: z.string().default('Submit'),
  successMessage: z.string().default('Thank you for your message!'),
  notifyEmail: z.email(),
  buttonText: z.string().default('Send Message'),
})

export const blockSchema = z.discriminatedUnion('type', [
  heroBlock,
  textBlock,
  galleryBlock,
  accordionBlock,
  cardsBlock,
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
