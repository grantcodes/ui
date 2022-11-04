import React, { Fragment } from 'react'
import styles from './Gallery.module.scss'
import cx from 'classnames'
import { GalleryProps } from './Gallery.types'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { GalleryThumbnail } from './GalleryThumbnail'
import { normalizeImage } from './lib/normalize-image'
import 'react-photo-view/dist/react-photo-view.css'

const Gallery: React.FC<any> = ({
  className = '',
  images,
  columns = 3,
  variation = 'square',
  gap = '0rem',
  rowHeight = '8rem',
  lightbox = true,
  ...props
}: GalleryProps) => {
  const galleryImages = images.map(normalizeImage)

  const Wrapper = lightbox ? PhotoProvider : Fragment

  const style: any = {
    '--gallery-gap': gap,
    '--gallery-columns': columns,
    '--gallery-row-height': rowHeight
  }
  return (
    <div
      className={cx(
        styles.Gallery,
        styles[`Gallery--${variation}`],
        className,
        { [styles['Gallery--has-lightbox']]: lightbox }
      )}
      style={style}
      {...props}
    >
      <Wrapper>
        {galleryImages.map((image, i) => {
          const thumbnail = (
            <GalleryThumbnail
              {...image.thumbnail}
              alt={image.alt}
              caption={image.caption}
              key={`thumbnail-${i}`}
            />
          )
          if (!lightbox) {
            return thumbnail
          }
          const photoViewProps = {
            width: image.width,
            height: image.height,
            src: image.src,
            alt: image.alt
          }
          return (
            <PhotoView key={`photoview-${i}`} {...photoViewProps}>
              {thumbnail}
            </PhotoView>
          )
        })}
      </Wrapper>
    </div>
  )
}

export { Gallery }
