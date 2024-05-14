import React from "react";
import "@testing-library/jest-dom";
import Login from "./Login";
import { theme, MyTheme } from "../../../theme";
import { MemoryRouter } from "react-router-dom";
import {
  render,
  screen,
  getByText,
  fireEvent,
  act,
  waitFor,
  getByRole,
} from "@testing-library/react";
import { UserContext } from "../../../UserContext";
import { ThemeProvider } from "@emotion/react";
import { loginUser } from "../../../api";

jest.mock("axios", () => ({
  create: () => ({
    post: jest.fn(),
  }),
}));

jest.mock("../../../api", () => ({
  loginUser: jest.fn(),
}));

describe("Login", () => {
  it("renders", async () => {
    const mockSetUser = jest.fn();
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>
            <Login />
          </UserContext.Provider>
        </ThemeProvider>
      </MemoryRouter>
    );
    const formElement = await waitFor(() => screen.getByTestId("login-form"));
    expect(formElement).toBeInTheDocument();
  });
  it("correctly submits the form with correct arguments", async () => {
    (loginUser as jest.Mock).mockResolvedValue({ data: { user: { id: "1" } } });

    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
            <Login />
          </UserContext.Provider>
        </ThemeProvider>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith("test@example.com", "password");
    });
  });
  it("shows an error message if email or password are wrong", async () => {
    (loginUser as jest.Mock).mockRejectedValue(new Error());
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
            <Login />
          </UserContext.Provider>
        </ThemeProvider>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "incorrect@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "incorrectpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });
  it("sets error when the loginUser throws an error", async () => {
    (loginUser as jest.Mock).mockRejectedValue(new Error());
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
            <Login />
          </UserContext.Provider>
        </ThemeProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Invalid email or password/i)
      ).toBeInTheDocument();
    });
  });
  it("sets error when email or passwordValue is falsy", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
            <Login />
          </UserContext.Provider>
        </ThemeProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "" }, // email is falsy
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
  });
});
