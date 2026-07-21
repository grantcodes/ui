/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function HeroPreview({ block }) {
  if (!block) return null

  const textAlign = block.center ? 'center' : 'left'

  return (
    <div
      className="preview-hero"
      style={textAlign !== 'left' ? { '--preview-align': textAlign } : undefined}
    >
      {block.title ? <h1 className="preview-hero__title">{block.title}</h1> : null}
      {block.subtitle ? <p className="preview-hero__subtitle">{block.subtitle}</p> : null}
      {block.image ? (
        <div className="scms-img-placeholder preview-hero__image">
          <span>Image: {block.image}</span>
        </div>
      ) : null}
      {block.button ? (
        <div className="preview-hero__btn-wrap">
          <span className="scms-btn">{block.button}</span>
        </div>
      ) : null}
    </div>
  )
}
