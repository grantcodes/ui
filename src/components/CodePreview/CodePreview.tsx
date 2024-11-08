import React, { useEffect } from 'react'
import styles from './CodePreview.module.scss'
import cx from 'classnames'
import { CodePreviewProps } from './CodePreview.types'
// @ts-ignore
import { PrismAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-ignore
import style from 'react-syntax-highlighter/dist/esm/styles/prism/night-owl'

const CodePreview: React.FC<any> = ({
  className = '',
  children = '',
  language = 'text',
  ...props
}: CodePreviewProps) => {
  return (
    <SyntaxHighlighter
      style={style}
      customStyle={{ padding: 'var(--size-space-unit, 1rem)' }}
      language={language}
      className={cx(styles.CodePreview, className)}
      {...props}
    >
      {children}
    </SyntaxHighlighter>
  )
}

export { CodePreview }
