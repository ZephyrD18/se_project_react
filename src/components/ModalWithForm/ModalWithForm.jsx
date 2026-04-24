import { useRef } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/CloseButton.svg";

function ModalWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  children,
}) {
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
      <div className="modal__content modal__content_type_form">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}

          <button
            type="submit"
            className={`modal__submit ${
              isValid ? "modal__submit_enabled" : ""
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
