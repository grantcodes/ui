import React from 'react'
import { render, within } from '@testing-library/react'

import { Tooltip } from './Tooltip'
import { TooltipProps } from './Tooltip.types'

describe('Tooltip', () => {
  const renderComponent = ({ className }: Partial<TooltipProps>) =>
    render(<Tooltip />)

  it('should render heading text correctly', () => {
    const headingText = 'Some test heading'

    const { getByTestId } = renderComponent({ heading: headingText })

    const tooltip = getByTestId('test-component__heading')

    expect(tooltip).toHaveTextContent(headingText)
  }) 
})
