import { Link } from "react-router-dom";
import "./Header.css";
import avatar from "../../assets/Avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          wtwr&deg;
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        <button
          type="button"
          className="header__add-btn"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>

        <Link to="/profile" className="header__profile-link">
          <p className="header__username">Terrence Tegene</p>
          <img src={avatar} alt="User avatar" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
