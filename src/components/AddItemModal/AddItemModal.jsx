import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const isValidUrl = (value) => {
    if (value.trim().length === 0) return false;

    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const nameHasError = name.length > 0 && name.trim().length < 2;
  const imageHasError = imageUrl.length > 0 && !isValidUrl(imageUrl);

  const isFormValid =
    name.trim().length >= 2 && isValidUrl(imageUrl) && weather !== "";

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!isFormValid) {
      return;
    }

    setName("");
    setImageUrl("");
    setWeather("");
    onClose();
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add-garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
    >
      <label className="modal__label">
        <span className="modal__label-text">Name</span>
        <input
          type="text"
          className={`modal__input ${
            nameHasError ? "modal__input_type_error" : ""
          }`}
          placeholder="Name"
          minLength="2"
          required
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
        <span className="modal__error">
          {nameHasError ? "Minimum 2 characters required" : ""}
        </span>
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Image</span>
        <input
          type="url"
          className={`modal__input ${
            imageHasError ? "modal__input_type_error" : ""
          }`}
          placeholder="Image URL"
          required
          value={imageUrl}
          onChange={(evt) => setImageUrl(evt.target.value)}
        />
        <span className="modal__error">
          {imageHasError ? "Must be a valid URL" : ""}
        </span>
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="hot"
            checked={weather === "hot"}
            onChange={(evt) => setWeather(evt.target.value)}
          />
          Hot
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="warm"
            checked={weather === "warm"}
            onChange={(evt) => setWeather(evt.target.value)}
          />
          Warm
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="cold"
            checked={weather === "cold"}
            onChange={(evt) => setWeather(evt.target.value)}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
