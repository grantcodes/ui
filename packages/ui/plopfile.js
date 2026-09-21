export default (plop) => {
	plop.setGenerator("component", {
		description: "Create a component",
		// User input prompts provided as arguments to the template
		prompts: [
			{
				type: "input",
				name: "name",
				message: "What is your component name?",
			},
		],
		actions: [
			// Export file
			{
				type: "add",
				path: "src/components/{{kebabCase name}}/index.js",
				templateFile: "plop-templates/web-component/index.js.hbs",
			},
			// Main component file
			{
				type: "add",
				path: "src/components/{{kebabCase name}}/{{kebabCase name}}.component.js",
				templateFile: "plop-templates/web-component/component.component.js.hbs",
			},
			// Custom element registration
			{
				type: "add",
				path: "src/components/{{kebabCase name}}/{{kebabCase name}}.js",
				templateFile: "plop-templates/web-component/component.js.hbs",
			},
			// Styles
			{
				type: "add",
				path: "src/components/{{kebabCase name}}/{{kebabCase name}}.css",
				templateFile: "plop-templates/web-component/component.css.hbs",
			},
			// Tests
			{
				type: "add",
				path: "src/components/{{kebabCase name}}/{{kebabCase name}}.test.js",
				templateFile: "plop-templates/web-component/component.test.js.hbs",
			},
			// Stories
			{
				type: "add",
				path: "src/components/{{kebabCase name}}/{{kebabCase name}}.stories.js",
				templateFile: "plop-templates/web-component/component.stories.js.hbs",
			},
		],
	});
};
