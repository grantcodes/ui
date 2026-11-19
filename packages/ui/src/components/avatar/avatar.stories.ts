import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { expect } from 'storybook/test';

const { events, args, argTypes, template } = getStorybookHelpers('grantcodes-avatar');

import './avatar.js';

const meta = {
  title: 'Components/Avatar',
  component: 'grantcodes-avatar',
  args: {
    ...args,
    src: 'https://placehold.co/160x160',
    name: 'Tommy Tobasco',
    alt: 'Tommy Tomasco Avatar',
    initials: '2T',
  },
  argTypes,
  render: (args: any) => template(args),
  parameters: {
    actions: {
      handles: events,
    },
  },
};

export default meta;

/** Returns the avatar's shadow parts and whether its src loads (background images fire no events). */
async function avatarParts(canvasElement: HTMLElement, src: string) {
  const root = canvasElement.querySelector('grantcodes-avatar')?.shadowRoot as ShadowRoot;
  const probe = new Image();
  probe.src = src;
  const loaded = await probe.decode().then(
    () => true,
    () => false,
  );
  return {
    wrapper: root.querySelector('.avatar'),
    image: root.querySelector('.avatar__image') as HTMLElement,
    loaded,
    initials: root.querySelector('.avatar__initials'),
  };
}

export const Avatar = {
  args: {
    // Inline image so the story loads offline.
    src: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" fill="#3b82f6"/></svg>')}`,
  },
  play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: { src: string } }) => {
    const { wrapper, image, loaded } = await avatarParts(canvasElement, args.src);
    await expect(loaded).toBe(true);
    await expect(image).toBeVisible();
    await expect(getComputedStyle(image).backgroundImage).toContain('data:image/svg+xml');
    await expect(wrapper).toHaveAccessibleName('Tommy Tomasco Avatar');
  },
};

/** A src that fails to load (e.g. a deleted profile picture) shows the initials instead. */
export const BrokenImage = {
  args: {
    src: '/missing-avatar.jpg',
  },
  play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: { src: string } }) => {
    const { wrapper, image, loaded, initials } = await avatarParts(canvasElement, args.src);
    await expect(loaded).toBe(false);
    // A failed background image paints nothing; the layer itself must stay see-through.
    await expect(getComputedStyle(image).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(initials).toBeVisible();
    await expect(initials).toHaveTextContent('2T');
    await expect(wrapper).toHaveAccessibleName('Tommy Tomasco Avatar');
  },
};

export const Initials = {
  args: {
    src: undefined,
  },
};
