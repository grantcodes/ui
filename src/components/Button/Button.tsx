import React from 'react'
import styles from './Button.module.scss'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
import { ButtonProps } from './Button.types'

const Button: React.FC<any> = (props: ButtonProps) => {
  const {
    children,
    asChild,
    variant = 'primary',
    className = '',
    ...buttonProps
  } = props

  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cx(styles[`button--${variant}`], className)}
      {...buttonProps}
    >
      {children}
    </Component>
  )
}

export { Button }
