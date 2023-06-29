import React from 'react'
import { Pagination } from './Pagination'

export default {
  title: 'Pagination',
}

export const DefaultPagination = ({}) => (
  <Pagination nextHref="#next" previousHref="#previous" />
)
DefaultPagination.args = {}
