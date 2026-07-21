/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function TextPreview({ block }) {
  if (!block) return null

  const content = block.content || ''
  const truncated = content.length > 500 ? content.slice(0, 500) + '...' : content

  return (
    <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.95rem', lineHeight: 1.6 }}>
      {truncated}
    </div>
  )
}
