import type { GalleryImage } from '../Gallery.types'
// @ts-ignore
import layoutGeometry from 'justified-layout'

function ensureThumbnail(image: GalleryImage): GalleryImage {
  if (!image.thumbnail) {
    image.thumbnail = {
      src: image.src,
      width: image.width,
      height: image.height,
    }
  }
  return image
}

function getJustifiedGallery(images: GalleryImage[]): GalleryImage[] {
  let justifiedImages: GalleryImage[] = images.map(ensureThumbnail)

  const layoutGeometryInput = justifiedImages.map((img) => ({
    width: img?.thumbnail?.width,
    height: img?.thumbnail?.height,
  }))

  const res = layoutGeometry(layoutGeometryInput)

  console.log(res)

  return justifiedImages
}

export { getJustifiedGallery }
