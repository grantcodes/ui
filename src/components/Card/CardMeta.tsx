import React from 'react'
import styles from './Card.module.scss'
import { CardMetaItemProps } from './CardMetaItem'

export interface CardMetaProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDListElement>,
    HTMLDListElement
  > {
  children: React.ReactElement<CardMetaItemProps>[]
}

const CardMeta: React.FC<any> = ({ children, ...props }: CardMetaProps) => (
  <dl className={styles.card__meta} {...props}>
    {children}
  </dl>
)

export { CardMeta }
