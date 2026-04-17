# @grantcodes/style-dictionary

This is my personal [style dictionary](https://github.com/amzn/style-dictionary) that I use for various personal projects.

## Naming & structure

It follows [Brad Frost's](https://bradfrost.com) recommended token structure.

Priciples:

- Clarity over cleverness - keep the names simple and understandable
- Legibility over succinctiness - long but readable variables > short hard to understand variables
- Consistency is key
- Use existing conventions
- Be environment agnostic - don't name things specifically for the web or mobile

### Tier 1 tokens

| Namespace | Category   | Property | Variant / Scale | CSS Variable |
---------------------------------------------------------------
| g         | color      | red       | 100     | --g-color-red-100   |
| g         | typography |           |         | --g-             |
| g         | spacing    |           |         | --g-             |
| g         | border     |           |         | --g-             |
| g         | shadow     |           |         | --g-             |
| g         | animation  |           |         | --g-             |
| g         | breakpoint |           |         | --g-             |
| g         | z-index    |           |         | --g-             |



## Usage

Supported consumer token CSS contract entrypoints:

- `@grantcodes/style-dictionary/grantcodes/css` → `dist/css/grantcodes/tokens.css`
- `@grantcodes/style-dictionary/wireframe/css` → `dist/css/wireframe/tokens.css`
- `@grantcodes/style-dictionary/todomap/css` → `dist/css/todomap/tokens.css`
- `@grantcodes/style-dictionary/grantina/css` → `dist/css/grantina/tokens.css`

```css
@import "@grantcodes/style-dictionary/grantcodes/css";
@import "@grantcodes/style-dictionary/wireframe/css";
@import "@grantcodes/style-dictionary/todomap/css";
@import "@grantcodes/style-dictionary/grantina/css";
```
