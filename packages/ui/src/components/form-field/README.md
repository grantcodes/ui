# grantcodes-form-field

Wraps native inputs with labels, help text, error messages, and accessibility attributes.

```html
<grantcodes-form-field label="Name">
  <input type="text" name="name" />
</grantcodes-form-field>
```

Checkbox and radio inputs are auto-detected — label displays beside the input:

```html
<grantcodes-form-field label="Accept terms">
  <input type="checkbox" name="terms" />
</grantcodes-form-field>
```

Nesting form-fields creates a `<fieldset>`/`<legend>` group:

```html
<grantcodes-form-field label="Plan">
  <grantcodes-form-field label="Free">
    <input type="radio" name="plan" value="free" />
  </grantcodes-form-field>
  <grantcodes-form-field label="Pro">
    <input type="radio" name="plan" value="pro" />
  </grantcodes-form-field>
</grantcodes-form-field>
```

Help and error text are wired to the input via `aria-describedby`:

```html
<grantcodes-form-field label="Username" help="3-20 characters">
  <input type="text" name="username" />
</grantcodes-form-field>

<grantcodes-form-field label="Email" error="Enter a valid email">
  <input type="email" name="email" />
</grantcodes-form-field>
```

## Properties

| Property | Type     | Default     | Description                                          |
|----------|----------|-------------|------------------------------------------------------|
| `label`  | `String` | `""`        | Label text (`<legend>` in grouped variant)            |
| `error`  | `String` | `undefined` | Error message, linked via `aria-describedby`         |
| `help`   | `String` | `undefined` | Help text, linked via `aria-describedby`              |