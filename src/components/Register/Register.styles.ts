import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const registerStyle = (theme: MyTheme) => css`
  background: ${theme.colors.secondary};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  h1 {
    color: ${theme.colors.primary};
    text-align: center;
    padding: 2rem;
    font-size: ${theme.sizes.xlarge};
    /* margin-top: 10rem; */
    letter-spacing: 5px;
  }

  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  label,
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
    color: ${theme.colors.text};
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
    color: ${theme.colors.secondary};
  }
`;
