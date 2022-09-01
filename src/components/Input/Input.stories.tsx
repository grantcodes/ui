import React from 'react'
import { Input } from './Input'

export default {
  title: 'Input'
}

export const DefaultInput = ({ placeholder }) => (
  <Input placeholder={placeholder} />
)
DefaultInput.args = { placeholder: 'Default Input' }

export const InvalidInput = ({ placeholder }) => (
  <Input
    placeholder={placeholder}
    type='email'
    value='notvalidemail'
    required
  />
)
InvalidInput.args = { placeholder: 'Invalid Input' }

export const Disabled = ({ placeholder }) => (
  <Input placeholder={placeholder} disabled />
)
Disabled.args = { placeholder: 'Disabled Input' }

export const EmailInput = ({ placeholder }) => (
  <Input placeholder={placeholder} type='email' />
)
EmailInput.args = { placeholder: 'Email Input' }
