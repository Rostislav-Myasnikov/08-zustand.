import css from "./AddNoteModal.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface ModalProp {
  closeModal: () => void;
}

export default function AddNoteModal({ closeModal }: ModalProp) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [closeModal]);
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onClose={closeModal} />
      </div>
    </div>,
    document.body
  );
}
