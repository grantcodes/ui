import React from 'react'
import { Label } from './Label'

export default {
  title: 'Label',
}

export const RegularLabel = ({ label }) => <Label for="field">{label}</Label>
RegularLabel.args = { label: 'Form Label' }
