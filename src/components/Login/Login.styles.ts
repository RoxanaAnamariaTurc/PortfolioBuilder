import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const loginStyle = (theme: MyTheme) => css`
  background: ${theme.colors.secondary};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding-bottom: 5rem;
    /* margin-bottom: 15rem; */
  }

  .input-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  label {
    color: ${theme.colors.primary};
    font-size: ${theme.sizes.small};
    margin: 1rem;
  }

  input {
    border: 1px solid ${theme.colors.primary};
    padding: ${theme.sizes.small};
    width: 20rem;
    margin: 1rem;
    background-color: ${theme.colors.primary};
  }
  button {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
    border: none;
    border-radius: ${theme.sizes.xsmall};
    padding: ${theme.sizes.small};
    cursor: pointer;
    margin-left: 12rem;
    width: 10rem;
    font-size: ${theme.sizes.small};
  }
  button:hover {
    background-color: ${theme.colors.hover};
    color: ${theme.colors.secondary};
  }

  h1 {
    color: ${theme.colors.primary};
    text-align: center;
    padding: 2rem;
    margin-top: 10rem;
    font-size: ${theme.sizes.xlarge};
    letter-spacing: 5px;
  }
`;
