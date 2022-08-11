import React, { createContext, useMemo, useEffect } from 'react'
import './BaseStyles.scss'
// import * as defaultThemeCss from '@grantcodes/style-dictionary/build/css/default/style-dictionary.css?raw'
import defaultThemeCss from '../../../grantcodes-style-dictionary/build/css/default/style-dictionary.css?raw'
// import todomapThemeCss from '@grantcodes/style-dictionary/build/css/todomap/style-dictionary.css?raw'
import todomapThemeCss from '../../../grantcodes-style-dictionary/build/css/todomap/style-dictionary.css?raw'
import * as defaultThemeJs from '@grantcodes/style-dictionary/build/js/default/style-dictionary'
import * as todomapThemeJs from '@grantcodes/style-dictionary/build/js/todomap/style-dictionary'

export interface ProviderProps {
  theme: 'default' | 'todomap'
  children: React.ReactNode
}

export const Context = createContext({
  theme: {
    name: 'default',
    ...defaultThemeJs,
  },
})

console.log(defaultThemeCss, todomapThemeCss)

function Provider({ children, theme = 'default' }: ProviderProps) {
  const themeData = useMemo(
    () => (theme === 'todomap' ? todomapThemeJs : defaultThemeJs),
    [theme]
  )

  const themeCssString = useMemo(() => {
    if (theme === 'todomap') {
      return todomapThemeCss
    }
    return defaultThemeCss
  }, [theme])

  return (
    <>
      <style>{themeCssString}</style>
      <Context.Provider value={{ theme: { name: theme, ...themeData } }}>
        {children}
      </Context.Provider>
    </>
  )
}

export { Provider }
