import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Logout from "./Logout";
import { ThemeProvider } from "@emotion/react";
import { theme, MyTheme } from "../../../theme";
import { MemoryRouter } from "react-router-dom";
import { UserContext, UserContextProps } from "../../../UserContext";
import { logoutUser } from "../../../api";

jest.mock("../../../api", () => ({
  logoutUser: jest.fn(),
}));

describe("Logout", () => {
  const mockClearSession = jest.fn();
  const mockContextValue = {
    user: null,
    setUser: jest.fn(),
    portfolioToken: null,
    setPortfolioToken: jest.fn(),
    refreshUser: jest.fn(),
    clearSession: mockClearSession,
    loading: false,
  } as unknown as UserContextProps;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <UserContext.Provider value={mockContextValue}>
            <Logout />
          </UserContext.Provider>
        </ThemeProvider>
      </MemoryRouter>
    );
  });

  it("calls logoutUser and clears the session", async () => {
    (logoutUser as jest.Mock).mockResolvedValue({ message: "Logged out" });
    const { getByRole } = render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <UserContext.Provider value={mockContextValue}>
            <Logout />
          </UserContext.Provider>
        </ThemeProvider>
      </MemoryRouter>
    );

    fireEvent.click(getByRole("button"));

    await waitFor(() => {
      expect(logoutUser).toHaveBeenCalled();
      expect(mockClearSession).toHaveBeenCalled();
    });
  });

  it("renders a Logout button", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <UserContext.Provider value={mockContextValue}>
            <Logout />
          </UserContext.Provider>
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(getByRole("button")).toBeInTheDocument();
  });
});
