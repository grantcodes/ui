/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function MediaTextPreview({ block }) {
  if (!block) return null

  const media = block.media || {}

  return (
    <div>
      <div className="scms-block-label">Media + Text</div>
      <div className="scms-row" style={block.reverse ? { flexDirection: 'row-reverse' } : {}}>
        <div style={{ flex: 1 }}>
          <h2>{block.title}</h2>
          <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{block.text}</div>
          {block.cta ? <div className="scms-btn" style={{ marginTop: '8px', display: 'inline-block' }}>{block.cta.label || 'Learn More'}</div> : null}
        </div>
        <div style={{ flex: 1 }}>
          {media.src ? (
            <div className="scms-img-placeholder" style={{ minHeight: '100px' }}>
              {media.kind === 'video' ? '🎬 ' : ''}{media.alt || media.src}
            </div>
          ) : (
            <div className="scms-img-placeholder" style={{ minHeight: '100px' }}>Media</div>
          )}
        </div>
      </div>
    </div>
  )
}
