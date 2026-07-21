/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function FeatureListPreview({ block }) {
  if (!block) return null

  const items = block.items || []
  const columns = block.columns || 3

  return (
    <div>
      <div className="scms-block-label">Feature List</div>
      {block.title ? <h2>{block.title}</h2> : null}
      {block.subtitle ? <p>{block.subtitle}</p> : null}
      {items.length > 0 ? (
        <div className={'scms-grid scms-grid-' + Math.min(columns, 6)}>
          {items.map(function (item, i) {
            return (
              <div key={i} className="scms-card">
                {item.icon ? <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{item.icon}</div> : null}
                <div className="scms-card-title">{item.title}</div>
                {item.description ? <div className="scms-card-desc">{item.description}</div> : null}
              </div>
            )
          })}
        </div>
      ) : (
        <p>No features defined.</p>
      )}
    </div>
  )
}
