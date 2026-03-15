import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],

  core: {
    disableTelemetry: true,
  },

  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-themes"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
    options: {},
  },
};

function getAbsolutePath(value) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
