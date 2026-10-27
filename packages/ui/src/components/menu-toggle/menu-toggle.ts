import { GrantCodesMenuToggle } from './menu-toggle.component.js';
export * from './menu-toggle.component.js';
export default GrantCodesMenuToggle;
if (!customElements.get('grantcodes-menu-toggle')) {
  customElements.define('grantcodes-menu-toggle', GrantCodesMenuToggle);
}
