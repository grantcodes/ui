import React from 'react'
import { Tooltip } from './Tooltip'

export default {
  title: 'Tooltip',
}

export const DefaultTooltip = (args) => (
  <Tooltip {...args}>
    <span>Hover for a tooltip</span>
  </Tooltip>
)
DefaultTooltip.args = {
  label: 'This is a tooltip',
  side: 'top',
}

export const LeftTooltip = DefaultTooltip.bind({})
LeftTooltip.args = { label: 'Left side tooltip', side: 'left' }

export const RightTooltip = DefaultTooltip.bind({})
RightTooltip.args = { label: 'Right side tooltip', side: 'right' }

export const BottomTooltip = DefaultTooltip.bind({})
BottomTooltip.args = { label: 'Bottom side tooltip', side: 'bottom' }
