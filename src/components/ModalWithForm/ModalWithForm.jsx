import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

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
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="modal__content_type_form"
    >
      <h2 className="modal__title">{title}</h2>

      <form className="modal__form" name={name} onSubmit={onSubmit}>
        {children}

        <button
          type="submit"
          className={`modal__submit ${isValid ? "modal__submit_enabled" : ""}`}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
