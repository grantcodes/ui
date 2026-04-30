import { defineCollection } from 'astro:content'
import { glob, file } from 'astro/loaders'
import { docsSchema } from '@astrojs/starlight/schema'
import {
  blogSchema,
  pageSchema,
  navigationSchema,
  settingsSchema,
} from './lib/content/schema'

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: blogSchema,
})

const docsCollection = defineCollection({
  schema: docsSchema(),
})

const pagesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: pageSchema,
})

const navigationCollection = defineCollection({
  loader: file('src/content/navigation/navigation.json'),
  schema: navigationSchema,
})

const settingsCollection = defineCollection({
  loader: file('src/content/settings/settings.json', {
    parser: (text) => [{ id: 'site', ...JSON.parse(text) }],
  }),
  schema: settingsSchema,
})

export const collections = {
  blog: blogCollection,
  docs: docsCollection,
  pages: pagesCollection,
  navigation: navigationCollection,
  settings: settingsCollection,
}
