import React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import styles from './Label.module.scss'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

const Label: React.FC<any> = ({ children, ...props }: LabelProps) => (
  <LabelPrimitive.Root className={styles.label} {...props}>
    {children}
  </LabelPrimitive.Root>
)

export { Label }
