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

const mutateAsyncMock = jest.fn();

jest.mock("../../../api", () => ({
  useAddSkillsMutation: jest.fn(() => ({
    mutateAsync: mutateAsyncMock,
    isPending: false,
  })),
}));

describe("AddSkillsModal", () => {
  const closeModal = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
    mutateAsyncMock.mockReset();
  });

  it("calls mutateAsync with selected skills", async () => {
    render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddSkillsModal
          closeModal={closeModal}
          currentTechSkills={[
            { value: "React", label: "React" },
            { value: "Node.js", label: "Node.js" },
          ]}
          currentSoftSkills={[
            { value: "Communication", label: "Communication" },
            { value: "Problem solving", label: "Problem solving" },
          ]}
          portfolioToken="mockToken"
        />
      </ThemeProvider>
    );
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    await waitFor(() => expect(mutateAsyncMock).toHaveBeenCalledTimes(1));
  });

  it("does not call mutateAsync when no token is provided", async () => {
    render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddSkillsModal
          closeModal={closeModal}
          currentTechSkills={[]}
          currentSoftSkills={[]}
          portfolioToken={null}
        />
      </ThemeProvider>
    );
    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);
    await waitFor(() => expect(mutateAsyncMock).not.toHaveBeenCalled());
  });

  it("updates selected skills", async () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme as MyTheme}>
        <AddSkillsModal
          closeModal={closeModal}
          currentTechSkills={[]}
          currentSoftSkills={[]}
          portfolioToken="mockToken"
        />
      </ThemeProvider>
    );

    const techSkillsSelect = getByRole("combobox", {
      name: "Technical Skills",
    });
    userEvent.click(techSkillsSelect);
    userEvent.type(techSkillsSelect, "JavaScript{enter}");

    const saveButton = screen.getByText("Save");
    userEvent.click(saveButton);

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith(
        expect.objectContaining({
          skills: expect.objectContaining({
            techSkills: expect.arrayContaining(["JavaScript"]),
          }),
        })
      );
    });
  });
});
