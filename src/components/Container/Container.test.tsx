import React from 'react'
import { render, within } from '@testing-library/react'

import { Container } from './Container'
import { ContainerProps } from './Container.types'

describe('Container', () => {
  const renderComponent = ({ className }: Partial<ContainerProps>) =>
    render(<Container />)

  it('should render heading text correctly', () => {
    const headingText = 'Some test heading'

    const { getByTestId } = renderComponent({ heading: headingText })

    const container = getByTestId('test-component__heading')

    expect(container).toHaveTextContent(headingText)
  }) 
})
