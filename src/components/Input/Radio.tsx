import React from 'react'
import styles from './Input.module.scss'
import cx from 'classnames'
import { RadioProps } from './Input.types'

const Radio: React.FC<any> = ({ className = '', ...props }: RadioProps) => (
  <input type='Radio' className={cx(styles.Input, className)} {...props} />
)

export { Radio }
