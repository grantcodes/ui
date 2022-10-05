import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import cx from 'classnames'
import { CardProps } from './Card.types'
import styles from './Card.module.scss'

const Card: React.FC<any> = ({
  children,
  className,
  asChild = false,
  ...props
}: CardProps) => {
  const Component = asChild ? Slot : 'div'

  return (
    <Component className={cx(styles.card, className)} {...props}>
      {children}
    </Component>
  )
}

export { Card }
