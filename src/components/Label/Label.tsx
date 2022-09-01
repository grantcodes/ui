import React from 'react'
// NOTE: Radix label primitive uses a span with role=label so that it can work better with custom controls.
// @see https://github.com/radix-ui/primitives/issues/638
// @see https://github.com/radix-ui/primitives/issues/1233
// import * as LabelPrimitive from '@radix-ui/react-label'
import styles from './Label.module.scss'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

const Label: React.FC<any> = ({ children, ...props }: LabelProps) => (
  <label className={styles.label} {...props}>
    {children}
  </label>
)

export { Label }
