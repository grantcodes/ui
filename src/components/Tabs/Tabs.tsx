import React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import styles from './Tabs.module.scss'
import cx from 'classnames'
import { TabsProps } from './Tabs.types'

// TODO: Maybe need to scroll the active tab into view on tab change.

const Tabs: React.FC<any> = ({
  className = '',
  tabsListLabel,
  children: tabs,
  ...props
}: TabsProps) => (
  <TabsPrimitive.Root
    className={cx(styles.Tabs, className)}
    defaultValue={tabs[0].props.value}
    {...props}
  >
    <TabsPrimitive.List
      className={styles.Tabs__list}
      aria-label={tabsListLabel}
    >
      <div className={styles.Tabs__list__inner}>
        {tabs.map(({ props: { value, label } }) => (
          <TabsPrimitive.Trigger
            className={styles.Tabs__trigger}
            key={`tab-trigger-${value}`}
            value={value}
          >
            {label}
          </TabsPrimitive.Trigger>
        ))}
      </div>
    </TabsPrimitive.List>
    {tabs}
  </TabsPrimitive.Root>
)

export { Tabs }
