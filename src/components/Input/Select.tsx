import React from 'react'
import styles from './Input.module.scss'
import cx from 'classnames'
import { SelectProps } from './Input.types'

const Select: React.FC<any> = ({ className = '', ...props }: SelectProps) => (
  <select className={cx(styles.Input, className)} {...props}></select>
)

export { Select }
