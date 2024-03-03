import * as React from 'react'
import { createComponent } from '@lit/react'
import { GrantCodesContainer } from './container.component'

export const Container = createComponent({
  tagName: 'grantcodes-container',
  elementClass: GrantCodesContainer,
  react: React,
})
