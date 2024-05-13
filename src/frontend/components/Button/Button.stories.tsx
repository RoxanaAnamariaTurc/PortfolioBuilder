import type { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonProps } from "./Button";
import { theme } from "../../../theme";
import { ThemeProvider } from "@emotion/react";
import React from "react";

const colorKeys = Object.keys(theme.colors);
const sizes = Object.keys(theme.sizes);

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: { options: colorKeys, control: "select" },
    backgroundColor: { options: colorKeys, control: "select" },
    border: { options: sizes, control: "select" },
    borderRadius: { options: sizes, control: "select" },
    padding: { options: sizes, control: "select" },
    width: { options: sizes, control: "select" },
    height: { options: sizes, control: "select" },
    margin: { options: sizes, control: "select" },
    cursor: { control: "text" },
    fontSize: { options: sizes, control: "select" },
    textAlign: { control: "text" },
    type: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: ButtonProps) => (
    <ThemeProvider theme={theme}>
      <Button {...args} />
    </ThemeProvider>
  ),
  args: {
    children: "Button",
    onClick: () => {
      console.log("Button clicked");
    },
    color: "primary",
    backgroundColor: "portfolioBackground",
    border: "xsmall",
    borderRadius: "xsmall",
    padding: "xsmall",
    width: "xlarge",
    height: "medium",
    margin: "small",
    cursor: "pointer",
    fontSize: "small",
    textAlign: "center",
  },
};

export const Delete: Story = {
  render: (args: ButtonProps) => (
    <ThemeProvider theme={theme}>
      <Button {...args} />
    </ThemeProvider>
  ),
  args: {
    children: "Delete",
    onClick: () => {
      console.log("Button clicked");
    },
    color: "danger",
    backgroundColor: "portfolioBackground",
    border: "xsmall",
    borderRadius: "xsmall",
    padding: "xsmall",
    width: "xlarge",
    height: "medium",
    margin: "small",
    cursor: "pointer",
    fontSize: "small",
    textAlign: "center",
  },
};

export const AddButton: Story = {
  render: (args: ButtonProps) => (
    <ThemeProvider theme={theme}>
      <Button {...args} />
    </ThemeProvider>
  ),
  args: {
    children: "+ Add Project",
    onClick: () => {
      console.log("Button clicked");
    },
    color: "primary",
    backgroundColor: "portfolioBackground",
    border: "xsmall",
    borderRadius: "xsmall",
    padding: "xsmall",
    width: "xlarge",
    height: "medium",
    margin: "small",
    cursor: "pointer",
    fontSize: "small",
    textAlign: "center",
  },
};
