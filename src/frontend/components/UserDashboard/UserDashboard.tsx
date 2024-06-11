/** @jsxImportSource @emotion/react */
import { useTheme } from "../../../hooks/useTheme";
import { getUserdashboardStyles } from "./UserDashboard.style";
import avatar from "../../../images/avatar.png";
import projectImage from "../../../images/projectImage.jpg";
import { UserContext, UserContextProps } from "../../../UserContext";
import { useCallback, useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import AddProjectsModal from "../Modal/AddProjectsModal";
import AddSkillsModal from "../Modal/AddSkillsModal";
import Header from "../Header/Header";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../ThemeContext";
import { fetchProjects, fetchSkills } from "../../../api";
import DeleteModal from "../Modal/DeleteModal";
import axios from "axios";
import LoadingBars from "../LoadingBars/LoadingBars";
import EditUserDetails from "../Modal/EditUserDetails";

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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const theme = useTheme();
  const styles = getUserdashboardStyles(theme, isModalOpen, isModalSkillOpen);

  const { user, setUser } = useContext(UserContext) as UserContextProps;

  const techSkillsOption = skills.techSkills.map((skill) => ({
    value: skill,
    label: skill,
  }));

  const softSkillsOption = skills.softSkills.map((skill) => ({
    value: skill,
    label: skill,
  }));
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const fetchUserData = useCallback(
    async (token: string) => {
      try {
        const userResponse = await axios.get(`${API_BASE_URL}/user/${token}`);
        setUser(userResponse.data.user);

        // Fetch projects
        setIsLoading(true);
        const projectsData = await fetchProjects(token);
        setProjects(projectsData);
        setIsLoading(false);

        // Fetch skills
        setIsLoading(true);
        const skillsData = await fetchSkills(token);
        setSkills(skillsData);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "An error occurred while trying to fetch the user data",
          error
        );
      }
    },
    [API_BASE_URL, setUser]
  );

  useEffect(() => {
    const token = localStorage.getItem("portfolioToken");
    if (token) {
      fetchUserData(token);
    }
  }, [fetchUserData]);

  const handleOpenDeleteModal = (projectId: string) => {
    setProjectIdToDelete(projectId);
    console.log(projectId);
    setIsDeleteModalOpen(true);
  };

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
  const handleCloseEditModal = () => {
    setIsEditUserModalOpen(false);
  };
  const handleEditUserModal = () => {
    setIsEditUserModalOpen(true);
  };
  const handleOpenSkillsModal = () => {
    setIsModalSkillOpen(true);
  };
  const handleCloseSkillsModal = () => {
    setIsModalSkillOpen(false);
  };
  const handleProjectSubmission = (
    newProject: {
      id: string;
      name: string;
      description: string;
      image: string;
      link: string;
    },
    isEdit: boolean
  ) => {
    if (isEdit) {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === newProject.id
            ? { ...project, ...newProject }
            : project
        )
      );
    } else {
      setProjects((prevProjects) => [
        ...prevProjects,
        {
          _id: newProject.id,
          name: newProject.name,
          description: newProject.description,
          image: newProject.image,
          link: newProject.link,
        },
      ]);
    }
  };
  useEffect(() => {
    setIsModalOpen(false);
  }, [projects]);

  const handleAddSkills = async (newSkills: Skills) => {
    setSkills((prevSkills) => ({
      techSkills: Array.from(
        new Set([...prevSkills.techSkills, ...newSkills.techSkills])
      ),
      softSkills: Array.from(
        new Set([...prevSkills.softSkills, ...newSkills.softSkills])
      ),
    }));

    const portfolioToken = localStorage.getItem("portfolioToken");
    if (portfolioToken) {
      try {
        const updatedSkills = await fetchSkills(portfolioToken);
        setSkills(updatedSkills);
      } catch (error) {
        console.error(
          "An error occurred while trying to get updated skills",
          error
        );
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setProjectIdToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <Header isBlurred={isModalOpen || isModalSkillOpen} />
      <div css={styles.userDashboard}>
        <div css={styles.userProfile}>
          <section css={styles.userInfo}>
            <h3 css={styles.h3}>{`${user?.fullName}'s profile`}</h3>
            <div css={styles.userImage}>
              <img
                css={styles.img}
                src={
                  user?.profileImage
                    ? `${API_BASE_URL}/${user.profileImage}`
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
              <Button
                onClick={handleEditUserModal}
                width={"large"}
                height={"medium"}
                borderRadius={"xsmall"}
                padding={"xsmall"}
                backgroundColor={"transparent"}
                color={"primary"}
              >
                Edit
              </Button>
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
            {isLoading ? (
              <LoadingBars type="circle" />
            ) : (
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
            )}
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
              fontSize="small"
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
                onClick={() =>
                  navigate(
                    `/portfolio/${localStorage.getItem("portfolioToken")}`
                  )
                }
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
          {isLoading ? (
            <LoadingBars type="circle" />
          ) : (
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
                              : `${project.description.slice(0, 50)}${project.description.length > 50 ? "..." : ""}`}
                            {project.description.length > 50 && (
                              <Button
                                width={"large"}
                                height={"xsmall"}
                                borderRadius={"xsmall"}
                                padding={"small"}
                                backgroundColor={"transparent"}
                                color={"primary"}
                                fontSize="xsmall"
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleDescription(project._id ?? "");
                                }}
                              >
                                {showFullDescription[project._id ?? ""]
                                  ? "Read Less"
                                  : "Read More"}
                              </Button>
                            )}
                          </td>
                          <td>
                            <img
                              css={styles.tableImg}
                              src={
                                project?.image
                                  ? `${API_BASE_URL}/${project.image}`
                                  : projectImage
                              }
                              alt="project"
                            />
                          </td>
                          <td css={styles.td}>
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
                                handleOpenDeleteModal(project._id ?? "")
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
          )}
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
      {isDeleteModalOpen && (
        <DeleteModal
          projectId={projectIdToDelete}
          closeModal={handleCloseDeleteModal}
          projects={projects}
          setProjects={setProjects}
        />
      )}
      {isEditUserModalOpen && (
        <EditUserDetails
          closeModal={handleCloseEditModal}
          // user={user}
          // setUser={setUser}
        />
      )}
    </div>
  );
};

export default UserDashboard;
