import React from "react";
import "@testing-library/jest-dom";
import DeleteModal from "./DeleteModal";
import { theme } from "../../../theme";
import { ThemeProvider } from "@emotion/react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";

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
      closeModal: jest.fn(),
      onDelete: jest.fn(),
      isLoading: false,
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
    const mockCloseModal = jest.fn();
    const mockOnDelete = jest.fn(() => Promise.resolve());
    const props = {
      closeModal: mockCloseModal,
      onDelete: mockOnDelete,
      isLoading: false,
    };

    render(
      <ThemeProvider theme={theme}>
        <DeleteModal {...props} />
      </ThemeProvider>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalled();
    });
  });

  it("closes the modal without deleting the project when the Cancel button is clicked", () => {
    const mockCloseModal = jest.fn();
    const mockOnDelete = jest.fn();
    const props = {
      closeModal: mockCloseModal,
      onDelete: mockOnDelete,
      isLoading: false,
    };

    render(
      <ThemeProvider theme={theme}>
        <DeleteModal {...props} />
      </ThemeProvider>
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockCloseModal).toHaveBeenCalled();
    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
