import { GrantCodesPopover } from './popover.component.js';

export * from './popover.component.js';
export default GrantCodesPopover;

if (!customElements.get('grantcodes-popover')) {
  customElements.define('grantcodes-popover', GrantCodesPopover);
}
