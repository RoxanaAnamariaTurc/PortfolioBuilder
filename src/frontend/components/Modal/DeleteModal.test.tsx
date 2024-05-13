import React from "react";
import "@testing-library/jest-dom";
import DeleteModal from "./DeleteModal";
import { MyTheme, theme } from "../../../theme";
import { ThemeProvider } from "@emotion/react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import axios from "axios";
import { deleteProject } from "../../../api";

jest.mock("../../../api", () => ({
  deleteProject: jest.fn(),
}));
jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

describe("DeleteModal", () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => "mockUserId");
  });
  it("renders correctly", () => {
    const props = {
      projectId: "1",
      closeModal: jest.fn(),
      projects: [],
      setProjects: jest.fn(),
    };

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <DeleteModal {...props} />
      </ThemeProvider>
    );

    expect(
      getByText("Are you sure you want to delete this project?")
    ).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
    expect(getByText("Cancel")).toBeInTheDocument();
  });

  it("deletes the project and closes the modal when the Delete button is clicked", async () => {
    const mockUserId = "mockUserId";
    const mockCloseModal = jest.fn();
    const mockSetProjects = jest.fn();
    const props = {
      projectId: "1",
      closeModal: mockCloseModal,
      projects: [],
      setProjects: mockSetProjects,
    };

    render(
      <ThemeProvider theme={theme}>
        <DeleteModal {...props} />
      </ThemeProvider>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteProject).toHaveBeenCalledWith(mockUserId, props.projectId);
      expect(mockSetProjects).toHaveBeenCalled();
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });

  it("closes the modal without deleting the project when the Cancel button is clicked", () => {
    const mockCloseModal = jest.fn();
    const mockSetProjects = jest.fn();
    const props = {
      projectId: "1",
      closeModal: mockCloseModal,
      projects: [],
      setProjects: mockSetProjects,
    };

    render(
      <ThemeProvider theme={theme}>
        <DeleteModal {...props} />
      </ThemeProvider>
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockCloseModal).toHaveBeenCalled();
    expect(axios.delete).not.toHaveBeenCalled();
    expect(mockSetProjects).not.toHaveBeenCalled();
  });

  it("logs an error if deleting the project fails", async () => {
    const mockUserId = "UserId";
    const mockCloseModal = jest.fn();
    const mockSetProjects = jest.fn();
    const props = {
      projectId: "1",
      closeModal: mockCloseModal,
      projects: [],
      setProjects: mockSetProjects,
    };

    // Mock deleteProject to reject with an error
    (deleteProject as jest.Mock).mockRejectedValue(new Error("Mock error"));

    // Spy on console.error
    const consoleSpy = jest.spyOn(console, "error");

    render(
      <ThemeProvider theme={theme}>
        <DeleteModal {...props} />
      </ThemeProvider>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      // Check that console.error was called with the correct arguments
      expect(consoleSpy).toHaveBeenCalledWith(
        "An error occurred while trying to delete the project",
        new Error("Mock error")
      );
    });

    // Clean up the console spy
    consoleSpy.mockRestore();
  });
});
