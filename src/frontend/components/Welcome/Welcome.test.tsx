import React from "react";
import { theme, MyTheme } from "../../../theme";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Welcome from "./Welcome";
import { ThemeProvider } from "@emotion/react";
import "@testing-library/jest-dom";

describe("Welcome Component", () => {
  it("renders a header with the welcome text", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <Welcome />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(
      screen.getByText(/The beginning of your journey/i)
    ).toBeInTheDocument();
  });
  it("renders a Login button", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <Welcome />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
  it("renders a Register button", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <Welcome />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});
