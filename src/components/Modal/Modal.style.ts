import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const getModalStyles = (theme: MyTheme) => {
  return {
    div: css({
      position: "fixed",
      top: "5em",
      left: "25em",
      background: theme.colors.background,
      height: "50vh",
      width: "50vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: theme.sizes.xsmall,
      boxShadow: `0 0 10px 5px ${theme.colors.hover}`,
      zIndex: 1000,
      padding: "2em",
    }),
    inputGroup: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "3rem",
      width: "100%",
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
  };
};
