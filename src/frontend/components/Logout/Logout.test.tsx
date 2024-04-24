import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import Logout from "./Logout";
import { ThemeProvider } from "@emotion/react";
import { theme, MyTheme } from "../../../theme";
import { MemoryRouter } from "react-router-dom";

describe("Logout", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <Logout />
        </ThemeProvider>
      </MemoryRouter>
    );
  });

  it("clears the localStorage", () => {
    const localStorageSpy = jest.spyOn(window.localStorage.__proto__, "clear");
    const { getByRole } = render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <Logout />
        </ThemeProvider>
      </MemoryRouter>
    );
    fireEvent.click(getByRole("button"));
    expect(localStorageSpy).toHaveBeenCalled();
  });

  it("renders a Logout button", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <Logout />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(getByRole("button")).toBeInTheDocument();
  });
});
