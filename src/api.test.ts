require("dotenv").config({ path: ".env.test" });
import axios from "axios";
import {
  fetchProjects,
  fetchSkills,
  deleteProject,
  loginUser,
  registerUser,
  createProject,
  editProject,
  updateSkills,
  editUserDetails,
  getCurrentUser,
  refreshSession,
  logoutUser,
  rotatePortfolioToken,
  fetchPublicProjects,
} from "./api";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const API_BASE_URL = process.env.REACT_APP_API_URL;

describe("API helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loginUser posts credentials with cookies", async () => {
    const mockData = { user: { id: "1" }, portfolioToken: "token" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockData });

    const result = await loginUser("test@email.com", "Password123!");

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/login`,
      { email: "test@email.com", password: "Password123!" },
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(mockData);
  });

  it("registerUser uploads form data", async () => {
    const mockForm = new FormData();
    const mockResponse = {
      data: { user: { id: "1" }, portfolioToken: "token" },
    };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    const result = await registerUser(mockForm);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/register`,
      mockForm,
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("fetchProjects requests authenticated projects", async () => {
    const projects = [{ id: "1", name: "Project" }];
    mockedAxios.get.mockResolvedValueOnce({ data: projects });

    const result = await fetchProjects();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${API_BASE_URL}/projects`,
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(projects);
  });

  it("fetchSkills requests authenticated skills", async () => {
    const skills = { techSkills: ["JS"], softSkills: [] };
    mockedAxios.get.mockResolvedValueOnce({ data: skills });

    const result = await fetchSkills();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${API_BASE_URL}/skills`,
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(skills);
  });

  it("deleteProject sends delete request", async () => {
    mockedAxios.delete.mockResolvedValueOnce({ status: 200 });

    await deleteProject("1");

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      `${API_BASE_URL}/projects/1`,
      expect.objectContaining({ withCredentials: true })
    );
  });

  it("createProject posts form data", async () => {
    const formData = new FormData();
    const mockProject = { id: "1", name: "Project" };
    mockedAxios.post.mockResolvedValueOnce({ data: mockProject });

    const result = await createProject(formData);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/projects`,
      formData,
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(mockProject);
  });

  it("editProject updates a project", async () => {
    const formData = new FormData();
    const mockProject = { id: "2", name: "Updated" };
    mockedAxios.put.mockResolvedValueOnce({ data: mockProject });

    const result = await editProject("2", formData);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${API_BASE_URL}/projects/2`,
      formData,
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(mockProject);
  });

  it("updateSkills sends skills payload", async () => {
    const skills = { techSkills: ["JS"], softSkills: ["Teamwork"] };
    mockedAxios.put.mockResolvedValueOnce({ data: skills });

    const result = await updateSkills(skills);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${API_BASE_URL}/skills`,
      { skills },
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(skills);
  });

  it("editUserDetails updates the user profile", async () => {
    const payload = { fullName: "Jane", email: "jane@test.com", jobTitle: "Dev" };
    const updated = { user: { id: "1", ...payload, profileImage: "" } };
    mockedAxios.put.mockResolvedValueOnce({ data: updated });

    const result = await editUserDetails(payload);

    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${API_BASE_URL}/user`,
      payload,
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(updated);
  });

  it("getCurrentUser returns the current session", async () => {
    const current = { user: { id: "1" }, portfolioToken: "token" };
    mockedAxios.get.mockResolvedValueOnce({ data: current });

    const result = await getCurrentUser();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${API_BASE_URL}/me`,
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(current);
  });

  it("refreshSession posts to refresh endpoint", async () => {
    const refreshed = { user: { id: "1" } };
    mockedAxios.post.mockResolvedValueOnce({ data: refreshed });

    const result = await refreshSession();

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/refresh`,
      {},
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(refreshed);
  });

  it("logoutUser posts to logout endpoint", async () => {
    const response = { message: "Logged out" };
    mockedAxios.post.mockResolvedValueOnce({ data: response });

    const result = await logoutUser();

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/logout`,
      {},
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(response);
  });

  it("rotatePortfolioToken posts to rotation endpoint", async () => {
    const payload = { portfolioToken: "new-token" };
    mockedAxios.post.mockResolvedValueOnce({ data: payload });

    const result = await rotatePortfolioToken();

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/portfolio/token/rotate`,
      {},
      expect.objectContaining({ withCredentials: true })
    );
    expect(result).toEqual(payload);
  });

  it("fetchPublicProjects retrieves public projects", async () => {
    const projects = [{ id: "1" }];
    mockedAxios.get.mockResolvedValueOnce({ data: projects });

    const result = await fetchPublicProjects("token");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `${API_BASE_URL}/projects/token`
    );
    expect(result).toEqual(projects);
  });
});
