/** @jsxImportSource @emotion/react */
import Footer from "../Footer/Footer";
import { getLoginStyle } from "./Login.styles";
import { useTheme } from "../../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextProps } from "../../../UserContext";
import { useContext, useState } from "react";
import Button from "../Button/Button";
import { loginUser } from "../../../api";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext) as UserContextProps;
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = (e.target as HTMLFormElement).elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const email = emailInput ? emailInput.value : "";
    const password = (e.target as HTMLFormElement).elements.namedItem(
      "password"
    ) as HTMLInputElement;
    const passwordValue = password ? password.value : "";

    if (email && passwordValue) {
      try {
        const data = await loginUser(email, passwordValue);
        if (data.user) {
          const user = data.user;
          setUser(user);
          setError(false);
          localStorage.setItem("userId", user.id);
          navigate("/userdashboard");
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    } else {
      setError(true);
    }
  };
  const theme = useTheme();
  const style = getLoginStyle(theme);

  const inputStyle = error
    ? { border: `1px solid ${theme.colors.danger}` }
    : {};

  return (
    <div>
      <div css={style.container}>
        <h1 css={style.h1}>Login</h1>
        {error && (
          <div
            data-testid="error-message"
            style={{ color: theme.colors.danger, textAlign: "center" }}
          >
            Invalid email or password
          </div>
        )}
        <form role="form" css={style.form} onSubmit={handleSubmit}>
          <div css={style.inputGroup}>
            <label css={style.label} htmlFor="email">
              Email address
            </label>
            <input
              css={style.input}
              style={inputStyle}
              type="email"
              id="email"
              required
            />
          </div>
          <div css={style.inputGroup}>
            <label css={style.label} htmlFor="password">
              Password
            </label>
            <input
              css={style.input}
              style={inputStyle}
              type="password"
              id="password"
              required
            />
          </div>
          <Button
            color={"primary"}
            backgroundColor={"transparent"}
            borderRadius={"xsmall"}
            padding={"xsmall"}
            width={"xlarge"}
            fontSize={"small"}
            height={"medium"}
            margin={"small"}
            textAlign={"center"}
          >
            Login
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
