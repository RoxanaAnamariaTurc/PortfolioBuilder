import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const getTextAreaStyles = (theme: MyTheme) => {
  return {
    textarea: css({
      padding: "0.5rem",
      backgroundColor: theme.colors.transparent,
      color: theme.colors.primary,
      border: `${theme.colors.primary} 1px solid`,
      width: "35em",
    }),
    div: css({
      color: theme.colors.primary,
      marginLeft: theme.sizes.small,
    }),
    span: css({
      color: "red",
    }),
  };
};
