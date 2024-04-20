import { css } from "@emotion/react";
import { MyTheme } from "../../../theme";

export const getWelcomeStyle = (theme: MyTheme) => {
  return {
    div: css({
      backgroundColor: theme.colors.background,
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "@media (max-width: 768px)": {
        flexDirection: "column",
        justifyContent: "center",
      },
      "@media (max-width: 480px)": {
        padding: "1rem",
        justifyContent: "flex-start",
      },
    }),
    header: css({
      color: theme.colors.primary,
      textAlign: "left",
      padding: "2rem",
      marginRight: "auto",
      fontSize: theme.sizes.large,
      "@media (max-width: 768px)": {
        fontSize: "1.5rem",
      },
      "@media (max-width: 480px)": {
        fontSize: "1.2rem",
        padding: "1rem",
      },
    }),
    link: css({
      backgroundColor: theme.colors.primary,
      color: theme.colors.background,
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
      "@media (max-width: 768px)": {
        width: "8rem",
        fontSize: "0.9rem",
        marginRight: "1.5rem",
      },
      "@media (max-width: 480px)": {
        width: "100%",
        margin: "2em",
        fontSize: "0.8rem",
      },
    }),
    main: css({
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "end",
      margin: "1rem",
      height: "100vh",
      "@media (max-width: 768px)": {
        justifyContent: "center",
        alignItems: "center",
      },
    }),
  };
};
