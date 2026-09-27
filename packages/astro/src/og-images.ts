import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { Resvg } from '@resvg/resvg-js'
import type { IntegrationResolvedRoute } from 'astro'
import Color from 'colorjs.io'
import { parse, type DefaultTreeAdapterMap } from 'parse5'
import satori from 'satori'
import { resolveColorSchemeToken, type UiColorScheme } from './themes.js'

export interface AstroOgImagesOptions {
  logo?: string
  favicon?: string
  fontFile?: string
  titleFontFile?: string
  bodyFontFile?: string
  fontName?: string
  titleFontName?: string
  bodyFontName?: string
  titleFontWeight?: number
  bodyFontWeight?: number
  foregroundColor?: string
  backgroundColor?: string
  titleTemplate?: string
  width?: number
  height?: number
}

type ResolvedAstroOgImagesOptions = Omit<Required<AstroOgImagesOptions>, 'logo' | 'favicon'> &
  Pick<AstroOgImagesOptions, 'logo' | 'favicon'>

export interface ResolvedOgOptions {
  enabled: boolean
  options: ResolvedAstroOgImagesOptions
}

interface ResolveOgOptionsInput {
  ogImages?: boolean | AstroOgImagesOptions
  titleTemplate?: string
  colorScheme?: UiColorScheme
  themeDefaults?: Partial<AstroOgImagesOptions>
}

const defaultOptions: ResolvedAstroOgImagesOptions = {
  fontFile: './node_modules/@grantcodes/style-dictionary/assets/fonts/greycliff-regular.woff',
  titleFontFile: './node_modules/@grantcodes/style-dictionary/assets/fonts/greycliff-heavy.woff',
  bodyFontFile: './node_modules/@grantcodes/style-dictionary/assets/fonts/greycliff-regular.woff',
  fontName: 'Greycliff',
  titleFontName: 'Greycliff',
  bodyFontName: 'Greycliff',
  titleFontWeight: 900,
  bodyFontWeight: 500,
  foregroundColor: '#f0f1f3',
  backgroundColor: '#13171f',
  titleTemplate: '%s',
  width: 1200,
  height: 630,
}

function normalizeColor(color: string, colorScheme: UiColorScheme = 'dark'): string {
  const resolvedColor = resolveColorSchemeToken(color, colorScheme)
  try {
    return new Color(resolvedColor).to('srgb').toString({ format: 'hex' })
  } catch {
    return resolvedColor
  }
}

function detectFaviconPath(): string | undefined {
  return ['./public/favicon.svg', './public/favicon.png'].find((candidate) => existsSync(candidate))
}

function resolveAssetPath(path: string): string {
  return resolve(path)
}

function resolveOption(
  explicit: string | undefined,
  shared: string | undefined,
  theme: string | undefined,
  fallback: string,
): string {
  return explicit || shared || theme || fallback
}

function toSatoriFontWeight(weight: number): 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 {
  const supported = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const
  return supported.find((value) => value === weight) ?? 400
}

function toSatoriNode(node: Record<string, unknown>): Parameters<typeof satori>[0] {
  // SAFETY: Satori accepts React-compatible object nodes but does not export their structural type.
  return node as unknown as Parameters<typeof satori>[0]
}

export function resolveOgOptions(input: ResolveOgOptionsInput = {}): ResolvedOgOptions {
  const ogImages = input.ogImages
  if (ogImages === false || typeof ogImages === 'undefined') {
    return { enabled: false, options: { ...defaultOptions } }
  }

  const explicitOptions = typeof ogImages === 'object' ? ogImages : {}
  const themeDefaults = input.themeDefaults ?? {}
  const favicon = explicitOptions.logo
    ? undefined
    : explicitOptions.favicon ?? detectFaviconPath()
  const titleTemplate = explicitOptions.titleTemplate ?? input.titleTemplate ?? defaultOptions.titleTemplate
  const rawOptions = { ...defaultOptions, ...themeDefaults, ...explicitOptions, favicon, titleTemplate }

  return {
    enabled: true,
    options: {
      ...rawOptions,
      logo: explicitOptions.logo,
      favicon,
      titleFontName: resolveOption(
        explicitOptions.titleFontName,
        explicitOptions.fontName,
        themeDefaults.titleFontName ?? themeDefaults.fontName,
        defaultOptions.titleFontName,
      ),
      bodyFontName: resolveOption(
        explicitOptions.bodyFontName,
        explicitOptions.fontName,
        themeDefaults.bodyFontName ?? themeDefaults.fontName,
        defaultOptions.bodyFontName,
      ),
      titleFontFile: resolveOption(
        explicitOptions.titleFontFile,
        explicitOptions.fontFile,
        themeDefaults.titleFontFile ?? themeDefaults.fontFile,
        defaultOptions.titleFontFile,
      ),
      bodyFontFile: resolveOption(
        explicitOptions.bodyFontFile,
        explicitOptions.fontFile,
        themeDefaults.bodyFontFile ?? themeDefaults.fontFile,
        defaultOptions.bodyFontFile,
      ),
      foregroundColor: normalizeColor(rawOptions.foregroundColor, input.colorScheme),
      backgroundColor: normalizeColor(rawOptions.backgroundColor, input.colorScheme),
    },
  }
}

interface OgMetadata {
  title: string
  description: string
  hasOgImage: boolean
}

function textContent(node: DefaultTreeAdapterMap['node']): string {
  if ('value' in node) return node.value
  if (!('childNodes' in node)) return ''
  return node.childNodes.map(textContent).join('')
}

export function getOgMetadata(html: string): OgMetadata {
  const document = parse(html)
  let title = ''
  let description = ''
  let hasOgImage = false

  function visit(node: DefaultTreeAdapterMap['node']): void {
    if ('tagName' in node) {
      if (node.tagName === 'title') title = textContent(node)
      if (node.tagName === 'meta') {
        const attributes = new Map(node.attrs.map(({ name, value }) => [name, value]))
        if (attributes.get('property') === 'og:image') hasOgImage = true
        if (attributes.get('name') === 'description') description = attributes.get('content') ?? ''
      }
    }
    if ('childNodes' in node) node.childNodes.forEach(visit)
  }

  visit(document)
  return { title, description, hasOgImage }
}

function imageMimeType(path: string): string | undefined {
  const extension = path.toLowerCase().split('.').pop()
  if (extension === 'svg') return 'image/svg+xml'
  if (extension === 'png') return 'image/png'
  if (extension === 'jpg' || extension === 'jpeg') return 'image/jpeg'
  return undefined
}

function rasterizeSvg(svg: string, foregroundColor: string): Buffer {
  const root = svg.match(/<svg\b([^>]*)>/i)
  if (!root) throw new Error('SVG has no root <svg> element')
  const attributes = root[1]
  const hasColor = /(?:^|\s)color\s*=|style\s*=\s*["'][^"']*\bcolor\s*:/i.test(attributes)
  const rendered = hasColor
    ? svg
    : svg.replace(root[0], `<svg${attributes} color="${foregroundColor}">`)
  return new Resvg(rendered).render().asPng()
}

function isValidRaster(asset: Buffer, mimeType: string): boolean {
  if (mimeType === 'image/png') {
    return asset.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  }
  return asset[0] === 0xff && asset[1] === 0xd8
}

function loadLogo(path: string | undefined, foregroundColor: string): { src: string } | undefined {
  if (!path) return undefined

  const assetPath = resolveAssetPath(path)
  const mimeType = imageMimeType(assetPath)
  if (!mimeType) throw new Error(`Unsupported OpenGraph logo asset: ${path}`)
  if (!existsSync(assetPath)) throw new Error(`OpenGraph logo asset does not exist: ${path}`)

  try {
    const asset = readFileSync(assetPath)
    if (mimeType !== 'image/svg+xml' && !isValidRaster(asset, mimeType)) {
      throw new Error('unrecognized image format')
    }
    const image = mimeType === 'image/svg+xml'
      ? rasterizeSvg(asset.toString('utf8'), foregroundColor)
      : asset
    const imageMimeType = mimeType === 'image/svg+xml' ? 'image/png' : mimeType
    return { src: `data:${imageMimeType};base64,${image.toString('base64')}` }
  } catch (error) {
    const reason = error instanceof Error ? `: ${error.message}` : ''
    throw new Error(`Invalid OpenGraph logo asset: ${path}${reason}`)
  }
}

export function getOgHooks(options: ResolvedAstroOgImagesOptions) {
  let logo: { src: string } | undefined
  let titleFont: Buffer
  let bodyFont: Buffer
  let routes: IntegrationResolvedRoute[] = []

  return {
    'astro:build:start': async () => {
      logo = loadLogo(options.logo ?? options.favicon, options.foregroundColor)
      titleFont = readFileSync(options.titleFontFile)
      bodyFont = readFileSync(options.bodyFontFile)
    },
    'astro:routes:resolved': (params: { routes: IntegrationResolvedRoute[] }) => {
      routes = params.routes
    },
    'astro:build:done': async ({ assets, logger }: { assets: Map<string, URL[]>; logger: { info: (msg: string) => void; error: (e: unknown) => void } }) => {
      try {
        const routesWithDist: (IntegrationResolvedRoute & { distURL?: URL[] })[] = []

        for (const route of routes) {
          const distURL = assets.get(route.pattern)
          if (distURL) routesWithDist.push({ ...route, distURL })
        }

        let imageCount = 0
        for (const route of routesWithDist) {
          if (!route.distURL) continue
          for (const distURL of route.distURL) {
            if (!(distURL?.pathname?.endsWith('index.html') ?? false)) continue
            if (existsSync(distURL.pathname.replace('index.html', 'og.png'))) continue

            const metadata = getOgMetadata(readFileSync(distURL.pathname, 'utf-8'))
            if (!metadata.hasOgImage) continue

            const title = metadata.title.replace(options.titleTemplate.replace('%s', ''), '')
            const svg = await satori(
              toSatoriNode({
                type: 'div',
                props: {
                  style: {
                    height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
                    color: options.foregroundColor, backgroundColor: options.backgroundColor,
                    padding: '55px 70px', fontFamily: options.bodyFontName, fontSize: 72,
                  },
                  children: [
                    ...(logo ? [{ type: 'img', props: { src: logo.src, style: { width: 60, height: 60, objectFit: 'contain' } } }] : []),
                    { type: 'div', props: { style: { marginTop: 96, fontWeight: options.titleFontWeight, fontFamily: options.titleFontName }, children: title } },
                    { type: 'div', props: { style: { marginTop: 30, fontSize: 36, fontWeight: options.bodyFontWeight }, children: metadata.description } },
                  ],
                },
              }),
              {
                width: options.width, height: options.height,
                fonts: [
                  { name: options.titleFontName, data: titleFont, weight: toSatoriFontWeight(options.titleFontWeight), style: 'normal' },
                  { name: options.bodyFontName, data: bodyFont, weight: toSatoriFontWeight(options.bodyFontWeight), style: 'normal' },
                ],
              },
            )

            imageCount++
            writeFileSync(
              distURL.pathname.replace('index.html', 'og.png'),
              new Resvg(svg, { fitTo: { mode: 'width', value: options.width } }).render().asPng(),
            )
          }
        }

        if (imageCount > 0) logger.info(`Created ${imageCount} OpenGraph images`)
      } catch (error) {
        logger.error('OpenGraph image generation failed')
        logger.error(error)
      }
    },
  }
}
