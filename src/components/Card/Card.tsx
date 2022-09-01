import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import styles from './Card.module.scss'

export interface CardProps {
  children: React.ReactNode
  asChild?: boolean
}

const Card: React.FC<any> = ({
  children,
  asChild = false,
  ...props
}: CardProps) => {
  const Component = asChild ? Slot : 'div'

  return (
    <Component className={styles.card} {...props}>
      {children}
    </Component>
  )
}

export { Card }
