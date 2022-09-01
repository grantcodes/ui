import React from 'react'
import { IconType } from 'react-icons'
import {
  RiInformationLine,
  RiErrorWarningLine,
  RiCheckboxCircleLine,
  RiCloseLine
} from 'react-icons/ri'
import { Icon } from '../Icon'
import { Button } from '../Button'
import styles from './Notice.module.scss'

type NoticeVariant = 'info' | 'success' | 'warning' | 'error'

export interface NoticeProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  title?: string
  variant: NoticeVariant
  icon?: React.ReactElement
  onDismiss?: (Event: React.SyntheticEvent) => void
  children: React.ReactNode
}

const getVariantIcon = (variant: NoticeVariant): IconType | null => {
  switch (variant) {
    case 'info':
      return RiInformationLine
    case 'success':
      return RiCheckboxCircleLine
    case 'warning':
      return RiErrorWarningLine
    case 'error':
      return RiErrorWarningLine
    default:
      return null
  }
}

const Notice: React.FC<any> = ({
  children,
  title,
  variant = 'info',
  icon,
  onDismiss,
  ...props
}: NoticeProps) => {
  const iconEl = icon ?? getVariantIcon(variant)

  return (
    <aside className={styles[`notice--${variant}`]} {...props}>
      <Icon icon={iconEl} className={styles.notice__icon} />

      <div className={styles.notice__content}>
        {title && <h2 className={styles.notice__title}>{title}</h2>}
        {typeof children === 'string' ? <p>{children}</p> : children}
      </div>

      {onDismiss && (
        <Button className={styles.notice__close}>
          <Icon icon={RiCloseLine} title='Close Notice' />
        </Button>
      )}
    </aside>
  )
}

export { Notice }
