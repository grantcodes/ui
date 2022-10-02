import React from 'react'
import { Input } from './Input'
import { TextArea as TextAreaComponent } from './TextArea'
import { Select as SelectComponent } from './Select'
import { Checkbox as CheckboxComponent } from './Checkbox'
import { Radio as RadioComponent } from './Radio'

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

export const TextArea = ({ placeholder }) => (
  <TextAreaComponent placeholder={placeholder} />
)
TextArea.args = { placeholder: 'Text area' }

export const Select = ({ placeholder }) => (
  <SelectComponent placeholder={placeholder}>
    <optgroup label='Opt Group'>
      <option>First Item</option>
      <option>Second thing</option>
      <option>Another option</option>
      <option>A final option in this opt group</option>
    </optgroup>
    <option value=''>Option outside of the opt group</option>
    <option value=''>One more thing</option>
  </SelectComponent>
)

export const Checkbox = ({ placeholder }) => (
  <CheckboxComponent placeholder={placeholder} />
)
Checkbox.args = {}

export const Radio = ({ placeholder }) => (
  <>
    <RadioComponent placeholder={placeholder} name='radio' value='1' />
    <RadioComponent placeholder={placeholder} name='radio' value='2' />
    <RadioComponent placeholder={placeholder} name='radio' value='3' />
  </>
)
Radio.args = {}
