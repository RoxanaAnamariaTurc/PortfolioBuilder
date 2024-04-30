import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import Header from "./Header";
import { theme, MyTheme } from "../../../theme";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );
  });

  it("renders the Logout component", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(document.querySelector("button")?.textContent).toBe("Logout");
  });

  it("render the logo0", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(document.querySelector("img")?.getAttribute("src")).toEqual(
      "logo.jpg"
    );
  });

  it("applies styles as expected", () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme as MyTheme}>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );

    const header = document.querySelector("header");
    expect(header).toHaveStyle(`width: 100%`);
    expect(header).toHaveStyle(`display: flex`);
  });
});
