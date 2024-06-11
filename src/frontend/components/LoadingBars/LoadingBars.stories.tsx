import type { Meta, StoryObj } from "@storybook/react";
import LoadingBars from "./LoadingBars";
import React from "react";
import { theme } from "../../../theme";
import { ThemeProvider } from "@emotion/react";

const meta = {
  title: "Loading",
  component: LoadingBars,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
  args: {
    barColor: theme.colors.danger,
    barHeight: "2px",
    direction: "column",
  },
  argTypes: {
    barColor: { control: "color" },
    barHeight: { control: "text" },
    direction: { control: { type: "select", options: ["row", "column"] } },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultLoading: Story = {
  render: (args) => (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: theme.colors.portfolioBackground,
          padding: "20px",
          height: "100vh",
          width: "100vw",
        }}
      >
        <LoadingBars {...args} />
      </div>
    </ThemeProvider>
  ),
  args: {
    bars: [
      { width: "300px", delay: "0s" },
      { width: "200px", delay: "0.2s" },
      { width: "300px", delay: "0.4s" },
    ],
  },
};

export const LargeLoadingBars: Story = {
  ...DefaultLoading,
  args: {
    bars: [
      { width: "400px", delay: "0s" },
      { width: "300px", delay: "0.2s" },
      { width: "400px", delay: "0.4s" },
    ],
  },
};

export const ColorfulLoadingBars: Story = {
  ...DefaultLoading,
  args: {
    bars: [
      { width: "300px", delay: "0s" },
      { width: "200px", delay: "0.2s" },
      { width: "300px", delay: "0.4s" },
    ],
    barColor: theme.colors.primary,
    barHeight: "2px",
  },
};

export const CircleLoading: Story = {
  ...DefaultLoading,
  args: {
    bars: [],
    type: "circle",
  },
};
