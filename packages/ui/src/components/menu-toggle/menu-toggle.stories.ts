import { html } from 'lit';
import './menu-toggle.js';
import type { GrantCodesMenuToggle } from './menu-toggle.js';

export default { title: 'Components/MenuToggle', component: 'grantcodes-menu-toggle' };

export const Interactive = {
  render: () => html`<grantcodes-menu-toggle @click=${(event: Event) => {
    const toggle = event.currentTarget as GrantCodesMenuToggle;
    toggle.expanded = !toggle.expanded;
  }}></grantcodes-menu-toggle>`,
};

export const Expanded = {
  render: () => html`<grantcodes-menu-toggle expanded></grantcodes-menu-toggle>`,
};
