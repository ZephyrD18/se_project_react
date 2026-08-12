import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";
import {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  isValidUrl,
} from "../../utils/validation";

function EditProfileModal({
  isOpen,
  isLoading,
  onClose,
  onUpdateProfile,
  buttonText,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    resetForm({
      name: currentUser.name || "",
      avatar: currentUser.avatar || "",
    });
  }, [currentUser.avatar, currentUser.name, isOpen, resetForm]);

  const nameHasError =
    values.name.length > 0 &&
    (values.name.trim().length < MIN_NAME_LENGTH ||
      values.name.trim().length > MAX_NAME_LENGTH);
  const avatarHasError = values.avatar.length > 0 && !isValidUrl(values.avatar);
  const isFormValid =
    values.name.trim().length >= MIN_NAME_LENGTH &&
    values.name.trim().length <= MAX_NAME_LENGTH &&
    isValidUrl(values.avatar) &&
    !isLoading;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    onUpdateProfile({
      name: values.name.trim(),
      avatar: values.avatar.trim(),
    });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
    >
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
          onChange={handleChange}
        />
        {nameHasError && (
          <span className="modal__error">Minimum 2 characters required</span>
        )}
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Avatar *</span>
        <input
          type="url"
          name="avatar"
          className={`modal__input ${
            avatarHasError ? "modal__input_type_error" : ""
          }`}
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
        {avatarHasError && (
          <span className="modal__error">Must be a valid URL</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
