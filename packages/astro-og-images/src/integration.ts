import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import type { AstroIntegration, IntegrationResolvedRoute } from 'astro';
import satori from 'satori';

export interface AstroOgImagesOptions {
  favicon?: string;
  fontFile?: string;
  fontName?: string;
  foregroundColor?: string;
  backgroundColor?: string;
  titleTemplate?: string;
  width?: number;
  height?: number;
}

const defaultOptions: Required<AstroOgImagesOptions> = {
  favicon: './public/favicon.svg',
  fontFile: './node_modules/@grantcodes/style-dictionary/assets/fonts/greycliff-regular.woff',
  fontName: 'Greycliff',
  foregroundColor: '#f0f1f3',
  backgroundColor: '#13171f',
  titleTemplate: '%s',
  width: 1200,
  height: 630,
};

export default function astroOgImages(userOptions: AstroOgImagesOptions = {}): AstroIntegration {
  const options = { ...defaultOptions, ...userOptions };

  let favicon: Buffer;
  let font: Buffer;
  let routes: IntegrationResolvedRoute[];

  return {
    name: 'astro-og-images',
    hooks: {
      'astro:build:start': async () => {
        favicon = readFileSync(options.favicon);
        font = readFileSync(options.fontFile);
      },
      'astro:routes:resolved': (params) => {
        routes = params.routes;
      },
      'astro:build:done': async ({ assets, logger }) => {
        try {
          const routesWithDist: (IntegrationResolvedRoute & { distURL?: URL[] })[] = [];

          for (const route of routes) {
            const distURL = assets.get(route.pattern);
            if (distURL) {
              routesWithDist.push({ ...route, distURL });
            }
          }

          let imageCount = 0;
          for (const route of routesWithDist) {
            if (route.distURL) {
              for (const distURL of route.distURL) {
                if (distURL?.pathname?.endsWith('index.html') ?? false) {
                  const html = readFileSync(distURL.pathname, { encoding: 'utf-8' });

                  const ogMetaQuery = html.match(/<meta property="og:image" content="(.*?)"/);
                  if (!ogMetaQuery) {
                    continue;
                  }

                  if (existsSync(distURL.pathname.replace('index.html', 'og.png'))) {
                    continue;
                  }

                  const titleQuery = html.match(/<title>(.*?)<\/title>/);
                  const descriptionQuery = html.match(/<meta name="description" content="(.*?)"/);

                  const titleWithTemplate = titleQuery ? titleQuery[1] : '';
                  const title = titleWithTemplate.replace(
                    options.titleTemplate.replace('%s', ''),
                    '',
                  );
                  const description = descriptionQuery ? descriptionQuery[1] : '';

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
                            props: { style: { marginTop: 96 }, children: title },
                          },
                          {
                            type: 'div',
                            props: {
                              style: { marginTop: 30, fontSize: 36 },
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
                          data: font,
                          weight: 400,
                          style: 'normal',
                        },
                      ],
                    },
                  );

                  const resvg = new Resvg(svg, {
                    fitTo: { mode: 'width', value: options.width },
                  });

                  imageCount++;
                  writeFileSync(
                    distURL.pathname.replace('index.html', 'og.png'),
                    resvg.render().asPng().toString(),
                  );
                }
              }
            }
          }
          if (imageCount > 0) {
            logger.info(`Created ${imageCount} OpenGraph images`);
          }
        } catch (e) {
          logger.error('OpenGraph image generation failed');
          logger.error(e);
        }
      },
    },
  };
}
