import React from 'react'
import styles from './Dialog.module.scss'
import { CardActions } from '../Card'
import { DialogActionsProps } from './Dialog.types'

const DialogActions: React.FC<any> = ({
  children,
  ...props
}: DialogActionsProps) => (
  <CardActions className={styles.Dialog__actions} {...props}>
    {children}
  </CardActions>
)

export { DialogActions }
