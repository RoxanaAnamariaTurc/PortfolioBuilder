import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { ThemeProvider } from "@emotion/react";
import { theme, MyTheme } from "../../../theme";

describe("Footer", () => {
  it("renders correctly", () => {
    render(
      <ThemeProvider theme={theme as MyTheme}>
        <Footer />
      </ThemeProvider>
    );
    const footerElement = screen.getByText(
      /© Roxana Turc | Portfolio Generator Project | 2023/i
    );
    expect(footerElement).toBeInTheDocument();
  });
});
