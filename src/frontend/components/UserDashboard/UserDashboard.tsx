/** @jsxImportSource @emotion/react */
import { useTheme } from "../../../hooks/useTheme";
import { getUserdashboardStyles } from "./UserDashboard.style";
import avatar from "../../../images/avatar.png";
import { UserContext, UserContextProps } from "../../../UserContext";
import { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import AddProjectsModal from "../Modal/AddProjectsModal";
import AddSkillsModal from "../Modal/AddSkillsModal";
import Header from "../Header/Header";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../ThemeContext";
import { fetchProjects, fetchSkills, deleteProject } from "../../../api";

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
  const { toggleTheme, currentTheme } = useThemeContext();
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
  const styles = getUserdashboardStyles(theme, isModalOpen, isModalSkillOpen);

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
          const projectsData = await fetchProjects();
          setProjects(projectsData);

          // Fetch skills
          const skillsData = await fetchSkills();
          setSkills(skillsData);
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
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p._id === (project as Project)._id ? (project as Project) : p
        )
      );
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
        const updatedSkills = await fetchSkills();
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
        await deleteProject(userId, projectId);
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
      <div css={styles.userDashboard}>
        <div css={styles.userProfile}>
          <section css={styles.userInfo}>
            <h3 css={styles.h3}>{`${user?.fullName}'s profile`}</h3>
            <div css={styles.userImage}>
              <img
                css={styles.img}
                src={
                  user?.profileImage
                    ? `http://localhost:3001/${user.profileImage}`
                    : avatar
                }
                alt="user avatar"
              />
              <table css={styles.userInfoTable}>
                <tbody>
                  <tr>
                    <th css={styles.th}>Name</th>
                    <td>{user?.fullName}</td>
                  </tr>
                  <tr>
                    <th css={styles.th}>Email</th>
                    <td>{user?.email}</td>
                  </tr>
                  <tr>
                    <th css={styles.th}>Job Title</th>
                    <td>{user?.jobTitle}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section css={styles.userSkills}>
            <h4 css={styles.h4}>Skills</h4>
            <Button
              onClick={handleOpenSkillsModal}
              width={"xlarge"}
              height={"medium"}
              borderRadius={"xsmall"}
              padding={"xsmall"}
              backgroundColor={"transparent"}
              color={"primary"}
            >
              + Add skills
            </Button>
            <div css={styles.skills}>
              <div>
                <h5 css={styles.h5}>Technical Skills</h5>
                <ul css={styles.ul}>
                  {skills.techSkills.map((skill, index) => (
                    <li css={styles.li} key={index}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 css={styles.h5}>Soft Skills</h5>
                <ul css={styles.ul}>
                  {skills.softSkills.map((skill, index) => (
                    <li css={styles.li} key={index}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
        <section css={styles.userProjects}>
          <div css={styles.userProjectsDiv}>
            <h2 css={styles.h2}>Projects</h2>
            <Button
              onClick={() => handleOpenModal()}
              width={"xlarge"}
              height={"medium"}
              borderRadius={"xsmall"}
              padding={"xsmall"}
              backgroundColor={"transparent"}
              color={"primary"}
            >
              + Add new project
            </Button>
            <div css={styles.userBtns}>
              <Button
                onClick={toggleThemeState}
                width={"xlarge"}
                height={"medium"}
                borderRadius={"xsmall"}
                padding={"xsmall"}
                backgroundColor={"transparent"}
                color={"primary"}
              >
                Portfolio Theme
              </Button>
              <div
                css={styles.themeDiv}
                style={{
                  backgroundColor:
                    currentTheme === "light"
                      ? theme.lightTheme.colors.background
                      : theme.colors.portfolioBackground,
                }}
              ></div>
              <Button
                onClick={() => {
                  const userId = localStorage.getItem("userId");
                  userId && navigate(`/portfolio/${userId}`);
                }}
                width={"xlarge"}
                height={"medium"}
                borderRadius={"xsmall"}
                padding={"xsmall"}
                backgroundColor={"transparent"}
                color={"primary"}
              >
                Generate Portfolio
              </Button>
            </div>
          </div>
          <div css={styles.tableContainer}>
            <table css={styles.table}>
              <thead css={styles.thead}>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Link</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>

              <tbody>
                {projects &&
                  projects
                    .filter((project) => project)
                    .map((project) => (
                      <tr key={project._id}>
                        <td>{project.name}</td>
                        <td>
                          {showFullDescription[project._id ?? ""]
                            ? project.description
                            : `${project.description.slice(0, 50)}...`}
                          <a
                            css={styles.link}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleDescription(project._id ?? "");
                            }}
                            href="#"
                          >
                            {showFullDescription[project._id ?? ""]
                              ? "Read Less"
                              : "Read More"}
                          </a>
                        </td>
                        <td>
                          <img
                            css={styles.tableImg}
                            src={`http://localhost:3001/${project.image}`}
                            alt={project.name}
                          />
                        </td>
                        <td>
                          <a css={styles.a} href={project.link}>
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
                            onClick={() =>
                              handleDeleteProject(project._id ?? "")
                            }
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