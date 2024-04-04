import { css } from "@emotion/react";
import { MyTheme } from "../../theme";
import { ButtonProps } from "./Button";

export const getButtonStyles = (theme: MyTheme, props: ButtonProps) => {
  const {
    color = "secondary",
    backgroundColor = "background",
    border = "2x solid transparent",
    borderRadius = "small",
    padding = "small",
    width = "xlarge",
    height = "large",
    hover,
    margin = "xsmall",
  } = props;
  return {
    button: css({
      backgroundColor: theme.colors[backgroundColor],
      color: theme.colors[color],
      border: border,
      borderRadius: theme.sizes[borderRadius],
      padding: theme.sizes[padding],
      width: theme.sizes[width],
      height: theme.sizes[height],
      margin: theme.sizes[margin],
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: theme.colors[hover?.backgroundColor || "hover"],
        border: `2px solid ${theme.colors[hover?.color || "secondary"]}`,
        color: theme.colors[hover?.color || "primary"],
      },
    }),
  };
};
