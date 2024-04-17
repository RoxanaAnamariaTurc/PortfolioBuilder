/** @jsxImportSource @emotion/react */
import { useTheme } from "../../hooks/useTheme";
import { getUserdashboardStyles } from "./UserDashboard.style";
import avatar from "../../images/avatar.png";
import { UserContext, UserContextProps } from "../../UserContext";
import { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import AddProjectsModal from "../Modal/AddProjectsModal";
import AddSkillsModal from "../Modal/AddSkillsModal";
import axios from "axios";
import Header from "../Header/Header";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import {
  getPortfolioStylesDark,
  getPortfolioStylesLight,
} from "../Portfolio/Portfolio.styles";
import { useThemeContext } from "../ThemeContext";

export interface Project {
  _id?: string;
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
  const { toggleTheme } = useThemeContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalSkillOpen, setIsModalSkillOpen] = useState(false);
  const [skills, setSkills] = useState<Skills>({
    techSkills: [],
    softSkills: [],
  });
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [showFullDescription, setShowFullDescription] = useState<{
    [key: string]: boolean;
  }>({});
  const theme = useTheme();
  const style = getUserdashboardStyles(theme, isModalOpen, isModalSkillOpen);
  const [themeName, setThemeName] = useState("#F0E2F0");

  const { user } = useContext(UserContext) as UserContextProps;

  const techSkillsOption = skills.techSkills.map((skill) => ({
    value: skill,
    label: skill,
  }));

  const softSkillsOption = skills.softSkills.map((skill) => ({
    value: skill,
    label: skill,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          // Fetch projects
          const projectsResponse = await axios.get(
            `http://localhost:3001/projects/${userId}`
          );
          setProjects(projectsResponse.data);

          // Fetch skills
          const skillsResponse = await axios.get(
            `http://localhost:3001/user/${userId}/skills`
          );
          setSkills(skillsResponse.data);
        } catch (error) {
          console.error(
            "An error occurred while trying to fetch the user data",
            error
          );
        }
      }
    };

    fetchUserData();
  }, []);

  const toggleDescription = (projectId: string) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

  const toggleThemeState = () => {
    toggleTheme();
    setThemeName((prevThemeName) =>
      prevThemeName === "#F0E2F0" ? "#2d2c3c" : "#F0E2F0"
    );
  };

  const handleOpenModal = (project?: Project) => {
    setProjectToEdit(project || null);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenSkillsModal = () => {
    setIsModalSkillOpen(true);
  };
  const handleCloseSkillsModal = () => {
    setIsModalSkillOpen(false);
  };
  const handleProjectSubmission = (
    project: Project | Project[],
    isEdit: boolean
  ) => {
    if (isEdit) {
      setProjects(project as Project[]);
    } else {
      setProjects((prevProjects) => [...prevProjects, project as Project]);
    }
    setIsModalOpen(false);
  };

  const handleAddSkills = async (newSkills: Skills) => {
    setSkills((prevSkills) => ({
      techSkills: Array.from(
        new Set([...prevSkills.techSkills, ...newSkills.techSkills])
      ),
      softSkills: Array.from(
        new Set([...prevSkills.softSkills, ...newSkills.softSkills])
      ),
    }));

    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/${userId}/skills`
        );
        const updatedSkills = response.data;

        setSkills(updatedSkills);
      } catch (error) {
        console.error(
          "An error occurred while trying to get updated skills",
          error
        );
      }
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      console.log(`Deleting project with ID: ${projectId}`);
      try {
        await axios.delete(
          `http://localhost:3001/users/${userId}/projects/${projectId}`
        );
        setProjects(projects.filter((project) => project._id !== projectId));
      } catch (error) {
        console.error(
          "An error occurred while trying to delete the project",
          error
        );
      }
    }
  };

  return (
    <div>
      <Header />
      <div css={style.userDashboard}>
        <div css={style.userProfile}>
          <section css={style.userInfo}>
            <h3 css={style.h3}>{`${user?.fullName}'s profile`}</h3>
            <div css={style.userImage}>
              <img
                css={style.img}
                src={
                  user?.profileImage
                    ? `http://localhost:3001/${user.profileImage}`
                    : avatar
                }
                alt="user avatar"
              />
              <table css={style.userInfoTable}>
                <tbody>
                  <tr>
                    <th css={style.th}>Name</th>
                    <td>{user?.fullName}</td>
                  </tr>
                  <tr>
                    <th css={style.th}>Email</th>
                    <td>{user?.email}</td>
                  </tr>
                  <tr>
                    <th css={style.th}>Job Title</th>
                    <td>{user?.jobTitle}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section css={style.userSkills}>
            <h4 css={style.h4}>Skills</h4>
            <Button
              onClick={handleOpenSkillsModal}
              width={"large"}
              height={"medium"}
              borderRadius={"xsmall"}
              padding={"xsmall"}
              backgroundColor={"transparent"}
              color={"primary"}
            >
              + Add
            </Button>
            <div css={style.skills}>
              <div>
                <h5 css={style.h5}>Technical Skills</h5>
                <ul css={style.ul}>
                  {skills.techSkills.map((skill, index) => (
                    <li css={style.li} key={index}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 css={style.h5}>Soft Skills</h5>
                <ul css={style.ul}>
                  {skills.softSkills.map((skill, index) => (
                    <li css={style.li} key={index}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
        <section css={style.userProjects}>
          <div css={style.userProjectsDiv}>
            <h2 css={style.h2}>Projects</h2>
            <Button
              onClick={() => handleOpenModal()}
              width={"large"}
              height={"medium"}
              borderRadius={"xsmall"}
              padding={"xsmall"}
              backgroundColor={"transparent"}
              color={"primary"}
            >
              + Add
            </Button>
            <div css={style.userBtns}>
              <Button
                onClick={toggleThemeState}
                width={"xlarge"}
                height={"medium"}
                borderRadius={"xsmall"}
                padding={"xsmall"}
                backgroundColor={"transparent"}
                color={"primary"}
              >
                Toggle Theme
              </Button>
              <Button
                onClick={() => {
                  const userId = localStorage.getItem("userId");
                  userId && navigate(`/portfolio/${userId}`);
                }}
                width={"large"}
                height={"medium"}
                borderRadius={"xsmall"}
                padding={"xsmall"}
                backgroundColor={"transparent"}
                color={"primary"}
              >
                Create
              </Button>
            </div>
            <div
              css={style.themeDiv}
              style={{ backgroundColor: themeName }}
            ></div>
          </div>
          <div css={style.tableContainer}>
            <table css={style.table}>
              <thead css={style.thead}>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Link</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>

              <tbody>
                {projects
                  .filter((project) => project !== undefined)
                  .map((project) => (
                    <tr key={project._id}>
                      <td>{project.name}</td>
                      <td>
                        {showFullDescription[project._id ?? ""]
                          ? project.description
                          : `${project.description.slice(0, 50)}...`}
                        <Button
                          onClick={() => toggleDescription(project._id ?? "")}
                          width={"large"}
                          height={"medium"}
                          padding={"xsmall"}
                          borderRadius={"xsmall"}
                          backgroundColor={"transparent"}
                          color={"primary"}
                          fontSize={"small"}
                        >
                          {showFullDescription[project._id ?? ""]
                            ? "Read Less"
                            : "Read More"}
                        </Button>
                      </td>
                      <td>
                        <img
                          css={style.tableImg}
                          src={`http://localhost:3001/${project.image}`}
                          alt={project.name}
                        />
                      </td>
                      <td>
                        <a css={style.a} href={project.link}>
                          {project.link}
                        </a>
                      </td>
                      <td>
                        <Button
                          onClick={() => handleOpenModal(project)}
                          width={"large"}
                          height={"medium"}
                          borderRadius={"xsmall"}
                          padding={"xsmall"}
                          backgroundColor={"transparent"}
                          color={"primary"}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteProject(project._id ?? "")}
                          width={"large"}
                          height={"medium"}
                          borderRadius={"xsmall"}
                          padding={"xsmall"}
                          backgroundColor={"transparent"}
                          color={"danger"}
                        >
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        <Footer />
      </div>
      {isModalOpen && (
        <div>
          <AddProjectsModal
            closeModal={handleCloseModal}
            onProjectSubmission={handleProjectSubmission}
            projectToEdit={projectToEdit || undefined}
          />
        </div>
      )}
      {isModalSkillOpen && (
        <AddSkillsModal
          closeModal={handleCloseSkillsModal}
          onAddSkills={handleAddSkills}
          currentSoftSkills={softSkillsOption}
          currentTechSkills={techSkillsOption}
        />
      )}
    </div>
  );
};

export default UserDashboard;
