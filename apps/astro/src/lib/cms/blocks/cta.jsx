/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function CtaPreview({ block }) {
  if (!block) return null

  return (
    <div style={{ textAlign: block.align || 'center' }}>
      <div className="scms-block-label">CTA</div>
      {block.eyebrow ? <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--g-color-content-muted)' }}>{block.eyebrow}</div> : null}
      <h2>{block.title}</h2>
      {block.text ? <p>{block.text}</p> : null}
      <div style={{ display: 'flex', gap: '8px', justifyContent: block.align === 'left' ? 'flex-start' : 'center', marginTop: '12px' }}>
        {block.primaryAction ? <span className="scms-btn">{block.primaryAction.label || 'Learn More'}</span> : null}
        {block.secondaryAction ? <span className="scms-btn scms-btn-outline">{block.secondaryAction.label || 'Learn More'}</span> : null}
      </div>
    </div>
  )
}
