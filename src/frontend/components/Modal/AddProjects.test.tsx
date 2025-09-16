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
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createProject,
  editProject,
} from "../../../api";
import { UserContext, UserContextProps } from "../../../UserContext";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../api", () => ({
  createProject: jest.fn(),
  editProject: jest.fn(),
}));

afterEach(cleanup);

describe("Add Projects Modal", () => {
  const closeModal = jest.fn();
  const onProjectSubmission = jest.fn();
  const clearSession = jest.fn();

  const renderModal = (
    props: Partial<React.ComponentProps<typeof AddProjectsModal>> = {}
  ) => {
    const contextValue = {
      user: null,
      setUser: jest.fn(),
      portfolioToken: null,
      setPortfolioToken: jest.fn(),
      refreshUser: jest.fn(),
      clearSession,
      loading: false,
    } as UserContextProps;

    return render(
      <MemoryRouter>
        <UserContext.Provider value={contextValue}>
          <ThemeProvider theme={theme as MyTheme}>
            <AddProjectsModal
              closeModal={closeModal}
              onProjectSubmission={onProjectSubmission}
              isOpen
              {...props}
            />
          </ThemeProvider>
        </UserContext.Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    renderModal();
  });

  it("handles input change", () => {
    const { getByLabelText } = renderModal();
    const nameInput = getByLabelText("Project Name") as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Project Name" } });
    expect(nameInput.value).toBe("Project Name");
  });

  it("creates a project on submit", async () => {
    (createProject as jest.Mock).mockResolvedValue({
      id: "1",
      name: "Project Name",
      description: "Project Description",
      image: "Project Image",
      link: "https://project.com",
    });

    const { getByLabelText, getByText } = renderModal();
    fireEvent.change(getByLabelText("Project Name"), {
      target: { value: "Project Name" },
    });
    fireEvent.change(getByLabelText("Description"), {
      target: { value: "Project Description" },
    });
    fireEvent.change(getByLabelText("Link"), {
      target: { value: "https://project.com" },
    });

    fireEvent.click(getByText("Save"));

    await waitFor(() => expect(createProject).toHaveBeenCalled());
    expect(onProjectSubmission).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1" }),
      false
    );
  });

  it("edits a project when projectToEdit is provided", async () => {
    (editProject as jest.Mock).mockResolvedValue({
      id: "2",
      name: "Updated Project",
      description: "Updated Description",
      image: "image",
      link: "https://updated.com",
    });

    const projectToEdit = {
      _id: "2",
      name: "Old Project",
      description: "Old Description",
      image: "old",
      link: "https://old.com",
    };

    const { getByText } = renderModal({ projectToEdit });

    userEvent.click(getByText("Save"));

    await waitFor(() => expect(editProject).toHaveBeenCalledWith("2", expect.any(FormData)));
    expect(onProjectSubmission).toHaveBeenCalledWith(
      expect.objectContaining({ id: "2" }),
      true
    );
  });

  it("clears the session on unauthorized response", async () => {
    (createProject as jest.Mock).mockRejectedValue({
      response: { status: 401 },
      isAxiosError: true,
    });

    const { getByText } = renderModal();

    fireEvent.click(getByText("Save"));

    await waitFor(() => {
      expect(clearSession).toHaveBeenCalled();
    });
  });
});
