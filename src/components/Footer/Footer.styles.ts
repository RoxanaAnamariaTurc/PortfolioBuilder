import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const footerStyle = (theme: MyTheme) => css`
  text-align: center;
  color: ${theme.colors.primary};
`;
