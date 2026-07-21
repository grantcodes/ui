/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function AccordionPreview({ block }) {
  if (!block) return null

  const items = block.items || []

  return (
    <div>
      <div className="scms-block-label">Accordion</div>
      {items.length > 0 ? items.map(function (item, i) {
        return (
          <div key={i} style={{ marginBottom: '8px', border: '1px solid var(--g-color-border-subtle)', borderRadius: 'var(--g-border-radius-sm)', overflow: 'hidden' }}>
            <div style={{ padding: '10px 12px', background: 'var(--g-color-background-subtle)', fontWeight: 600, fontSize: '0.9rem' }}>
              {item.title || 'Item ' + (i + 1)}
            </div>
            {item.content ? (
              <div style={{ padding: '10px 12px', fontSize: '0.85rem', color: 'var(--g-color-content-muted)' }}>
                {item.content.length > 120 ? item.content.slice(0, 120) + '...' : item.content}
              </div>
            ) : null}
          </div>
        )
      }) : (
        <p>No items defined.</p>
      )}
    </div>
  )
}
