/** @jsxImportSource @emotion/react */
import React from "react";
import Button from "../Button/Button";
import { getModalStyles } from "./Modal.style";
import { useTheme } from "../../../hooks/useTheme";
import LoadingBars from "../LoadingBars/LoadingBars";

interface DeleteModalProps {
  closeModal: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  closeModal,
  onDelete,
  isLoading,
}) => {
  const theme = useTheme();
  const style = getModalStyles(theme);

  return (
    <div>
      {isLoading ? (
        <>
          <p css={style.p}>"Project deleting in progress..."</p>
          <LoadingBars type="circle" />
        </>
      ) : (
        <>
          <h2 css={style.h2}>Are you sure you want to delete this project?</h2>
          <div css={style.buttonContainer}>
            <Button
              color="primary"
              backgroundColor={"transparent"}
              borderRadius={"xsmall"}
              width={"large"}
              height={"medium"}
              padding={"xsmall"}
              onClick={onDelete}
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
  );
};

export default DeleteModal;
