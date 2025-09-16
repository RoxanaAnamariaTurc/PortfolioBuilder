import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import AddSkillsModal from "./AddSkillsModal";
import { ThemeProvider } from "@emotion/react";
import { theme, MyTheme } from "../../../theme";
import userEvent from "@testing-library/user-event";
import { UserContext, UserContextProps } from "../../../UserContext";
import { updateSkills } from "../../../api";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../../api", () => ({
  updateSkills: jest.fn(),
}));

const closeModal = jest.fn();
const onAddSkills = jest.fn();

const renderModal = (contextOverrides: Partial<UserContextProps> = {}) => {
  const contextValue = {
    user: null,
    setUser: jest.fn(),
    portfolioToken: null,
    setPortfolioToken: jest.fn(),
    refreshUser: jest.fn(),
    clearSession: jest.fn(),
    loading: false,
    ...contextOverrides,
  } as UserContextProps;

  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme as MyTheme}>
        <UserContext.Provider value={contextValue}>
          <AddSkillsModal
            closeModal={closeModal}
            onAddSkills={onAddSkills}
            currentTechSkills={[]}
            currentSoftSkills={[]}
          />
        </UserContext.Provider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe("AddSkillsModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls updateSkills and onAddSkills with API response", async () => {
    (updateSkills as jest.Mock).mockResolvedValue({
      techSkills: ["React"],
      softSkills: ["Teamwork"],
    });
    renderModal();

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(updateSkills).toHaveBeenCalledWith({
        techSkills: [],
        softSkills: [],
      });
      expect(onAddSkills).toHaveBeenCalledWith({
        techSkills: ["React"],
        softSkills: ["Teamwork"],
      });
    });
  });

  it("updates selected tech skills", async () => {
    (updateSkills as jest.Mock).mockResolvedValue({
      techSkills: ["JavaScript"],
      softSkills: [],
    });
    renderModal();

    const techSkillsSelect = screen.getByRole("combobox", {
      name: "Technical Skills",
    });
    await userEvent.click(techSkillsSelect);
    await userEvent.type(techSkillsSelect, "JavaScript{enter}");

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(updateSkills).toHaveBeenCalledWith({
        techSkills: ["JavaScript"],
        softSkills: [],
      });
    });
  });

  it("clears the session on unauthorized error", async () => {
    const clearSession = jest.fn();
    (updateSkills as jest.Mock).mockRejectedValue({
      response: { status: 401 },
      isAxiosError: true,
    });

    renderModal({ clearSession });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(clearSession).toHaveBeenCalled();
    });
  });
});
