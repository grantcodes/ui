# Popover

`grantcodes-popover` reveals interactive content anchored to one interactive trigger.

```html
<grantcodes-popover placement="bottom-start">
  <button slot="trigger">Edit profile</button>
  <form><label>Name <input /></label><button>Save</button></form>
</grantcodes-popover>
```

```tsx
const [open, setOpen] = useState(false);

<Popover
  open={open}
  onToggle={(event) => setOpen(event.detail.open)}
>
  <button slot="trigger">Edit profile</button>
  <button>Save</button>
</Popover>;
```

## Contract

- `open` is reflected and defaults to `false`.
- `placement` accepts `bottom-start`, `bottom-end`, `top-start`, and `top-end`; the default is `bottom-start`.
- The `trigger` slot accepts one interactive trigger. The default slot accepts interactive content.
- The panel exposes `part="panel"`.
- A bubbling, composed, non-cancelable `toggle` event emits `{ open }` after each committed render. Requests coalesced back to the committed state emit nothing.

Opening moves focus to the first eligible control in panel content, or the panel. Escape and outside clicks dismiss the popover. Escape returns focus to the trigger; outside clicks preserve focus already moved elsewhere.

The component uses native CSS anchor positioning with `position-try-fallbacks`. Without support, it uses an adjacent, non-collision-aware fallback. Fixed panels are not top-layer content and can be affected by transformed or overflow ancestors and stacking contexts.
