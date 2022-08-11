import React, { PropsWithChildren } from 'react'
import styles from './Card.module.scss'

export interface CardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode
}

const Card: React.FC<any> = ({ children, ...props }: CardProps) => (
  <div className={styles.card} {...props}>
    {children}
  </div>
)

export { Card }
