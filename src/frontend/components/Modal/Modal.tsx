/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react";
import { getModalStyles } from "./Modal.style";
import { useTheme } from "../../../hooks/useTheme";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeModalRef = useRef<HTMLButtonElement>(null);
  const theme = useTheme();
  const style = getModalStyles(theme);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  return (
    <div
      css={style.modal}
      role="dialog"
      aria-modal="true"
      ref={modalRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <div css={style.div}>
        <span css={style.closeButton} onClick={closeModal} ref={closeModalRef}>
          &times;
        </span>

        {children}
      </div>
    </div>
  );
};

export default Modal;
