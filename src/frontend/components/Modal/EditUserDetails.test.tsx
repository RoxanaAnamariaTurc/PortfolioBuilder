import React from "react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@emotion/react";
import { theme, MyTheme } from "../../../theme";
import EditUserDetails from "./EditUserDetails";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { editUserDetails } from "../../../api";
import { UserContext, UserContextProps } from "../../../UserContext";

jest.mock("../../../api", () => ({
  editUserDetails: jest.fn(),
}));

describe("Edit User Details Modal", () => {
  const mockSetUser = jest.fn();
  const closeModal = jest.fn();
  const user = {
    id: "1",
    fullName: "John Doe",
    email: "test@email.com",
    jobTitle: "Software Developer",
    profileImage: "profileImage",
  };

  const renderModal = (contextOverrides: Partial<UserContextProps> = {}) => {
    const contextValue = {
      user,
      setUser: mockSetUser,
      portfolioToken: "mockToken",
      setPortfolioToken: jest.fn(),
      refreshUser: jest.fn(),
      clearSession: jest.fn(),
      loading: false,
      ...contextOverrides,
    } as UserContextProps;

    return render(
      <UserContext.Provider value={contextValue}>
        <ThemeProvider theme={theme as MyTheme}>
          <EditUserDetails closeModal={closeModal} />
        </ThemeProvider>
      </UserContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the edit user details modal", () => {
    const { getByText, getByLabelText } = renderModal();

    expect(getByText("Edit User Details")).toBeInTheDocument();
    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Job Title")).toBeInTheDocument();
  });

  it("should populate the form with the user details", () => {
    const { getByDisplayValue } = renderModal();

    expect(getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(getByDisplayValue("test@email.com")).toBeInTheDocument();
    expect(getByDisplayValue("Software Developer")).toBeInTheDocument();
  });

  it("should handle user input and save the details", async () => {
    (editUserDetails as jest.Mock).mockResolvedValueOnce({
      user: {
        ...user,
        fullName: "Jane Doe",
        email: "jane@email.com",
        jobTitle: "Senior Developer",
      },
    });

    const { getByLabelText, getByText } = renderModal();

    fireEvent.change(getByLabelText("Name"), { target: { value: "Jane Doe" } });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "jane@email.com" },
    });
    fireEvent.change(getByLabelText("Job Title"), {
      target: { value: "Senior Developer" },
    });

    fireEvent.click(getByText("Save"));

    await waitFor(() => expect(editUserDetails).toHaveBeenCalled());

    expect(editUserDetails).toHaveBeenCalledWith({
      fullName: "Jane Doe",
      email: "jane@email.com",
      jobTitle: "Senior Developer",
    });

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

    const { getByText, getByRole } = renderModal();

    fireEvent.click(getByText("Save"));

    expect(getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => expect(editUserDetails).toHaveBeenCalled());
  });
});
