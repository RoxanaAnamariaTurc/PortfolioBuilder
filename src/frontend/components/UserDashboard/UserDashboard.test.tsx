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

jest.mock("../../../api", () => ({
  fetchProjects: jest.fn(),
  fetchSkills: jest.fn(),
  deleteProject: jest.fn(),
  updateSkills: jest.fn(),
}));

const mockSetUser = jest.fn((user: User | null) => {}) as React.Dispatch<
  React.SetStateAction<User | null>
>;
const mockSetPortfolioToken = jest.fn();
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
  id: "1",
  fullName: "John Doe",
  email: "john.doe@example.com",
  jobTitle: "Software Engineer",
  profileImage: "avatar.png",
};

const mockUserContextValue: UserContextProps = {
  user: mockUser,
  setUser: mockSetUser,
  portfolioToken: "mockToken",
  setPortfolioToken: mockSetPortfolioToken,
  refreshUser: jest.fn(),
  clearSession: jest.fn(),
  loading: false,
};

const mockContext = {
  toggleTheme: jest.fn(),
  currentTheme: "light",
};

describe("UserDashboard", () => {
  beforeEach(() => {
    process.env.REACT_APP_API_URL = "http://localhost:3001";
    (fetchProjects as jest.Mock).mockResolvedValue(mockProjects);
    (fetchSkills as jest.Mock).mockResolvedValue(mockSkills);
  });

  afterEach(() => {
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
      expect(fetchProjects).toHaveBeenCalled();
      expect(fetchSkills).toHaveBeenCalled();
      expect(
        screen.getByText(`${mockUser.fullName}'s profile`)
      ).toBeInTheDocument();
      const avatarImg = screen.getByAltText("user avatar");
      expect(avatarImg).toHaveAttribute(
        "src",
        `http://localhost:3001/${mockUser.profileImage}`
      );
      expect(screen.getByText(mockUser.fullName)).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      expect(screen.getByText(mockUser.jobTitle)).toBeInTheDocument();
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
      expect(screen.getByText("Technical Skills")).toBeInTheDocument();
      expect(screen.getByText("HTML")).toBeInTheDocument();
      expect(screen.getByText("CSS")).toBeInTheDocument();
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("Soft Skills")).toBeInTheDocument();
      expect(screen.getByText("Communication")).toBeInTheDocument();
      expect(screen.getByText("Problem Solving")).toBeInTheDocument();
    });
  });

  it("logs an error if the API call fails", async () => {
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
      expect(consoleSpy).toHaveBeenCalled();
    });
    consoleSpy.mockRestore();
  });
});
