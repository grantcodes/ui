/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function NewsletterPreview({ block }) {
  if (!block) return null

  return (
    <div>
      <div className="scms-block-label">Newsletter</div>
      <h2>{block.title}</h2>
      {block.text ? <p>{block.text}</p> : null}
      <div style={{ display: 'flex', gap: '8px', maxWidth: '400px' }}>
        <div style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--g-color-border-default)', borderRadius: 'var(--g-border-radius-sm)', fontSize: '0.85rem', color: 'var(--g-color-content-muted)' }}>
          {block.placeholder || 'Your email address'}
        </div>
        <span className="scms-btn">{block.buttonLabel || 'Subscribe'}</span>
      </div>
      {block.disclaimer ? <div style={{ fontSize: '0.75rem', color: 'var(--g-color-content-muted)', marginTop: '8px' }}>{block.disclaimer}</div> : null}
    </div>
  )
}
