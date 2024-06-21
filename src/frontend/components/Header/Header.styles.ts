import { css } from "@emotion/react";
import { MyTheme } from "../../../theme";

export const getHeaderStyle = (
  theme: MyTheme,
  isBlurred: boolean | undefined
) => ({
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "1em",
    filter: isBlurred ? "blur(15px)" : "none",
  }),
  img: css({
    width: "80px",
    height: "80px",
    borderRadius: "25%",
  }),
});
