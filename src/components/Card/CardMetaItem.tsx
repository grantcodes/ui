import React from 'react'
import styles from './Card.module.scss'

export interface CardMetaItemProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string
  children: React.ReactElement
}

const CardMetaItem: React.FC<any> = ({
  title,
  children,
  ...props
}: CardMetaItemProps) => (
  <div className={styles.card__meta__item} {...props}>
    <dt>{title}</dt>
    <dd>{children}</dd>
  </div>
)

export { CardMetaItem }
