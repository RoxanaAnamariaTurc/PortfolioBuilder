/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
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
}

const AddSkillsModal: React.FC<AddSkillsModalProps> = ({
  closeModal,
  onAddSkills,
}) => {
  const [selectedTechSkills, setSelectedTechSkills] = useState<OptionType[]>(
    []
  );
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<OptionType[]>(
    []
  );

  const theme = useTheme();

  const handleTechnicalSkills = (
    selectedOption: OnChangeValue<OptionType, true>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setSelectedTechSkills(Array.from(selectedOption) || []);
  };

  const handleSoftSkills = (
    selectedOption: OnChangeValue<OptionType, true>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setSelectedSoftSkills(Array.from(selectedOption) || []);
  };

  const handleAddSkills = async (e: React.MouseEvent) => {
    e.preventDefault();
    const skills = {
      techSkills: selectedTechSkills.map((skill) => skill.value),
      softSkills: selectedSoftSkills.map((skill) => skill.value),
    };
    onAddSkills(skills);

    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        await axios.post(`http://localhost:3001/user/${userId}/skills`, {
          skills,
        });
      } catch (error) {
        console.log("An error occurred while trying to add skills");
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
            onChange={handleTechnicalSkills}
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
            onChange={handleSoftSkills}
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
