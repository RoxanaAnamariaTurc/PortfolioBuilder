import type { Meta, StoryObj } from "@storybook/react";
import TextArea from "./TextArea";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Inputs/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    limit: { control: "number" },
    value: { control: "text" },
    onChange: { action: "onChange" },
    name: { control: "text" },
    id: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    limit: 50,
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac risus id libero porttitor cursus. Donec non semper dolor. Fusce condimentum, nunc ut sollicitudin dapibus, est erat dapibus mi, quis posuere dolor purus non nunc. Nulla facilisi. Donec aliquam, turpis at elementum efficitur, risus turpis aliquet.",
    name: "description",
    onChange: (value: string) => {
      action("onChange")(value);
    },
  },
};

export const SmallLimit: Story = {
  args: {
    limit: 10,
    value: "Lorem ipsum",
    name: "description",
    onChange: (value: string) => {
      action("onChange")(value);
    },
  },
};
