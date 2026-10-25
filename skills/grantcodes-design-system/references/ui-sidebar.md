# Sidebar and SidebarToggle

Use for a responsive side panel: an aside at wide sizes and a native modal drawer when compact. Use AppBar for top navigation or Dialog for a task unrelated to responsive layout.

```js
import '@grantcodes/ui/components/sidebar/sidebar.js';
```
```html
<grantcodes-sidebar-toggle for="workspace-nav">
  <button type="button">Open navigation</button>
</grantcodes-sidebar-toggle>
<grantcodes-sidebar id="workspace-nav" aria-label="Workspace navigation">
  <h2 slot="header">Workspace</h2>
  <nav slot="content" aria-label="Workspace"><a href="/projects">Projects</a></nav>
  <p slot="footer">Signed in</p>
</grantcodes-sidebar>
```

sidebar.js defines both. Sidebar slots: header, **content**, footer (no default content slot). Properties open/controlled default false. `requestOpen(open, trigger?)` dispatches cancelable, bubbling/composed `drawer-toggle` with { open }; uncontrolled operation sets open unless canceled. Controlled mode only requests; the consumer must update open. Direct open assignment is not itself a request event.

SidebarToggle: for matches a sidebar ID in the same root; default slot takes a direct native button or grantcodes-button without href. It manages aria-controls/expanded and hides outside compact presentation. No independent toggle event. Label the actual trigger.

Name Sidebar with aria-label or aria-labelledby; aria-describedby is also resolved to text for the internal dialog. Compact Escape/backdrop requests close and restores trigger focus. `sidebar-presentation-change` is a nonbubbling Event used by the companion; don't treat it as a drawer-open notification.

React Sidebar maps typed onDrawerToggle; SidebarToggle accepts `for`. Parts: panel/header/content/footer. Tokens include `--g-color-content-default`, `--g-color-background-default`, `--g-color-border-default`, `--g-spacing-md`. Do not write internal data-compact state; the breakpoint logic owns it.
