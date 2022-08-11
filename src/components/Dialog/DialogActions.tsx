import React from 'react'
import styles from './Dialog.module.scss'

const DialogActions: React.FC<any> = ({ children, ...props }) => (
  <div className={styles.Dialog__actions} {...props}>
    {children}
  </div>
)

export { DialogActions }
