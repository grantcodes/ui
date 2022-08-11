import React from 'react'
import { render, within } from '@testing-library/react'

import { Gallery } from './Gallery'
import { GalleryProps } from './Gallery.types'

describe('Gallery', () => {
  const renderComponent = ({ className }: Partial<GalleryProps>) =>
    render(<Gallery />)

  it('should render heading text correctly', () => {
    const headingText = 'Some test heading'

    const { getByTestId } = renderComponent({ heading: headingText })

    const gallery = getByTestId('test-component__heading')

    expect(gallery).toHaveTextContent(headingText)
  }) 
})
