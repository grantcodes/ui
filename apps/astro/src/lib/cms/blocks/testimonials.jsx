/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function TestimonialsPreview({ block }) {
  if (!block) return null

  const items = block.items || []
  const layout = block.layout || 'cards'

  return (
    <div>
      <div className="scms-block-label">Testimonials</div>
      {block.title ? <h2>{block.title}</h2> : null}
      {items.length > 0 ? (
        <div className={layout === 'cards' ? 'scms-grid scms-grid-2' : ''}>
          {items.map(function (item, i) {
            return (
              <div key={i} className={layout === 'list' ? 'scms-accent-border' : 'scms-card'} style={layout === 'list' ? { padding: '12px 16px', marginBottom: '8px' } : {}}>
                {item.avatar ? <div className="scms-img-placeholder" style={{ width: '40px', height: '40px', borderRadius: '50%', minHeight: 'auto', display: 'inline-flex' }} /> : null}
                <div style={{ fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '8px' }}>"{item.quote}"</div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.name}</div>
                {item.role ? <div style={{ fontSize: '0.75rem', color: 'var(--g-color-content-muted)' }}>{item.role}{item.company ? ' at ' + item.company : ''}</div> : null}
              </div>
            )
          })}
        </div>
      ) : (
        <p>No testimonials defined.</p>
      )}
    </div>
  )
}
