/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { projectModalStyle } from "./AddProjectModal.style";
import { useTheme } from "../../custom hooks/useTheme";
import { Project } from "../UserDashboard/UserDashboard";
import axios from "axios";

interface AddProjectsModalProps {
  closeModal: () => void;
  onAddProject: (project: Project) => void;
  projectToEdit?: Project;
  setProjectToEdit?: React.Dispatch<React.SetStateAction<Project | null>>;
  onEditProject: (project: Project) => void;
}

const AddProjectsModal: React.FC<AddProjectsModalProps> = ({
  closeModal,
  onAddProject,
  projectToEdit,
  setProjectToEdit,
  onEditProject,
}) => {
  const theme = useTheme();
  const [isLimitExceeded, setLimitExceeded] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to add a project");
      return;
    }
    const form = e.target as HTMLFormElement;
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append(
      "name",
      (form.elements.namedItem("projectName") as HTMLInputElement)?.value || ""
    );
    formData.append(
      "description",
      (form.elements.namedItem("projectDescription") as HTMLInputElement)
        ?.value || ""
    );
    const projectImageInput = form.elements.namedItem(
      "projectImage"
    ) as HTMLInputElement;
    if (projectImageInput.files?.length) {
      formData.append("image", projectImageInput.files[0]);
    }
    formData.append(
      "link",
      (form.elements.namedItem("projectLink") as HTMLInputElement)?.value || ""
    );

    try {
      if (projectToEdit) {
        const project: Project = {
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          image: formData.get("image") as string,
          link: formData.get("link") as string,
        };
        onEditProject(projectToEdit);
        closeModal();
      } else {
        const res = await axios.post(
          "http://localhost:3001/projects",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 200 || res.status === 201) {
          const project = {
            userId: userId,
            name: (form.elements.namedItem("projectName") as HTMLInputElement)
              ?.value,
            description: (
              form.elements.namedItem("projectDescription") as HTMLInputElement
            )?.value,
            image: (form.elements.namedItem("projectImage") as HTMLInputElement)
              ?.value,
            link: (form.elements.namedItem("projectLink") as HTMLInputElement)
              ?.value,
          };
          onAddProject(project);
          closeModal();
        } else {
          console.error(`Unexpected status code: ${res.status}`);
          alert("An error occurred while trying to add the project");
        }
      }
    } catch (error) {
      console.error("An error occurred while trying to add the project", error);
    }
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

  const handleInputChange = (field: keyof Project, value: string) => {
    if (setProjectToEdit) {
      setProjectToEdit((prev) => {
        if (prev) {
          return { ...prev, [field]: value };
        }
        return prev;
      });
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
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={projectToEdit ? projectToEdit.name : ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="projectDescription">Description</label>
              <textarea
                onKeyDown={handleKeyDown}
                readOnly={isBlocked}
                id="projectDescription"
                className={isLimitExceeded ? "limit-exceeded" : ""}
                onInput={handleInputTextarea}
                name="projectDescription"
                value={projectToEdit ? projectToEdit.description : ""}
                placeholder="Describe your project here..."
              />
              {isLimitExceeded && (
                <p className="warning">Word limit exceeded!</p>
              )}
            </div>
            <div className="input-group">
              <label htmlFor="projectLink">Link</label>
              <input
                type="text"
                id="projectLink"
                name="projectLink"
                value={projectToEdit ? projectToEdit.link : ""}
                onChange={(e) => handleInputChange("link", e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="projectImage">Image</label>
              <label htmlFor="projectImage" className="custom-file-upload">
                Choose File
              </label>
              <input
                type="file"
                id="projectImage"
                name="projectImage"
                accept=".jpg,.jpeg,.png"
                style={{ display: "none" }}
              />
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
