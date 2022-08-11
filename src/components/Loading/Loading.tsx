import React from 'react'
import styles from './Loading.module.scss'
import { LoadingProps } from './Loading.types'

const Loading: React.FC<any> = ({ className = '', ...props }: LoadingProps) => (
  <span className={`${styles.loading} ${className}`} {...props}>
    Loading&hellip;
  </span>
)

export { Loading }
