import React from 'react'
import { Link } from './Link'

export default {
  title: 'Link',
}

export const RegularLink = ({ label }) => <Link href="#">{label}</Link>
RegularLink.args = { label: 'Click Me' }

// TODO: Unsure how to do this.
// export const VisitedLink = ({ label }) => (
//   <Link href="#" visited>
//     {label}
//   </Link>
// )
// VisitedLink.args = { label: 'Click Me' }

export const ExternalLink = ({ label }) => (
  <Link href="https://example.com">{label}</Link>
)
ExternalLink.args = { label: 'Click Me' }
