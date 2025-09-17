/** @jsxImportSource @emotion/react */
import { useContext, useMemo, useRef, useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { getUserdashboardStyles } from "./UserDashboard.style";
import avatar from "../../../images/avatar.png";
import projectImage from "../../../images/projectImage.jpg";
import { UserContext, UserContextProps } from "../../../UserContext";
import Footer from "../Footer/Footer";
import AddProjectsModal from "../Modal/AddProjectsModal";
import AddSkillsModal from "../Modal/AddSkillsModal";
import Header from "../Header/Header";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../ThemeContext";
import {
  useProjectsQuery,
  useSkillsQuery,
  useDeleteProjectMutation,
} from "../../../api";
import DeleteModal from "../Modal/DeleteModal";
import LoadingBars from "../LoadingBars/LoadingBars";
import EditUserDetails from "../Modal/EditUserDetails";
import Modal from "../Modal/Modal";
import { Project, Skills } from "../../../types";

const UserDashboard: React.FC = () => {
  const { toggleTheme, currentTheme } = useThemeContext();
  const [modalType, setModalType] = useState<string | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [showFullDescription, setShowFullDescription] = useState<
    Record<string, boolean>
  >({});
  const [projectIdToDelete, setProjectIdToDelete] = useState<string | null>(
    null
  );
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const theme = useTheme();
  const openButtonRef = useRef<HTMLButtonElement | null>(null);

  const { user } = useContext(UserContext) as UserContextProps;

  const navigate = useNavigate();


  const portfolioToken =
    typeof window !== "undefined"
      ? localStorage.getItem("portfolioToken")
      : null;

  const projectsQuery = useProjectsQuery(portfolioToken);
  const skillsQuery = useSkillsQuery(portfolioToken);
  const deleteProjectMutation = useDeleteProjectMutation(portfolioToken);

  const skills = skillsQuery.data ?? { techSkills: [], softSkills: [] };
  const projects = projectsQuery.data ?? [];

  const techSkillsOption = useMemo(
    () =>
      skills.techSkills.map((skill) => ({
        value: skill,
        label: skill,
      })),
    [skills.techSkills]
  );

  const softSkillsOption = useMemo(
    () =>
      skills.softSkills.map((skill) => ({
        value: skill,
        label: skill,
      })),
    [skills.softSkills]
  );

  const styles = getUserdashboardStyles(
    theme,
    Boolean(modalType),
    isEditUserModalOpen
  );

  const handleOpenModal = (
    type: string,
    project?: Project,
    projectId?: string
  ) => {
    setModalType(type);
    if (project) {
      setProjectToEdit(project);
    } else {
      setProjectToEdit(null);
    }
    if (projectId) {
      setProjectIdToDelete(projectId);
    } else {
      setProjectIdToDelete(null);
    }
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

  const handleCloseModal = () => {
    setModalType(null);
    setProjectToEdit(null);
    setProjectIdToDelete(null);
    if (openButtonRef.current) {
      openButtonRef.current.focus();
    }
  };

  const handleCloseEditModal = () => {
    setIsEditUserModalOpen(false);
  };

  const handleEditUserModal = () => {
    setIsEditUserModalOpen(true);
  };

  const handleDeleteProject = () => {
    const userId =
      user?.id ?? user?._id ?? localStorage.getItem("userId");
    if (!userId || !projectIdToDelete) {
      alert("Please login to delete a project");
      return;
    }

    deleteProjectMutation.mutate(
      { userId, projectId: projectIdToDelete },
      {
        onSuccess: () => {
          handleCloseModal();
        },
        onError: (error) => {
          console.error(
            "An error occurred while trying to delete the project",
            error
          );
        },
      }
    );
  };

  const navigateToPortfolio = () => {
    if (portfolioToken) {
      navigate(`/portfolio/${portfolioToken}`);
    }
  };

  return (
    <div>
      <Header isBlurred={Boolean(modalType) || isEditUserModalOpen} />
      <div css={styles.userDashboard}>
        <div css={styles.userProfile}>
          <section
            css={styles.userInfo}
            aria-label="user-information-section"
            tabIndex={0}
            aria-live="polite"
          >
            <h3 css={styles.h3}>{`${user?.fullName}'s profile`}</h3>
            <div css={styles.userImage}>
              <img
                css={styles.img}
                src={
                  user?.profileImage
                    ? `${process.env.REACT_APP_API_URL}/${user.profileImage}`
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

          <section
            css={styles.userSkills}
            tabIndex={0}
            aria-live="polite"
            aria-label="user-skills-section"
          >
            <h4 css={styles.h4}>Skills</h4>
            <Button
              onClick={() => handleOpenModal("addSkills")}
              width={"xlarge"}
              height={"medium"}
              borderRadius={"xsmall"}
              padding={"xsmall"}
              backgroundColor={"transparent"}
              color={"primary"}
            >
              + Add skills
            </Button>
            {skillsQuery.isFetching ? (
              <LoadingBars type="circle" />
            ) : (
              <div css={styles.skills} aria-label="users-skills-section">
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
        <section
          css={styles.userProjects}
          aria-label="user-projects-section"
          tabIndex={0}
          aria-live="polite"
        >
          <div css={styles.userProjectsDiv}>
            <h2 css={styles.h2}>Projects</h2>
            <Button
              onClick={() => handleOpenModal("addProject")}
              width={"xlarge"}
              height={"medium"}
              borderRadius={"xsmall"}
              padding={"xsmall"}
              backgroundColor={"transparent"}
              color={"primary"}
              fontSize="small"
              ref={openButtonRef}
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
                onClick={navigateToPortfolio}
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
          {projectsQuery.isFetching ? (
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
                        <tr key={project._id ?? project.name}>
                          <td>{project.name}</td>
                          <td>
                            {showFullDescription[project._id ?? ""]
                              ? project.description
                              : `${project.description.slice(0, 50)}${
                                  project.description.length > 50 ? "..." : ""
                                }`}
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
                                  ? `${process.env.REACT_APP_API_URL}/${project.image}`
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
                          <td css={styles.tdButtons}>
                            <Button
                              onClick={() =>
                                handleOpenModal("addProject", project)
                              }
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
                                handleOpenModal(
                                  "deleteProject",
                                  undefined,
                                  project._id
                                )
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
      {modalType && (
        <Modal isOpen={true} closeModal={handleCloseModal}>
          {modalType === "addProject" && (
            <AddProjectsModal
              closeModal={handleCloseModal}
              projectToEdit={projectToEdit}
              isOpen={true}
              userId={
                user?.id ?? user?._id ?? localStorage.getItem("userId") ?? ""
              }
              portfolioToken={portfolioToken}
            />
          )}
          {modalType === "addSkills" && (
            <AddSkillsModal
              closeModal={handleCloseModal}
              currentSoftSkills={softSkillsOption}
              currentTechSkills={techSkillsOption}
              portfolioToken={portfolioToken}
            />
          )}
          {modalType === "deleteProject" && (
            <DeleteModal
              closeModal={handleCloseModal}
              isLoading={deleteProjectMutation.isPending}
              onDelete={handleDeleteProject}
            />
          )}
        </Modal>
      )}
      {isEditUserModalOpen && (
        <EditUserDetails closeModal={handleCloseEditModal} />
      )}
    </div>
  );
};

export default UserDashboard;
