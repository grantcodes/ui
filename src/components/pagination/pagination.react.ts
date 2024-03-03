import * as React from 'react'
import { createComponent } from '@lit/react'
import { GrantCodesPagination } from './pagination.component'

export const Pagination = createComponent({
  tagName: 'grantcodes-pagination',
  elementClass: GrantCodesPagination,
  react: React,
})
