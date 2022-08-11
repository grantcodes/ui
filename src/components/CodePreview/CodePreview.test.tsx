import React from 'react'
import { render, within } from '@testing-library/react'

import { CodePreview } from './CodePreview'
import { CodePreviewProps } from './CodePreview.types'

describe('CodePreview', () => {
  const renderComponent = ({ className }: Partial<CodePreviewProps>) =>
    render(<CodePreview />)

  it('should render heading text correctly', () => {
    const headingText = 'Some test heading'

    const { getByTestId } = renderComponent({ heading: headingText })

    const codePreview = getByTestId('test-component__heading')

    expect(codePreview).toHaveTextContent(headingText)
  }) 
})
