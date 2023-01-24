import React from 'react'
import * as AvatarBase from '@radix-ui/react-avatar'
import styles from './Avatar.module.scss'
import cx from 'classnames'
import { AvatarProps } from './Avatar.types'

/**
 * Helper function to get the initials of a name.
 */
function getInitials(fullName: string): string {
  let initials = fullName.split(' ').map((part) => part[0])

  // Only allow a max of 4 initials.
  initials = initials.slice(0, 4)

  return initials.join('')
}

const Avatar: React.FC<any> = ({
  className = '',
  src,
  name,
  alt,
  initials,
  ...props
}: AvatarProps) => {
  let renderedInitials = '?'
  if (initials) {
    renderedInitials = initials
  } else if (name) {
    renderedInitials = getInitials(name)
  }

  return (
    <AvatarBase.Root className={cx(styles.Avatar, className)} {...props}>
      <AvatarBase.Image
        className={styles.AvatarImage}
        src={src}
        alt={alt ?? name}
      />
      <AvatarBase.Fallback className={styles.AvatarFallback}>
        {renderedInitials}
      </AvatarBase.Fallback>
    </AvatarBase.Root>
  )
}

export { Avatar }
