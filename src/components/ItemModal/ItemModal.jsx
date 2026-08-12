import { useContext } from "react";
import "./ItemModal.css";
import Modal from "../Modal/Modal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ card, isOpen, onClose, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const ownerId =
    typeof card?.owner === "object" ? card.owner?._id : card?.owner;
  const isOwn = Boolean(
    ownerId && currentUser._id && ownerId === currentUser._id,
  );

  if (!card) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="modal__content_type_image"
      ariaLabel={`${card.name} preview`}
    >
      <img src={card.imageUrl} alt={card.name} className="modal__image" />

      <div className="modal__footer">
        <div>
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
          <button
            type="button"
            className="modal__delete-btn"
            onClick={() => onDeleteClick(card)}
          >
            Delete item
          </button>
        )}
      </div>
    </Modal>
  );
}

export default ItemModal;
