import { GrantCodesSidebar } from './sidebar.component.js';
import { GrantCodesSidebarToggle } from './sidebar-toggle.component.js';

export * from './sidebar.component.js';
export * from './sidebar-toggle.component.js';
export default GrantCodesSidebar;

if (!customElements.get('grantcodes-sidebar')) {
  customElements.define('grantcodes-sidebar', GrantCodesSidebar);
}

if (!customElements.get('grantcodes-sidebar-toggle')) {
  customElements.define('grantcodes-sidebar-toggle', GrantCodesSidebarToggle);
}
