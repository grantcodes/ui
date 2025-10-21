export default {
	stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
	// stories: [
	// 	{
	// 	  directory: '../src/components',
	// 	  files: '*.stories.*',
	// 	  titlePrefix: 'Components',
	// 	},
	//   ],
	framework: {
		name: "@web/storybook-framework-web-components",
	},
	docs: {
		autodocs: "tag",
	},
};
