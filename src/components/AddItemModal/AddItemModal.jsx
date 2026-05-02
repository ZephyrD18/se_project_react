import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const MIN_NAME_LENGTH = 2;
const weatherOptions = ["hot", "warm", "cold"];

const isValidUrl = (value) => {
  if (value.trim().length === 0) return false;

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

function AddItemModal({ isOpen, onAddItem, onClose, buttonText }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const nameHasError =
    values.name.length > 0 && values.name.trim().length < MIN_NAME_LENGTH;
  const imageHasError =
    values.imageUrl.length > 0 && !isValidUrl(values.imageUrl);

  const isFormValid =
    values.name.trim().length >= MIN_NAME_LENGTH &&
    isValidUrl(values.imageUrl) &&
    values.weather !== "";

  const handleSubmit = (event) => {
    event.preventDefault();

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
      buttonText={buttonText}
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
          minLength={MIN_NAME_LENGTH}
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

        {weatherOptions.map((weatherOption) => (
          <label key={weatherOption} className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              className="modal__radio-input"
              value={weatherOption}
              checked={values.weather === weatherOption}
              onChange={handleChange}
            />
            {weatherOption[0].toUpperCase() + weatherOption.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
