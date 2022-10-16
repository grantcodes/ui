import { GalleryImage } from '../Gallery.types'

function normalizeImage (image: GalleryImage): GalleryImage {
  // Ensure all images have a thumbnail defined.
  if (image.thumbnail === undefined) {
    image.thumbnail = {
      src: image.src,
      width: image.width,
      height: image.height
    }
  }
  return image
}

export { normalizeImage }
