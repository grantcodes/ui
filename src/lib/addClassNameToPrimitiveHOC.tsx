import * as React from 'react'
import cx from 'classnames'

const addClassNameToPrimitiveHOC = (
  Component: React.FC,
  baseClassName: string
) =>
  React.forwardRef<
    React.ElementRef<typeof Component>,
    React.ComponentProps<typeof Component>
  >((props: any, forwardedRef) => {
    const { className, ...itemProps } = props

    return (
      <Component
        {...itemProps}
        ref={forwardedRef}
        className={cx(baseClassName, className)}
      />
    )
  })

export { addClassNameToPrimitiveHOC }
