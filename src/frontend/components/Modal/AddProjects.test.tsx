import React from "react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@emotion/react";
import { theme, MyTheme } from "../../../theme";
import AddProjectsModal from "./AddProjectsModal";
import { render, fireEvent } from "@testing-library/react";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  // Add other methods as needed
}));

describe("Add Projects Modal", () => {
  it("renders without crashing", () => {
    render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddProjectsModal
          closeModal={() => {}}
          onProjectSubmission={() => {}}
        />
      </ThemeProvider>
    );
  });
  it("handles input change", () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddProjectsModal
          closeModal={() => {}}
          onProjectSubmission={() => {}}
        />
      </ThemeProvider>
    );
    const nameInput = getByLabelText("Project Name") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Project Name" } });
    expect(nameInput.value).toBe("Project Name");
  });
  it("handles form submission", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddProjectsModal
          closeModal={() => {}}
          onProjectSubmission={() => {}}
        />
      </ThemeProvider>
    );
    const submitButton = getByText("Save");
    fireEvent.click(submitButton);
  });
});
