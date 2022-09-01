import React from 'react'
import cx from 'classnames'
import { Slot } from '@radix-ui/react-slot'
import styles from './Container.module.scss'
import { ContainerProps } from './Container.types'

const Container: React.FC<any> = ({
  className = '',
  children,
  align = 'normal',
  noPad = false,
  asChild = false,
  ...props
}: ContainerProps) => {
  const Component = asChild ? Slot : 'div'

  return (
    <Component
      className={cx(
        styles.Container,
        className,
        styles[`Container--${align}`],
        {
          [styles['Container--noPad']]: noPad
        }
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export { Container }
