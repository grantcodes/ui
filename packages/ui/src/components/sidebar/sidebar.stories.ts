import { html } from 'lit';
import { expect, userEvent, waitFor } from 'storybook/test';
import type { GrantCodesSidebar } from './sidebar.js';
// Side-effect import: an import used only in type position is erased, which would also drop
// `customElements.define()` and the component's shadow styles from the story bundle.
import './sidebar.js';

const meta = {
  title: 'Components/Sidebar',
  component: 'grantcodes-sidebar',
};

export default meta;

// The breakpoint is viewport-based, so the drawer stories override it to stay compact inside
// Storybook's wide preview iframe; otherwise every toggle is hidden in persistent layout.
const drawerBreakpoint = '--sidebar-breakpoint: 100000px;';

const navigation = html`
  <h2 slot="header" style="margin: 0">Together</h2>
  <nav slot="content" aria-label="Primary navigation">
    <ul style="margin: 0; padding: 0; list-style: none; display: grid; gap: 0.75rem">
      <li><a href="/">Dashboard</a></li>
      <li><a href="/projects">Projects</a></li>
      <li><a href="/tasks">Tasks</a></li>
      <li><a href="/settings">Settings</a></li>
    </ul>
  </nav>
  <div slot="footer"><a href="/account">Account</a></div>
`;

export const Standalone = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const sidebar = canvasElement.querySelector<GrantCodesSidebar>('grantcodes-sidebar')!;
    const trigger = canvasElement.querySelector('grantcodes-sidebar-toggle')!;
    const menu = trigger.shadowRoot!.querySelector('grantcodes-menu-toggle')!;
    const button = menu.shadowRoot!.querySelector('button')!;
    await waitFor(() => expect(trigger).toBeVisible());
    // Simulated tabbing does not traverse shadow roots.
    button.focus();
    await expect(menu.shadowRoot!.activeElement).toBe(button);
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(sidebar.open).toBe(true));
    await waitFor(() => expect(button).toHaveAttribute('aria-expanded', 'true'));
    if ('ariaControlsElements' in button) {
      await expect(button.ariaControlsElements).toEqual([sidebar]);
    }
    // Synthetic Escape does not trigger the native dialog's cancel event.
    sidebar.shadowRoot!.querySelector('dialog')!.dispatchEvent(new Event('cancel', { cancelable: true }));
    await waitFor(() => expect(sidebar.open).toBe(false));
    await waitFor(() => expect(button).toHaveAttribute('aria-expanded', 'false'));
    await waitFor(() => expect(menu.shadowRoot!.activeElement).toBe(button));
  },
  render: () => html`
    <div style="display: flex; min-height: 32rem;">
      <grantcodes-sidebar id="navigation" aria-label="Navigation" style=${drawerBreakpoint}>
        ${navigation}
      </grantcodes-sidebar>
      <main style="flex: 1; padding: 2rem">
        <p>
          <grantcodes-sidebar-toggle for="navigation"></grantcodes-sidebar-toggle>
        </p>
        <h1>Dashboard</h1>
      </main>
    </div>
  `,
};

export const MultipleTriggers = {
  render: () => html`
    <div style="display: flex; min-height: 32rem;">
      <grantcodes-sidebar id="shared-navigation" aria-label="Navigation" style=${drawerBreakpoint}>
        ${navigation}
      </grantcodes-sidebar>
      <main style="flex: 1; padding: 2rem; display: grid; align-content: start; gap: 1rem;">
        <grantcodes-sidebar-toggle for="shared-navigation">
          <button type="button" aria-label="Open navigation">Open navigation</button>
        </grantcodes-sidebar-toggle>
        <grantcodes-sidebar-toggle for="shared-navigation">
          <button type="button" aria-label="Open navigation from tools">Tools</button>
        </grantcodes-sidebar-toggle>
        <h1>Multiple triggers</h1>
      </main>
    </div>
  `,
};

export const Controlled = {
  render: () => {
    const sidebar = document.createElement('grantcodes-sidebar') as GrantCodesSidebar;
    sidebar.id = 'controlled-navigation';
    sidebar.controlled = true;
    sidebar.setAttribute('aria-label', 'Navigation');
    sidebar.style.cssText = drawerBreakpoint;
    sidebar.innerHTML = '<h2 slot="header">Together</h2><nav slot="content">Navigation</nav>';
    const toggle = document.createElement('grantcodes-sidebar-toggle');
    toggle.setAttribute('for', 'controlled-navigation');
    toggle.innerHTML = '<button type="button" aria-label="Open navigation">Menu</button>';
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display:flex;min-height:32rem;gap:1rem';
    wrapper.append(sidebar, toggle);
    sidebar.addEventListener('drawer-toggle', (event: Event) => {
      sidebar.open = (event as CustomEvent<{ open: boolean }>).detail.open;
    });
    return wrapper;
  },
};

export const LongContent = {
  render: () => html`
    <div style="display: flex; height: 24rem;">
      <grantcodes-sidebar aria-label="Navigation">
        <h2 slot="header" style="margin: 0">Together</h2>
        <nav slot="content">
          ${Array.from({ length: 40 }, (_, index) => html`<p><a href="/#${index}">Navigation item ${index + 1}</a></p>`)}
        </nav>
        <div slot="footer"><button type="button">Sign out</button></div>
      </grantcodes-sidebar>
      <main style="padding: 2rem"><h1>Independent content scroll</h1></main>
    </div>
  `,
};
