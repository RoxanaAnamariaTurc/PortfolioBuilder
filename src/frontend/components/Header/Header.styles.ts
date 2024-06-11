import { css } from "@emotion/react";
import { MyTheme } from "../../../theme";

export const getHeaderStyle = (
  theme: MyTheme,
  isBlurred: boolean | undefined
) => ({
  div: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1em",
    color: theme.colors.primary,
    zIndex: "1000",
    filter: isBlurred ? "blur(15px)" : "none",
  }),
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  }),
  img: css({
    width: "80px",
    height: "80px",
    borderRadius: "25%",
    marginLeft: "auto",
  }),
});
