import * as React from 'react'
import { createComponent } from '@lit/react'
import { GrantCodesDialog } from './dialog.component'

export const Dialog = createComponent({
  tagName: 'grantcodes-dialog',
  elementClass: GrantCodesDialog,
  react: React,
})
