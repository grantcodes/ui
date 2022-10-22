import React from 'react'
import cx from 'classnames'
import styles from './ButtonGroup.module.scss'
import { ButtonProps } from '../Button'

export interface ButtonGroupProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string
  children: React.ReactElement<ButtonProps>[]
}

const ButtonGroup: React.FC<any> = ({
  className,
  children,
  ...props
}: ButtonGroupProps) => (
  <div className={cx(className, styles['button-group'])} {...props}>
    {children}
  </div>
)

export { ButtonGroup }
