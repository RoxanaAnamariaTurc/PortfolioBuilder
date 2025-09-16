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
  const { setUser, setPortfolioToken } =
    useContext(UserContext) as UserContextProps;
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = (e.target as HTMLFormElement).elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const passwordInput = (e.target as HTMLFormElement).elements.namedItem(
      "password"
    ) as HTMLInputElement;

    const email = emailInput?.value ?? "";
    const passwordValue = passwordInput?.value ?? "";

    if (email && passwordValue) {
      try {
        const data = await loginUser(email, passwordValue);
        if (data.user) {
          setUser(data.user);
          setPortfolioToken(data.portfolioToken ?? null);
          setError(null);
          navigate("/userdashboard");
        } else {
          setError("Invalid email or password");
        }
      } catch (err: any) {
        const message = err?.response?.data?.message || "Invalid email or password";
        setError(message);
      }
    } else {
      setError("Email or password is missing");
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
            id="email-error"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}
        <form css={style.form} onSubmit={handleSubmit} data-testid="login-form">
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
              aria-describedby="email-error"
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
