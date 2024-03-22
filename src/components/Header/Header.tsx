/** @jsxImportSource @emotion/react */
import React from "react";
import Logout from "../Logout/Logout";
import logo from "../../images/logo.jpg";
import { headerStyle } from "./Header.styles";
import { useTheme } from "../../custom hooks/useTheme";
import { Link } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  return (
    <div css={headerStyle(theme)}>
      <header>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <Logout />
      </header>
    </div>
  );
};

export default Header;
