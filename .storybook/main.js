module.exports = {
  stories: [
    "../src/**/*.stories.tsx",
    "../src/**/*.storybook-mocks.js",
    "../src/**/*.storybook-mocks.tsx",
  ],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-actions/register",
    "@storybook/addon-knobs",
  ],
};
