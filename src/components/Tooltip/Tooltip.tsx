import React from 'react'
import styles from './Tooltip.module.scss'
import cx from 'classnames'
import * as TooltipBase from '@radix-ui/react-tooltip'
import { TooltipProps } from './Tooltip.types'

const Tooltip: React.FC<any> = ({
  className = '',
  label,
  side = 'top',
  children,
}: TooltipProps) => (
  <TooltipBase.Provider>
    <TooltipBase.Root>
      <TooltipBase.Trigger asChild>{children}</TooltipBase.Trigger>
      <TooltipBase.Portal>
        <TooltipBase.Content
          className={cx(styles.Tooltip, className)}
          side={side}
        >
          {label}
          <TooltipBase.Arrow className={styles.TooltipArrow} />
        </TooltipBase.Content>
      </TooltipBase.Portal>
    </TooltipBase.Root>
  </TooltipBase.Provider>
)

export { Tooltip }
