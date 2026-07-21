/** @jsx h */
/** @jsxFrag Fragment */
const h = window.h
const Fragment = window.React?.Fragment || (({ children }) => children)

function FormField({ label, type }) {
  const padding = type === 'textarea' ? '24px 12px' : '8px 12px'
  return (
    <div style={{ padding, border: '1px solid var(--g-color-border-default)', borderRadius: 'var(--g-border-radius-sm)', fontSize: '0.85rem', color: 'var(--g-color-content-muted)' }}>
      {label}
    </div>
  )
}

export default function FormPreview({ block }) {
  if (!block) return null

  const fields = block.fields || []

  return (
    <div>
      {block.title ? <h2>{block.title}</h2> : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        {fields.length > 0
          ? fields.map((field, i) => (
              <FormField key={i} label={field.label || field.name || 'Field'} type={field.type} />
            ))
          : (
            <>
              <div key="name" style={{ padding: '8px 12px', border: '1px solid var(--g-color-border-default)', borderRadius: 'var(--g-border-radius-sm)', fontSize: '0.85rem', color: 'var(--g-color-content-muted)' }}>Name</div>
              <div key="email" style={{ padding: '8px 12px', border: '1px solid var(--g-color-border-default)', borderRadius: 'var(--g-border-radius-sm)', fontSize: '0.85rem', color: 'var(--g-color-content-muted)' }}>Email</div>
              <div key="message" style={{ padding: '24px 12px', border: '1px solid var(--g-color-border-default)', borderRadius: 'var(--g-border-radius-sm)', fontSize: '0.85rem', color: 'var(--g-color-content-muted)' }}>Message</div>
            </>
          )}
      </div>
      <span className="scms-btn" style={{ alignSelf: 'flex-start' }}>{block.submitText || 'Send Message'}</span>
      {block.notifyEmail ? (
        <div style={{ fontSize: '0.75rem', color: 'var(--g-color-content-muted)', marginTop: '8px' }}>
          Notifications to: {block.notifyEmail}
        </div>
      ) : null}
    </div>
  )
}
