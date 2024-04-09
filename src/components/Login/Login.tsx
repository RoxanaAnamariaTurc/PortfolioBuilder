/** @jsxImportSource @emotion/react */
import Footer from "../Footer/Footer";
import { loginStyle } from "./Login.styles";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { UserContext, UserContextProps } from "../../UserContext";
import axios from "axios";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext) as UserContextProps;

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
          const user = response.data.user;
          console.log("user", user);
          setUser(user);
          localStorage.setItem("userId", user.id);
          console.log("userID in login", user.id);
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

  return (
    <div css={loginStyle(theme)}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <button>Login</button>
      </form>

      <Footer />
    </div>
  );
};

export default Login;
