import React, { Suspense } from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import axios from "axios";

import { theme, MyTheme } from "../../../theme";
import { ThemeStateProvider } from "../ThemeContext";
import UserDashboard from "./UserDashboard";
import { User, Skills, Project } from "../../../types";
import { UserContext, UserContextProps } from "../../../UserContext";

jest.mock("axios");


const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockProjects: Project[] = [
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

const mockSkills: Skills = {
  techSkills: ["HTML", "CSS", "JavaScript"],
  softSkills: ["Communication", "Problem Solving"],
};

const mockUser: User = {
  _id: "1",
  fullName: "John Doe",
  email: "john.doe@example.com",
  jobTitle: "Software Engineer",
  profileImage: "avatar.png",
};

const mockUserContextValue: UserContextProps = {
  user: mockUser,
  setUser: jest.fn(),
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        suspense: true,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme as MyTheme}>
        <ThemeStateProvider>
          <UserContext.Provider value={mockUserContextValue}>
            <MemoryRouter>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </MemoryRouter>
          </UserContext.Provider>
        </ThemeStateProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("UserDashboard", () => {
  beforeEach(() => {

    process.env.REACT_APP_API_URL = "http://localhost:3001";
    localStorage.setItem("portfolioToken", "mockToken");
    localStorage.setItem("userId", "1");
    mockedAxios.get.mockImplementation((url: string) => {
      if (url.includes("/user/mockToken/skills")) {
        return Promise.resolve({ data: mockSkills });
      }
      if (url.includes("/projects/mockToken")) {
        return Promise.resolve({ data: mockProjects });
      }
      if (url.includes("/user/mockToken")) {
        return Promise.resolve({ data: { user: mockUser } });
      }
      return Promise.resolve({ data: {} });
    });
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  afterAll(() => {
    env.VITE_API_URL = originalApiUrl;
  });

  it("renders user profile information", async () => {
    const Wrapper = createWrapper();
    await act(async () => {
      render(
        <Wrapper>
          <UserDashboard />
        </Wrapper>
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
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
      expect(screen.getByText(mockUser.jobTitle)).toBeInTheDocument();
      expect(screen.getByText("Project 1")).toBeInTheDocument();
      expect(screen.getByText("Project 2")).toBeInTheDocument();
    });
  });

  it("renders skills information", async () => {
    const Wrapper = createWrapper();
    await act(async () => {
      render(
        <Wrapper>
          <UserDashboard />
        </Wrapper>
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
});
