import { getStorybookHelpers } from "@wc-toolkit/storybook-helpers";
import "./map.js";

const { events, args, argTypes } = getStorybookHelpers("grantcodes-map");

const meta = {
	title: "Components/Map",
	component: "grantcodes-map",
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
 * Default map showing a location in Granollers, Catalonia.
 */
export const Default = {
	args: {
		lat: "41.648747",
		lng: "2.161975",
		zoom: 14,
		label: "Granollers, Catalonia",
	},
};

/**
 * Map with a directions link below.
 */
export const WithDirections = {
	args: {
		lat: "41.648747",
		lng: "2.161975",
		zoom: 14,
		label: "Granollers, Catalonia",
		"directions-url": "https://maps.google.com/?q=41.648747,2.161975",
	},
};

/**
 * Map with a custom height.
 */
export const CustomHeight = {
	args: {
		lat: "48.8566",
		lng: "2.3522",
		zoom: 12,
		label: "Paris, France",
		height: "600px",
	},
};

/**
 * Zoomed-out world view.
 */
export const ZoomedOut = {
	args: {
		lat: "0",
		lng: "0",
		zoom: 2,
		label: "World map",
	},
};
