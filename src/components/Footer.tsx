/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useTheme } from "../custom hooks/useTheme";

const Footer = () => {
  const theme = useTheme();
  const style = css`
    text-align: center;
    color: ${theme.colors.primary};
  `;
  return <p css={style}>© Roxana Turc | Portfolio Generator Project | 2023</p>;
};

export default Footer;
