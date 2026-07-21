/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function PricingPreview({ block }) {
  if (!block) return null

  const tiers = block.tiers || []

  return (
    <div>
      <div className="scms-block-label">Pricing</div>
      {block.title ? <h2>{block.title}</h2> : null}
      {block.subtitle ? <p>{block.subtitle}</p> : null}
      {tiers.length > 0 ? (
        <div className="scms-grid scms-grid-3" style={{ alignItems: 'start' }}>
          {tiers.map(function (tier, i) {
            return (
              <div key={i} className="scms-card" style={tier.highlighted ? { border: '2px solid var(--g-color-utility-primary)' } : {}}>
                {tier.highlighted ? <div className="scms-badge" style={{ marginBottom: '8px' }}>Popular</div> : null}
                <div className="scms-card-title" style={{ fontSize: '1.1rem' }}>{tier.name}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, margin: '8px 0' }}>
                  {tier.price}
                  {tier.period ? <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--g-color-content-muted)' }}>/{tier.period}</span> : null}
                </div>
                {tier.description ? <div className="scms-card-desc" style={{ marginBottom: '8px' }}>{tier.description}</div> : null}
                {tier.features && tier.features.length > 0 ? (
                  <ul style={{ padding: '0 0 0 16px', fontSize: '0.85rem', lineHeight: 1.8 }}>
                    {tier.features.map(function (f, j) {
                      return <li key={j} style={f.included === false ? { color: 'var(--g-color-content-muted)', textDecoration: 'line-through' } : {}}>{f.text}</li>
                    })}
                  </ul>
                ) : null}
                {tier.cta ? <div className="scms-btn" style={{ marginTop: '12px', display: 'block', textAlign: 'center' }}>{tier.cta.label || 'Get Started'}</div> : null}
              </div>
            )
          })}
        </div>
      ) : (
        <p>No tiers defined.</p>
      )}
    </div>
  )
}
