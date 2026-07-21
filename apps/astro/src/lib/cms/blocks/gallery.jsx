/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function GalleryPreview({ block }) {
  if (!block) return null

  const images = block.images || []

  return (
    <div>
      <div className="scms-block-label">Gallery</div>
      {images.length > 0 ? (
        <div className="scms-grid scms-grid-3">
          {images.map(function (img, i) {
            return (
              <div key={i} className="scms-img-placeholder" style={{ minHeight: '80px' }}>
                {img.src || 'Image ' + (i + 1)}
              </div>
            )
          })}
        </div>
      ) : (
        <p>No images defined.</p>
      )}
      {images.length === 0 && block.content ? (
        <div style={{ whiteSpace: 'pre-wrap' }}>{block.content}</div>
      ) : null}
    </div>
  )
}
