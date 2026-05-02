import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const testDir = dirname(fileURLToPath(import.meta.url))
const packageRoot = resolve(testDir, '../..')
const repoRoot = resolve(packageRoot, '../..')

const schemaModuleUrl = async (path) => {
  const source = await readFile(path, 'utf8')
  const astroZodUrl = import.meta.resolve('astro/zod')
  const importableSource = source.replace(
    "import { z } from 'astro:content';",
    `import { z } from '${astroZodUrl}';`,
  )

  return `data:text/javascript,${encodeURIComponent(importableSource)}#${path}`
}

const schemaModules = [
  {
    name: '@grantcodes/astro-blocks schema',
    load: async () => import(await schemaModuleUrl(resolve(packageRoot, 'src/schemas/index.ts'))),
  },
  {
    name: '@grantcodes/astro-starter schema',
    load: async () => import(pathToFileURL(resolve(repoRoot, 'apps/astro/src/lib/content/schema.ts'))),
  },
]

for (const schemaModule of schemaModules) {
  test(`${schemaModule.name} accepts content-only accordion items`, async () => {
    const { accordionItem } = await schemaModule.load()

    const result = accordionItem.safeParse({
      title: 'Plain content',
      content: 'Escaped plain text',
    })

    assert.equal(result.success, true)
  })

  test(`${schemaModule.name} accepts htmlContent-only accordion items`, async () => {
    const { accordionItem } = await schemaModule.load()

    const result = accordionItem.safeParse({
      title: 'Trusted HTML',
      htmlContent: '<strong>Trusted</strong>',
    })

    assert.equal(result.success, true)
  })

  test(`${schemaModule.name} accepts accordion items with content and htmlContent`, async () => {
    const { accordionItem } = await schemaModule.load()

    const result = accordionItem.safeParse({
      title: 'Both content fields',
      content: 'Fallback plain text',
      htmlContent: '<strong>Trusted</strong>',
    })

    assert.equal(result.success, true)
  })

  test(`${schemaModule.name} accepts empty-string htmlContent as present`, async () => {
    const { accordionItem } = await schemaModule.load()

    const result = accordionItem.safeParse({
      title: 'Empty trusted HTML',
      htmlContent: '',
    })

    assert.equal(result.success, true)
  })

  test(`${schemaModule.name} rejects accordion items with no content fields`, async () => {
    const { accordionItem } = await schemaModule.load()

    const result = accordionItem.safeParse({ title: 'Missing content' })


    assert.equal(result.success, false)
    assert.match(result.error.issues[0].message, /content|htmlContent/)
  })
}
