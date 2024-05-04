/** @jsxImportSource @emotion/react */
import Footer from "../Footer/Footer";
import { getRegisterStyle } from "./Register.styles";
import { useTheme } from "../../../hooks/useTheme";
import { useContext, useState } from "react";
import { UserContext, UserContextProps } from "../../../UserContext";
import { useNavigate } from "react-router-dom";
import * as axios from "axios";
import Button from "../Button/Button";
import { registerUser } from "../../../api";

const Register = () => {
  const { setUser } = useContext(UserContext) as UserContextProps;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const isAxiosError = (error: any): error is axios.AxiosError => {
    return error.isAxiosError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const fullName = (e.target as HTMLFormElement).elements.namedItem(
      "fullName"
    ) as HTMLInputElement | null;

    const fullNameValue = fullName?.value;

    const email = (e.target as HTMLFormElement).elements.namedItem(
      "email"
    ) as HTMLInputElement | null;
    const emailValue = email?.value;

    const password = (e.target as HTMLFormElement).elements.namedItem(
      "password"
    ) as HTMLInputElement | null;
    const passwordValue = password?.value;

    const passwordConfirmation = (
      e.target as HTMLFormElement
    ).elements.namedItem("passwordConfirmation") as HTMLInputElement | null;
    const passwordConfirmationValue = passwordConfirmation?.value;

    if (passwordValue !== passwordConfirmationValue) {
      setError("Passwords do not match!");
      return;
    }

    const jobTitle = (e.target as HTMLFormElement).elements.namedItem(
      "jobTitle"
    ) as HTMLInputElement | null;

    const jobTitleValue = jobTitle?.value;
    const profileImage = (e.target as HTMLFormElement).elements.namedItem(
      "profileImage"
    ) as HTMLInputElement | null;

    if (
      fullNameValue &&
      emailValue &&
      passwordValue &&
      passwordConfirmationValue &&
      jobTitleValue
    ) {
      formData.append("fullName", fullNameValue);
      formData.append("email", emailValue);
      formData.append("password", passwordValue);
      formData.append("jobTitle", jobTitleValue);
      if (profileImage?.files?.length) {
        formData.append("profileImage", profileImage.files[0]);
      }
      try {
        const response = await registerUser(formData);
        console.log(response);

        if (response.status === 201 || response.status === 200) {
          setUser(response.data);
          navigate("/login");
        } else if (response.status === 400) {
          setError("User already registered!");
        }
      } catch (err) {
        if (isAxiosError(err) && err.response) {
          setError((err.response.data as any).message);
        } else {
          setError("Server Error");
        }
      }
    }
  };

  const theme = useTheme();
  const style = getRegisterStyle(theme);

  return (
    <div>
      <div css={style.registerDiv}>
        <h1 css={style.h1}>Register</h1>
        {error && (
          <p
            data-testid="error-message"
            style={{ color: theme.colors.danger, textAlign: "center" }}
          >
            {error}
          </p>
        )}
        <form
          css={style.form}
          onSubmit={handleSubmit}
          data-testid="register-form"
        >
          <div css={style.inputGroup}>
            <label className="required" htmlFor="fullName">
              Full Name
            </label>
            <input
              style={{ borderColor: error ? theme.colors.danger : "initial" }}
              type="text"
              id="fullName"
              required
            />
          </div>
          <div css={style.inputGroup}>
            <label className="required" htmlFor="email">
              Email
            </label>
            <input
              style={{ borderColor: error ? theme.colors.danger : "initial" }}
              type="email"
              id="email"
              required
            />
          </div>
          <div css={style.inputGroup}>
            <label className="required" htmlFor="jobTitle">
              Job Title
            </label>
            <input
              style={{ borderColor: error ? theme.colors.danger : "initial" }}
              type="text"
              id="jobTitle"
              required
            />
          </div>
          <div css={style.inputGroup}>
            <label className="required" htmlFor="password">
              Password
            </label>
            <input
              style={{ borderColor: error ? theme.colors.danger : "initial" }}
              type="password"
              id="password"
              required
            />
          </div>

          <div css={style.inputGroup}>
            <p>Profile image</p>
            <input type="file" id="profileImage" accept=".jpg,.jpeg,.png" />
          </div>
          <div css={style.inputGroup}>
            <label className="required" htmlFor="passwordConfirmation">
              Confirm Password
            </label>
            <input
              style={{ borderColor: error ? theme.colors.danger : "initial" }}
              type="password"
              id="passwordConfirmation"
              required
            />
          </div>
          <div css={style.buttonWrapper}>
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
              Register
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
