import React, { act } from "react";
import { render, waitFor, screen, findByText } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import Portfolio from "./Portfolio";
import { UserContext } from "../../../UserContext";
import { theme, MyTheme } from "../../../theme";
import { ThemeProvider } from "@emotion/react";
import { ThemeStateProvider } from "../ThemeContext";

import "@testing-library/jest-dom";

jest.mock("axios", () => {
  return {
    get: jest.fn(() => Promise.resolve({})),
  };
});
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const mockUser = {
  user: {
    fullName: "John Doe",
    jobTitle: "Software Developer",
    email: "john@test.com",
    profileImage: "img.jpg",
  },
};

const mockSkills = {
  softSkills: ["Teamwork", "Problem Solving"],
  techSkills: ["JavaScript", "React"],
};

const mockProjects = [
  {
    name: "Portfolio",
    description: "A portfolio project",
    image: "portfolio.jpg",
    link: "www.link.com",
    _id: "1",
  },
];

describe("Portfolio Component", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ userId: "testUserId" });
    (axios.get as jest.Mock).mockImplementation((url) => {
      if (url.includes("/user/testUserId")) {
        return new Promise((resolve) =>
          setTimeout(() => resolve({ data: mockUser }), 500)
        );
      } else if (url.includes("/projects/testUserId")) {
        return new Promise((resolve) =>
          setTimeout(() => resolve({ data: mockProjects }), 500)
        );
      } else if (url.includes("/user/testUserId/skills")) {
        return new Promise((resolve) =>
          setTimeout(() => resolve({ data: mockSkills }), 500)
        );
      } else {
        return Promise.resolve({ data: {} });
      }
    });
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <ThemeProvider theme={theme as MyTheme}>
            <ThemeStateProvider>
              <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
                <Portfolio />
              </UserContext.Provider>
            </ThemeStateProvider>
          </ThemeProvider>
        </BrowserRouter>
      );
    });
  });

  it("renders a loading message initially", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <ThemeProvider theme={theme as MyTheme}>
            <ThemeStateProvider>
              <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
                <Portfolio />
              </UserContext.Provider>
            </ThemeStateProvider>
          </ThemeProvider>
        </BrowserRouter>
      );
    });
    console.log(document.body.innerHTML);
    const loadingElement = await screen.findByTestId("loading");
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders user details when the user is provided", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <ThemeProvider theme={theme as MyTheme}>
            <ThemeStateProvider>
              <UserContext.Provider
                value={{ user: mockUser, setUser: jest.fn() }}
              >
                <Portfolio />
              </UserContext.Provider>
            </ThemeStateProvider>
          </ThemeProvider>
        </BrowserRouter>
      );
    });
    const usernameElement = await screen.findByTestId("username");
    expect(usernameElement).toBeInTheDocument();
    expect(screen.getByText(/john@test.com/i)).toBeInTheDocument();
    mockSkills.techSkills.forEach(async (skill) => {
      const skillElement = await screen.findByText(new RegExp(skill, "i"));
      expect(skillElement).toBeInTheDocument();
    });
  });
});
