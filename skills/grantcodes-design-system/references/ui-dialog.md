# Dialog

Use for a modal task/confirmation; use [Popover](ui-popover.md) for a non-modal panel. Native dialog is preferable when you need native returnValue/cancel lifecycle directly.

```js
import '@grantcodes/ui/components/dialog/dialog.js';
```
```html
<button type="button" id="review-button">Review</button>
<grantcodes-dialog id="review" aria-label="Review changes">
  <h2 slot="header">Review changes</h2>
  <p>Check the details before continuing.</p>
  <button slot="footer" type="button" id="review-done">Done</button>
</grantcodes-dialog>
<script type="module">
  await customElements.whenDefined('grantcodes-dialog');
  const dialog = document.querySelector('#review');
  document.querySelector('#review-button').addEventListener('click', () => { dialog.open = true; });
  document.querySelector('#review-done').addEventListener('click', () => { dialog.open = false; });
</script>
```

Properties: `open` false; `dismissible` true; `fullscreen` false (reflected; fills the viewport edge to edge with no content padding, for media viewers). Slots: `header` (accessible-name fallback), default (dialog content), `footer` (actions). These slots and property descriptions are documented in the published Custom Elements Manifest. The internal native dialog opens modally, names itself from host aria-label or header text, and syncs open after native close. Provide a meaningful name and verify initial focus, Escape, and focus return.

`dismissible=false` hides the close button and disables supported light-dismiss; it does **not** prevent Escape. Set it as a property (Lit `.dismissible`, React boolean), not a false-looking HTML attribute.

Events: `toggle` (`detail.open`) fires on every open and close, including Escape, light-dismiss and the close button, but not on the first render of a closed dialog; React `Dialog` maps it to `onToggle`, so a controlled `open` can follow it. No public show()/hide() methods. The dialog and backdrop fade in (non-fullscreen dialogs also scale); closing animates out in Chromium and is instant in Safari and Firefox. Motion uses `--g-animation-move-quick` (enter), `--g-animation-fade-quick` (exit) and `--g-animation-ease`; reduced motion disables it. No declared parts. `--g-dialog-inline-size` (default `1200px`) sets the largest inline size. Inherited hooks include `--g-color-background-default`, `--g-color-border-default`, `--g-border-radius-md`, `--g-spacing-md`.
