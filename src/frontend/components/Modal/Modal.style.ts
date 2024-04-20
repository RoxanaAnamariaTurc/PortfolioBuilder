import { css } from "@emotion/react";
import { MyTheme } from "../../../theme";

export const getModalStyles = (theme: MyTheme) => {
  return {
    div: css({
      position: "fixed",
      top: "5em",
      left: "50%",
      transform: "translateX(-50%)",
      background: theme.colors.background,
      height: "80vh",
      width: "70vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.sizes.xsmall,
      boxShadow: `0 0 10px 5px ${theme.colors.hover}`,
      zIndex: 1000,
      padding: "2em",
      "@media(max-width: 1024px)": {
        width: "80vw",
        height: "auto",
        overflowY: "auto",
        padding: "1em",
      },
      "@media(max-width: 768px)": {
        top: "3em",
        width: "90vw",
      },
    }),
    inputGroup: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "3rem",
      width: "100%",
      "@media(max-width: 768px)": {
        flexDirection: "column",
        gap: "1rem",
      },
    }),
    label: css({
      textAlign: "left",
      color: theme.colors.primary,
    }),
    input: css({
      padding: "0.5rem",
      backgroundColor: theme.colors.transparent,
      color: theme.colors.primary,
      border: `${theme.colors.primary} 1px solid`,
      width: "35em",
      "@media(max-width: 768px)": {
        width: "auto",
      },
    }),

    closeButton: css({
      position: "absolute",
      top: "2%",
      right: "2%",
      fontSize: "1.5em",
      color: theme.colors.hover,
      padding: "10px",
      cursor: "pointer",
      marginLeft: "auto",
    }),
    form: css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "0.5rem",
    }),
    modal: css({
      display: "flex",
    }),
    buttonContainer: css({
      display: "flex",
      justifyContent: "flex-end",
      gap: "1em",
      width: "39em",
      "@media(max-width: 768px)": {
        width: "auto",
      },
    }),

    customFile: css({
      padding: "10px",
      backgroundColor: theme.colors.transparent,
      border: `1px solid ${theme.colors.primary}`,
      cursor: "pointer",
    }),
    skills: css({
      width: "25em",
      padding: theme.sizes.xsmall,
      margin: theme.sizes.small,
    }),

    h2: css({
      color: theme.colors.primary,
      textAlign: "center",
      marginBottom: "1em",
      fontSize: theme.sizes.medium,
      "@media(max-width: 768px)": {
        fontSize: theme.sizes.small,
      },
    }),
  };
};
