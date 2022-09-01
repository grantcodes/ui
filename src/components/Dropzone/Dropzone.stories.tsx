import React from 'react'
import { Dropzone } from './Dropzone'

export default {
  title: 'Dropzone'
}

export const DefaultDropzone = ({}) => <Dropzone>Drag files here</Dropzone>
DefaultDropzone.args = {}

export const FullscreenDropzone = ({}) => (
  <Dropzone fullscreenOnDrag>
    Drag files here. Now this will cover the screen when dragging files.
  </Dropzone>
)
FullscreenDropzone.args = {}
