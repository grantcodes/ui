import React from 'react'

export interface DropzoneProps {
  className: string
  children: React.ReactNode
  onFiles: Function
  fullscreenOnDrag?: boolean
  multiple?: boolean
  accept?: string
}
