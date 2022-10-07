import React from 'react'
import styles from './Gallery.module.scss'
import cx from 'classnames'
import { GalleryProps } from './Gallery.types'
// import { getJustifiedGallery } from './lib/get-justified-gallery'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

const Gallery: React.FC<any> = ({
  className = '',
  images,
  columns = 3,
  variation = 'square',
  gap = '0rem',
  rowHeight = '8rem',
  ...props
}: GalleryProps) => {
  let galleryImages = images

  // if (variation === 'justified') {
  //   getJustifiedGallery(galleryImages)
  // }

  const style = {
    '--gallery-gap': gap,
    '--gallery-columns': columns,
    '--gallery-row-height': rowHeight,
  }
  return (
    <div
      className={cx(styles.Gallery, styles[`Gallery--${variation}`], className)}
      style={style}
      {...props}
    >
      <PhotoProvider>
        {galleryImages.map((image, i) => {
          const photoViewProps = {
            width: image.width,
            height: image.height,
            src: image.src,
            alt: image.alt,
          }
          const thumbnailProps = image?.thumbnail ?? photoViewProps
          return (
            <PhotoView key={i} {...photoViewProps}>
              <img {...thumbnailProps} loading="lazy" />
            </PhotoView>
          )
        })}
      </PhotoProvider>
    </div>
  )
}

export { Gallery }
