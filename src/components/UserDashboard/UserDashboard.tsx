/** @jsxImportSource @emotion/react */
import { useTheme } from "../../hooks/useTheme";
import { userDashboardStyle } from "./UserDashboard.style";
import avatar from "../../images/avatar.png";
import { UserContext, UserContextProps } from "../../UserContext";
import { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import AddProjectsModal from "../ProjectModal/AddProjectsModal";
import AddSkillsModal from "../SkillsModal/AddSkillsModal";
import axios from "axios";
import Header from "../Header/Header";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

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

  const { user } = useContext(UserContext) as UserContextProps;
  const theme = useTheme();
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
              <table className="user-info-table">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{user?.fullName}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{user?.email}</td>
                  </tr>
                  <tr>
                    <th>Job Title</th>
                    <td>{user?.jobTitle}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className="user-skills">
            <h4>Skills</h4>
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
          </div>
          <div className="table-container">
            <table>
              <thead>
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
                        >
                          {showFullDescription[project._id ?? ""]
                            ? "Read Less"
                            : "Read More"}
                        </Button>
                      </td>
                      <td>
                        <img
                          src={`http://localhost:3001/${project.image}`}
                          alt={project.name}
                        />
                      </td>
                      <td>
                        <a href={project.link}>{project.link}</a>
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
        <div className="user-btns">
          <Button
            onClick={handleOpenModal}
            width={"large"}
            height={"medium"}
            borderRadius={"xsmall"}
            padding={"xsmall"}
            backgroundColor={"transparent"}
            color={"primary"}
          >
            Preview
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
