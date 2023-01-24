import React from 'react'
import { Avatar } from './Avatar'

export default {
  title: 'Avatar',
}

export const DefaultAvatar = (args) => <Avatar {...args} />
DefaultAvatar.args = {
  src: 'https://placeimg.com/160/160/people',
  name: 'Tommy Tobasco',
  alt: 'Tommy Tomasco Avatar',
  initials: '2T',
}

export const FallbackAvatar = DefaultAvatar.bind({})
FallbackAvatar.args = { src: null, name: 'Grant Richmond' }
