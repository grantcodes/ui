import { ButtonGroupProps } from '../ButtonGroup'
import React from 'react'

export interface CardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode
  asChild?: boolean
}

export interface CardActionsProps extends ButtonGroupProps {}
