const UI_THEMES = ['grantcodes', 'grantina', 'todomap', 'wireframe'] as const

type UiThemeName = (typeof UI_THEMES)[number]

const requestedTheme = process.env.UI_THEME as UiThemeName | undefined
const uiTheme: UiThemeName = requestedTheme && UI_THEMES.includes(requestedTheme)
  ? requestedTheme
  : 'grantcodes'

/**
 * Default environment variables stored for easy reuse across the codebase.
 */
const envDefaults = {
  TITLE: 'grant.codes',
  META_TITLE_TEMPLATE: '%s | grant.codes',
  META_DESCRIPTION:
    'grant.codes is a simple, fast, and lightweight static site generator.',
  META_TWITTER: '@grantcodes',
  UI_THEME: uiTheme,
}

export { envDefaults }
