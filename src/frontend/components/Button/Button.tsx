/** @jsxImportSource @emotion/react */

import { MyTheme } from "../../../theme";
import { useTheme } from "@emotion/react";
import { getButtonStyles } from "./Button.style";

type ButtonColor = keyof MyTheme["colors"];

type ButtonSize = keyof MyTheme["sizes"];

interface HoverProps {
  color?: ButtonColor;
  backgroundColor?: ButtonColor;
  border?: ButtonSize;
}
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

const Button: React.FC<ButtonProps> = (props) => {
  const theme = useTheme() as MyTheme;
  const style = getButtonStyles(theme, props);
  return (
    <button css={style.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
