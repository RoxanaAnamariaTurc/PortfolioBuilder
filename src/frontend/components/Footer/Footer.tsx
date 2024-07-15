/** @jsxImportSource @emotion/react */
import { getFooterStyles } from "./Footer.styles";
import { useTheme } from "../../../hooks/useTheme";

const Footer = () => {
  const theme = useTheme();
  const style = getFooterStyles(theme);

  return (
    <footer css={style.footer}>
      © Roxana Turc | Portfolio Generator Project | {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
