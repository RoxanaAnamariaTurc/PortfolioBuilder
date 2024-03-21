import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const footerStyle = (theme: MyTheme) => css`
  text-align: center;
  color: ${theme.colors.primary};
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;
