export default (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      // Export file
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/index.ts',
        templateFile: 'plop-templates/web-component/index.ts.hbs',
      },
      // Main component file
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.component.ts',
        templateFile: 'plop-templates/web-component/component.component.ts.hbs',
      },
      // Web component loader
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.ts',
        templateFile: 'plop-templates/web-component/component.ts.hbs',
      },
      // Types
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.scss',
        templateFile: 'plop-templates/web-component/component.scss.hbs',
      },
      // Styles
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.types.ts',
        templateFile: 'plop-templates/web-component/component.types.ts.hbs',
      },
      // Tests
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.test.ts',
        templateFile: 'plop-templates/web-component/component.test.ts.hbs',
      },
      // Stories
      {
        type: 'add',
        path: 'src/components/{{kebabCase name}}/{{kebabCase name}}.stories.ts',
        templateFile: 'plop-templates/web-component/component.stories.ts.hbs',
      },
    ],
  })
}
