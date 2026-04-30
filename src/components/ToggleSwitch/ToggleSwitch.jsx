import { useContext } from "react";
import "./ToggleSwitch.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggle-switch">
      <input
        className="toggle-switch__checkbox"
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__slider">
        <span className="toggle-switch__label toggle-switch__label_type_f">
          F
        </span>
        <span className="toggle-switch__label toggle-switch__label_type_c">
          C
        </span>
      </span>
    </label>
  );
}

export default ToggleSwitch;
