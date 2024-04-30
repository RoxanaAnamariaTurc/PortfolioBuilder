import axios from "axios";
import { Project } from "./frontend/components/UserDashboard/UserDashboard";

const userId = localStorage.getItem("userId");

export const fetchProjects = async (userId: string) => {
  const projectsResponse = await axios.get(
    `http://localhost:3001/projects/${userId}`
  );
  return projectsResponse.data;
};

export const fetchSkills = async (userId: string) => {
  const skillsResponse = await axios.get(
    `http://localhost:3001/user/${userId}/skills`
  );
  return skillsResponse.data;
};

export const deleteProject = async (userId: string, projectId: string) => {
  await axios.delete(
    `http://localhost:3001/users/${userId}/projects/${projectId}`
  );
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:3001/login", {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (formData: FormData) => {
  const response = await axios.post(
    "http://localhost:3001/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const createProject = async (formData: FormData) => {
  const response = await axios.post("http://localhost:3001/projects", formData);
  console.log(response.data);
  return response.data;
};

export const editProject = async (
  userId: string,
  projectId: string | undefined,
  formData: FormData
) => {
  console.log(userId, projectId, formData);
  const response = await axios.put(
    `http://localhost:3001/projects/${userId}/${projectId}`,
    formData
  );
  console.log(response.data);

  const updatedProject = response.data.find(
    (project: Project) => project._id === projectId
  );
  return updatedProject;
};

export const addSkills = async (
  userId: string,
  skills: { techSkills: string[]; softSkills: string[] }
) => {
  await axios.post(`http://localhost:3001/user/${userId}/skills`, { skills });
};
