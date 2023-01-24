import React from 'react'

export interface ContainerProps {
  className: string
  align?: 'normal' | 'wide' | 'full' | 'viewport'
  noPad?: boolean
  asChild?: boolean
  children: React.ReactNode
}
