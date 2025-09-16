import React, { Suspense, act } from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, useParams } from "react-router-dom";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Portfolio from "./Portfolio";
import { theme, MyTheme } from "../../../theme";
import { ThemeProvider } from "@emotion/react";
import { ThemeStateProvider } from "../ThemeContext";
import { User } from "../../../types";

import "@testing-library/jest-dom";

jest.setTimeout(10000);

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

const mockUser: User & {
  projects: Array<{ _id: string; name: string; description: string; image: string; link: string }>;
  skills: { softSkills: string[]; techSkills: string[] };
} = {
  _id: "1",
  fullName: "John Doe",
  jobTitle: "Software Developer",
  email: "john@test.com",
  profileImage: "img.jpg",
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
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </BrowserRouter>
        </ThemeStateProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("Portfolio Component", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ token: "testToken" });
    (axios.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes("/portfolio/testToken")) {
        return Promise.resolve({ data: { user: mockUser } });
      }
      return Promise.resolve({ data: {} });
    });
  });

  it("renders without crashing", async () => {
    const Wrapper = createWrapper();
    await act(async () => {
      render(
        <Wrapper>
          <Portfolio />
        </Wrapper>
      );
    });
  });

  it("renders user details when the user is provided", async () => {
    const Wrapper = createWrapper();
    await act(async () => {
      render(
        <Wrapper>
          <Portfolio />
        </Wrapper>
      );
    });

    const usernameElement = await screen.findByTestId("username");
    expect(usernameElement).toBeInTheDocument();
    expect(screen.getByText(/john@test.com/i)).toBeInTheDocument();
    await Promise.all(
      mockUser.skills.techSkills.map(async (skill) => {
        const skillElement = await screen.findByText(new RegExp(skill, "i"));
        expect(skillElement).toBeInTheDocument();
      })
    );
  });
});
