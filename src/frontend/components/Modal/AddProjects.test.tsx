import React from "react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@emotion/react";
import { theme, MyTheme } from "../../../theme";
import AddProjectsModal from "./AddProjectsModal";
import {
  render,
  fireEvent,
  cleanup,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mutateAsyncMock = jest.fn();

jest.mock("../../../api", () => ({
  useCreateProjectMutation: jest.fn(() => ({
    mutateAsync: mutateAsyncMock,
    isPending: false,
  })),
  useEditProjectMutation: jest.fn(() => ({
    mutateAsync: mutateAsyncMock,
    isPending: false,
  })),
}));

afterEach(() => {
  cleanup();
  mutateAsyncMock.mockReset();
});

describe("Add Projects Modal", () => {
  it("renders without crashing", () => {
    render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddProjectsModal
          closeModal={() => {}}
          isOpen
          userId="1"
          portfolioToken="mockToken"
        />
      </ThemeProvider>
    );
  });

  it("handles input change", () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddProjectsModal
          closeModal={() => {}}
          isOpen
          userId="1"
          portfolioToken="mockToken"
        />
      </ThemeProvider>
    );
    const nameInput = getByLabelText("Project Name") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Project Name" } });
    expect(nameInput.value).toBe("Project Name");
  });

  it("handles cancel button click", async () => {
    const mockCloseModal = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddProjectsModal
          closeModal={mockCloseModal}
          isOpen
          userId="1"
          portfolioToken="mockToken"
        />
      </ThemeProvider>
    );
    const cancelButton = getByText("Cancel");
    await act(async () => {
      userEvent.click(cancelButton);
    });

    await waitFor(() => {
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });

  it("shows an error message when trying to submit without a userId", async () => {
    const { getByText, findByTestId, getByLabelText } = render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddProjectsModal
          closeModal={() => {}}
          isOpen
          userId=""
          portfolioToken="mockToken"
        />
      </ThemeProvider>
    );

    fireEvent.change(getByLabelText("Project Name"), {
      target: { value: "Test Project" },
    });
    fireEvent.change(getByLabelText("Description"), {
      target: { value: "Test Description" },
    });
    fireEvent.change(getByLabelText("Link"), {
      target: { value: "https://test.com" },
    });
    const submitButton = getByText("Save");
    act(() => {
      fireEvent.click(submitButton);
    });

    const errorMessage = await findByTestId("error-message");
    expect(errorMessage).toHaveTextContent("Please login to add a project");
  });
});
