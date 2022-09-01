import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './Dialog'
import { DialogActions } from './DialogActions'
import { Button } from '../Button'

export default {
  title: 'Dialog'
}

export const StandardDialog = ({ content }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Show Dialog</Button>
    </DialogTrigger>
    <DialogContent>{content}</DialogContent>
  </Dialog>
)

StandardDialog.args = { content: <p>This is a basic text Dialog</p> }

export const WithActions = ({ content }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Show Dialog</Button>
    </DialogTrigger>

    <DialogContent>
      {content}

      <DialogActions>
        <Button>Action 1</Button>
        <Button>Action 2</Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
)

WithActions.args = {
  content: <p>This is a basic text Dialog</p>
}
