import React from 'react'
import { Icon } from './Icon'
import { FaBeer, FaAddressBook } from 'react-icons/fa'

export default {
  title: 'Icon',
}

export const IconWithTitle = ({ icon, title }) => (
  <Icon icon={icon} title={title} />
)

IconWithTitle.args = { icon: FaBeer, title: 'Beer Icon' }

export const IconWithoutTitle = ({ icon, title }) => (
  <Icon icon={icon} title={title} />
)

IconWithoutTitle.args = { icon: FaAddressBook }
