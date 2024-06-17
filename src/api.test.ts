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
  addSkills,
  editUserDetails,
} from "./api";
import { mock } from "node:test";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Testing the api functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should login a user successfully", async () => {
    const mockData = {
      token: "mockToken",
      user: { id: "1", name: "John Doe" },
    };

    mockedAxios.post.mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await loginUser("test@email.com", "password");
    expect(result).toEqual(mockData);
    expect(localStorage.getItem("portfolioToken")).toBe("mockToken");
  });
  it("should throw an error when login fails", async () => {
    const mockError = new Error("Login fail");

    mockedAxios.post.mockRejectedValueOnce(mockError);
    await expect(
      loginUser("test@email.com", "wrongpassword")
    ).rejects.toThrow();
    expect(localStorage.getItem("portfolioToken")).toBeNull();
  });

  it("fetches projects successfully", async () => {
    const data = { projects: [{ id: 1, name: "Project 1" }] };
    (axios.get as jest.Mock).mockResolvedValue({ data });

    const result = await fetchProjects("mockToken");
    expect(result).toEqual(data);
  });

  it("throws an error when the request fails", async () => {
    const error = new Error("Network error");
    (axios.get as jest.Mock).mockRejectedValue(error);

    await expect(fetchProjects("mockToken")).rejects.toThrow("Network error");
  });

  it("fetches skills successfully", async () => {
    const data = { skills: ["JavaScript", "React"] };
    mockedAxios.get.mockResolvedValue({ data });
    const result = await fetchSkills("mockToken");
    expect(result).toEqual(data);
  });
  it("throws an error when the request fails", async () => {
    const error = new Error("Network error");
    mockedAxios.get.mockRejectedValue(error);
    await expect(fetchSkills("mockToken")).rejects.toThrow("Network error");
  });
  it("deletes a project", async () => {
    mockedAxios.delete.mockResolvedValue({});
    await deleteProject("1", "1");
    expect(mockedAxios.delete).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/users/1/projects/1`
    );
  });
  it("register a user", async () => {
    const mockData = new FormData();
    mockData.append("name", "John Doe");
    mockData.append("email", "test@email.com");
    mockData.append("password", "password");
    mockData.append("profileImage", "imageUrl");
    const response = { data: { token: "mockToken" } };
    mockedAxios.post.mockResolvedValue(response);
    const result = await registerUser(mockData);
    expect(result).toEqual(response);
  });

  it("creates a project", async () => {
    const mockData = new FormData();
    mockData.append("name", "Project 1");
    mockData.append("description", "Description");
    mockData.append("projectImage", "imageUrl");
    const response = { data: { id: 1, name: "Project 1" } };
    mockedAxios.post.mockResolvedValue(response);
    const result = await createProject(mockData);
    expect(result).toEqual(response.data);
  });
  it("throws an error when the request fails", async () => {
    const error = new Error("Network error");
    mockedAxios.post.mockRejectedValue(error);
    await expect(createProject(new FormData())).rejects.toThrow(
      "Network error"
    );
  });
  it("edits a project", async () => {
    const mockData = new FormData();
    mockData.append("name", "Project 1");
    mockData.append("description", "Description");
    mockData.append("projectImage", "imageUrl");
    const response = { data: [{ _id: "1", name: "Project 1" }] };
    const userId = "1";
    const projectId = "1";
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    mockedAxios.put.mockResolvedValue(response);
    const result = await editProject(userId, projectId, mockData);
    expect(result).toEqual(
      response.data.find((project) => project._id === projectId)
    );
    expect(mockedAxios.put).toHaveBeenCalledWith(
      `${API_BASE_URL}/projects/${userId}/${projectId}`,
      mockData
    );

    // Check if axios.put was called only once
    expect(mockedAxios.put).toHaveBeenCalledTimes(1);
  });
  it("throws an error when the request fails", async () => {
    const error = new Error("Network error");
    mockedAxios.put.mockRejectedValue(error);
    await expect(editProject("1", "1", new FormData())).rejects.toThrow(
      "Network error"
    );
  });
  it("adds skills", async () => {
    const mockData = {
      techSkills: ["JavaScript", "React"],
      softSkills: ["Team Player"],
    };
    const response = { data: { techSkills: ["JavaScript", "React"] } };
    mockedAxios.post.mockResolvedValue(response);
    const result = await addSkills("1", mockData);
    expect(result).toEqual(response.data);
  });
  it("throws an error when the request fails", async () => {
    const error = new Error("Network error");
    mockedAxios.post.mockRejectedValue(error);
    await expect(
      addSkills("1", {
        techSkills: ["JavaScript", "React"],
        softSkills: ["Team Player"],
      })
    ).rejects.toThrow("Network error");
  });
  it("edits user details", async () => {
    const mockData = {
      fullName: "John Doe",
      email: "test@email.com",
      jobTitle: "Software engineer",
    };

    const response = {
      data: { fullName: "John Doe", email: "test@email.com" },
    };
    mockedAxios.put.mockResolvedValue(response);
    const result = await editUserDetails("1", mockData, "1");
    expect(result).toEqual(response.data);
  });
});
