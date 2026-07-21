/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function LogoCloudPreview({ block }) {
  if (!block) return null

  const logos = block.logos || []

  return (
    <div>
      <div className="scms-block-label">Logo Cloud</div>
      {block.title ? <h2>{block.title}</h2> : null}
      {logos.length > 0 ? (
        <div className="scms-grid scms-grid-4" style={{ alignItems: 'center' }}>
          {logos.map(function (logo, i) {
            return (
              <div key={i} className="scms-img-placeholder" style={{ minHeight: '50px', background: 'var(--g-color-background-subtle)' }}>
                {logo.name || 'Logo ' + (i + 1)}
              </div>
            )
          })}
        </div>
      ) : (
        <p>No logos defined.</p>
      )}
    </div>
  )
}
