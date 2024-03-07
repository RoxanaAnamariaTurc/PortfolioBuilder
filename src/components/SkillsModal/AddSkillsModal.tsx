/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { ActionMeta, OnChangeValue } from "react-select";
import { softSkills } from "../../skills/softSkills";
import { techSkills } from "../../skills/techSkills";
import { OptionType } from "../../skills/techSkills";
import Select from "react-select";
import { skillsModalStyle } from "./AddSkillsModal.style";
import { useTheme } from "../../custom hooks/useTheme";
import { Skills } from "../UserDashboard/UserDashboard";

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

  const handleAddSkills = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddSkills({
      techSkills: selectedTechSkills.map((skill) => skill.value),
      softSkills: selectedSoftSkills.map((skill) => skill.value),
    });
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
