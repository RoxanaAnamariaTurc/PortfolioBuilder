/** @jsxImportSource @emotion/react */
import { footerStyle } from "./Footer.styles";
import { useTheme } from "../../custom hooks/useTheme";

const Footer = () => {
  const theme = useTheme();

  return (
    <p css={footerStyle(theme)}>
      © Roxana Turc | Portfolio Generator Project | 2023
    </p>
  );
};

export default Footer;
