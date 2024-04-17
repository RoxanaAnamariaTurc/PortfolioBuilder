import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const getRegisterStyle = (theme: MyTheme) => {
  return {
    registerDiv: css({
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: theme.colors.transparent,
      height: "90vh",
      width: "90vw",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      boxShadow:
        "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c, inset 4px 0 8px -4px #3d3c4c, inset 0 4px 8px -4px #3d3c4c",
    }),
    h1: css({
      color: theme.colors.primary,
      textAlign: "center",
      padding: "2rem",
      fontSize: theme.sizes.large,
      letterSpacing: "5px",
    }),
    form: css({
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "start",
      height: "80vh",
      marginBottom: "7em",
    }),
    inputGroup: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginLeft: "10.5em",
      label: css({
        color: theme.colors.primary,
        fontSize: theme.sizes.small,
        alignSelf: "flex-start",
        margin: "1rem",
      }),
      p: css({
        color: theme.colors.primary,
        fontSize: theme.sizes.small,
        margin: "1rem",
      }),
      input: css({
        border: `1px solid ${theme.colors.primary}`,
        padding: theme.sizes.small,
        width: "23rem",
        margin: "1rem",
        backgroundColor: theme.colors.transparent,
        fontSize: theme.sizes.small,
        color: theme.colors.primary,
      }),
    }),
    buttonStyle: css({
      gridColumn: 3 / 3,
      justifySelf: "end",
    }),
  };
};
