/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { getModalStyles } from "./Modal.style";
import { useTheme } from "../../../hooks/useTheme";
import { Project } from "../../../types";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import {
  useCreateProjectMutation,
  useEditProjectMutation,
} from "../../../api";
import LoadingBars from "../LoadingBars/LoadingBars";

interface AddProjectsModalProps {
  closeModal: () => void;
  projectToEdit?: Project | null;
  isOpen: boolean;
  userId: string;
  portfolioToken: string | null;
}

const AddProjectsModal: React.FC<AddProjectsModalProps> = ({
  closeModal,
  projectToEdit,
  isOpen,
  userId,
  portfolioToken,
}) => {
  const theme = useTheme();
  const style = getModalStyles(theme);

  type FormState = {
    userId: string;
    name: string;
    description: string;
    link: string;
    image: File | null;
  };
  const buildInitialState = (id: string): FormState => ({
    userId: id,
    name: "",
    description: "",
    link: "",
    image: null,
  });

  const [formState, setFormState] = useState<FormState>(() =>
    buildInitialState(userId)
  );
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createProjectMutation = useCreateProjectMutation(portfolioToken);
  const editProjectMutation = useEditProjectMutation(portfolioToken);

  useEffect(() => {
    if (projectToEdit) {
      setFormState({
        userId,
        name: projectToEdit.name,
        description: projectToEdit.description,
        link: projectToEdit.link,
        image: null,
      });
      setFileName("");
    } else {
      setFormState(buildInitialState(userId));
      setFileName("");
    }
  }, [projectToEdit, userId]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name) newErrors.name = "Project Name is required";
    if (!formState.description)
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!userId) {
      setErrorMessage("Please login to add a project");
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
      if (isEdit && projectToEdit?._id) {
        await editProjectMutation.mutateAsync({
          userId,
          projectId: projectToEdit._id,
          formData,
        });
      } else {
        await createProjectMutation.mutateAsync(formData);
      }
      closeModal();
      setFormState(buildInitialState(userId));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setErrorMessage(null);
    } catch (error: any) {
      const message = error?.message || "An unexpected error occurred.";
      setErrorMessage(message);
      console.error("An error occurred while trying to add the project:", error);
    }
  };

  const handleInputChange = (field: string, value: string | FileList) => {
    if (field === "image" && typeof value !== "string") {
      setFormState((prevState) => ({
        ...prevState,
        [field]: value[0] as File | null,
      }));
      setFileName(value[0].name);
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [field]: value as string,
      }));
    }
  };

  const handleClose = () => {
    closeModal();
  };
  const bars = [
    { width: "300px", delay: "0s" },
    { width: "200px", delay: "0.2s" },
    { width: "300px", delay: "0.4s" },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      {createProjectMutation.isPending || editProjectMutation.isPending ? (
        <LoadingBars bars={bars} />
      ) : (
        <>
          <h2 css={style.h2}>Project Details</h2>
          <div className="modal-content">
            <form css={style.form}>
              <div css={style.inputGroup}>
                <label
                  className="required"
                  css={style.label}
                  htmlFor="projectName"
                >
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
                {errors.name && <p css={style.error}>{errors.name}</p>}
              </div>
              <div css={style.inputGroup}>
                <label
                  className="required"
                  css={style.label}
                  htmlFor="projectDescription"
                >
                  Description
                </label>
                <TextArea
                  limit={250}
                  value={formState.description}
                  name="projectDescription"
                  onChange={(value) => handleInputChange("description", value)}
                  id="projectDescription"
                />
                {errors.description && (
                  <p css={style.error}>{errors.description}</p>
                )}
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
                />
              </div>
              <div css={style.customFile}>
                <label
                  css={style.label}
                  htmlFor="projectImage"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  {fileName ? `${fileName} uploaded` : "Choose Project Image"}
                </label>
                <input
                  ref={fileInputRef}
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
                  type="button"
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
              {errorMessage && (
                <p data-testid="error-message" css={style.error}>
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AddProjectsModal;
