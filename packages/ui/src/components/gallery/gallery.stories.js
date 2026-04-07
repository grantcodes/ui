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

const filmstripImages = [
	{ w: 400, h: 240 },
	{ w: 160, h: 240 },
	{ w: 360, h: 240 },
	{ w: 180, h: 240 },
	{ w: 420, h: 240 },
	{ w: 160, h: 240 },
	{ w: 380, h: 240 },
	{ w: 200, h: 240 },
	{ w: 440, h: 240 },
	{ w: 160, h: 240 },
	{ w: 350, h: 240 },
	{ w: 170, h: 240 },
];

export const Filmstrip = {
	args: {
		filmstrip: true,
	},
	render: (args) =>
		template(
			args,
			html`${filmstripImages.map(
				({ w, h }, i) =>
					html`<grantcodes-gallery-image
						src="https://picsum.photos/seed/${i + 10}/${w}/${h}"
						alt="Photo ${i + 1}"
						width="${w}"
						height="${h}"
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
