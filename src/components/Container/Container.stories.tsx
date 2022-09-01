import React from 'react'
import { Container } from './Container'

console.log('container stories')

export default {
  title: 'Container'
  // component: Container,
  // argTypes: {
  //   noPad: {
  //     control: 'boolean'
  //   },
  //   align: {
  //     control: 'select',
  //     options: ['normal', 'wide', 'full']
  //   }
  // }
}

const Template = ({ align, noPad }) => (
  <Container align={align} noPad={noPad}>
    <h1>Container</h1>
    <p>
      The content here will be contained to a max width, with padding on the
      sides.
    </p>
  </Container>
)

export const DefaultContainer = Template.bind({})
DefaultContainer.args = { align: 'normal', noPad: false }

export const WideContainer = Template.bind({})
WideContainer.args = { align: 'wide', noPad: false }

export const FullContainer = Template.bind({})
FullContainer.args = { align: 'full', noPad: false }

export const NoPadContainer = Template.bind({})
NoPadContainer.args = { align: 'normal', noPad: true }
