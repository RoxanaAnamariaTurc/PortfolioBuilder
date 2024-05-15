import axios from "axios";
import { Project } from "./frontend/components/UserDashboard/UserDashboard";

const API_BASE_URL = process.env.REACT_APP_API_URL;
console.log("API Base URL:", API_BASE_URL);

export const fetchProjects = async (portfolioToken: string) => {
  const projectsResponse = await axios.get(
    `${API_BASE_URL}/projects/${portfolioToken}`
  );
  return projectsResponse.data;
};

export const fetchSkills = async (portfolioToken: string) => {
  const skillsResponse = await axios.get(
    `${API_BASE_URL}/user/${portfolioToken}/skills`
  );
  return skillsResponse.data;
};

export const deleteProject = async (userId: string, projectId: string) => {
  await axios.delete(`${API_BASE_URL}/users/${userId}/projects/${projectId}`);
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

export const createProject = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/projects`, formData);
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
    `${API_BASE_URL}/projects/${userId}/${projectId}`,
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
  await axios.post(`${API_BASE_URL}/user/${userId}/skills`, { skills });
};
