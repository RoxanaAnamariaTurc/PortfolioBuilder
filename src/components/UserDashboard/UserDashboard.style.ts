import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const userDashboardStyle = (
  theme: MyTheme,
  isModalOpen: boolean,
  isSkillsModalOpen: boolean
) => css`
  height: 100vh;
  width: 100vw;
  filter: ${isModalOpen || isSkillsModalOpen ? "blur(15px)" : "none"};

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
    border-right: 1px solid ${theme.colors.hover};
  }

  .user-image {
    display: flex;
    flex-direction: row;
  }
  .user-image img {
    width: 170px;
    height: 150px;
    border-radius: 35%;
    object-fit: cover;
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
      object-fit: cover;
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
  table {
    width: 100%;
    overflow-y: scroll;
  }
  table th {
    color: ${theme.colors.primary};
    border-right: 2px solid ${theme.colors.hover};
    text-align: left;
    padding: 1em;
  }

  table th:last-child {
    border-right: none;
  }
  table td {
    color: ${theme.colors.primary};
    padding-left: 1em;
  }
  .blur {
    filter: blur(2px);
  }

  li {
    color: ${theme.colors.primary};
  }

  h5 {
    color: ${theme.colors.primary};
  }

  .skills {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }

  td img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10%;
  }
`;
