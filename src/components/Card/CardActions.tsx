import React from 'react'
import cx from 'classnames'
import styles from './Card.module.scss'
import { ButtonGroup } from '../ButtonGroup'
import { CardActionsProps } from './Card.types'

const CardActions: React.FC<any> = ({
  children,
  className,
  ...props
}: CardActionsProps) => (
  <ButtonGroup className={cx(className, styles.card__actions)} {...props}>
    {children}
  </ButtonGroup>
)

export { CardActions }
