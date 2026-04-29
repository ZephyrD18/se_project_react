import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/CloseButton.svg";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="modal__content modal__content_type_confirmation">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <p className="modal__confirmation-text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>

        <button
          type="button"
          className="modal__confirm-delete"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>

        <button type="button" className="modal__cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
