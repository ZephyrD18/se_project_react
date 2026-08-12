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
  secondaryActionText,
  onSecondaryAction,
  formError,
  children,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName={`modal__content_type_form modal__content_type_${name}`}
      ariaLabel={title}
    >
      <h2 className="modal__title">{title}</h2>

      <form className="modal__form" name={name} onSubmit={onSubmit}>
        {children}

        {formError && (
          <p className="modal__form-error" role="alert">
            {formError}
          </p>
        )}

        <div className="modal__actions">
          <button type="submit" className="modal__submit" disabled={!isValid}>
            {buttonText}
          </button>

          {secondaryActionText && (
            <button
              type="button"
              className="modal__secondary-action"
              onClick={onSecondaryAction}
            >
              {secondaryActionText}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
