import { useRef } from "react";
import closeIcon from "../../assets/CloseButton.svg";

function Modal({ isOpen, onClose, contentClassName, children }) {
  const overlayMouseDownRef = useRef(false);

  const handleMouseDown = (evt) => {
    overlayMouseDownRef.current = evt.target === evt.currentTarget;
  };

  const handleMouseUp = (evt) => {
    const startedOnOverlay = overlayMouseDownRef.current;
    const endedOnOverlay = evt.target === evt.currentTarget;

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
      <div className={`modal__content ${contentClassName}`}>
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
