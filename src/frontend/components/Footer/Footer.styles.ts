import { css } from "@emotion/react";
import { MyTheme } from "../../../theme";

export const getFooterStyles = (theme: MyTheme) => {
  return {
    footer: css({
      textAlign: "center",
      color: theme.colors.primary,
      position: "fixed",
      left: 0,
      bottom: 0,
      width: "100%",
      "@media (max-width: 768px)": {
        position: "relative",
        fontSize: "0.8rem",
      },
    }),
  };
};
