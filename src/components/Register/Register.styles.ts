import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const getRegisterStyle = (theme: MyTheme) => {
  return {
    registerDiv: css({
      boxSizing: "border-box",
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
      boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: "1fr",
      alignItems: "start",
      height: "80vh",
      marginBottom: "7em",
      "@media(min-width: 600px)": {
        gridTemplateColumns: "1fr 1fr",
      },
    }),
    inputGroup: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginLeft: "5%",
      label: css({
        color: theme.colors.primary,
        fontSize: theme.sizes.small,
        alignSelf: "flex-start",
        margin: "1rem",
        "&.required::after": {
          content: "' *'",
          color: theme.colors.danger,
        },
      }),
      p: css({
        color: theme.colors.primary,
        fontSize: theme.sizes.small,
        margin: "1rem",
      }),
      input: css({
        border: `1px solid ${theme.colors.primary}`,
        padding: theme.sizes.small,
        width: "90%",
        margin: "1rem",
        backgroundColor: theme.colors.transparent,
        fontSize: theme.sizes.small,
        color: theme.colors.primary,
      }),
    }),

    buttonWrapper: css({
      gridColumn: 2,
      justifySelf: "end",
    }),
  };
};
