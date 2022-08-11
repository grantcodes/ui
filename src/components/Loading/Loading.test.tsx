import React from 'react'
import { render, within } from '@testing-library/react'

import { Loading } from './Loading'
import { LoadingProps } from './Loading.types'

describe('Loading', () => {
  const renderComponent = ({ className }: Partial<LoadingProps>) =>
    render(<Loading />)

  it('should render heading text correctly', () => {
    const headingText = 'Some test heading'

    const { getByTestId } = renderComponent({ heading: headingText })

    const Loading = getByTestId('test-component__heading')

    expect(Loading).toHaveTextContent(headingText)
  })

  it('should render content correctly', () => {
    const { getByTestId } = renderComponent({
      content: <div data-testid="some-test-content">I am test content</div>,
    })

    expect(
      within(getByTestId('test-component__content')).queryByTestId(
        'some-test-content'
      )
    ).toBeInTheDocument()
  })
})
