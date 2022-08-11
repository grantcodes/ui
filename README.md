# grant.codes UI

A personal component system.

Components are built with react using css modules for styles with theming provided by my custom style dictionary.

## Installing

In the future it should be something like `npm install @grantcodes/ui`.

## Usage

Everything should mostly just work out of the box, without much setup 🤞.

There is a theme provider which can be used to wrap the entire application and change the theme.

```
import { Provider } from '@grantcodes/ui'

const Component = () => (
    <Provider theme="default">
        <AppOrWhatever />
    </Provider>
)
```

## Creating a new component

To create a new component run `npm run generate`. Uses plop.js for scaffolding.
