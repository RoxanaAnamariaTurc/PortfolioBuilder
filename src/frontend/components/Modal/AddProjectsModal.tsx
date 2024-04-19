/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { getModalStyles } from "./Modal.style";
import { useTheme } from "../../../hooks/useTheme";
import { Project } from "../UserDashboard/UserDashboard";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import { createProject, editProject } from "../../../api";

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
  const style = getModalStyles(theme);

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
        ? editProject(userId, projectToEdit?._id, formData)
        : createProject(formData));
      console.log(response);
      onProjectSubmission(response, isEdit);
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
    <div css={style.div}>
      <h2 css={style.h2}>Project Details</h2>
      <div css={style.modal}>
        <span css={style.closeButton} onClick={closeModal}>
          &times;
        </span>
        <div className="modal-content">
          <form css={style.form}>
            <div css={style.inputGroup}>
              <label css={style.label} htmlFor="projectName">
                Project Name
              </label>
              <input
                css={style.input}
                type="text"
                id="projectName"
                name="name"
                value={formState.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div css={style.inputGroup}>
              <label css={style.label} htmlFor="projectDescription">
                Description
              </label>
              <TextArea
                limit={250}
                value={formState.description}
                name="projectDescription"
                onChange={(value) => handleInputChange("description", value)}
              />
            </div>
            <div css={style.inputGroup}>
              <label css={style.label} htmlFor="projectLink">
                Link
              </label>
              <input
                css={style.input}
                type="text"
                id="projectLink"
                name="projectLink"
                value={formState.link}
                onChange={(e) => handleInputChange("link", e.target.value)}
                required
              />
            </div>

            <div css={style.customFile}>
              <label css={style.label} htmlFor="projectImage">
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

            <div css={style.buttonContainer}>
              <Button
                color="primary"
                backgroundColor={"transparent"}
                borderRadius={"xsmall"}
                width={"large"}
                height={"medium"}
                onClick={handleSubmit}
                padding={"xsmall"}
              >
                Save
              </Button>
              <Button
                color="primary"
                backgroundColor={"transparent"}
                borderRadius={"xsmall"}
                width={"large"}
                height={"medium"}
                padding={"xsmall"}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjectsModal;
