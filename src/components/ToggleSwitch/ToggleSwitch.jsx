import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );
  const isCelsius = currentTemperatureUnit === "C";

  return (
    <label className="toggle-switch">
      <input
        className="toggle-switch__checkbox"
        type="checkbox"
        checked={isCelsius}
        onChange={handleToggleSwitchChange}
        aria-label="Use Celsius temperatures"
      />
      <span className="toggle-switch__slider">
        <span
          className={`toggle-switch__label ${
            isCelsius ? "" : "toggle-switch__label_active"
          }`}
        >
          F
        </span>
        <span
          className={`toggle-switch__label ${
            isCelsius ? "toggle-switch__label_active" : ""
          }`}
        >
          C
        </span>
      </span>
    </label>
  );
}

export default ToggleSwitch;
