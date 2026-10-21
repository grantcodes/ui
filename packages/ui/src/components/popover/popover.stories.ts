import { html } from 'lit';
import { expect, userEvent, within } from 'storybook/test';
import './popover.js';
import '../button/button.js';

const meta = {
  title: 'Components/Popover',
  component: 'grantcodes-popover',
};

export default meta;

export const InteractiveForm = {
  render: () => html`
    <grantcodes-popover>
      <grantcodes-button slot="trigger">Edit profile</grantcodes-button>
      <form @submit=${(event: SubmitEvent) => event.preventDefault()}>
        <label>
          Name
          <input name="name" value="Grant" />
        </label>
        <grantcodes-button type="submit">Save</grantcodes-button>
      </form>
    </grantcodes-popover>
  `,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const popover = canvasElement.querySelector('grantcodes-popover') as HTMLElement & {
      open: boolean;
    };
    await userEvent.click(canvas.getByText('Edit profile'));
    await expect(popover).toHaveAttribute('open');
    await userEvent.type(canvas.getByRole('textbox'), ' Richmond');
    await userEvent.keyboard('{Escape}');
    await expect(popover).not.toHaveAttribute('open');
  },
};

export const ViewportEdges = {
  render: () => html`
    <div dir="rtl" style="display: flex; justify-content: space-between; gap: 1rem; padding: 1rem;">
      ${['bottom-start', 'bottom-end', 'top-start', 'top-end'].map(
        (placement) => html`
          <grantcodes-popover placement=${placement}>
            <button slot="trigger">${placement}</button>
            <div style="max-block-size: 12rem; overflow: auto; inline-size: min(18rem, 80vw);">
              ${Array.from({ length: 20 }, (_, index) => html`<p>Scrollable content ${index + 1}</p>`)}
            </div>
          </grantcodes-popover>
        `,
      )}
    </div>
  `,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const popovers = canvasElement.querySelectorAll('grantcodes-popover');
    await expect(popovers).toHaveLength(4);
    for (const popover of popovers) {
      await userEvent.click(popover.querySelector('button') as HTMLButtonElement);
      await expect(popover).toHaveAttribute('open');
    }
  },
};

export const CustomTrigger = {
  render: () => html`
    <grantcodes-popover>
      <grantcodes-button slot="trigger">Custom control</grantcodes-button>
      <button type="button">First action</button>
    </grantcodes-popover>
  `,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const popover = canvasElement.querySelector('grantcodes-popover') as HTMLElement & {
      open: boolean;
    };
    await userEvent.click(within(canvasElement).getByText('Custom control'));
    await expect(popover).toHaveAttribute('open');
    await expect(
      popover.querySelector('grantcodes-button')?.shadowRoot?.querySelector('button'),
    ).toHaveAttribute('aria-expanded', 'true');
  },
};
