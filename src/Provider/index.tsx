import React, { createContext, useMemo, useEffect, useState } from 'react'
import cx from 'classnames'
import './BaseStyles.scss'
// TODO: Would like to be able to dynamically import only the required theme data.
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

// console.log(defaultThemeCss)

function Provider({ children, theme = 'default' }: ProviderProps) {
  const themeData = useMemo(
    () => (theme === 'todomap' ? todomapThemeJs : defaultThemeJs),
    [theme]
  )

  return (
    <div className={cx('grantcodes-ui-theme', `grantcodes-ui-theme--${theme}`)}>
      <Context.Provider value={{ theme: { name: theme, ...themeData } }}>
        {children}
      </Context.Provider>
    </div>
  )
}

export { Provider }
