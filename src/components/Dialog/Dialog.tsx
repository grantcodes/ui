import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Card, CardContent } from '../Card'
import { FiX } from 'react-icons/fi'
import styles from './Dialog.module.scss'
import { DialogContentProps } from './Dialog.types'
import { DialogActions } from './DialogActions'

// NOTE: Needs to be function component.
function Content({ children: allChildren, ...props }: DialogContentProps) {
  // Split out child actions from other children.
  const children =
    allChildren && Array.isArray(allChildren)
      ? allChildren.filter((child) => child.type !== DialogActions)
      : allChildren

  const Actions =
    allChildren && Array.isArray(allChildren)
      ? allChildren.find((child) => child.type === DialogActions)
      : null

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.Dialog__backdrop} />

      <DialogPrimitive.Content {...props}>
        <Card className={styles.Dialog}>
          <CardContent>{children}</CardContent>

          {Actions}

          <DialogPrimitive.Close asChild>
            <Button variant="inline" className={styles.Dialog__close}>
              <Icon icon={FiX} title="Close Dialog" />
            </Button>
          </DialogPrimitive.Close>
        </Card>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogContent = Content
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
