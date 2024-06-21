/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Button from "../Button/Button";
import { Project } from "../UserDashboard/UserDashboard";
import { deleteProject } from "../../../api";
import { getModalStyles } from "./Modal.style";
import { useTheme } from "../../../hooks/useTheme";
import LoadingBars from "../LoadingBars/LoadingBars";

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
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const style = getModalStyles(theme);

  const handleDeleteProject = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !projectId) {
      alert("Please login to delete a project");
      return;
    }

    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div css={style.modal}>
      <div css={style.div}>
        <span css={style.closeButton} onClick={closeModal}>
          &times;
        </span>
        {isLoading ? (
          <>
            <p css={style.p}>"Project deleting in progress..."</p>
            <LoadingBars type="circle" />
          </>
        ) : (
          <>
            <h2 css={style.h2}>
              Are you sure you want to delete this project?
            </h2>
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
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
