/** @jsxImportSource @emotion/react */
import React from "react";
import Logout from "../Logout/Logout";
import logo from "../../../images/logo.jpg";
import { getHeaderStyle } from "./Header.styles";
import { useTheme } from "../../../hooks/useTheme";
import { Link } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const style = getHeaderStyle(theme);
  return (
    <div css={style.div}>
      <header css={style.header}>
        <Link to="/">
          <img css={style.img} src={logo} alt="Logo" />
        </Link>
        <Logout />
      </header>
    </div>
  );
};

export default Header;
