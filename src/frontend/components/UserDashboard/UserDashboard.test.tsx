import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { User, UserContext, UserContextProps } from "../../../UserContext";
import UserDashboard from "./UserDashboard";
import { fetchProjects, fetchSkills } from "../../../api";
import { ThemeProvider } from "@emotion/react";
import { MyTheme, theme } from "../../../theme";
import { ThemeContext } from "@emotion/react";
import axios from "axios";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));
jest.mock("../../../api", () => ({
  fetchProjects: jest.fn(),
  fetchSkills: jest.fn(),
}));

const mockSetUser = jest.fn((user: User | null) => {}) as React.Dispatch<
  React.SetStateAction<User | null>
>;
const mockProjects = [
  {
    _id: "1",
    name: "Project 1",
    description: "Description 1",
    image: "image1.jpg",
    link: "https://example.com/project1",
  },
  {
    _id: "2",
    name: "Project 2",
    description: "Description 2",
    image: "image2.jpg",
    link: "https://example.com/project2",
  },
];

const mockSkills = {
  techSkills: ["HTML", "CSS", "JavaScript"],
  softSkills: ["Communication", "Problem Solving"],
};

const mockUser = {
  _id: "1",
  fullName: "John Doe",
  email: "john.doe@example.com",
  jobTitle: "Software Engineer",
  profileImage: "avatar.png",
  password: "password",
  portfolioToken: "mockToken",
};

const mockUserContextValue: UserContextProps = {
  user: mockUser,
  setUser: mockSetUser,
};

const mockContext = {
  toggleTheme: jest.fn(),
  currentTheme: "light",
};

describe("UserDashboard", () => {
  beforeEach(() => {
    process.env.REACT_APP_API_URL = "http://localhost:3001";
    localStorage.setItem("portfolioToken", mockUser.portfolioToken);
    (fetchProjects as jest.Mock).mockResolvedValue(mockProjects);
    (fetchSkills as jest.Mock).mockResolvedValue(mockSkills);
    (axios.get as jest.Mock).mockResolvedValue({
      data: { user: mockUser },
    });
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it("renders user profile information", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ThemeContext.Provider value={mockContext}>
            <ThemeProvider theme={theme as MyTheme}>
              <UserContext.Provider value={mockUserContextValue}>
                <UserDashboard />
              </UserContext.Provider>
            </ThemeProvider>
          </ThemeContext.Provider>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText(`${mockUser.fullName}'s profile`)
      ).toBeInTheDocument();
      const avatarImg = screen.getByAltText("user avatar");
      expect(avatarImg).toHaveAttribute(
        "src",
        `http://localhost:3001/${mockUser.profileImage}`
      );
      const nameElements = screen.getAllByText("Name");
      nameElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
      expect(screen.getByText(mockUser.fullName)).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      expect(screen.getByText("Job Title")).toBeInTheDocument();
      expect(screen.getByText(mockUser.jobTitle)).toBeInTheDocument();

      expect(fetchProjects).toHaveBeenCalledWith(mockUser.portfolioToken);
      expect(fetchSkills).toHaveBeenCalledWith(mockUser.portfolioToken);
      expect(screen.getByText("Project 1")).toBeInTheDocument();
      expect(screen.getByText("Project 2")).toBeInTheDocument();
    });
  });

  it("renders skills information", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ThemeContext.Provider value={mockContext}>
            <ThemeProvider theme={theme as MyTheme}>
              <UserContext.Provider value={mockUserContextValue}>
                <UserDashboard />
              </UserContext.Provider>
            </ThemeProvider>
          </ThemeContext.Provider>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(fetchSkills).toHaveBeenCalledWith(mockUser.portfolioToken);
      expect(screen.getByText("Technical Skills")).toBeInTheDocument();
      expect(screen.getByText("HTML")).toBeInTheDocument();
      expect(screen.getByText("CSS")).toBeInTheDocument();
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("Soft Skills")).toBeInTheDocument();
      expect(screen.getByText("Communication")).toBeInTheDocument();
      expect(screen.getByText("Problem Solving")).toBeInTheDocument();
    });
  });

  it("displays an error message if the API call fails", async () => {
    (fetchProjects as jest.Mock).mockRejectedValue(new Error("API error"));
    (fetchSkills as jest.Mock).mockRejectedValue(new Error("API error"));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await act(async () => {
      render(
        <MemoryRouter>
          <ThemeContext.Provider value={mockContext}>
            <ThemeProvider theme={theme as MyTheme}>
              <UserContext.Provider value={mockUserContextValue}>
                <UserDashboard />
              </UserContext.Provider>
            </ThemeProvider>
          </ThemeContext.Provider>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "An error occurred while trying to fetch the user data",
        expect.any(Error)
      );
    });
    consoleSpy.mockRestore();
  });
});
