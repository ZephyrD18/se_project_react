import "./ItemModal.css";
import Modal from "../Modal/Modal";

function ItemModal({ card, isOpen, onClose, onDeleteClick }) {
  if (!card) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="modal__content_type_image"
    >
      <img src={card.imageUrl} alt={card.name} className="modal__image" />

      <div className="modal__footer">
        <div>
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <button
          type="button"
          className="modal__delete-btn"
          onClick={() => onDeleteClick(card)}
        >
          Delete item
        </button>
      </div>
    </Modal>
  );
}

export default ItemModal;
