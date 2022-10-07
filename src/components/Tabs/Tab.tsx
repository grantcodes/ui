import React from 'react'
import { TabsContent as TabsPrimitiveContent } from '@radix-ui/react-tabs'
import { TabProps } from './Tabs.types'
import styles from './Tabs.module.scss'

const Tab: React.FC<any> = ({ children, value }: TabProps) => (
  <TabsPrimitiveContent className={styles.Tabs__content} value={value}>
    {children}
  </TabsPrimitiveContent>
)

export { Tab }
