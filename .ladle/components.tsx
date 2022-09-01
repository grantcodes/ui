import React from 'react'
import { GlobalProvider } from '@ladle/react'
import { Provider as ThemeProvider } from '../src/Provider/Provider'

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <ThemeProvider>
    <h1>Theme: {globalState.theme}</h1>
    {children}
  </ThemeProvider>
)
