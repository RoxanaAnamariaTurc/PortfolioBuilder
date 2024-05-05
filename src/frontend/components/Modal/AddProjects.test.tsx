import React from "react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@emotion/react";
import { theme, MyTheme } from "../../../theme";
import AddProjectsModal from "./AddProjectsModal";
import {
  render,
  fireEvent,
  cleanup,
  getByLabelText,
  within,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { editProject } from "../../../api";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

jest.mock("../../../api", () => ({
  editProject: jest.fn(),
}));

(axios.post as jest.Mock).mockResolvedValue({ data: [] });
(axios.put as jest.Mock).mockResolvedValue({
  data: [
    {
      _id: "1",
      name: "Project Name",
      description: "Project Description",
      link: "Project Link",
      image: "Project Image",
    },
  ],
});
afterEach(cleanup);

describe("Add Projects Modal", () => {
  // Mock localStorage
  let localStorageMock: { [key: string]: string };
  beforeEach(() => {
    localStorageMock = {};
    global.localStorage = {
      getItem: jest.fn((key) => localStorageMock[key]),
      setItem: jest.fn((key, value) => {
        localStorageMock[key] = value;
      }),
      clear: jest.fn(() => {
        localStorageMock = {};
      }),
      removeItem: jest.fn((key) => {
        delete localStorageMock[key];
      }),
    } as any;
  });

  // Mock alert
  beforeAll(() => {
    window.alert = jest.fn();
  });
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

  it("handles cancel  button click", async () => {
    window.alert = jest.fn();
    const mockCloseModal = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddProjectsModal
          closeModal={mockCloseModal}
          onProjectSubmission={() => {}}
        />
      </ThemeProvider>
    );
    const cancelButton = getByText("Cancel");
    const clickableElement = within(cancelButton).getByText("Cancel");

    //Mocking the form submission
    const form = clickableElement.closest("form");
    const submit = form?.onsubmit;
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        submit?.bind(form)(e);
      };
    }
    userEvent.click(clickableElement);

    await waitFor(() => {
      expect(mockCloseModal).toHaveBeenCalled();
    });
  });
  it("updates formState on input change", () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddProjectsModal
          closeModal={() => {}}
          onProjectSubmission={() => {}}
        />
      </ThemeProvider>
    );
    const nameInput = getByLabelText("Project Name") as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Project Name here" } });
    expect(nameInput.value).toBe("Project Name here");

    const linkInput = getByLabelText("Link") as HTMLInputElement;
    fireEvent.change(linkInput, { target: { value: "www.link.com" } });
    expect(linkInput.value).toBe("www.link.com");
  });

  it("shows an alert when trying to submit without a userId", () => {
    localStorage.removeItem("userId");
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
    expect(window.alert).toHaveBeenCalledWith("Please login to add a project");
  });
});
