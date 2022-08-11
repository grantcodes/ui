import React from 'react'
import styles from './Gallery.module.scss'
import cx from 'classnames';
import { GalleryProps } from './Gallery.types'

const Gallery: React.FC<any> = ({ className = '', ...props }: GalleryProps) => (
  <div className={cx(styles.Gallery, className)} {...props}>
    Gallery
  </div>
)

export { Gallery }
