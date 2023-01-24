import React from 'react'
import { render, within } from '@testing-library/react'

import { Avatar } from './Avatar'
import { AvatarProps } from './Avatar.types'

describe('Avatar', () => {
  const renderComponent = ({ className }: Partial<AvatarProps>) =>
    render(<Avatar />)

  it('should render heading text correctly', () => {
    const headingText = 'Some test heading'

    const { getByTestId } = renderComponent({ heading: headingText })

    const avatar = getByTestId('test-component__heading')

    expect(avatar).toHaveTextContent(headingText)
  }) 
})
