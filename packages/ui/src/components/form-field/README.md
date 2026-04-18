# grantcodes-form-field

A form field wrapper that handles labels, help text, error messages, and accessibility attributes for any native input element.

## Usage

### Text Input

```html
<grantcodes-form-field label="Name">
  <input type="text" name="name" />
</grantcodes-form-field>
```

### Select

```html
<grantcodes-form-field label="Country">
  <select name="country">
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="de">Germany</option>
  </select>
</grantcodes-form-field>
```

### Textarea

```html
<grantcodes-form-field label="Message">
  <textarea name="message"></textarea>
</grantcodes-form-field>
```

### Checkbox and Radio (Inline)

Checkbox and radio inputs are automatically detected. The label is placed beside the input instead of above it.

```html
<grantcodes-form-field label="Accept terms">
  <input type="checkbox" name="terms" />
</grantcodes-form-field>

<grantcodes-form-field label="Option A">
  <input type="radio" name="choice" value="a" />
</grantcodes-form-field>
```

### Grouped Fieldset (Radio or Checkbox Group)

Nesting multiple `<grantcodes-form-field>` elements inside a parent `<grantcodes-form-field>` auto-detects the group and renders a `<fieldset>` with `<legend>` instead of a `<label>`.

```html
<grantcodes-form-field label="Plan">
  <grantcodes-form-field label="Free">
    <input type="radio" name="plan" value="free" />
  </grantcodes-form-field>
  <grantcodes-form-field label="Pro">
    <input type="radio" name="plan" value="pro" />
  </grantcodes-form-field>
  <grantcodes-form-field label="Enterprise">
    <input type="radio" name="plan" value="enterprise" />
  </grantcodes-form-field>
</grantcodes-form-field>
```

### Help Text

Use the `help` attribute to display instructional text below the label. It is automatically linked to the input via `aria-describedby`.

```html
<grantcodes-form-field label="Username" help="Must be 3-20 characters">
  <input type="text" name="username" />
</grantcodes-form-field>
```

### Error Message

Use the `error` attribute to display an error message. It is also linked via `aria-describedby`, and replaces the help text visually.

```html
<grantcodes-form-field label="Email" error="Please enter a valid email address">
  <input type="email" name="email" />
</grantcodes-form-field>
```

## How It Works

- **Auto-detection**: On `firstUpdated`, the component queries for slotted `<input>`, `<select>`, or `<textarea>` elements and configures them automatically.
- **`aria-describedby`**: When `error` or `help` is set, the corresponding element ID is added to the input's `aria-describedby` attribute for screen reader support.
- **Label click forwarding**: Because the label lives in the component's shadow DOM, the native `for`/`id` association doesn't work across shadow boundaries. The component manually forwards label clicks to the slotted input, toggling `checked` state for checkboxes and radios.
- **Grouped variant**: When nested `<grantcodes-form-field>` elements are detected inside a parent, the parent switches to a `<fieldset>` + `<legend>` structure instead of `<label>`.

## Properties

| Property | Type     | Default | Description                                           |
|----------|----------|---------|-------------------------------------------------------|
| `label`  | `String` | `""`    | Label text (renders as `<legend>` in grouped variant)  |
| `error`  | `String` | `undefined` | Error message text, linked via `aria-describedby` |
| `help`   | `String` | `undefined` | Help text, linked via `aria-describedby`          |