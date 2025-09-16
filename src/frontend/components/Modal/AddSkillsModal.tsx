/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect, useState } from "react";
import { ActionMeta, OnChangeValue } from "react-select";
import { softSkills } from "../../../skills/skills";
import { techSkills } from "../../../skills/skills";
import { OptionType } from "../../../skills/skills";
import Select from "react-select";
import { getModalStyles } from "./Modal.style";
import { useTheme } from "../../../hooks/useTheme";
import { Skills } from "../UserDashboard/UserDashboard";
import Button from "../Button/Button";
import { updateSkills } from "../../../api";
import { UserContext, UserContextProps } from "../../../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface AddSkillsModalProps {
  closeModal: () => void;
  onAddSkills: (skills: Skills) => void;
  currentTechSkills: OptionType[];
  currentSoftSkills: OptionType[];
}

const AddSkillsModal: React.FC<AddSkillsModalProps> = ({
  closeModal,
  onAddSkills,
  currentSoftSkills,
  currentTechSkills,
}) => {
  const [selectedTechSkills, setSelectedTechSkills] =
    useState<OptionType[]>(currentTechSkills);
  const [selectedSoftSkills, setSelectedSoftSkills] =
    useState<OptionType[]>(currentSoftSkills);

  const theme = useTheme();
  const style = getModalStyles(theme);
  const { clearSession } = useContext(UserContext) as UserContextProps;
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedTechSkills(currentTechSkills);
    setSelectedSoftSkills(currentSoftSkills);
  }, [currentTechSkills, currentSoftSkills]);

  const handleSkills = (
    skillType: "tech" | "soft",
    selectedOption: OnChangeValue<OptionType, true>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    const skills = Array.from(selectedOption) || [];
    if (skillType === "tech") {
      setSelectedTechSkills(skills);
    } else {
      setSelectedSoftSkills(skills);
    }
  };

  const handleAddSkills = async (e: React.MouseEvent) => {
    e.preventDefault();
    const skills = {
      techSkills: selectedTechSkills.map((skill) => skill.value),
      softSkills: selectedSoftSkills.map((skill) => skill.value),
    };

    try {
      const updatedSkills = await updateSkills(skills);
      onAddSkills(updatedSkills);
      closeModal();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearSession();
        navigate("/login");
      } else {
        console.error("An error occurred while trying to add skills", error);
      }
    }
  };

  return (
    <div>
      <h2 css={style.h2}>Skills</h2>
      <div css={style.inputGroup}>
        <label css={style.label} id="tech-skills" htmlFor="tech-skills">
          Technical Skills
        </label>
        <Select
          inputId="tech-skills"
          aria-labelledby="tech-skills"
          css={style.skills}
          isMulti
          name="technicalSkills"
          options={techSkills}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleSkills.bind(null, "tech")}
          value={selectedTechSkills}
        />
      </div>
      <div css={style.inputGroup}>
        <label css={style.label} id="soft-skills" htmlFor="soft-skills">
          Soft Skills
        </label>
        <Select
          inputId="soft-skills"
          aria-labelledby="soft-skills"
          css={style.skills}
          isMulti
          name="softSkills"
          options={softSkills}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleSkills.bind(null, "soft")}
          value={selectedSoftSkills}
        />
      </div>
      <div css={style.buttonContainer}>
        <Button
          color="primary"
          backgroundColor={"transparent"}
          borderRadius={"xsmall"}
          width={"large"}
          height={"medium"}
          padding={"xsmall"}
          onClick={handleAddSkills}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddSkillsModal;
