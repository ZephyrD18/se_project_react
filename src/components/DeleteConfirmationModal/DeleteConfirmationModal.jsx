import "./DeleteConfirmationModal.css";
import Modal from "../Modal/Modal";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="modal__content_type_confirmation"
    >
      <p className="modal__confirmation-text">
        Are you sure you want to delete this item? This action is irreversible.
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
    </Modal>
  );
}

export default DeleteConfirmationModal;
