import * as React from 'react'
import { createComponent } from '@lit/react'
import { GrantCodesButton } from './button.component'

export const Button = createComponent({
  tagName: 'grantcodes-button',
  elementClass: GrantCodesButton,
  react: React,
})
