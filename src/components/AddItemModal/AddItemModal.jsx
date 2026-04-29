import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function AddItemModal({ isOpen, onAddItem, onClose }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const isValidUrl = (value) => {
    if (value.trim().length === 0) return false;

    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const nameHasError = values.name.length > 0 && values.name.trim().length < 2;
  const imageHasError =
    values.imageUrl.length > 0 && !isValidUrl(values.imageUrl);

  const isFormValid =
    values.name.trim().length >= 2 &&
    isValidUrl(values.imageUrl) &&
    values.weather !== "";

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAddItem(
      {
        name: values.name.trim(),
        imageUrl: values.imageUrl,
        weather: values.weather,
      },
      resetForm,
    );
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
          name="name"
          className={`modal__input ${
            nameHasError ? "modal__input_type_error" : ""
          }`}
          placeholder="Name"
          minLength="2"
          required
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__error">
          {nameHasError ? "Minimum 2 characters required" : ""}
        </span>
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Image</span>
        <input
          type="url"
          name="imageUrl"
          className={`modal__input ${
            imageHasError ? "modal__input_type_error" : ""
          }`}
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
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
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="modal__radio-label">
          <input
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
