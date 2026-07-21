/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

export default function CountdownPreview({ block }) {
  if (!block) return null

  const target = block.target
  const daysLabel = block.daysLabel || 'days'
  const hoursLabel = block.hoursLabel || 'hours'
  const minutesLabel = block.minutesLabel || 'minutes'
  const secondsLabel = block.secondsLabel || 'seconds'
  const pastMessage = block.pastMessage || 'The event has started!'
  const showSeconds = block.showSeconds !== false

  return (
    <div>
      <div className="scms-block-label">Countdown</div>
      <div style={{ background: 'var(--g-color-background-subtle)', borderRadius: 'var(--g-border-radius-md)', padding: '20px', textAlign: 'center' }}>
        {target ? (
          <>
            <div style={{ fontSize: '0.85rem', color: 'var(--g-color-content-muted)', marginBottom: '12px' }}>
              Target: {target}
            </div>
            <div className="scms-row" style={{ justifyContent: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="scms-stat-value" style={{ fontSize: '1.8rem' }}>--</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--g-color-content-muted)' }}>{daysLabel}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="scms-stat-value" style={{ fontSize: '1.8rem' }}>--</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--g-color-content-muted)' }}>{hoursLabel}</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="scms-stat-value" style={{ fontSize: '1.8rem' }}>--</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--g-color-content-muted)' }}>{minutesLabel}</div>
              </div>
              {showSeconds ? (
                <div style={{ textAlign: 'center' }}>
                  <div className="scms-stat-value" style={{ fontSize: '1.8rem' }}>--</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--g-color-content-muted)' }}>{secondsLabel}</div>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <div style={{ fontSize: '0.9rem', color: 'var(--g-color-content-muted)' }}>
            {pastMessage}
          </div>
        )}
      </div>
    </div>
  )
}
