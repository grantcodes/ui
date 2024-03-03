import * as React from 'react'
import { createComponent } from '@lit/react'
import { GrantCodesIcon } from './icon.component'

export const Icon = createComponent({
  tagName: 'grantcodes-icon',
  elementClass: GrantCodesIcon,
  react: React,
})
