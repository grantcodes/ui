import React, { useEffect } from 'react'
// @ts-expect-error
import * as themeData from '@grantcodes/style-dictionary/default/js'
import '@grantcodes/style-dictionary/default/css'
import '@grantcodes/style-dictionary/assets/fonts/greycliff'

export interface ThemeDefaultProps {
  children: React.ReactNode
  setThemeData: Function
}

const ThemeDefault: React.FC<any> = ({
  setThemeData,
  children
}: ThemeDefaultProps) => {
  // useEffect(() => {
  //   setThemeData({ ...themeData })
  // }, [setThemeData])

  return <>{children}</>
}

export { ThemeDefault }
