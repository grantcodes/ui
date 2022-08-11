import React from 'react'
import styles from './Card.module.scss'

const CardContent: React.FC<any> = ({
  children,
  as: Component = 'div',
  ...props
}) => (
  <Component className={styles.card__content} {...props}>
    {children}
  </Component>
)

export { CardContent }
