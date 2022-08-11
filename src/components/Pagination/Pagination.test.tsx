import React from 'react'
import { render, within } from '@testing-library/react'

import { Pagination } from './Pagination'
import { PaginationProps } from './Pagination.types'

describe('Pagination', () => {
  const renderComponent = ({ className }: Partial<PaginationProps>) =>
    render(<Pagination />)

  it('should render heading text correctly', () => {
    const headingText = 'Some test heading'

    const { getByTestId } = renderComponent({ heading: headingText })

    const pagination = getByTestId('test-component__heading')

    expect(pagination).toHaveTextContent(headingText)
  }) 
})
