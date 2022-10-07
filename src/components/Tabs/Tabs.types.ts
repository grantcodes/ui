import {
  TabsProps as TabsPrimitiveProps,
  TabsContentProps,
} from '@radix-ui/react-tabs'
import React from 'react'

export interface TabProps extends TabsContentProps {
  label: string
}

export interface TabsProps extends TabsPrimitiveProps {
  children: React.ReactElement<TabProps>[]
  tabsListLabel: string
}
