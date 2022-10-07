type GalleryVariation = 'square' | 'rows' | 'custom'

interface GalleryThumbnail {
  width: number
  height: number
  src: string
}

interface GalleryImage {
  width: number
  height: number
  src: string
  alt: string
  caption?: string
  thumbnail?: GalleryThumbnail
}

interface GalleryProps {
  className: string
  images: GalleryImage[]
  variation: GalleryVariation
  columns?: number
  gap?: string
  rowHeight?: string
}

export type { GalleryVariation, GalleryImage, GalleryProps }
