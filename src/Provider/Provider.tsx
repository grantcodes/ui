import React, { createContext, useMemo, useEffect, useState } from 'react'
import cx from 'classnames'
import './BaseStyles.scss'
// TODO: Would like to be able to dynamically import only the required theme data.
// @ts-ignore
import * as defaultThemeJs from '@grantcodes/style-dictionary/build/js/default/style-dictionary'
// @ts-ignore
import * as todomapThemeJs from '@grantcodes/style-dictionary/build/js/todomap/style-dictionary'
// import '@grantcodes/style-dictionary/assets/fonts/greycliff.css'

export interface ProviderProps {
  theme: 'default' | 'todomap'
  children: React.ReactNode
}

export const Context = createContext({
  theme: {
    name: 'default',
    ...defaultThemeJs
  }
})

// console.log(defaultThemeCss)

const Provider: React.FC<any> = ({
  children,
  theme = 'default'
}: ProviderProps) => {
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
