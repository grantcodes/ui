# AppBar, MenuToggle, NavLink, Breadcrumb, Pagination, Footer

Use AppBar for primary navigation, Breadcrumb for hierarchy, Pagination for previous/next URLs, Footer for grouped page-end links. Use native nav/anchors for custom routing; none of these supplies a router.

```js
import '@grantcodes/ui/components/app-bar/app-bar.js';
import '@grantcodes/ui/components/app-bar/nav-link.js';
import '@grantcodes/ui/components/breadcrumb/breadcrumb.js';
import '@grantcodes/ui/components/pagination/pagination.js';
import '@grantcodes/ui/components/footer/footer.js';
```
```html
<grantcodes-app-bar sticky>
  <a slot="logo" href="/">Example</a>
  <grantcodes-nav-link slot="nav"><a href="/docs" aria-current="page">Docs</a></grantcodes-nav-link>
  <button slot="actions" type="button">Sign in</button>
</grantcodes-app-bar>
<grantcodes-breadcrumb>
  <grantcodes-breadcrumb-item href="/">Home</grantcodes-breadcrumb-item>
  <grantcodes-breadcrumb-item current aria-current="page">Docs</grantcodes-breadcrumb-item>
</grantcodes-breadcrumb>
<grantcodes-pagination previous-href="/page/1" next-href="/page/3"></grantcodes-pagination>
<grantcodes-footer columns="2">
  <grantcodes-footer-column><h2>Resources</h2><a href="/docs">Docs</a></grantcodes-footer-column>
  <grantcodes-footer-column><h2>Company</h2><a href="/about">About</a></grantcodes-footer-column>
  <p slot="bottom">© Example</p>
</grantcodes-footer>
```

- AppBar: sticky/transparent booleans, both false; slots logo/nav/actions. The mobile menu button and overlay render only when the nav slot has content; the empty nav landmark is hidden. Mobile toggle emits `menu-toggle` with { open }; Escape and desktop breakpoint close it. No public mobile-open property. Part `nav`; native trigger/menu names are built in, but label your actions. Mobile navigation is not a modal focus trap.
- MenuToggle: import `@grantcodes/ui/components/menu-toggle/menu-toggle.js`. The app bar and default SidebarToggle reuse its hamburger-to-X animation. `expanded` defaults false; listen for native `click` and update it yourself. `controlsElement` accepts the target Element and uses feature-detected ARIA element references across shadow roots (no invalid cross-root ID fallback). Labels are Open menu / Close menu. `focus()` forwards to the native button; parts `button`/`icon`; reduced motion disables transitions. No independent toggle event or panel behaviour.
- NavLink: default slot must contain an actual anchor; no href property or routing API. Set current-page semantics on that anchor.
- Breadcrumb: separator string default "/"; default slot contains direct BreadcrumbItems. Item: href and current false, default label slot. Current renders text, but does not add aria-current itself; supply current-page semantics. Registering breadcrumb.js defines both.
- Pagination: previousHref/nextHref properties map to previous-href/next-href. Empty URLs omit buttons. page/pages exist but do not generate numbered links or compute URLs. No change event.
- Footer: columns number default 3; default slot for FooterColumns and bottom slot. FooterColumn has only a default slot; headings/links are consumer content. footer.js registers both.

React exports MenuToggle (use expanded/onClick), AppBar, NavLink, Breadcrumb, BreadcrumbItem, Pagination, Footer, FooterColumn; AppBar maps onMenuToggle (Event-typed).

AppBar and MenuToggle declare parts here. Tokens: AppBar uses background/content/border-default and spacing; NavLink uses content-default and focus-ring tokens; Breadcrumb uses content-subtle/default and primary-700; Footer uses background-subtle, border-subtle/default, content-subtle; Pagination has no direct token hook (its Button descendants do). Maintain heading order and distinguish multiple navigation landmarks.
