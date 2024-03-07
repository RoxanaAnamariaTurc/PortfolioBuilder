import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const skillsModalStyle = (theme: MyTheme) => css`
  position: fixed;
  top: 5em;
  left: 25em;
  background: ${theme.colors.background};
  height: 50vh;
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  border-radius: 1em;
  box-shadow: 0 0 10px 5px ${theme.colors.hover};
  z-index: 1000;
  padding: 2em;

  label {
    text-align: baseline;
    color: ${theme.colors.primary};
    margin-top: 2em;
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
  .modal {
    display: flex;
  }

  #softSkills,
  #technicalSkills {
    width: 20em;
    padding: 0.5rem;
    margin: 1em;
  }
  .input-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;
