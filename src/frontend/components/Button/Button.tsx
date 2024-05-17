/** @jsxImportSource @emotion/react */
// Importing necessary types and hooks
import { MyTheme } from "../../../theme";
import { useTheme } from "@emotion/react";
import { getButtonStyles } from "./Button.style";

// Defining the types for button colors and sizes based on the theme
type ButtonColor = keyof MyTheme["colors"];
type ButtonSize = keyof MyTheme["sizes"];

// Interface for hover state properties
interface HoverProps {
  color?: ButtonColor;
  backgroundColor?: ButtonColor;
  border?: ButtonSize;
}

// Interface for the button properties
export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: ButtonColor;
  backgroundColor?: ButtonColor;
  border?: string;
  borderRadius?: ButtonSize;
  padding?: ButtonSize;
  width?: ButtonSize;
  height?: ButtonSize;
  hover?: HoverProps;
  margin?: ButtonSize;
  cursor?: string;
  fontSize?: ButtonSize;
  textAlign?: "left" | "center" | "right";
  css?: any;
  type?: "button" | "submit" | "reset";
}

// Button component definition
const Button: React.FC<ButtonProps> = (props) => {
  const theme = useTheme() as MyTheme;

  // Generating the styles based on the theme and the provided props

  const style = getButtonStyles(theme, props);
  return (
    // Returning a button element with the computed styles and event handler
    <button css={style.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
