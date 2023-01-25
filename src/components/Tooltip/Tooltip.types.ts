import { ReactNode } from 'react'
import type { Side } from '@radix-ui/react-popper'

export interface TooltipProps {
  className: string
  children: ReactNode
  label: string
  side: Side
}
