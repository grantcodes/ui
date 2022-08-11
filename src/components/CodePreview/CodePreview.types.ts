import { SyntaxHighlighterProps } from 'react-syntax-highlighter'

export interface CodePreviewProps extends SyntaxHighlighterProps {
  className: string
  children: string
  language: string
}
