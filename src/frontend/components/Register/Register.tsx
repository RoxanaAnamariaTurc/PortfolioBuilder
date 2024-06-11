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
  const [fieldErrors, setFieldErrors] = useState({
    fullName: false,
    email: false,
    password: false,
    passwordConfirmation: false,
    jobTitle: false,
  });

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

    const jobTitle = (e.target as HTMLFormElement).elements.namedItem(
      "jobTitle"
    ) as HTMLInputElement | null;

    const jobTitleValue = jobTitle?.value;
    const profileImage = (e.target as HTMLFormElement).elements.namedItem(
      "profileImage"
    ) as HTMLInputElement | null;

    const newFieldErrors = {
      fullName: !fullNameValue,
      email: !emailValue,
      password: !passwordValue,
      passwordConfirmation: !passwordConfirmationValue,
      jobTitle: !jobTitleValue,
    };
    setFieldErrors(newFieldErrors);

    if (passwordValue !== passwordConfirmationValue) {
      setError("Passwords do not match!");
      setFieldErrors({
        ...newFieldErrors,
        password: true,
        passwordConfirmation: true,
      });
      return;
    }

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
              style={{
                borderColor: fieldErrors.fullName
                  ? theme.colors.danger
                  : "initial",
              }}
              type="text"
              id="fullName"
              name="fullName"
            />
            {fieldErrors.fullName && (
              <p
                style={{
                  color: theme.colors.danger,
                  textAlign: "center",
                  margin: "0",
                }}
              >
                Full Name is required
              </p>
            )}
          </div>
          <div css={style.inputGroup}>
            <label className="required" htmlFor="email">
              Email
            </label>
            <input
              style={{
                borderColor: fieldErrors.email
                  ? theme.colors.danger
                  : "initial",
              }}
              type="email"
              id="email"
              name="email"
            />
            {fieldErrors.email && (
              <p
                style={{
                  color: theme.colors.danger,
                  textAlign: "center",
                  margin: "0",
                }}
              >
                Email is required
              </p>
            )}
          </div>
          <div css={style.inputGroup}>
            <label className="required" htmlFor="jobTitle">
              Job Title
            </label>
            <input
              style={{
                borderColor: fieldErrors.jobTitle
                  ? theme.colors.danger
                  : "initial",
              }}
              type="text"
              id="jobTitle"
              name="jobTitle"
            />
            {fieldErrors.jobTitle && (
              <p
                style={{
                  color: theme.colors.danger,
                  textAlign: "center",
                  margin: "0",
                }}
              >
                Job Title is required
              </p>
            )}
          </div>
          <div css={style.inputGroup}>
            <label className="required" htmlFor="password">
              Password
            </label>
            <input
              style={{
                borderColor: fieldErrors.password
                  ? theme.colors.danger
                  : "initial",
              }}
              type="password"
              id="password"
              name="password"
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
              style={{
                borderColor: fieldErrors.passwordConfirmation
                  ? theme.colors.danger
                  : "initial",
              }}
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
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
