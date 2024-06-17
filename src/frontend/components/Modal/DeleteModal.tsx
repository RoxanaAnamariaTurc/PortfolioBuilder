/** @jsxImportSource @emotion/react */
import React from "react";
import Button from "../Button/Button";
import { Project } from "../UserDashboard/UserDashboard";
import { deleteProject } from "../../../api";
import { getModalStyles } from "./Modal.style";
import { useTheme } from "../../../hooks/useTheme";

interface DeleteModalProps {
  projectId: string | null;
  closeModal: () => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  projectId,
  closeModal,
  projects,
  setProjects,
}) => {
  const theme = useTheme();
  const style = getModalStyles(theme);
  const handleDeleteProject = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !projectId) {
      alert("Please login to delete a project");
      return;
    }

    try {
      await deleteProject(userId, projectId);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
      closeModal();
    } catch (error) {
      console.error(
        "An error occurred while trying to delete the project",
        error
      );
    }
  };

  return (
    <>
      <div css={style.div}>
        <h2 css={style.h2}>Are you sure you want to delete this project?</h2>
        <div css={style.buttonContainer}>
          <Button
            color="primary"
            backgroundColor={"transparent"}
            borderRadius={"xsmall"}
            width={"large"}
            height={"medium"}
            padding={"xsmall"}
            onClick={handleDeleteProject}
          >
            Delete
          </Button>
          <Button
            color="primary"
            backgroundColor={"transparent"}
            borderRadius={"xsmall"}
            width={"large"}
            height={"medium"}
            padding={"xsmall"}
            onClick={closeModal}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
