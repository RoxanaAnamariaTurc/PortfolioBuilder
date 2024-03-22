import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const headerStyle = (theme: MyTheme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background: ${theme.colors.text};
  color: ${theme.colors.primary};
  box-shadow: 0 0 10px 5px ${theme.colors.hover};
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
    border: none;
    border-radius: 0.5em;
    cursor: pointer;
  }

  button:hover {
    background-color: ${theme.colors.text};
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.hover};
  }
`;
