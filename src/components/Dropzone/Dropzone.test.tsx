import React from 'react'
import { render, within } from '@testing-library/react'

import { Dropzone } from './Dropzone'
import { DropzoneProps } from './Dropzone.types'

describe('Dropzone', () => {
  const renderComponent = ({ className }: Partial<DropzoneProps>) =>
    render(<Dropzone />)

  it('should render heading text correctly', () => {
    const headingText = 'Some test heading'

    const { getByTestId } = renderComponent({ heading: headingText })

    const dropzone = getByTestId('test-component__heading')

    expect(dropzone).toHaveTextContent(headingText)
  }) 
})
