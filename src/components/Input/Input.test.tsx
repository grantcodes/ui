import React from 'react'
import { render, within } from '@testing-library/react'

import { Input } from './Input'
import { InputProps } from './Input.types'

describe('Input', () => {
  const renderComponent = ({ className }: Partial<InputProps>) =>
    render(<Input />)

  it('should render heading text correctly', () => {
    const headingText = 'Some test heading'

    const { getByTestId } = renderComponent({ heading: headingText })

    const input = getByTestId('test-component__heading')

    expect(input).toHaveTextContent(headingText)
  }) 
})
