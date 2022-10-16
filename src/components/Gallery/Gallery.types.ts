import React from 'react'

export type GalleryVariation = 'square' | 'custom'

export interface GalleryThumbnail {
  width: number
  height: number
  src: string
}

export interface GalleryImage {
  width: number
  height: number
  src: string
  alt: string
  caption?: string
  thumbnail?: GalleryThumbnail
}

export interface GalleryProps {
  className: string
  images: GalleryImage[]
  variation: GalleryVariation
  columns?: number
  gap?: string
  rowHeight?: string
  lightbox: boolean
}

export interface GalleryThumbnailProps extends GalleryThumbnail {
  alt: string
  caption?: string
  onClick?: React.MouseEventHandler
}
