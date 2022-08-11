import React from 'react'
import styles from './Pagination.module.scss'
import cx from 'classnames'
import { PaginationProps } from './Pagination.types'
import { Button } from '../Button'

const Pagination: React.FC<any> = ({
  className = '',
  nextHref,
  previousHref,
  ...props
}: PaginationProps) => (
  <nav
    aria-label="Pagination navigation"
    className={cx(styles.Pagination, className)}
    {...props}
  >
    {!!previousHref && (
      <Button className={styles.Pagination__button} href={previousHref}>
        Previous
      </Button>
    )}
    {!!nextHref && (
      <Button className={styles.Pagination__button} href={nextHref}>
        Next
      </Button>
    )}
  </nav>
)

export { Pagination }
