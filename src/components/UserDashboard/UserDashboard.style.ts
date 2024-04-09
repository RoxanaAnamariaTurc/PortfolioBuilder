import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const userDashboardStyle = (
  theme: MyTheme,
  isModalOpen: boolean,
  isSkillsModalOpen: boolean
) => css`
  height: 100%;
  width: 100vw;
  flex-grow: 1;
  filter: ${isModalOpen || isSkillsModalOpen ? "blur(15px)" : "none"};

  .user-profile {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 2rem;
    background-color: ${theme.colors.background};
    border-radius: 10px;
    box-shadow: inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,
      inset 4px 0 8px -4px #3d3c4c, inset 0 4px 8px -4px #3d3c4c;
    margin: 2em;
  }
  .user-profile h3 {
    color: ${theme.colors.primary};
  }
  .user-info {
    display: flex;
    flex-direction: column;
    box-shadow: inset -8px 0 8px -10px ${theme.colors.primary};
  }

  .user-info-table,
  .user-info-table th,
  .user-info-table td {
    border: none;
    border-collapse: collapse;
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
    font-family: ${theme.fonts.body};
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

  .table-container {
    overflow-y: auto;
    max-height: 500px;
    background-color: ${theme.colors.background};
    border-radius: 10px;
    box-shadow: inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,
      inset 4px 0 8px -4px #3d3c4c, inset 0 4px 8px -4px #3d3c4c;

    padding: 1em;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: transparent;
    font-size: medium;
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.body};
  }

  tbody {
    padding: 1em;
  }

  thead th {
    position: sticky;
    top: 0;
    background-color: ${theme.colors.background};
    color: ${theme.colors.primary};
    padding: 2em;
    z-index: 10;
  }

  tbody img {
    max-width: 100%;
    border-radius: 5px;
  }

  tbody a {
    color: ${theme.colors.primary};
  }

  .table-container::-webkit-scrollbar {
    width: 10px;
  }

  .table-container::-webkit-scrollbar-track {
    background: #3d3c4c;
    box-shadow: inset 0 0 5px grey;
  }

  .table-container::-webkit-scrollbar-thumb {
    background: #3d3c4c;
    border-radius: 5px;
  }

  .table-container::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
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

  .theme {
    width: 2em;
    height: 1em;
    border-radius: 2px;
    border: 2px solid ${theme.colors.primary};
  }
`;
