import React from 'react'

export interface ContainerProps {
  className: string
  align?: 'normal' | 'wide' | 'full'
  noPad?: boolean
  asChild?: boolean
  children: React.ReactNode
}
