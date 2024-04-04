/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { projectModalStyle } from "./AddProjectModal.style";
import { useTheme } from "../../hooks/useTheme";
import { Project } from "../UserDashboard/UserDashboard";
import axios from "axios";
import TextArea from "../TextArea/TextArea";

interface AddProjectsModalProps {
  closeModal: () => void;
  onAddProject: (project: Project) => void;
  projectToEdit?: Project;
  setProjectToEdit: React.Dispatch<React.SetStateAction<Project | null>>;
  onEditProject: (project: Project) => void;
}

const AddProjectsModal: React.FC<AddProjectsModalProps> = ({
  closeModal,
  onAddProject,
  projectToEdit,
  onEditProject,
}) => {
  const theme = useTheme();
  const [newProject, setNewProject] = useState<Project>({
    _id: "",
    name: "",
    description: "",
    image: "",
    link: "",
  });
  const [editedProject, setEditedProject] = useState<Project | null>(null);

  useEffect(() => {
    setEditedProject(projectToEdit || null);
    setNewProject(
      projectToEdit || {
        _id: "",
        name: "",
        description: "",
        image: "",
        link: "",
      }
    );
  }, [projectToEdit]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to add a project");
      return;
    }
    const form = e.currentTarget.form as HTMLFormElement;
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
      if (editedProject) {
        const res = await axios.put(
          `http://localhost:3001/projects/${editedProject._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.status === 200) {
          onEditProject(res.data);
          closeModal();
        } else {
          console.error(`Unexpected status code: ${res.status}`);
          alert("An error occurred while trying to edit the project");
        }
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
          onAddProject(res.data);
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

  const handleInputChange = (field: keyof Project, value: string) => {
    setNewProject((prev) => ({ ...prev, [field]: value }));
    if (editedProject) {
      setEditedProject((prev) => (prev ? { ...prev, [field]: value } : null));
    }
  };

  return (
    <div css={projectModalStyle(theme)}>
      <div className="modal">
        <span className="close-button" onClick={closeModal}>
          &times;
        </span>
        <div className="modal-content">
          <form className="form-group">
            <div className="input-group">
              <label htmlFor="projectName">Project Name</label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={newProject.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="projectDescription">Description</label>
              <TextArea
                limit={250}
                value={newProject.description}
                onChange={(value) => handleInputChange("description", value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="projectLink">Link</label>
              <input
                type="text"
                id="projectLink"
                name="projectLink"
                value={newProject.link}
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
              <button type="button" onClick={handleSubmit}>
                Save
              </button>
              <button onClick={handleClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjectsModal;
