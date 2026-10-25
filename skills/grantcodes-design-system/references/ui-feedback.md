# Notice, Toast, Badge, and Loading

Use Notice for persistent in-flow information, Toast for transient feedback, Badge for compact status/count, Loading for ongoing work. Do not replace important persistent errors with an expiring toast.

```js
import '@grantcodes/ui/components/notice/notice.js';
import '@grantcodes/ui/components/toast/toast.js';
import '@grantcodes/ui/components/badge/badge.js';
import '@grantcodes/ui/components/loading/loading.js';
import '@grantcodes/ui/components/icon/icon.js';
```
```html
<grantcodes-notice variant="warning" title="Unsaved changes">Save before leaving.</grantcodes-notice>
<grantcodes-toast-container position="bottom-right">
  <grantcodes-toast variant="success" title="Saved" duration="5000" position="bottom-right">Your changes are saved.</grantcodes-toast>
</grantcodes-toast-container>
<grantcodes-badge variant="neutral">Draft</grantcodes-badge>
<grantcodes-loading>Saving changes</grantcodes-loading>
```

- Notice: variant info/success/warning/error (info default), title, **dismissable** false (spelling differs from Toast). Default slot renders within a paragraph; prefer phrasing content. Dismiss removes the host, with no dismiss event. It is an aside, not an automatic live region.
- Toast: same four variants; title, duration (5000 ms; 0 disables timer), position (top/bottom × left/center/right), **dismissible** true. Default slot is message. Hover/focus pauses the timer. `dismiss` bubbles/composes without detail just before host removal. Error is assertive alert; others polite status. Avoid inaccessible time limits for essential information.
- ToastContainer: position default top-right, default slot holds Toasts. No push/add/toast service API. Set matching position on contained toasts. React Toast's onDismiss must remove it from application state too.
- Badge: variant primary/success/warning/error/info/neutral (neutral default); default slot holds text. No click/selection/live-region behaviour. Convey meaning in text, not colour alone.
- Loading: default slot is a visually hidden status label, falling back to “Loading”. Host aria-busy is true; remove it when finished and manage busy state on the actual region as needed. No progress value API.

React exports Notice, Toast, ToastContainer, Badge, Loading. Only Toast maps onDismiss. Set default-true dismissible via a real boolean/property.

No declared parts. Notice/Toast consume status `--g-color-background-utility-*` tokens; Notice also `--g-color-content-utility-*`. Badge uses `--g-color-utility-*` with paired content tokens and neutral background/content roles. Loading uses `--g-color-primary-500` and `--g-color-background-shimmer`.
