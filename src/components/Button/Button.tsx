import React, { useRef } from 'react'
import styles from './Button.module.scss'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'outline'
  | 'destructive'
  | 'inline'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: React.ReactNode
  asChild?: boolean
  className?: string
}

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
