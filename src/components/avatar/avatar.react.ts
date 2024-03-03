import * as React from 'react'
import { createComponent } from '@lit/react'
import { GrantCodesAvatar } from './avatar.component'

export const Avatar = createComponent({
  tagName: 'grantcodes-avatar',
  elementClass: GrantCodesAvatar,
  react: React,
})
