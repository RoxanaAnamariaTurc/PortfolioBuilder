import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const withCredentialsConfig = { withCredentials: true };

export const fetchProjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects`, withCredentialsConfig);
  return response.data;
};

export const fetchSkills = async () => {
  const response = await axios.get(`${API_BASE_URL}/skills`, withCredentialsConfig);
  return response.data;
};

export const deleteProject = async (projectId: string) => {
  await axios.delete(`${API_BASE_URL}/projects/${projectId}`, withCredentialsConfig);
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/login`,
    { email, password },
    {
      ...withCredentialsConfig,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const registerUser = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, formData, {
    ...withCredentialsConfig,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const createProject = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/projects`, formData, {
    ...withCredentialsConfig,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const editProject = async (
  projectId: string | undefined,
  formData: FormData
) => {
  const response = await axios.put(
    `${API_BASE_URL}/projects/${projectId}`,
    formData,
    {
      ...withCredentialsConfig,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const updateSkills = async (skills: {
  techSkills: string[];
  softSkills: string[];
}) => {
  const response = await axios.put(
    `${API_BASE_URL}/skills`,
    { skills },
    {
      ...withCredentialsConfig,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const editUserDetails = async (
  formData: { fullName: string; email: string; jobTitle: string }
) => {
  const response = await axios.put(`${API_BASE_URL}/user`, formData, {
    ...withCredentialsConfig,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/me`, withCredentialsConfig);
  return response.data;
};

export const refreshSession = async () => {
  const response = await axios.post(
    `${API_BASE_URL}/refresh`,
    {},
    {
      ...withCredentialsConfig,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(
    `${API_BASE_URL}/logout`,
    {},
    {
      ...withCredentialsConfig,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const rotatePortfolioToken = async () => {
  const response = await axios.post(
    `${API_BASE_URL}/portfolio/token/rotate`,
    {},
    {
      ...withCredentialsConfig,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const fetchPublicProjects = async (portfolioToken: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/projects/${portfolioToken}`
  );
  return response.data;
};
