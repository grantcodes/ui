import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
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

// This default export determines where your story goes in the story list
const meta: Meta = {
	component: "grantcodes-gallery",
	render: ({ caption }) =>
		html`<grantcodes-gallery
      >${testImages.map(
				({ src, alt, width, height }) =>
					html`<grantcodes-gallery-image
						src=${src}
						alt=${alt}
						width=${width}
						height=${height}
						caption=${caption}
					></grantcodes-gallery-image>`,
			)}</grantcodes-gallery
    >`,
	args: {
		caption: "This is a test caption",
	},
};

export default meta;
type Story = StoryObj;

export const Gallery: Story = {};
