# FormField and Dropzone

Use FormField for labelled native input/select/textarea controls, not a replacement value-holding input component. Native fieldset/legend is a good alternative for custom group semantics.

```js
import '@grantcodes/ui/components/form-field/form-field.js';
import '@grantcodes/ui/components/dropzone/dropzone.js';
```
```html
<form>
  <grantcodes-form-field label="Email" help="For receipts only">
    <input type="email" name="email" autocomplete="email" required />
  </grantcodes-form-field>
  <grantcodes-form-field label="Updates" direction="horizontal">
    <input type="checkbox" name="updates" />
  </grantcodes-form-field>
  <grantcodes-dropzone>
    <input type="file" name="attachment" aria-label="Attachment" placeholder="Choose a file" />
  </grantcodes-dropzone>
  <button type="submit">Save</button>
</form>
```

FormField props: label, help, error, direction (vertical default, horizontal for checkboxes/radios). Default slot: a **direct** native control; nesting controls in arbitrary divs prevents the first-control label/ARIA sync. Nested direct FormFields turn the parent into a fieldset with its label as legend. Give radios a shared native name and distinct values.

The first control receives a generated ID if missing and an associated light-DOM label. Error/help ARIA is synchronized; visible error waits for input/blur/invalid or user-invalid state, although error already sets aria-invalid. An error string does not call setCustomValidity or stop submission; application/native validation owns validity. Use native events on controls; there is no value/change API on FormField. `syncControlAria()` can refresh its first-control associations after consumer changes.

Dropzone requires a direct input[type=file] present at first update and throws without one outside tests. Native input owns files, accept, multiple, change and upload logic. `fullscreenOnDrag` is a boolean property (HTML attribute `fullscreenondrag`); it only expands the visual drop surface. It does not upload files or emit a custom files event. Preserve keyboard access and a control name; placeholder is not a label.

React exports FormField and Dropzone. No declared parts. FormField uses `--g-spacing-xs`, `--g-spacing-sm`, `--g-color-content-utility-error`; native controls use base CSS and form tokens. Dropzone uses `--g-color-border-default`, `--g-color-background-subtle`, `--g-spacing-xl` and focus-ring tokens.
