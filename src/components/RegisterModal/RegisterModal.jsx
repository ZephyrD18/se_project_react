import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  isValidEmail,
  isValidUrl,
} from "../../utils/validation";

function RegisterModal({
  isOpen,
  isLoading,
  onClose,
  onRegister,
  onLoginClick,
  onInputChange,
  formError,
  buttonText,
}) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const nameHasError =
    values.name.length > 0 && values.name.trim().length < MIN_NAME_LENGTH;
  const avatarHasError = values.avatar.length > 0 && !isValidUrl(values.avatar);
  const emailHasError = values.email.length > 0 && !isValidEmail(values.email);
  const isFormValid =
    values.name.trim().length >= MIN_NAME_LENGTH &&
    values.name.trim().length <= MAX_NAME_LENGTH &&
    isValidUrl(values.avatar) &&
    isValidEmail(values.email) &&
    values.password.length > 0 &&
    !isLoading;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    onRegister(
      {
        name: values.name.trim(),
        avatar: values.avatar.trim(),
        email: values.email.trim(),
        password: values.password,
      },
      resetForm,
    );
  };

  const handleFieldChange = (event) => {
    onInputChange?.();
    handleChange(event);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
      secondaryActionText="or Log In"
      onSecondaryAction={onLoginClick}
      formError={formError}
    >
      <label className="modal__label">
        <span className="modal__label-text">Email*</span>
        <input
          type="email"
          name="email"
          className={`modal__input ${
            emailHasError ? "modal__input_type_error" : ""
          }`}
          placeholder="Email"
          required
          value={values.email}
          onChange={handleFieldChange}
        />
        {emailHasError && (
          <span className="modal__error">Enter a valid email address</span>
        )}
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Password*</span>
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleFieldChange}
        />
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Name *</span>
        <input
          type="text"
          name="name"
          className={`modal__input ${
            nameHasError ? "modal__input_type_error" : ""
          }`}
          placeholder="Name"
          minLength={MIN_NAME_LENGTH}
          maxLength={MAX_NAME_LENGTH}
          required
          value={values.name}
          onChange={handleFieldChange}
        />
        {nameHasError && (
          <span className="modal__error">Minimum 2 characters required</span>
        )}
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Avatar URL *</span>
        <input
          type="url"
          name="avatar"
          className={`modal__input ${
            avatarHasError ? "modal__input_type_error" : ""
          }`}
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleFieldChange}
        />
        {avatarHasError && (
          <span className="modal__error">Must be a valid URL</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
