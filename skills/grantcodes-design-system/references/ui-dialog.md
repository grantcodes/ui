# Dialog

Use for a modal task/confirmation; use [Popover](ui-popover.md) for a non-modal panel. Native dialog is preferable when you need native returnValue/close/cancel lifecycle directly.

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

Properties: `open` false; `dismissible` true. Slots: header, default content, footer. The internal native dialog opens modally, names itself from host aria-label or header text, and syncs open after native close/cancel. Provide a meaningful name and verify initial focus, Escape, and focus return.

`dismissible=false` hides the close button and disables supported light-dismiss; it does **not** prevent Escape. Set it as a property (Lit `.dismissible`, React boolean), not a false-looking HTML attribute.

No public show()/hide() methods or custom close event are supplied. React `Dialog` has no mapped close/dismiss callback; don't build a controlled state model assuming one. No declared parts. Inherited hooks include `--g-color-background-default`, `--g-color-border-default`, `--g-border-radius-md`, `--g-spacing-md`.
