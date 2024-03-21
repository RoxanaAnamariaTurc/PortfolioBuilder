import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const projectModalStyle = (theme: MyTheme) => css`
  position: fixed;
  top: 5em;
  left: 25em;
  background: ${theme.colors.background};
  height: auto;
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1em;
  box-shadow: 0 0 10px 5px ${theme.colors.hover};
  z-index: 1000;
  padding: 2em;

  .input-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;
  }

  .input-group label {
    text-align: left;
    color: ${theme.colors.primary};
  }

  .input-group input,
  .input-group textarea {
    width: 35em;
    padding: 0.5rem;
    margin: 1em;
  }

  textarea {
    width: 35em;
    height: 10em;
  }

  input {
    padding: 0.5rem;
  }

  .close-button {
    position: absolute;
    top: 2%;
    right: 2%;
    font-size: 1.5em;
    color: ${theme.colors.hover};
    padding: 10px;
    cursor: pointer;
    margin-left: auto;
  }

  button {
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
    border: none;
    border-radius: 5px;
    padding: 0.5rem;
    cursor: pointer;
    width: 100px;
    margin: 1em;
    margin-left: auto;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .modal {
    display: flex;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    gap: 1em;
  }

  .limit-exceeded {
    border: 1px solid red;
  }

  .warning {
    color: red;
  }

  .custom-file-upload {
    padding: 10px;
    background-color: ${theme.colors.secondary};
    border: 1px solid #ccc;
    cursor: pointer;
  }
`;
