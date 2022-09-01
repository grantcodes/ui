import React from 'react'
import styles from './Input.module.scss'
import cx from 'classnames'
import { TextAreaProps } from './Input.types'

const TextArea: React.FC<any> = ({
  className = '',
  ...props
}: TextAreaProps) => (
  <textarea className={cx(styles.Input, className)} {...props}></textarea>
)

export { TextArea }
