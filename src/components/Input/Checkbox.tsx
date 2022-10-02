import React from 'react'
import styles from './Input.module.scss'
import cx from 'classnames'
import { CheckboxProps } from './Input.types'

const Checkbox: React.FC<any> = ({
  className = '',
  ...props
}: CheckboxProps) => (
  <input type='checkbox' className={cx(styles.Input, className)} {...props} />
)

export { Checkbox }
