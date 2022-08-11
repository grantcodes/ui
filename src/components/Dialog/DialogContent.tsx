import React from 'react'
import styles from './Dialog.module.scss'

const DialogContent: React.FC<any> = ({
  children,
  as: Component = 'div',
  ...props
}) => (
  <Component className={styles.Dialog__content} {...props}>
    {children}
  </Component>
)

export { DialogContent }
