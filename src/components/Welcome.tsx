/** @jsxImportSource @emotion/react */
import Footer from "./Footer";
import { css } from "@emotion/react";
import { useTheme } from "../custom hooks/useTheme";
import { Link } from "react-router-dom";

const Welcome = () => {
  const theme = useTheme();

  const style = css`
    background: ${theme.colors.background};
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    header {
      color: ${theme.colors.primary};
      text-align: left;
      padding: 2rem;
      margin-right: auto;
      font-size: ${theme.sizes.large};
    }

    #login-btn,
    #register-btn {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.text};
      border: none;
      border-radius: ${theme.sizes.small};
      padding: ${theme.sizes.small};
      cursor: pointer;
      margin-right: 3rem;
      text-decoration: none;
      width: 10rem;
      font-size: ${theme.sizes.small};
    }
    #login-btn:hover,
    #register-btn:hover {
      background-color: ${theme.colors.text};
      color: ${theme.colors.primary};
    }
    main {
      display: flex;
      justify-content: flex-end;
      align-items: end;
      margin: 1rem;
      height: 100vh;
    }
  `;

  return (
    <>
      <div css={style}>
        <header>
          <h1>
            The beginning of <br />
            your journey
          </h1>
        </header>
        <main>
          <Link to="/login" id="login-btn">
            Login
          </Link>
          <Link to="/register" id="register-btn">
            Register
          </Link>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Welcome;
