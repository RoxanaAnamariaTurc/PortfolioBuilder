/** @jsxImportSource @emotion/react */
import Footer from "../Footer/Footer";
import { getRegisterStyle } from "./Register.styles";
import { useTheme } from "../../hooks/useTheme";
import { useContext } from "react";
import { UserContext, UserContextProps } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";

const Register = () => {
  const { setUser } = useContext(UserContext) as UserContextProps;
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
    const formData = new FormData();
    const fullName = (e.target as HTMLFormElement).elements.namedItem(
      "fullName"
    ) as HTMLInputElement | null;

    const fullNameValue = fullName?.value;
    console.log(fullNameValue);
    const email = (e.target as HTMLFormElement).elements.namedItem(
      "email"
    ) as HTMLInputElement | null;
    const emailValue = email?.value;
    console.log(emailValue);
    const password = (e.target as HTMLFormElement).elements.namedItem(
      "password"
    ) as HTMLInputElement | null;
    const passwordValue = password?.value;
    console.log(passwordValue);
    const passwordConfirmation = (
      e.target as HTMLFormElement
    ).elements.namedItem("passwordConfirmation") as HTMLInputElement | null;
    const passwordConfirmationValue = passwordConfirmation?.value;
    const jobTitle = (e.target as HTMLFormElement).elements.namedItem(
      "jobTitle"
    ) as HTMLInputElement | null;
    const jobTitleValue = jobTitle?.value;
    console.log(jobTitleValue);
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
        const response = await axios.post(
          "http://localhost:3001/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          setUser(response.data);
          navigate("/login");
        } else {
          alert("Registration failed");
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          console.log(err.response.data);
          alert(`${err.response.data.message}`);
        } else {
          alert("Server error");
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
        <form css={style.form} onSubmit={handleSubmit}>
          <div css={style.inputGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" />
          </div>
          <div css={style.inputGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div css={style.inputGroup}>
            <label htmlFor="jobTitle">Job Title</label>
            <input type="text" id="jobTitle" />
          </div>
          <div css={style.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>

          <div css={style.inputGroup}>
            <p>Profile image</p>
            <input type="file" id="profileImage" accept=".jpg,.jpeg,.png" />
          </div>
          <div css={style.inputGroup}>
            <label htmlFor="passwordConfirmation">Repeat Password</label>
            <input type="password" id="passwordConfirmation" />
          </div>
          <Button
            css={style.buttonStyle}
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
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
