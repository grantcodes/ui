import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
const { events, args, argTypes, template } =
	getStorybookHelpers("grantcodes-gallery");
import "./gallery.js";
import "./gallery-image.js";

function getRandomSize() {
	return Math.floor(Math.random() * (800 - 100 + 1) + 100);
}

const getTestImage = () => {
	const width = getRandomSize();
	const height = getRandomSize();

	return {
		src: `https://picsum.photos/${width}/${height}`,
		alt: "Image",
		width,
		height,
	};
};

const testImages: ReturnType<typeof getTestImage>[] = [];
for (let i = 0; i < 12; i++) {
	testImages.push(getTestImage());
}

const meta: Meta = {
	component: "grantcodes-gallery",
	args: {
		...args,
		caption: "This is a test caption",
	},
	argTypes,
	render: (args) =>
		template(
			args,
			html`${testImages.map(
				({ src, alt, width, height }) =>
					html`<grantcodes-gallery-image
						src=${src}
						alt=${alt}
						width=${width}
						height=${height}
						caption=${args.caption}
					></grantcodes-gallery-image>`,
			)}`,
		),
	parameters: {
		actions: {
			handles: events,
		},
	},
};

export default meta;
type Story = StoryObj;

export const Gallery: Story = {};
