import React from 'react'
import styles from './Link.module.scss'

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
}

const Link: React.FC<any> = ({ children, ...props }: LinkProps) => (
  <a className={styles.Link} {...props}>
    {children}
  </a>
)

export { Link }
