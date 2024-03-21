/** @jsxImportSource @emotion/react */
import { useTheme } from "../../custom hooks/useTheme";
import { userDashboardStyle } from "./UserDashboard.style";
import avatar from "../../images/avatar.png";
import { UserContext, UserContextProps } from "../../UserContext";
import { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import AddProjectsModal from "../ProjectModal/AddProjectsModal";
import AddSkillsModal from "../SkillsModal/AddSkillsModal";
import axios from "axios";
import Logout from "../Logout/Logout";

export interface Project {
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface Skills {
  techSkills: string[];
  softSkills: string[];
}

const UserDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalSkillOpen, setIsModalSkillOpen] = useState(false);
  const [skills, setSkills] = useState<Skills>({
    techSkills: [],
    softSkills: [],
  });

  const { user } = useContext(UserContext) as UserContextProps;
  const theme = useTheme();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:3001/projects/${userId}`)
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => {
          console.error(
            "An error occurred while trying to fetch the projects",
            error
          );
        });
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProjects = async (project: Project) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:3001/projects/${userId}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error(
          "An error occurred while trying to fetch the projects",
          error
        );
      }
    }
  };

  const handleOpenSkillsModal = () => {
    setIsModalSkillOpen(true);
  };
  const handleCloseSkillsModal = () => {
    setIsModalSkillOpen(false);
  };

  const handleAddSkills = (skills: Skills) => {
    setSkills(skills);
  };

  return (
    <div>
      <div css={userDashboardStyle(theme, isModalOpen, isModalSkillOpen)}>
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
            <button className="add-button" onClick={handleOpenSkillsModal}>
              + Add
            </button>
            <div className="skills">
              <div>
                <h5>Technical Skills</h5>
                <ul>
                  {skills.techSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5>Soft Skills</h5>
                <ul>
                  {skills.softSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
        <section className="user-projects">
          <div>
            <h2>Projects</h2>
            <button className="add-button" onClick={handleOpenModal}>
              + Add
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.image}</td>
                  <td>{project.link}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="user-btns">
          <button id="preview">Preview</button>
          <button id="create">Create</button>
        </div>
        <Logout />
        <Footer />
      </div>
      {isModalOpen && (
        <div>
          <AddProjectsModal
            closeModal={handleCloseModal}
            onAddProject={handleAddProjects}
          />
        </div>
      )}
      {isModalSkillOpen && (
        <AddSkillsModal
          closeModal={handleCloseSkillsModal}
          onAddSkills={handleAddSkills}
        />
      )}
    </div>
  );
};

export default UserDashboard;
