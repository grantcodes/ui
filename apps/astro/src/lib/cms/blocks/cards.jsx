/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function CardsPreview({ block }) {
  if (!block) return null

  const cards = block.cards || []

  return (
    <div>
      <div className="scms-block-label">Cards</div>
      {cards.length > 0 ? (
        <div className="scms-grid scms-grid-3">
          {cards.map(function (card, i) {
            return (
              <div key={i} className="scms-card">
                {card.image ? (
                  <div className="scms-img-placeholder" style={{ minHeight: '60px', marginBottom: '8px' }}>
                    {card.image}
                  </div>
                ) : null}
                <div className="scms-card-title">{card.title}</div>
                {card.description ? <div className="scms-card-desc">{card.description}</div> : null}
              </div>
            )
          })}
        </div>
      ) : (
        <p>No cards defined.</p>
      )}
    </div>
  )
}
