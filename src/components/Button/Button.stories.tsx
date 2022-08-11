import React from 'react'
import { Button } from './Button'
import { Link } from '../Link'
import { Icon } from '../Icon'
import { FiTrash } from 'react-icons/fi'

export default {
  title: 'Button',
}

export const WithText = ({ label }) => <Button>{label}</Button>

WithText.args = { label: 'Hello Button' }

export const LinkAsButton = ({ label }) => (
  <Button asChild>
    <Link href="#link">{label}</Link>
  </Button>
)

LinkAsButton.args = { label: 'Hello Button' }

export const Disabled = ({ label }) => <Button isDisabled>{label}</Button>
Disabled.args = { label: 'Disabled Button' }

export const Secondary = ({ label }) => (
  <Button variant="secondary">{label}</Button>
)
Secondary.args = { label: 'Secondary Button' }

export const Tertiary = ({ label }) => (
  <Button variant="tertiary">{label}</Button>
)
Tertiary.args = { label: 'Tertiary Button' }

export const Outline = ({ label }) => <Button variant="outline">{label}</Button>
Outline.args = { label: 'Outline Button' }

export const Destructive = ({ label }) => (
  <Button variant="destructive">{label}</Button>
)
Destructive.args = { label: 'Destructive Button' }

export const Inline = ({ label }) => <Button variant="inline">{label}</Button>
Inline.args = { label: 'Inline Button' }

export const IconButton = () => (
  <Button>
    <Icon icon={FiTrash} title="Delete" />
  </Button>
)

export const IconText = () => (
  <Button>
    <Icon icon={FiTrash} />
    Delete
  </Button>
)
