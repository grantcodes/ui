export default {
	stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],

	// stories: [
	// 	{
	// 	  directory: '../src/components',
	// 	  files: '*.stories.*',
	// 	  titlePrefix: 'Components',
	// 	},
	//   ],
	addons: ["@storybook/addon-docs"],

	framework: {
		name: "@storybook/web-components-vite",
		options: {},
	},
};
