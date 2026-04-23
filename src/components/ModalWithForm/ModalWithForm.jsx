import "./ModalWithForm.css";
import closeIcon from "../../assets/CloseButton.svg";

function ModalWithForm({ title, buttonText, isOpen, onClose }) {
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
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form">
          <label className="modal__label">
            Name
            <input type="text" className="modal__input" />
          </label>

          <label className="modal__label">
            Image
            <input type="url" className="modal__input" />
          </label>

          <fieldset className="modal__fieldset">
            <legend className="modal__legend">Select the weather type:</legend>

            <label className="modal__radio-label">
              <input
                type="radio"
                name="weather"
                className="modal__radio-input"
              />
              Hot
            </label>

            <label className="modal__radio-label">
              <input
                type="radio"
                name="weather"
                className="modal__radio-input"
              />
              Warm
            </label>

            <label className="modal__radio-label">
              <input
                type="radio"
                name="weather"
                className="modal__radio-input"
              />
              Cold
            </label>
          </fieldset>

          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
