/** @jsxImportSource @emotion/react */

import { MyTheme } from "../../theme";
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
  onClick?: () => void;
  children?: React.ReactNode;
  color?: ButtonColor;
  backgroundColor?: ButtonColor;
  border?: string;
  borderRadius?: ButtonSize;
  padding?: ButtonSize;
  width?: ButtonSize;
  height?: ButtonSize;
  hover?: HoverProps;
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
