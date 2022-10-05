import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from './Dialog'
import { DialogActions } from './DialogActions'
import { Button } from '../Button'

export default {
  title: 'Dialog',
}

export const StandardDialog = ({ content }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Show Dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogDescription>{content}</DialogDescription>
    </DialogContent>
  </Dialog>
)

StandardDialog.args = { content: 'This is a basic text Dialog' }

export const WithActions = ({ content }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Show Dialog</Button>
    </DialogTrigger>

    <DialogContent>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Hello there, this is a dialog</DialogDescription>
      {content}
      <DialogActions>
        <Button>Action 1</Button>
        <Button>Action 2</Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
)

WithActions.args = {
  content: (
    <p>
      This is a fully setup dialog with a title, description, content and
      actions
    </p>
  ),
}
