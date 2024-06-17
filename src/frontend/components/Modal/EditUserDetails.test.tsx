import React from "react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@emotion/react";
import { theme, MyTheme } from "../../../theme";
import EditUserDetails from "./EditUserDetails";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { editUserDetails } from "../../../api";
import { UserContext } from "../../../UserContext";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
}));

jest.mock("../../../api", () => ({
  editUserDetails: jest.fn(),
}));

describe("Edit User Details Modal", () => {
  let localStorageMock: { [key: string]: string };
  const mockSetUser = jest.fn();
  const user = {
    _id: "1",
    fullName: "John Doe",
    email: "test@email.com",
    jobTitle: "Software Developer",
    password: "password",
    profileImage: "profileImage",
  };

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
      length: 0,
      key: jest.fn(),
    };
    localStorageMock.userId = "1";
    localStorageMock.portfolioToken = "token";
    global.localStorage.setItem("userId", "1");
    global.localStorage.setItem("portfolioToken", "token");
  });

  it("should render the edit user details modal", () => {
    const { getByText, getByLabelText } = render(
      <UserContext.Provider value={{ user, setUser: mockSetUser }}>
        <ThemeProvider theme={theme}>
          <EditUserDetails closeModal={() => {}} />
        </ThemeProvider>
      </UserContext.Provider>
    );

    expect(getByText("Edit User Details")).toBeInTheDocument();
    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Job Title")).toBeInTheDocument();
  });

  it("should populate the form with the user details", () => {
    const { getByDisplayValue } = render(
      <UserContext.Provider value={{ user, setUser: mockSetUser }}>
        <ThemeProvider theme={theme}>
          <EditUserDetails closeModal={() => {}} />
        </ThemeProvider>
      </UserContext.Provider>
    );

    expect(getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(getByDisplayValue("test@email.com")).toBeInTheDocument();
    expect(getByDisplayValue("Software Developer")).toBeInTheDocument();
  });

  it("should handle user input and save the details", async () => {
    (editUserDetails as jest.Mock).mockResolvedValueOnce({});
    const closeModal = jest.fn();

    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={{ user, setUser: mockSetUser }}>
        <ThemeProvider theme={theme}>
          <EditUserDetails closeModal={closeModal} />
        </ThemeProvider>
      </UserContext.Provider>
    );

    fireEvent.change(getByLabelText("Name"), { target: { value: "Jane Doe" } });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "jane@email.com" },
    });
    fireEvent.change(getByLabelText("Job Title"), {
      target: { value: "Senior Developer" },
    });

    fireEvent.click(getByText("Save"));

    await waitFor(() => expect(editUserDetails).toHaveBeenCalled());

    expect(editUserDetails).toHaveBeenCalledWith(
      "token",
      {
        fullName: "Jane Doe",
        email: "jane@email.com",
        jobTitle: "Senior Developer",
      },
      "1"
    );

    expect(mockSetUser).toHaveBeenCalledWith({
      ...user,
      fullName: "Jane Doe",
      email: "jane@email.com",
      jobTitle: "Senior Developer",
    });

    expect(closeModal).toHaveBeenCalled();
  });

  it("should display loading state when saving", async () => {
    (editUserDetails as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    const closeModal = jest.fn();

    const { getByText, getByRole } = render(
      <UserContext.Provider value={{ user, setUser: mockSetUser }}>
        <ThemeProvider theme={theme}>
          <EditUserDetails closeModal={closeModal} />
        </ThemeProvider>
      </UserContext.Provider>
    );

    fireEvent.click(getByText("Save"));

    expect(getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => expect(editUserDetails).toHaveBeenCalled());
  });
});
