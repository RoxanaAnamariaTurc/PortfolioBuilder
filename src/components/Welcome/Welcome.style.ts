import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const welcomeStyle = (theme: MyTheme) => css`
  background: ${theme.colors.background};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  header {
    color: ${theme.colors.primary};
    text-align: left;
    padding: 2rem;
    margin-right: auto;
    font-size: ${theme.sizes.large};
  }

  #login-btn,
  #register-btn {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
    border: none;
    border-radius: ${theme.sizes.small};
    padding: ${theme.sizes.small};
    cursor: pointer;
    margin-right: 3rem;
    text-decoration: none;
    width: 10rem;
    font-size: ${theme.sizes.small};
  }
  #login-btn:hover,
  #register-btn:hover {
    background-color: ${theme.colors.text};
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.hover};
  }
  main {
    display: flex;
    justify-content: flex-end;
    align-items: end;
    margin: 1rem;
    height: 100vh;
  }
`;
