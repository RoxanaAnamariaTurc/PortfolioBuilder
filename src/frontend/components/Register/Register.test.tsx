import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import Register from "./Register";
import { theme, MyTheme } from "../../../theme";
import { UserContext } from "../../../UserContext";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
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
});
