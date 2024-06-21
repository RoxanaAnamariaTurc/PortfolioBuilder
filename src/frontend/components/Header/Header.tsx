/** @jsxImportSource @emotion/react */
import React from "react";
import Logout from "../Logout/Logout";
import logo from "../../../images/logo.jpg";
import { getHeaderStyle } from "./Header.styles";
import { useTheme } from "../../../hooks/useTheme";

const Header = ({ isBlurred }: { isBlurred?: boolean }) => {
  const theme = useTheme();
  const style = getHeaderStyle(theme, isBlurred);
  return (
    <header css={style.header}>
      <img css={style.img} src={logo} alt="Logo" />
      <Logout />
    </header>
  );
};

export default Header;
