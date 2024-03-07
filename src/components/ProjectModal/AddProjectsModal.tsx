/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { projectModalStyle } from "./AddProjectModal.style";
import { useTheme } from "../../custom hooks/useTheme";
import { Project } from "../UserDashboard/UserDashboard";

interface AddProjectsModalProps {
  closeModal: () => void;
  onAddProject: (project: Project) => void;
}

const AddProjectsModal: React.FC<AddProjectsModalProps> = ({
  closeModal,
  onAddProject,
}) => {
  const theme = useTheme();
  const [isLimitExceeded, setLimitExceeded] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddProject({
      name: (
        e.currentTarget.elements.namedItem("projectName") as HTMLInputElement
      )?.value,
      description: (
        e.currentTarget.elements.namedItem(
          "projectDescription"
        ) as HTMLInputElement
      )?.value,
      image: (
        e.currentTarget.elements.namedItem("projectImage") as HTMLInputElement
      )?.value,
      link: (
        e.currentTarget.elements.namedItem("projectLink") as HTMLInputElement
      )?.value,
    });
    closeModal();
  };
  const handleClose = () => {
    closeModal();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isBlocked && (e.key === "Backspace" || e.key === "Delete")) {
      setIsBlocked(false);
      setLimitExceeded(false);
    }
  };

  const handleInputTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const wordLimit = 10;
    const words = e.target.value.split(/\s+/).filter((word) => word.length > 0);
    if (words.length > wordLimit) {
      setLimitExceeded(true);
      if (e.target.value.length > e.currentTarget.defaultValue.length) {
        setIsBlocked(true);
        e.preventDefault();
      }
    } else {
      setLimitExceeded(false);
      setIsBlocked(false);
    }
  };

  return (
    <div css={projectModalStyle(theme)}>
      <div className="modal">
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        <div className="modal-content">
          <form className="form-group" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="projectName">Project Name</label>
              <input type="text" id="projectName" />
            </div>
            <div className="input-group">
              <label htmlFor="projectDescription">Description</label>
              <textarea
                onKeyDown={handleKeyDown}
                readOnly={isBlocked}
                id="projectDescription"
                className={isLimitExceeded ? "limit-exceeded" : ""}
                onInput={handleInputTextarea}
              />
              {isLimitExceeded && (
                <p className="warning">Word limit exceeded!</p>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="projectLink">Link</label>
              <input type="text" id="projectLink" />
            </div>
            <div className="input-group">
              <label htmlFor="projectImage">Image</label>
              <input type="file" id="projectImage" accept=".jpg,.jpeg,.png" />
            </div>
            <div className="button-container">
              <button type="submit">Save</button>
              <button onClick={handleClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjectsModal;
