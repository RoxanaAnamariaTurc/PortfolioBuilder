import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  getByText,
  fireEvent,
  act,
  waitFor,
  getByRole,
  findByText,
} from "@testing-library/react";
import AddSkillsModal from "./AddSkillsModal";
import { ThemeProvider } from "@emotion/react";
import { theme, MyTheme } from "../../../theme";
import * as api from "../../../api";
import { OptionType } from "../../../skills/skills";
import userEvent from "@testing-library/user-event";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));
const addSkillsMock = jest.spyOn(api, "addSkills");
const onAddSkills = jest.fn();
const closeModal = jest.fn();

describe("AddSkillsModal", () => {
  beforeEach(() => {
    localStorage.setItem("portfolioToken", "1");
  });
  afterEach(() => {
    localStorage.removeItem("portfolioToken");
  });
  it("calls the correct functions with the correct arguments when adding skills", async () => {
    render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddSkillsModal
          closeModal={closeModal}
          onAddSkills={onAddSkills}
          currentTechSkills={[
            { value: "React", label: "React" },
            { value: "Node.js", label: "Node.js" },
          ]}
          currentSoftSkills={[
            { value: "Communication", label: "Communication" },
            { value: "Problem solving", label: "Problem solving" },
          ]}
        />
      </ThemeProvider>
    );
    const addSkillsButton = screen.getByText("Save");
    fireEvent.click(addSkillsButton);
    await waitFor(() => expect(addSkillsMock).toHaveBeenCalledTimes(1));
  });
  it("throws an error when no userId is found", async () => {
    localStorage.removeItem("portfolioToken");
    render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddSkillsModal
          closeModal={closeModal}
          onAddSkills={onAddSkills}
          currentTechSkills={[
            { value: "React", label: "React" },
            { value: "Node.js", label: "Node.js" },
          ]}
          currentSoftSkills={[
            { value: "Communication", label: "Communication" },
            { value: "Problem solving", label: "Problem solving" },
          ]}
        />
      </ThemeProvider>
    );
    const addSkillsButton = screen.getByText("Save");
    fireEvent.click(addSkillsButton);
    await waitFor(() => expect(addSkillsMock).toHaveBeenCalledTimes(0));
  });
  it("handlesSkills updates tech skills correctly", async () => {
    const currentTechSkills: OptionType[] = [];
    const currentSoftSkills: OptionType[] = [];

    const { getByRole, getByText } = render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddSkillsModal
          closeModal={closeModal}
          onAddSkills={onAddSkills}
          currentTechSkills={currentTechSkills}
          currentSoftSkills={currentSoftSkills}
        />
      </ThemeProvider>
    );

    const techSkillsSelect = getByRole("combobox", {
      name: "Technical Skills",
    });
    userEvent.click(techSkillsSelect);

    userEvent.type(techSkillsSelect, "JavaScript{enter}");

    await waitFor(() =>
      expect((techSkillsSelect as HTMLInputElement).value).toBe("JavaScript")
    );

    const saveButton = getByText("Save");
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(onAddSkills).toHaveBeenCalledWith(
        expect.objectContaining({
          techSkills: expect.arrayContaining(["JavaScript"]),
          softSkills: expect.arrayContaining([]),
        })
      );
    });
  });
});
