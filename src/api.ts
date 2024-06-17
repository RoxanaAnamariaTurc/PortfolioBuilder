import axios from "axios";
import { Project } from "./frontend/components/UserDashboard/UserDashboard";

const API_BASE_URL = process.env.REACT_APP_API_URL;

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
  try {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      localStorage.setItem("portfolioToken", response.data.token);
    }
    return response.data;
  } catch (error) {
    localStorage.removeItem("portfolioToken");
    console.error("Error during login:", error);
    throw error; // Rethrow the error so the caller can handle it
  }
};

export const registerUser = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  localStorage.setItem("portfolioToken", response.data.token);
  return response;
};

export const createProject = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/projects`, formData);
  return response.data;
};

export const editProject = async (
  userId: string,
  projectId: string | undefined,
  formData: FormData
) => {
  const response = await axios.put(
    `${API_BASE_URL}/projects/${userId}/${projectId}`,
    formData
  );

  const updatedProject = response.data.find(
    (project: Project) => project._id === projectId
  );

  return updatedProject;
};

export const addSkills = async (
  portfolioToken: string,
  skills: { techSkills: string[]; softSkills: string[] }
) => {
  const response = await axios.post(
    `${API_BASE_URL}/user/${portfolioToken}/skills`,
    { skills }
  );
  return response.data;
};

export const editUserDetails = async (
  portfolioToken: string,
  formData: { fullName: string; email: string; jobTitle: string },
  userId: string
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${portfolioToken}`,
    },
  };

  const response = await axios.put(
    `${API_BASE_URL}/user/${userId}`,
    JSON.stringify(formData),
    config
  );

  return response.data;
};
