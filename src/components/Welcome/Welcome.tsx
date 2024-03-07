/** @jsxImportSource @emotion/react */
import Footer from "../Footer/Footer";
import { welcomeStyle } from "./Welcome.style";
import { useTheme } from "../../custom hooks/useTheme";
import { Link } from "react-router-dom";

const Welcome = () => {
  const theme = useTheme();

  return (
    <>
      <div css={welcomeStyle(theme)}>
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
