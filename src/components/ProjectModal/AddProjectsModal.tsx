/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { projectModalStyle } from "./AddProjectModal.style";
import { useTheme } from "../../hooks/useTheme";
import { Project } from "../UserDashboard/UserDashboard";
import axios from "axios";
import TextArea from "../TextArea/TextArea";

interface AddProjectsModalProps {
  closeModal: () => void;
  projectToEdit?: Project;
  onProjectSubmission: (project: Project[], isEdit: boolean) => void;
}

const AddProjectsModal: React.FC<AddProjectsModalProps> = ({
  closeModal,

  projectToEdit,

  onProjectSubmission,
}) => {
  const theme = useTheme();
  const [project, setProject] = useState<Project>({
    _id: "",
    name: "",
    description: "",
    image: "",
    link: "",
  });

  type FormState = {
    userId: string | null;
    name: string;
    description: string;
    link: string;
    image: File | null;
  };
  const [formState, setFormState] = useState<FormState>({
    userId: localStorage.getItem("userId"),
    name: "",
    description: "",
    link: "",
    image: null,
  });

  useEffect(() => {
    if (projectToEdit) {
      setFormState({
        userId: localStorage.getItem("userId"),
        name: projectToEdit.name,
        description: projectToEdit.description,
        link: projectToEdit.link,
        image: null,
      });
    }
  }, [projectToEdit]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("handleSubmit function called");
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login to add a project");
      return;
    }

    const formData = new FormData();
    Object.keys(formState).forEach((key) => {
      const formKey = key as keyof typeof formState;
      const value = formState[formKey] || "";
      formData.append(formKey, value);
    });

    try {
      const isEdit = !!projectToEdit?._id;
      const response = await (isEdit
        ? axios.put(
            `http://localhost:3001/projects/${userId}/${projectToEdit._id}`,
            formData
          )
        : axios.post("http://localhost:3001/projects", formData));
      console.log(response.data);
      onProjectSubmission(response.data, isEdit);
      closeModal();
    } catch (error) {
      console.error("An error occurred while trying to add the project", error);
    }
  };

  const handleInputChange = (field: string, value: string | FileList) => {
    if (field === "image" && typeof value !== "string") {
      setFormState((prevState) => ({
        ...prevState,
        [field]: value[0] as File | null,
      }));
    } else {
      setFormState((prevState) => ({ ...prevState, [field]: value }));
    }
  };

  const handleClose = () => {
    closeModal();
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
                value={formState.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="projectDescription">Description</label>
              <TextArea
                limit={250}
                value={project.description}
                name="projectDescription"
                onChange={(value) => handleInputChange("description", value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="projectLink">Link</label>
              <input
                type="text"
                id="projectLink"
                name="projectLink"
                value={formState.link}
                onChange={(e) => handleInputChange("link", e.target.value)}
                required
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
                onChange={(e) =>
                  handleInputChange("image", e.target.files as FileList)
                }
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
