import { useRef } from "react";
import "./Modal.css";
import closeIcon from "../../assets/CloseButton.svg";

function Modal({ isOpen, onClose, contentClassName, ariaLabel, children }) {
  const overlayMouseDownRef = useRef(false);

  const handleMouseDown = (event) => {
    overlayMouseDownRef.current = event.target === event.currentTarget;
  };

  const handleMouseUp = (event) => {
    const startedOnOverlay = overlayMouseDownRef.current;
    const endedOnOverlay = event.target === event.currentTarget;

    if (startedOnOverlay && endedOnOverlay) {
      onClose();
    }

    overlayMouseDownRef.current = false;
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className={`modal__content ${contentClassName}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-label={ariaLabel}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <img
            src={closeIcon}
            alt="Close dialog"
            className="modal__close-icon"
          />
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
