/** @jsxImportSource @emotion/react */
import Footer from "./Footer";
import { css } from "@emotion/react";
import { useTheme } from "../custom hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextProps } from "../UserContext";
import { useContext } from "react";
import axios from "axios";

const Login = () => {
  const { user } = useContext(UserContext) as UserContextProps;
  const navigate = useNavigate();

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
        const response = await axios.post("http://localhost:3001/login", {
          email,
          password: passwordValue,
        });
        if (response.status === 200) {
          navigate("/userdashboard");
        } else {
          alert("Invalid email or password");
        }
      } catch (error) {
        console.log(error);
        alert("An error occurred while trying to login");
      }
    } else {
      alert("Please enter a valid email and password");
    }
  };
  const theme = useTheme();

  const style = css`
    background: ${theme.colors.secondary};
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      padding-bottom: 5rem;
      /* margin-bottom: 15rem; */
    }

    .input-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    label {
      color: ${theme.colors.primary};
      font-size: ${theme.sizes.small};
      margin: 1rem;
    }

    input {
      border: 1px solid ${theme.colors.primary};
      padding: ${theme.sizes.small};
      width: 20rem;
      margin: 1rem;
      background-color: ${theme.colors.primary};
    }
    button {
      background-color: ${theme.colors.primary};
      color: ${theme.colors.text};
      border: none;
      border-radius: ${theme.sizes.xsmall};
      padding: ${theme.sizes.small};
      cursor: pointer;
      margin-left: 12rem;
      width: 10rem;
      font-size: ${theme.sizes.small};
    }
    button:hover {
      background-color: ${theme.colors.hover};
      color: ${theme.colors.secondary};
    }

    h1 {
      color: ${theme.colors.primary};
      text-align: center;
      padding: 2rem;
      margin-top: 10rem;
      font-size: ${theme.sizes.xlarge};
      letter-spacing: 5px;
    }
  `;

  return (
    <div css={style}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <button>Login</button>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
