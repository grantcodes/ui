import React, { useEffect } from 'react'
// @ts-expect-error
import * as themeData from '@grantcodes/style-dictionary/todomap/js'
import '@grantcodes/style-dictionary/todomap/css'

// import '@grantcodes/style-dictionary/assets/fonts/quicksand'

export interface ThemeTodomapProps {
  children: React.ReactNode
  setThemeData: Function
}

const ThemeTodomap: React.FC<any> = ({
  setThemeData,
  children
}: ThemeTodomapProps) => {
  useEffect(() => {
    setThemeData({ ...themeData })
  }, [setThemeData])

  return <>{children}</>
}

export { ThemeTodomap }
