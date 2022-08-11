import React from 'react'
import { IconType, IconBaseProps } from 'react-icons'
import styles from './Icon.module.scss'

export interface IconProps extends IconBaseProps {
  icon: IconType
  title?: string
  className: string
}

const Icon: React.FC<any> = ({
  icon: Component,
  className = '',
  title,
  ...props
}: IconProps) => (
  <Component
    className={`${styles.icon} ${className}`}
    title={title}
    aria-hidden={!title ? 'true' : undefined}
    {...props}
  />
)

export { Icon }
