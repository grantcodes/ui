import React from 'react'
import { Notice } from './Notice'

export default {
  title: 'Notice',
}

export const BasicInfo = ({ content }) => <Notice>{content}</Notice>

BasicInfo.args = { content: 'This is a basic text Notice' }

export const Info = ({ title, content }) => (
  <Notice title={title}>{content}</Notice>
)

Info.args = {
  title: 'Info',
  content: <p>This is a basic text Notice</p>,
}

export const DismissableInfo = ({ title, content }) => (
  <Notice title={title} onDismiss={(e) => window.alert('Dismissed')}>
    {content}
  </Notice>
)

DismissableInfo.args = {
  title: 'Dismissable Info',
  content: <p>This is a basic text Notice</p>,
}

export const warning = ({ title, content }) => (
  <Notice title={title} variant="warning">
    {content}
  </Notice>
)

warning.args = {
  title: 'Warning',
  content: <p>This is a basic text Notice</p>,
}

export const error = ({ title, content }) => (
  <Notice title={title} variant="error">
    {content}
  </Notice>
)

error.args = {
  title: 'Error',
  content: <p>This is a basic text Notice</p>,
}

export const success = ({ title, content }) => (
  <Notice title={title} variant="success">
    {content}
  </Notice>
)

success.args = {
  title: 'Success',
  content: <p>This is a basic text Notice</p>,
}
