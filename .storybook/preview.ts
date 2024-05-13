import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../src/theme";
import type { Meta } from "@storybook/react";

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      default: theme,
    },
    defaultTheme: "default",
    Provider: ThemeProvider,
  }),
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
};

const meta: Meta = {
  title: "Portfolio Builder Storybook",
  parameters,
  decorators,
};

export default meta;
