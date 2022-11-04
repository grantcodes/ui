import React from 'react'
import { GalleryThumbnailProps } from './Gallery.types'
import styles from './Gallery.module.scss'

const GalleryThumbnail: React.FC<any> = ({
  width,
  height,
  src,
  alt,
  caption = '',
  onClick = () => {}
}: GalleryThumbnailProps) => (
  <figure className={styles.GalleryThumbnail}>
    <img
      width={width}
      height={height}
      src={src}
      alt={alt}
      onClick={onClick}
      loading='lazy'
      className={styles.GalleryThumbnail__image}
    />
    {caption !== '' && (
      <figcaption className={styles.GalleryThumbnail__caption}>
        {caption}
      </figcaption>
    )}
  </figure>
)

export { GalleryThumbnail }
