import React from 'react'
import styles from './Card.module.scss'
import { ButtonGroup, ButtonGroupProps } from '../ButtonGroup'

export interface CardActionsProps extends ButtonGroupProps {}

const CardActions: React.FC<any> = ({
  children,
  ...props
}: CardActionsProps) => (
  <ButtonGroup className={styles.card__actions} {...props}>
    {children}
  </ButtonGroup>
)

export { CardActions }
