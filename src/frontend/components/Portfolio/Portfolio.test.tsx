import React, { act } from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import Portfolio from "./Portfolio";
import { UserContext } from "../../../UserContext";
import { theme, MyTheme } from "../../../theme";
import { ThemeProvider } from "@emotion/react";
import { ThemeStateProvider } from "../ThemeContext";

import "@testing-library/jest-dom";

jest.setTimeout(10000);

jest.mock("axios", () => {
  return {
    get: jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ data: {} }), 5000);
        })
    ),
  };
});
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const mockUser = {
  fullName: "John Doe",
  jobTitle: "Software Developer",
  email: "john@test.com",
  profileImage: "img.jpg",
  password: "password",
  projects: [
    {
      name: "Portfolio",
      description: "A portfolio project",
      image: "portfolio.jpg",
      link: "www.link.com",
      _id: "1",
    },
  ],
  skills: {
    softSkills: ["Teamwork", "Problem Solving"],
    techSkills: ["JavaScript", "React"],
  },
};

describe("Portfolio Component", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ token: "testToken" });
    (axios.get as jest.Mock).mockImplementation((url) => {
      if (url.includes("/portfolio/testToken")) {
        return Promise.resolve({ data: { user: mockUser } });
      }
      return Promise.resolve({ data: {} });
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
    mockUser.skills.techSkills.forEach(async (skill) => {
      const skillElement = await screen.findByText(new RegExp(skill, "i"));
      expect(skillElement).toBeInTheDocument();
    });
  });
});
