/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function MapPreview({ block }) {
  if (!block) return null

  const lat = block.lat
  const lng = block.lng
  const zoom = block.zoom || 14
  const label = block.label

  return (
    <div>
      <div className="scms-block-label">Map</div>
      <div className="scms-img-placeholder" style={{ minHeight: '120px', background: 'linear-gradient(135deg, #e8f4f8, #d4edf2)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span>📍 {label || 'Map'}</span>
        {lat && lng ? (
          <span style={{ fontSize: '0.8rem' }}>
            {lat}, {lng} (zoom: {zoom})
          </span>
        ) : (
          <span style={{ fontSize: '0.8rem', color: 'var(--g-color-content-muted)' }}>No coordinates set</span>
        )}
        {block.directionsUrl ? (
          <span style={{ fontSize: '0.75rem', marginTop: '4px' }}>🔗 Directions available</span>
        ) : null}
      </div>
      {block.height ? <div style={{ fontSize: '0.75rem', color: 'var(--g-color-content-muted)' }}>Height: {block.height}</div> : null}
    </div>
  )
}
