import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const headerStyle = (theme: MyTheme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  color: ${theme.colors.primary};
  z-index: 1000;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  img {
    width: 80px;
    height: 80px;
    border-radius: 25%;
    margin-left: auto;
  }

  button {
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
    padding: 0.5em;
    border: 2px solid transparent;
    border-radius: 0.5em;
    cursor: pointer;
  }

  button:hover {
    background-color: ${theme.colors.hover};
    color: ${theme.colors.primary};
    border-color: ${theme.colors.hover};
  }
`;
