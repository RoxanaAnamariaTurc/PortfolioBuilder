/** @jsxImportSource @emotion/react */
import Footer from "../Footer/Footer";
import { registerStyle } from "./Register.styles";
import { useTheme } from "../../custom hooks/useTheme";
import { useContext } from "react";
import { UserContext, UserContextProps } from "../../UserContext";
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

  return (
    <div css={registerStyle(theme)}>
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
          <label htmlFor="jobTitle">Job Title</label>
          <input type="text" id="jobTitle" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>

        <div className="input-group">
          <p>Profile image</p>
          <input type="file" id="profileImage" accept=".jpg,.jpeg,.png" />
        </div>
        <div className="input-group">
          <label htmlFor="passwordConfirmation">Repeat Password</label>
          <input type="password" id="passwordConfirmation" />
        </div>
        <button type="submit">Register</button>
      </form>
      <Footer />
    </div>
  );
};

export default Register;
