import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import './countdown.js';

const { events, args, argTypes } = getStorybookHelpers('grantcodes-countdown');

const meta = {
  title: 'Components/Countdown',
  component: 'grantcodes-countdown',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

export default meta;

/**
 * Default countdown to a future date.
 */
export const Default = {
  args: {
    target: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    'days-label': 'days',
    'hours-label': 'hours',
    'minutes-label': 'minutes',
  },
};

/**
 * Countdown with seconds visible.
 */
export const WithSeconds = {
  args: {
    target: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    'show-seconds': true,
  },
};

/**
 * Countdown with custom Spanish labels.
 */
export const SpanishLabels = {
  args: {
    target: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    'days-label': 'días',
    'hours-label': 'horas',
    'minutes-label': 'minutos',
    'seconds-label': 'segundos',
    'past-message': '¡El evento ha comenzado!',
  },
};

export const NarrowContent = {
  args: {
    target: '2050-01-01T00:00:00Z',
    'show-seconds': true,
    'days-label': 'long translated days label',
    'hours-label': 'long translated hours label',
    'minutes-label': 'long translated minutes label',
    'seconds-label': 'long translated seconds label',
  },
};

/**
 * Countdown that has already passed — shows the past message.
 */
export const PastEvent = {
  args: {
    target: '2020-01-01T00:00:00Z',
    'past-message': 'This event has already happened!',
  },
};
