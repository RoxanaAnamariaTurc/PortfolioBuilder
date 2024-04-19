/** @jsxImportSource @emotion/react */
import Footer from "../Footer/Footer";
import { getWelcomeStyle } from "./Welcome.style";
import { useTheme } from "../../../hooks/useTheme";
import { Link } from "react-router-dom";

const Welcome = () => {
  const theme = useTheme();
  const style = getWelcomeStyle(theme);

  return (
    <>
      <div css={style.div}>
        <header css={style.header}>
          <h1>
            The beginning of <br />
            your journey
          </h1>
        </header>
        <main css={style.main}>
          <Link css={style.link} to="/login" id="login-btn">
            Login
          </Link>
          <Link css={style.link} to="/register" id="register-btn">
            Register
          </Link>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Welcome;
