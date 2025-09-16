require("dotenv").config({ path: ".env.test" });
import axios from "axios";
import {
  fetchProjects,
  fetchSkills,
  fetchPortfolio,
  loginUser,
  registerUser,
  editUserDetails,
} from "./api";

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
    const data = [{ id: 1, name: "Project 1" }];
    (axios.get as jest.Mock).mockResolvedValue({ data });

    const result = await fetchProjects("mockToken");
    expect(result).toEqual(data);
  });

  it("throws an error when fetching projects fails", async () => {
    const error = new Error("Network error");
    (axios.get as jest.Mock).mockRejectedValue(error);

    await expect(fetchProjects("mockToken")).rejects.toThrow("Network error");
  });

  it("fetches skills successfully", async () => {
    const data = { techSkills: ["JavaScript"], softSkills: ["React"] };
    mockedAxios.get.mockResolvedValue({ data });
    const result = await fetchSkills("mockToken");
    expect(result).toEqual(data);
  });

  it("throws an error when fetching skills fails", async () => {
    const error = new Error("Network error");
    mockedAxios.get.mockRejectedValue(error);
    await expect(fetchSkills("mockToken")).rejects.toThrow("Network error");
  });

  it("fetches portfolio successfully", async () => {
    const data = {
      user: {
        fullName: "Jane Doe",
        email: "jane@email.com",
        jobTitle: "Engineer",
        profileImage: "image.jpg",
        projects: [],
        skills: { techSkills: [], softSkills: [] },
      },
    };
    mockedAxios.get.mockResolvedValue({ data });
    const result = await fetchPortfolio("mockToken");
    expect(result).toEqual(data);
  });

  it("throws an error when fetching portfolio fails", async () => {
    const error = new Error("Network error");
    mockedAxios.get.mockRejectedValue(error);
    await expect(fetchPortfolio("mockToken")).rejects.toThrow("Network error");
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
