import { fileURLToPath } from 'node:url'
import {
  GThemeColorBackgroundDefault as GThemeColorBackgroundDefaultGrantcodes,
  GThemeColorContentDefault as GThemeColorContentDefaultGrantcodes,
  GThemeTypographyBodyFontWeight as GThemeTypographyBodyFontWeightGrantcodes,
  GThemeTypographyH1FontWeight as GThemeTypographyH1FontWeightGrantcodes,
  GTypographyFontFamilyGreycliff,
} from '@grantcodes/style-dictionary/grantcodes/js'
import {
  GThemeColorBackgroundDefault as GThemeColorBackgroundDefaultGrantina,
  GThemeColorContentDefault as GThemeColorContentDefaultGrantina,
  GThemeTypographyBodyFontWeight as GThemeTypographyBodyFontWeightGrantina,
  GThemeTypographyH1FontWeight as GThemeTypographyH1FontWeightGrantina,
  GTypographyFontFamilyAlbert,
  GTypographyFontFamilyVidaloka,
} from '@grantcodes/style-dictionary/grantina/js'
import {
  grantinaBodyFontPath,
  grantinaTitleFontPath,
} from '@grantcodes/style-dictionary/grantina/fonts'
import {
  GThemeColorBackgroundDefault as GThemeColorBackgroundDefaultTodomap,
  GThemeColorContentDefault as GThemeColorContentDefaultTodomap,
  GThemeTypographyBodyFontWeight as GThemeTypographyBodyFontWeightTodomap,
  GThemeTypographyH1FontWeight as GThemeTypographyH1FontWeightTodomap,
  GTypographyFontFamilyQuicksand,
} from '@grantcodes/style-dictionary/todomap/js'
import {
  GThemeColorBackgroundDefault as GThemeColorBackgroundDefaultWireframe,
  GThemeColorContentDefault as GThemeColorContentDefaultWireframe,
  GThemeTypographyBodyFontWeight as GThemeTypographyBodyFontWeightWireframe,
  GThemeTypographyH1FontWeight as GThemeTypographyH1FontWeightWireframe,
} from '@grantcodes/style-dictionary/wireframe/js'

export const UI_THEMES = ['grantcodes', 'grantina', 'todomap', 'wireframe'] as const

export type UiThemeName = (typeof UI_THEMES)[number]
export type UiColorScheme = 'light' | 'dark'

interface ThemeDefinition {
  stylesheetImport: string
  fontName: string
  titleFontName: string
  bodyFontName: string
  titleFontFile: string
  bodyFontFile: string
  titleFontWeight: string
  bodyFontWeight: string
  foregroundColor: string
  backgroundColor: string
}

export interface ResolvedTheme {
  name: UiThemeName
  stylesheetImport: string
  fontName: string
  titleFontName: string
  bodyFontName: string
  titleFontFile: string
  bodyFontFile: string
  titleFontWeight: number
  bodyFontWeight: number
  foregroundColor: string
  backgroundColor: string
}

const THEME_DEFINITIONS: Record<UiThemeName, ThemeDefinition> = {
  grantcodes: {
    stylesheetImport: '@grantcodes/ui/styles/themes/grantcodes.css',
    fontName: firstFontFamily(GTypographyFontFamilyGreycliff),
    titleFontName: firstFontFamily(GTypographyFontFamilyGreycliff),
    bodyFontName: firstFontFamily(GTypographyFontFamilyGreycliff),
    titleFontFile: resolveFontPath('@grantcodes/style-dictionary/assets/fonts/greycliff-heavy.woff'),
    bodyFontFile: resolveFontPath('@grantcodes/style-dictionary/assets/fonts/greycliff-regular.woff'),
    titleFontWeight: GThemeTypographyH1FontWeightGrantcodes,
    bodyFontWeight: GThemeTypographyBodyFontWeightGrantcodes,
    foregroundColor: GThemeColorContentDefaultGrantcodes,
    backgroundColor: GThemeColorBackgroundDefaultGrantcodes,
  },
  grantina: {
    stylesheetImport: '@grantcodes/ui/styles/themes/grantina.css',
    fontName: firstFontFamily(GTypographyFontFamilyAlbert),
    titleFontName: firstFontFamily(GTypographyFontFamilyVidaloka),
    bodyFontName: firstFontFamily(GTypographyFontFamilyAlbert),
    titleFontFile: grantinaTitleFontPath,
    bodyFontFile: grantinaBodyFontPath,
    titleFontWeight: GThemeTypographyH1FontWeightGrantina,
    bodyFontWeight: GThemeTypographyBodyFontWeightGrantina,
    foregroundColor: GThemeColorContentDefaultGrantina,
    backgroundColor: GThemeColorBackgroundDefaultGrantina,
  },
  todomap: {
    stylesheetImport: '@grantcodes/ui/styles/themes/todomap.css',
    fontName: firstFontFamily(GTypographyFontFamilyQuicksand),
    titleFontName: firstFontFamily(GTypographyFontFamilyQuicksand),
    bodyFontName: firstFontFamily(GTypographyFontFamilyQuicksand),
    titleFontFile: resolveFontPath('@grantcodes/style-dictionary/assets/fonts/quicksand-bold.woff'),
    bodyFontFile: resolveFontPath('@grantcodes/style-dictionary/assets/fonts/quicksand-regular.woff'),
    titleFontWeight: GThemeTypographyH1FontWeightTodomap,
    bodyFontWeight: GThemeTypographyBodyFontWeightTodomap,
    foregroundColor: GThemeColorContentDefaultTodomap,
    backgroundColor: GThemeColorBackgroundDefaultTodomap,
  },
  wireframe: {
    stylesheetImport: '@grantcodes/ui/styles/themes/wireframe.css',
    // OG generation uses bundled local fallbacks until a local Helvetica-compatible
    // asset is shipped for the wireframe theme.
    fontName: firstFontFamily(GTypographyFontFamilyGreycliff),
    titleFontName: firstFontFamily(GTypographyFontFamilyGreycliff),
    bodyFontName: firstFontFamily(GTypographyFontFamilyGreycliff),
    titleFontFile: resolveFontPath('@grantcodes/style-dictionary/assets/fonts/greycliff-bold.woff'),
    bodyFontFile: resolveFontPath('@grantcodes/style-dictionary/assets/fonts/greycliff-regular.woff'),
    titleFontWeight: GThemeTypographyH1FontWeightWireframe,
    bodyFontWeight: GThemeTypographyBodyFontWeightWireframe,
    foregroundColor: GThemeColorContentDefaultWireframe,
    backgroundColor: GThemeColorBackgroundDefaultWireframe,
  },
}

function resolveFontPath(importPath: string): string {
  try {
    const resolved = import.meta.resolve(importPath)
    return resolved.startsWith('file:') ? fileURLToPath(resolved) : resolved
  } catch {
    return importPath.replace(
      '@grantcodes/style-dictionary/',
      './node_modules/@grantcodes/style-dictionary/',
    )
  }
}

function splitLightDarkArgs(input: string): [string, string] | null {
  if (!input.startsWith('light-dark(') || !input.endsWith(')')) {
    return null
  }

  const contents = input.slice('light-dark('.length, -1)
  let depth = 0
  for (let index = 0; index < contents.length; index++) {
    const char = contents[index]
    if (char === '(') depth++
    if (char === ')') depth--
    if (char === ',' && depth === 0) {
      return [contents.slice(0, index).trim(), contents.slice(index + 1).trim()]
    }
  }

  return null
}

function firstFontFamily(value: string): string {
  return value.split(',')[0].trim().replace(/^['"]|['"]$/g, '')
}

export function resolveColorSchemeToken(value: string, colorScheme: UiColorScheme = 'dark'): string {
  const pair = splitLightDarkArgs(value.trim())
  if (!pair) {
    return value.trim()
  }

  return resolveColorSchemeToken(colorScheme === 'dark' ? pair[1] : pair[0], colorScheme)
}

function toFontWeight(value: string, fallback: number): number {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function resolveTheme(
  theme: UiThemeName = 'grantcodes',
  colorScheme: UiColorScheme = 'dark',
): ResolvedTheme {
  const definition = THEME_DEFINITIONS[theme]

  return {
    name: theme,
    stylesheetImport: definition.stylesheetImport,
    fontName: definition.fontName,
    titleFontName: definition.titleFontName,
    bodyFontName: definition.bodyFontName,
    titleFontFile: definition.titleFontFile,
    bodyFontFile: definition.bodyFontFile,
    titleFontWeight: toFontWeight(definition.titleFontWeight, 700),
    bodyFontWeight: toFontWeight(definition.bodyFontWeight, 400),
    foregroundColor: resolveColorSchemeToken(definition.foregroundColor, colorScheme),
    backgroundColor: resolveColorSchemeToken(definition.backgroundColor, colorScheme),
  }
}
