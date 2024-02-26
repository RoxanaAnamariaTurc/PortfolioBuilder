/** @jsxImportSource @emotion/react */
import Footer from "./Footer";
import { css } from "@emotion/react";
import { useTheme } from "../custom hooks/useTheme";
import { useContext } from "react";
import { UserContext, UserContextProps } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    const profileImageValue = profileImage?.value;
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
      if (profileImage?.files?.length ?? 0 > 0) {
        if (
          profileImage &&
          profileImage.files &&
          profileImage.files.length > 0
        ) {
          formData.append("profileImage", profileImage.files[0]);
        }
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
        console.log(response);

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

  const style = css`
    background: ${theme.colors.secondary};
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    h1 {
      color: ${theme.colors.primary};
      text-align: center;
      padding: 2rem;
      font-size: ${theme.sizes.xlarge};
      /* margin-top: 10rem; */
      letter-spacing: 5px;
    }

    form {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.25rem;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    label,
    p {
      color: ${theme.colors.primary};
      font-size: ${theme.sizes.small};
      margin: 1rem;
    }
    input {
      border: 1px solid ${theme.colors.primary};
      padding: ${theme.sizes.small};
      width: 23rem;
      margin: 1rem;
      background-color: ${theme.colors.primary};
      font-size: ${theme.sizes.small};
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
      grid-column: 2;
      justify-self: center;
    }
    button:hover {
      background-color: ${theme.colors.hover};
      color: ${theme.colors.secondary};
    }
  `;

  return (
    <div css={style}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <div className="input-group">
          <label htmlFor="passwordConfirmation">Repeat Password</label>
          <input type="password" id="passwordConfirmation" />
        </div>
        <div className="input-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input type="text" id="jobTitle" />
        </div>
        <div className="input-group">
          <p>Profile image</p>
          <input type="file" id="profileImage" accept=".jpg,.jpeg,.png" />
        </div>
        <button type="submit">Register</button>
      </form>
      <Footer />
    </div>
  );
};

export default Register;
