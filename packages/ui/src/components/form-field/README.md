# grantcodes-form-field

Wraps a native form control (`input`, `select`, `textarea`) with a label, optional help text and
optional error message. Use it instead of a bare `<label>` + `<input>` pair so label placement,
spacing and error/help wiring stay consistent across the design system.

```js
import '@grantcodes/ui/components/form-field';
```

## Properties

|Attribute|Type|Default|Description|
|-|-|-|-|
|`label`|`string`|`''`|Label text. Reflected as an attribute so it survives SSR client upgrade. Rendered in a `<legend>` when the field is grouped.|
|`direction`|`'vertical' \| 'horizontal'`|`'vertical'`|`horizontal` puts the label beside the control. Use it for checkboxes and radios.|
|`error`|`string \| undefined`|`undefined`|Error message. Hidden until the field is interacted with; mirrored onto the first control's ARIA state.|
|`help`|`string \| undefined`|`undefined`|Help text rendered with the label and referenced from the first control's `aria-describedby`.|

The host gets a generated `id` (`form-field-…`) on connect if it does not have one. The error and help
elements use `<id>-error` and `<id>-help`, so setting your own `id` on the field is safe.

## Text input

```html
<grantcodes-form-field label="Full name">
  <input type="text" name="name" autocomplete="name" />
</grantcodes-form-field>
```

## Select

```html
<grantcodes-form-field label="Plan">
  <select name="plan">
    <option value="free">Free</option>
    <option value="pro">Pro</option>
  </select>
</grantcodes-form-field>
```

## Textarea

```html
<grantcodes-form-field label="Message" help="Markdown is not supported.">
  <textarea name="message" rows="4"></textarea>
</grantcodes-form-field>
```

## Checkbox

Checkboxes are not detected automatically — add `direction="horizontal"` to place the label beside the
control.

```html
<grantcodes-form-field label="Accept the terms" direction="horizontal">
  <input type="checkbox" name="terms" value="accepted" />
</grantcodes-form-field>
```

## Radio

```html
<grantcodes-form-field label="Standard shipping" direction="horizontal">
  <input type="radio" name="shipping" value="standard" />
</grantcodes-form-field>
```

## Grouped checkbox / radio group

Nesting `<grantcodes-form-field>` elements inside another one switches the parent to its grouped
variant: it renders a `<fieldset>` with the `label` as the `<legend>` instead of a `<label>`. Keep the
same `name` on every control so the browser groups them.

```html
<grantcodes-form-field label="Contact preference">
  <grantcodes-form-field label="Email" direction="horizontal">
    <input type="radio" name="contact" value="email" />
  </grantcodes-form-field>
  <grantcodes-form-field label="Phone" direction="horizontal">
    <input type="radio" name="contact" value="phone" />
  </grantcodes-form-field>
</grantcodes-form-field>
```

```html
<grantcodes-form-field label="Notifications">
  <grantcodes-form-field label="Product updates" direction="horizontal">
    <input type="checkbox" name="updates" value="product" />
  </grantcodes-form-field>
  <grantcodes-form-field label="Security alerts" direction="horizontal">
    <input type="checkbox" name="updates" value="security" />
  </grantcodes-form-field>
</grantcodes-form-field>
```

Grouping is detected once, when the field first renders, so the nested fields must be part of the
initial markup — nesting a field later leaves the parent in its `<label>` variant. A grouped field
renders its `error` but not its `help` text.

## Error and help

Both are plain attributes; set them declaratively or from script (`field.error = '…'`).

```html
<grantcodes-form-field
  label="Email"
  help="We only use this for receipts."
  error="Enter a valid email address."
>
  <input type="email" name="email" required />
</grantcodes-form-field>
```

```js
const field = document.querySelector('grantcodes-form-field');
field.error = 'Enter a valid email address.';
```

The component writes the ARIA state onto the **first** control it finds:

- `aria-describedby` lists `<id>-error` and/or `<id>-help` while those props are set, and is removed
  when both are cleared.
- `aria-invalid="true"` is set as soon as `error` is set, and removed when it is cleared.

The error message itself is not revealed immediately: it stays `hidden` until the control has been
interacted with (an `input`, `blur` or `invalid` event) or reports `:user-invalid`, so a field does not
shout at the user before they have typed anything. A field with no control shows the error straight
away. In a grouped field the error appears once any nested control is touched.

## Label clicks

The label lives in the component's shadow root, so it cannot use `for`/`id` to link to the slotted
control. Clicks on the label text are forwarded to the first control instead — it is focused and
clicked, which toggles checkboxes and selects radios from their label.

## Notes

- One control per field is the supported shape. Only the first `input`, `select` or `textarea` receives
  the label click and the ARIA state, and the control list is captured on first render — controls added
  after that are not wired up.
- Storybook has a story per variant in `form-field.stories.js`.
