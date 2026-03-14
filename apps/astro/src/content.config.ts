import { z, defineCollection } from 'astro:content'
import { docsSchema } from '@astrojs/starlight/schema'
import { pageCollection, navigationCollection, settingsCollection } from './lib/content/schema'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
})

const docsCollection = defineCollection({
  schema: docsSchema(),
})

export const collections = {
  blog: blogCollection,
  docs: docsCollection,
  pages: pageCollection,
  navigation: navigationCollection,
  settings: settingsCollection,
}
