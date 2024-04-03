import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const registerStyle = (theme: MyTheme) => css`
  background: ${theme.colors.secondary};
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex;
  flex-direction: column;

  h1 {
    color: ${theme.colors.primary};
    text-align: center;
    padding: 2rem;
    font-size: ${theme.sizes.xlarge};
    letter-spacing: 5px;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    height: 80vh;
    margin-bottom: 7em;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10.5em;
  }
  label {
    color: ${theme.colors.primary};
    font-size: ${theme.sizes.small};
    align-self: flex-start;
    margin: 1rem;
  }
  p {
    color: ${theme.colors.primary};
    font-size: ${theme.sizes.small};
    margin: 1rem;
  }

  input {
    border: 1px solid ${theme.colors.primary};
    padding: ${theme.sizes.small};
    width: 23rem;
    margin: 1rem;
    background-color: ${theme.colors.primary};
    font-size: ${theme.sizes.small};
  }
  button {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.secondary};
    border: none;
    border-radius: ${theme.sizes.xsmall};
    padding: ${theme.sizes.small};
    cursor: pointer;
    margin-left: 12rem;
    width: 10rem;
    font-size: ${theme.sizes.small};
    grid-column: 2;
    justify-self: center;
  }
  button:hover {
    background-color: ${theme.colors.hover};
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.hover};
  }

  @media screen and (max-width: 768px) {
  }
`;
