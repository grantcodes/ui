import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
// import { addClassNameToPrimitiveHOC } from 'lib/addClassNameToPrimitiveHOC'
import styles from './Dialog.module.scss'

export interface DialogProps {
  children: React.ReactNode
}

// const DialogContentInner = addClassNameToPrimitiveHOC(
//   DialogPrimitive.Content,
//   styles.dialog
// )

// const DialogBackdrop = addClassNameToPrimitiveHOC(
//   DialogPrimitive.Overlay,
//   styles.dialog__backdrop
// )

const Content: React.FC<any> = ({ children, ...props }: DialogProps) => (
  <DialogPrimitive.Portal>
    {/* <DialogBackdrop /> */}
    {/* <DialogContentInner {...props}>{children}</DialogContentInner> */}
  </DialogPrimitive.Portal>
)

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogContent = Content
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
export const DialogClose = DialogPrimitive.Close
