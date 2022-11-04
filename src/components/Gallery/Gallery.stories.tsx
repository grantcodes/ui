import React from 'react'
import { Gallery } from './Gallery'
import { GalleryImage } from './Gallery.types'

export default {
  title: 'Gallery'
}

function getRandomSize () {
  return Math.floor(Math.random() * (800 - 100 + 1) + 100)
}

const getTestImage = (width = getRandomSize(), height = getRandomSize()) => {
  return {
    src: `https://placeimg.com/${width}/${height}`,
    alt: 'Image',
    width,
    height
  }
}

const testImages: GalleryImage[] = []
for (let i = 0; i < 12; i++) {
  testImages.push(getTestImage())
}

const Template = ({ caption, ...props }) => {
  const images = testImages.map(image => ({ ...image, caption }))
  console.log({ images, props })
  return <Gallery images={images} {...props}></Gallery>
}

export const SquareGallery = Template.bind({})

SquareGallery.args = {
  variation: 'square',
  columns: 3,
  gap: '.2rem',
  lightbox: true,
  caption: 'I am a caption'
}
