import React from 'react'
import { render, within } from '@testing-library/react'

import { Tabs } from './Tabs'
import { TabsProps } from './Tabs.types'

describe('Tabs', () => {
  const renderComponent = ({ className }: Partial<TabsProps>) =>
    render(<Tabs />)

  it('should render heading text correctly', () => {
    const headingText = 'Some test heading'

    const { getByTestId } = renderComponent({ heading: headingText })

    const tabs = getByTestId('test-component__heading')

    expect(tabs).toHaveTextContent(headingText)
  }) 
})
