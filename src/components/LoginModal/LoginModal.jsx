import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { isValidEmail } from "../../utils/validation";

function LoginModal({
  isOpen,
  isLoading,
  onClose,
  onLogin,
  onRegisterClick,
  onInputChange,
  formError,
  buttonText,
}) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const emailHasError = values.email.length > 0 && !isValidEmail(values.email);
  const isFormValid =
    isValidEmail(values.email) && values.password.length > 0 && !isLoading;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    onLogin(
      {
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
      title="Log In"
      name="login"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
      secondaryActionText="or Sign Up"
      onSecondaryAction={onRegisterClick}
      formError={formError}
    >
      <label className="modal__label">
        <span className="modal__label-text">Email</span>
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
        <span className="modal__label-text">
          {formError ? "Incorrect password" : "Password"}
        </span>
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
    </ModalWithForm>
  );
}

export default LoginModal;
