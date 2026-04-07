import { html } from "lit/static-html.js";
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

const testImages = [];
for (let i = 0; i < 12; i++) {
	testImages.push(getTestImage());
}

const meta = {
	title: "Components/Gallery",
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

export const Gallery = {};

export const Filmstrip = {
	args: {
		filmstrip: true,
	},
	render: (args) =>
		template(
			args,
			html`${Array.from(
				{ length: 10 },
				(_, i) =>
					html`<grantcodes-gallery-image
						src="https://picsum.photos/seed/${i + 10}/400/240"
						alt="Photo ${i + 1}"
						width="400"
						height="240"
					></grantcodes-gallery-image>`,
			)}`,
		),
	parameters: {
		docs: {
			description: {
				story:
					"Filmstrip variant: images in a scrollable horizontal row at uniform height. Uses scroll-snap and scroll-driven animations.",
			},
		},
	},
};

export const Marquee = {
	args: {
		filmstrip: true,
		marquee: true,
	},
	render: (args) =>
		template(
			args,
			html`${Array.from(
				{ length: 16 },
				(_, i) =>
					html`<grantcodes-gallery-image
						src="https://picsum.photos/seed/${i + 20}/320/240"
						alt="Photo ${i + 1}"
						width="320"
						height="240"
					></grantcodes-gallery-image>`,
			)}`,
		),
	parameters: {
		docs: {
			description: {
				story:
					"Marquee variant: filmstrip auto-scrolls left-to-right and back. Hover to pause. Animation disabled when prefers-reduced-motion is set.",
			},
		},
	},
};
