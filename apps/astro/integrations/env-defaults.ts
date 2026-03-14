import {
  GThemeColorBackgroundBrand,
  GThemeColorContentDefault,
  GThemeTypographyBodyDefaultFontWeight,
  GThemeTypographyHeadlineDefaultFontWeight,
  GTypographyFontFamilyGreycliff,
} from '@grantcodes/style-dictionary/grantcodes/js'
import {
  GThemeColorBackgroundBrand as TodomapThemeColorBackgroundBrand,
  GThemeColorContentDefault as TodomapThemeColorContentDefault,
  GThemeTypographyFontWeightBody,
  GThemeTypographyFontWeightHeading,
  GTypographyFontFamilyQuicksand,
} from '@grantcodes/style-dictionary/todomap/js'
import {
  GThemeColorBackgroundBrand as WireframeThemeColorBackgroundBrand,
  GThemeColorContentDefault as WireframeThemeColorContentDefault,
  GThemeTypographyBodyDefaultFontWeight as WireframeThemeTypographyBodyDefaultFontWeight,
  GThemeTypographyHeadlineDefaultFontWeight as WireframeThemeTypographyHeadlineDefaultFontWeight,
  GTypographyFontFamilyHelvetica,
} from '@grantcodes/style-dictionary/wireframe/js'

const OG_THEMES = {
  grantcodes: {
    color: GThemeColorContentDefault,
    backgroundColor: GThemeColorBackgroundBrand,
    fontName: GTypographyFontFamilyGreycliff.split(',')[0].trim(),
    headingFontWeight: GThemeTypographyHeadlineDefaultFontWeight,
    bodyFontWeight: GThemeTypographyBodyDefaultFontWeight,
    titleFontFile:
      './node_modules/@grantcodes/style-dictionary/assets/fonts/greycliff-heavy.woff',
    bodyFontFile:
      './node_modules/@grantcodes/style-dictionary/assets/fonts/greycliff-regular.woff',
  },
  todomap: {
    color: TodomapThemeColorContentDefault,
    backgroundColor: TodomapThemeColorBackgroundBrand,
    fontName: GTypographyFontFamilyQuicksand.split(',')[0].trim(),
    headingFontWeight: GThemeTypographyFontWeightHeading,
    bodyFontWeight: GThemeTypographyFontWeightBody,
    titleFontFile:
      './node_modules/@grantcodes/style-dictionary/assets/fonts/quicksand-bold.woff',
    bodyFontFile:
      './node_modules/@grantcodes/style-dictionary/assets/fonts/quicksand-regular.woff',
  },
  wireframe: {
    color: WireframeThemeColorContentDefault,
    backgroundColor: WireframeThemeColorBackgroundBrand,
    fontName: GTypographyFontFamilyHelvetica.split(',')[0].trim(),
    headingFontWeight: WireframeThemeTypographyHeadlineDefaultFontWeight,
    bodyFontWeight: WireframeThemeTypographyBodyDefaultFontWeight,
    // Wireframe uses system Helvetica; keep bundled fallbacks for OG generation.
    titleFontFile:
      './node_modules/@grantcodes/style-dictionary/assets/fonts/greycliff-bold.woff',
    bodyFontFile:
      './node_modules/@grantcodes/style-dictionary/assets/fonts/greycliff-regular.woff',
  },
} as const

type OgThemeName = keyof typeof OG_THEMES

function toFontWeight(value: string, fallback: number): number {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

const requestedTheme = process.env.OG_IMAGE_THEME as OgThemeName | undefined
const ogThemeName: OgThemeName = requestedTheme && requestedTheme in OG_THEMES
  ? requestedTheme
  : 'grantcodes'

const ogTheme = OG_THEMES[ogThemeName]

/**
 * Default environment variables stored for easy reuse across the codebase.
 */
const envDefaults = {
  TITLE: 'grant.codes',
  META_TITLE_TEMPLATE: '%s | grant.codes',
  META_DESCRIPTION:
    'grant.codes is a simple, fast, and lightweight static site generator.',
  META_TWITTER: '@grantcodes',
  OG_IMAGE_THEME: ogThemeName,
  OG_IMAGE_COLOR: ogTheme.color,
  OG_IMAGE_BACKGROUND_COLOR: ogTheme.backgroundColor,
  OG_IMAGE_FONT_NAME: ogTheme.fontName,
  OG_IMAGE_TITLE_FONT_FILE: ogTheme.titleFontFile,
  OG_IMAGE_BODY_FONT_FILE: ogTheme.bodyFontFile,
  // Backward-compatible alias for integrations that still expect a single font file.
  OG_IMAGE_FONT_FILE: ogTheme.bodyFontFile,
  OG_IMAGE_TITLE_FONT_WEIGHT: toFontWeight(ogTheme.headingFontWeight, 700),
  OG_IMAGE_BODY_FONT_WEIGHT: toFontWeight(ogTheme.bodyFontWeight, 400),
}

export { envDefaults }
