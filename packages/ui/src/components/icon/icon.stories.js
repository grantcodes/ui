import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { html } from 'lit/static-html.js';
import './icon.js';
import { ArrowRight, CheckCircle2, Heart, Star } from '../../icons.js';

const meta = {
  title: 'Components/Icon',
  component: 'grantcodes-icon',
};

export default meta;

export const Icon = {
  render: () => html`<grantcodes-icon>${unsafeHTML(ArrowRight)}</grantcodes-icon>`,
};

export const MultipleIcons = {
  render: () => html`
		<div style="display: flex; gap: 1rem;">
			<grantcodes-icon>${unsafeHTML(Heart)}</grantcodes-icon>
			<grantcodes-icon>${unsafeHTML(Star)}</grantcodes-icon>
			<grantcodes-icon>${unsafeHTML(CheckCircle2)}</grantcodes-icon>
			<grantcodes-icon>${unsafeHTML(ArrowRight)}</grantcodes-icon>
		</div>
	`,
};
