import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { Resvg } from '@resvg/resvg-js'
import type { IntegrationResolvedRoute } from 'astro'
import Color from 'colorjs.io'
import satori from 'satori'
import { resolveColorSchemeToken, type UiColorScheme } from './themes.js'

export interface AstroOgImagesOptions {
  favicon?: string
  fontFile?: string
  titleFontFile?: string
  bodyFontFile?: string
  fontName?: string
  titleFontWeight?: number
  bodyFontWeight?: number
  foregroundColor?: string
  backgroundColor?: string
  titleTemplate?: string
  width?: number
  height?: number
}

export interface ResolvedOgOptions {
  enabled: boolean
  options: Required<AstroOgImagesOptions>
}

interface ResolveOgOptionsInput {
  ogImages?: boolean | AstroOgImagesOptions
  titleTemplate?: string
  colorScheme?: UiColorScheme
  themeDefaults?: Partial<AstroOgImagesOptions>
}

const defaultOptions: Required<AstroOgImagesOptions> = {
  favicon: './public/favicon.svg',
  fontFile: './node_modules/@grantcodes/style-dictionary/assets/fonts/greycliff-regular.woff',
  titleFontFile: './node_modules/@grantcodes/style-dictionary/assets/fonts/greycliff-heavy.woff',
  bodyFontFile: './node_modules/@grantcodes/style-dictionary/assets/fonts/greycliff-regular.woff',
  fontName: 'Greycliff',
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

function detectFaviconPath(): string {
  const candidates = ['./public/favicon.svg', './public/favicon.png', './public/favicon.ico']
  return candidates.find((candidate) => existsSync(candidate)) ?? candidates[0]
}

export function resolveOgOptions(input: ResolveOgOptionsInput = {}): ResolvedOgOptions {
  const ogImages = input.ogImages
  if (typeof ogImages === 'undefined') {
    return {
      enabled: false,
      options: {
        ...defaultOptions,
      },
    }
  }

  const metadataDefaults: Partial<AstroOgImagesOptions> = {
    titleTemplate: input.titleTemplate,
    favicon: detectFaviconPath(),
  }

  const explicitOptions = typeof ogImages === 'object' ? ogImages : {}
  const rawOptions = {
    ...defaultOptions,
    ...input.themeDefaults,
    ...metadataDefaults,
    ...explicitOptions,
  }

  return {
    enabled: true,
    options: {
      ...rawOptions,
      foregroundColor: normalizeColor(rawOptions.foregroundColor, input.colorScheme),
      backgroundColor: normalizeColor(rawOptions.backgroundColor, input.colorScheme),
    },
  }
}

export function getOgHooks(options: Required<AstroOgImagesOptions>) {
  let favicon: Buffer
  let titleFont: Buffer
  let bodyFont: Buffer
  let routes: IntegrationResolvedRoute[] = []

  return {
    'astro:build:start': async () => {
      favicon = readFileSync(options.favicon)
      titleFont = readFileSync(options.titleFontFile || options.fontFile)
      bodyFont = readFileSync(options.bodyFontFile || options.fontFile)
    },
    'astro:routes:resolved': (params: { routes: IntegrationResolvedRoute[] }) => {
      routes = params.routes
    },
    'astro:build:done': async ({ assets, logger }: { assets: Map<RegExp, URL[]>; logger: { info: (msg: string) => void; error: (e: unknown) => void } }) => {
      try {
        const routesWithDist: (IntegrationResolvedRoute & { distURL?: URL[] })[] = []

        for (const route of routes) {
          const distURL = assets.get(route.pattern)
          if (distURL) {
            routesWithDist.push({ ...route, distURL })
          }
        }

        let imageCount = 0
        for (const route of routesWithDist) {
          if (!route.distURL) continue
          for (const distURL of route.distURL) {
            if (!(distURL?.pathname?.endsWith('index.html') ?? false)) continue
            const html = readFileSync(distURL.pathname, { encoding: 'utf-8' })
            const ogMetaQuery = html.match(/<meta property="og:image" content="(.*?)"/)
            if (!ogMetaQuery) continue
            if (existsSync(distURL.pathname.replace('index.html', 'og.png'))) continue

            const titleQuery = html.match(/<title>(.*?)<\/title>/)
            const descriptionQuery = html.match(/<meta name="description" content="(.*?)"/)

            const titleWithTemplate = titleQuery ? titleQuery[1] : ''
            const title = titleWithTemplate.replace(options.titleTemplate.replace('%s', ''), '')
            const description = descriptionQuery ? descriptionQuery[1] : ''

            const svg = await satori(
              {
                type: 'div',
                props: {
                  style: {
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    color: options.foregroundColor,
                    backgroundColor: options.backgroundColor,
                    padding: '55px 70px',
                    fontFamily: options.fontName,
                    fontSize: 72,
                  },
                  children: [
                    {
                      type: 'img',
                      props: {
                        src: `data:image/svg+xml;base64,${favicon.toString('base64')}`,
                        style: { width: 60, height: 60 },
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          marginTop: 96,
                          fontWeight: options.titleFontWeight,
                        },
                        children: title,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          marginTop: 30,
                          fontSize: 36,
                          fontWeight: options.bodyFontWeight,
                        },
                        children: description,
                      },
                    },
                  ],
                },
              },
              {
                width: options.width,
                height: options.height,
                fonts: [
                  {
                    name: options.fontName,
                    data: titleFont,
                    weight: options.titleFontWeight,
                    style: 'normal',
                  },
                  {
                    name: options.fontName,
                    data: bodyFont,
                    weight: options.bodyFontWeight,
                    style: 'normal',
                  },
                ],
              },
            )

            const resvg = new Resvg(svg, {
              fitTo: { mode: 'width', value: options.width },
            })

            imageCount++
            writeFileSync(distURL.pathname.replace('index.html', 'og.png'), resvg.render().asPng())
          }
        }

        if (imageCount > 0) {
          logger.info(`Created ${imageCount} OpenGraph images`)
        }
      } catch (e) {
        logger.error('OpenGraph image generation failed')
        logger.error(e)
      }
    },
  }
}
