/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { ActionMeta, OnChangeValue } from "react-select";
import { softSkills } from "../../skills/skills";
import { techSkills } from "../../skills/skills";
import { OptionType } from "../../skills/skills";
import Select from "react-select";
import { skillsModalStyle } from "./AddSkillsModal.style";
import { useTheme } from "../../hooks/useTheme";
import { Skills } from "../UserDashboard/UserDashboard";
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

    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        await axios.post(`http://localhost:3001/user/${userId}/skills`, {
          skills,
        });
        onAddSkills(skills);
      } catch (error) {
        console.error("An error occurred while trying to add skills", error);
      }
    }
    closeModal();
  };

  return (
    <div className="modal">
      <div css={skillsModalStyle(theme)}>
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        <div className="input-group">
          <label htmlFor="technicalSkills">Technical Skills</label>
          <Select
            id="technicalSkills"
            isMulti
            name="technicalSkills"
            options={techSkills}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSkills.bind(null, "tech")}
            value={selectedTechSkills}
          />
        </div>
        <div className="input-group">
          <label htmlFor="softSkills">Soft Skills</label>
          <Select
            id="softSkills"
            isMulti
            name="softSkills"
            options={softSkills}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleSkills.bind(null, "soft")}
            value={selectedSoftSkills}
          />
        </div>
        <button type="submit" onClick={handleAddSkills}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddSkillsModal;
