import React, { createContext, useState, useEffect } from 'react'
import cx from 'classnames'
// import { themes } from './Themes'
import { ThemeDefault } from './Themes/ThemeDefault'
import './BaseStyles.scss'
// @ts-expect-error
import * as themeData from '@grantcodes/style-dictionary/default/js'
// TODO: Would like to be able to dynamically import only the required theme data.

const DEFAULT_CONTEXT = {
  theme: {}
}
export interface ProviderProps {
  theme: 'default'
  children: React.ReactNode
}

export const Context = createContext(DEFAULT_CONTEXT)

const Provider: React.FC<any> = ({
  children,
  theme = 'default'
}: ProviderProps) => {
  // const [themeData, setThemeData] = useState(DEFAULT_CONTEXT.theme)

  return (
    <Context.Provider value={{ theme: { name: 'default', ...themeData } }}>
      <ThemeDefault
      // setThemeData={setThemeData}
      >
        {children}
      </ThemeDefault>
    </Context.Provider>
  )
}

export { Provider }
