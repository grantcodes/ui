import React from 'react'
import { CodePreview } from './CodePreview'

export default {
  title: 'Code Preview'
}

const htmlCode = `<html>
  <body>
    <p>Here is some code with a <a href="https://grant.codes" target="_blank">link</a>.</p>
  </body>
</html>`

const jsxCode = `import React from 'react'
import { CodePreview } from './CodePreview'

export default {
  title: 'Code Preview',
}

const jsxCode = '<p>Very meta</p>'

const JSXCodePreview = ({}) => (
  <CodePreview language="jsx">{jsxCode}</CodePreview>
)

export { JSXCodePreview }`

export const HTMLCodePreview = ({}) => (
  <CodePreview language='html'>{htmlCode}</CodePreview>
)

export const JSXCodePreview = ({}) => (
  <CodePreview language='jsx'>{jsxCode}</CodePreview>
)
