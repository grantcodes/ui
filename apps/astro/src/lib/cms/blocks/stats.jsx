/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function StatsPreview({ block }) {
  if (!block) return null

  const items = block.items || []
  const columns = block.columns || 4

  return (
    <div>
      <div className="scms-block-label">Stats</div>
      {block.title ? <h2>{block.title}</h2> : null}
      {items.length > 0 ? (
        <div className={'scms-grid scms-grid-' + Math.min(columns, 6)} style={{ textAlign: 'center' }}>
          {items.map(function (item, i) {
            return (
              <div key={i}>
                <div className="scms-stat-value">{item.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--g-color-content-muted)' }}>{item.label}</div>
                {item.context ? <div style={{ fontSize: '0.75rem', color: 'var(--g-color-content-muted)' }}>{item.context}</div> : null}
              </div>
            )
          })}
        </div>
      ) : (
        <p>No stats defined.</p>
      )}
    </div>
  )
}
