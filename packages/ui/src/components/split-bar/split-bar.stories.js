import { html } from 'lit';
import './split-bar.js';

const defaultSegments = [
  { id: 'complete', label: 'Complete', value: 61 },
  { id: 'remaining', label: 'Remaining', value: 39 },
];

const meta = {
  title: 'Components/Split Bar',
  component: 'grantcodes-split-bar',
  parameters: {
    docs: {
      description: {
        component: `The \`segments\` array accepts \`{ id, label, value, color? }\` relative weights. Percentages are independently rounded, so they can total 99% or 101%. Empty input renders only a neutral track; a zero total retains each legend entry at 0%.

Parts: \`bar\`, \`segment\`, and \`legend\`.

JavaScript: \`element.segments = [{ id: 'complete', label: 'Complete', value: 61 }]\`.

Astro: \`<grantcodes-split-bar segments='[{"id":"complete","label":"Complete","value":61}]'></grantcodes-split-bar>\`.`, 
      },
    },
  },
  render: ({ segments }) => html`<grantcodes-split-bar .segments=${segments}></grantcodes-split-bar>`,
};

export default meta;

export const Default = {
  args: {
    segments: defaultSegments,
  },
};

export const MultipleSegments = {
  args: {
    segments: [
      { id: 'design', label: 'Design', value: 24 },
      {
        id: 'development',
        label: 'Development work with a deliberately long label that wraps',
        value: 58,
        color: 'var(--g-color-utility-success)',
      },
      { id: 'review', label: 'Review', value: 18 },
    ],
  },
};

export const ZeroTotal = {
  args: {
    segments: [
      { id: 'complete', label: 'Complete', value: 0 },
      { id: 'remaining', label: 'Remaining', value: 0 },
    ],
  },
};

export const Empty = {
  args: {
    segments: [],
  },
};
