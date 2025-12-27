import { css } from "@emotion/react";
import { MyTheme } from "../../../theme";
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
    fontSize = "small",
    cursor,
    textAlign,
  } = props;
  return {
    button: css({
      background: `
        linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)
      `,
      color: "#1a1a1a",
      border: `1px solid ${theme.colors.border}`,
      borderRadius: "12px",
      padding: theme.sizes[padding],
      width: theme.sizes[width],
      height: theme.sizes[height],
      margin: theme.sizes[margin],
      cursor: cursor || "pointer",
      fontSize: theme.sizes[fontSize],
      fontWeight: "600",
      letterSpacing: "0.025em",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      textAlign: textAlign || "center",
      position: "relative",
      overflow: "hidden",
      boxShadow: `
        0 4px 6px -1px rgba(0, 0, 0, 0.3),
        0 2px 4px -1px rgba(0, 0, 0, 0.2),
        0 0 0 1px rgba(184, 169, 201, 0.2)
      `,
      "&:hover": {
        transform: "translateY(-2px)",
        background: "#1a1a1a !important",
        color: "#d4c4e3 !important",
        border: `2px solid ${theme.colors.primary}`,
        boxShadow: `
          0 10px 25px -5px rgba(184, 169, 201, 0.5),
          0 10px 10px -5px rgba(0, 0, 0, 0.2),
          0 0 0 2px rgba(184, 169, 201, 0.4)
        `,
      },
      "&:active": {
        transform: "translateY(-1px)",
        boxShadow: `
          0 4px 6px -1px rgba(184, 169, 201, 0.5),
          0 2px 4px -1px rgba(0, 0, 0, 0.1)
        `,
      },
    }),
  };
};
