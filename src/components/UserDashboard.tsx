/** @jsxImportSource @emotion/react */
import { useTheme } from "../custom hooks/useTheme";
import { css, SerializedStyles } from "@emotion/react";
import avatar from "../images/avatar.png";
import { UserContext, UserContextProps } from "../UserContext";
import { useContext } from "react";

const UserDashboard: React.FC = () => {
  const { user } = useContext(UserContext) as UserContextProps;
  const blob = new Blob([user?.profileImage ?? ""], { type: "image/jpeg" });
  const theme = useTheme();

  const style: SerializedStyles = css`
    background: ${theme.colors.background};
    height: 100vh;
    width: 100vw;

    .user-profile {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      padding: 2rem;
    }
    .user-profile h3 {
      color: ${theme.colors.primary};
    }
    .user-info {
      display: flex;
      flex-direction: column;
      border-right: 1px solid ${theme.colors.primary};
    }

    .user-image {
      display: flex;
      flex-direction: row;
    }
    .user-image img {
      width: 170px;
      height: 150px;
      border-radius: 35%;
    }
    .user-image ul li {
      list-style: none;
      margin-top: 0.5rem;
      color: ${theme.colors.primary};
    }

    .user-skills {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .user-skills h4 {
      color: ${theme.colors.primary};
    }
    .add-button {
      background: ${theme.colors.primary};
      color: ${theme.colors.background};
      border: none;
      border-radius: 5px;
      padding: 0.5rem;
      margin-top: 1rem;
      cursor: pointer;
      width: 100px;
    }
    @media screen and (max-width: 680px) {
      .user-profile {
        display: flex;
        flex-direction: column;
      }
      .user-profile h3 {
        color: ${theme.colors.primary};
      }
      .user-info {
        border: none;
      }
      .user-skills,
      .user-info {
        margin: 1rem;
      }
      .user-image {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .user-image img {
        width: 170px;
        height: 150px;
        border-radius: 35%;
      }
      .user-image ul li {
        list-style: none;
        margin-top: 0.5rem;
        color: ${theme.colors.primary};
      }
    }
    .user-projects {
      padding: 2rem;
    }
    .user-projects div {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: baseline;
      gap: 1rem;
      font-size: 1.4rem;
    }
    .user-projects .add-button {
      height: 30px;
    }
    .user-projects h2 {
      color: ${theme.colors.primary};
    }
    .user-projects ul {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 1rem;
      margin-top: 1rem;
    }
    .user-projects ul li {
      list-style: none;
      color: ${theme.colors.primary};
    }
    .user-projects ul li img {
      width: 100px;
      height: 100px;
    }
    .user-projects ul li a {
      color: ${theme.colors.primary};
    }
    .user-projects ul li a:hover {
      text-decoration: underline;
    }
    .user-btns {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding: 1rem;
    }
    .user-btns button {
      background: ${theme.colors.primary};
      color: ${theme.colors.background};
      border: none;
      border-radius: 5px;
      padding: 0.5rem;
      cursor: pointer;
      width: 100px;
    }
  `;

  return (
    <div css={style}>
      <div className="user-profile">
        <section className="user-info">
          <h3>{`${user?.fullName}'s profile`}</h3>
          <div className="user-image">
            <img
              src={
                user?.profileImage
                  ? `http://localhost:3001/${user.profileImage}`
                  : avatar
              }
              alt="user avatar"
            />

            <ul>
              <li>Name: {user?.fullName}</li>
              <li>Email: {user?.email}</li>
              <li>Job Title: {user?.jobTitle}</li>
            </ul>
          </div>
        </section>
        <section className="user-skills">
          <h4>Skills</h4>
          <button className="add-button">+ Add</button>
        </section>
      </div>
      <section className="user-projects">
        <div>
          <h2>Projects</h2>
          <button className="add-button">+ Add</button>
        </div>
        <ul>
          <li>Name</li>
          <li>Description</li>
          <li>Image</li>
          <li>Link</li>
        </ul>
      </section>
      <div className="user-btns">
        <button id="preview">Preview</button>
        <button id="create">Create</button>
      </div>
    </div>
  );
};

export default UserDashboard;
