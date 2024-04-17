import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const getWelcomeStyle = (theme: MyTheme) => {
  return {
    div: css({
      backgroundColor: theme.colors.background,
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }),
    header: css({
      color: theme.colors.primary,
      textAlign: "left",
      padding: "2rem",
      marginRight: "auto",
      fontSize: theme.sizes.large,
    }),
    link: css({
      backgroundColor: theme.colors.primary,
      color: theme.colors.secondary,
      border: `2px solid transparent`,
      borderRadius: theme.sizes.small,
      padding: theme.sizes.small,
      cursor: "pointer",
      marginRight: "3rem",
      textDecoration: "none",
      width: "10rem",
      fontSize: theme.sizes.small,
      "&:hover": {
        backgroundColor: theme.colors.hover,
        color: theme.colors.primary,
        borderColor: theme.colors.hover,
      },
    }),
    main: css({
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "end",
      margin: "1rem",
      height: "100vh",
    }),
  };
};
