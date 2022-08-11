import React from 'react'
import styles from './Input.module.scss'
import cx from 'classnames'
import { InputProps } from './Input.types'

const Input: React.FC<any> = ({ className = '', ...props }: InputProps) => (
  <input className={cx(styles.Input, className)} {...props}></input>
)

export { Input }
