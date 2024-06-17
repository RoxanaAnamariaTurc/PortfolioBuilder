import React from "react";
import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import Register from "./Register";
import { theme, MyTheme } from "../../../theme";
import { UserContext } from "../../../UserContext";
import { MemoryRouter } from "react-router-dom";
import { registerUser } from "../../../api";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));
jest.mock("../../../api", () => ({
  registerUser: jest.fn(() => Promise.resolve({ status: 200, data: {} })),
}));

describe("Register component", () => {
  it("renders a form", async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
          <ThemeProvider theme={theme as MyTheme}>
            <Register />
          </ThemeProvider>
        </UserContext.Provider>
      </MemoryRouter>
    );
    const form = await screen.findByTestId("register-form");
    expect(form).toBeInTheDocument();
  });
  it("renders Register form and handles submit", async () => {
    const mockSubmit = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
          <ThemeProvider theme={theme as MyTheme}>
            <Register onSubmit={mockSubmit} />
          </ThemeProvider>
        </UserContext.Provider>
      </MemoryRouter>
    );

    const form = getByTestId("register-form");
    const fullNameInput = getByLabelText("Full Name");
    const emailInput = getByLabelText("Email");
    const jobTitleInput = getByLabelText("Job Title");
    const passwordInput = getByLabelText("Password");
    const confirmPasswordInput = getByLabelText("Confirm Password");

    fireEvent.change(fullNameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(jobTitleInput, { target: { value: "Software Engineer" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    fireEvent.submit(form);
    await waitFor(() => expect(registerUser).toHaveBeenCalledTimes(1));
  });
  it("alerts the user if the user is already registered", async () => {
    (registerUser as jest.Mock).mockImplementationOnce(() =>
      Promise.reject({
        isAxiosError: true,
        response: { data: { message: "User already registered!" } },
      })
    );
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
          <ThemeProvider theme={theme as MyTheme}>
            <Register />
          </ThemeProvider>
        </UserContext.Provider>
      </MemoryRouter>
    );

    const form = getByTestId("register-form");
    const fullNameInput = getByLabelText("Full Name");
    const emailInput = getByLabelText("Email");
    const jobTitleInput = getByLabelText("Job Title");
    const passwordInput = getByLabelText("Password");
    const confirmPasswordInput = getByLabelText("Confirm Password");

    fireEvent.change(fullNameInput, { target: { value: "Test User" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.click(jobTitleInput as Element);
    fireEvent.change(jobTitleInput, { target: { value: "Software Engineer" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    await waitFor(() => fireEvent.submit(form));

    const errorMessage = getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
    expect((errorMessage as HTMLParagraphElement).textContent).toBe(
      "User already registered!"
    );
  });
  it("form doesnt submit if a required field is missing", async () => {
    const mockRegister = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null, setUser: jest.fn() }}>
          <ThemeProvider theme={theme as MyTheme}>
            <Register />
          </ThemeProvider>
        </UserContext.Provider>
      </MemoryRouter>
    );

    const form = getByTestId("register-form");
    const submitButton = screen.getByRole("button", { name: "Register" });
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "john.doe@example.com" },
    });

    fireEvent.click(submitButton);

    expect(mockRegister).not.toHaveBeenCalled();
  });
});
