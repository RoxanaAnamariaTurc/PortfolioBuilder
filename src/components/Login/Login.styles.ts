import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const getLoginStyle = (theme: MyTheme) => {
  return {
    container: css({
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: theme.colors.transparent,
      height: "70vh",
      width: "50vw",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignSelf: "center",
      boxShadow:
        "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c, inset 4px 0 8px -4px #3d3c4c, inset 0 4px 8px -4px #3d3c4c",
    }),
    form: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& > :last-child": {
        marginLeft: theme.sizes.xlarge,
      },
    }),
    inputGroup: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    }),
    label: css({
      color: theme.colors.primary,
      fontSize: theme.sizes.small,
      margin: "1rem",
    }),
    input: css({
      border: `1px solid ${theme.colors.primary}`,
      padding: theme.sizes.small,
      width: "20rem",
      margin: "1rem",
      backgroundColor: theme.colors.transparent,
      color: theme.colors.primary,
    }),
    h1: css({
      color: theme.colors.primary,
      textAlign: "center",
      padding: theme.sizes.xsmall,
      fontSize: theme.sizes.large,
      letterSpacing: theme.sizes.small,
    }),
  };
};
