import * as React from 'react'
import { createComponent } from '@lit/react'
import { GrantCodesButtonGroup } from './button-group.component'

export const ButtonGroup = createComponent({
  tagName: 'grantcodes-button-group',
  elementClass: GrantCodesButtonGroup,
  react: React,
})
