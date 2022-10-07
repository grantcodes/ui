import React from 'react'
import { Tabs } from './Tabs'
import { Tab } from './Tab'

export default {
  title: 'Tabs',
}

export const DefaultTabs = ({}) => (
  <Tabs tabsListLabel="Accout Options">
    <Tab value="tab1" label="First">
      <p>This is the first tab</p>
    </Tab>
    <Tab value="tab2" label="Second">
      <p>This is the second tab</p>
    </Tab>
  </Tabs>
)
DefaultTabs.args = {}

export const ScrollingTabs = ({}) => (
  <div style={{ width: 400 }}>
    <Tabs tabsListLabel="Tab list label">
      <Tab value="tab1" label="First Tab">
        <p>This is the first tab</p>
      </Tab>
      <Tab value="tab2" label="Second Tab">
        <p>This is the second tab</p>
      </Tab>
      <Tab value="tab3" label="Third Tab">
        <p>This is the third tab</p>
      </Tab>
      <Tab value="tab4" label="Fourth Tab">
        <p>This is the fourth tab</p>
      </Tab>
      <Tab value="tab5" label="Fifth Tab">
        <p>This is the fift tab</p>
      </Tab>
      <Tab value="tab6" label="Sixth Tab">
        <p>This is the sixth tab</p>
      </Tab>
    </Tabs>
  </div>
)
DefaultTabs.args = {}
