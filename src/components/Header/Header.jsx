import "./Header.css";
import avatar from "../../assets/Avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <p className="header__logo">wtwr°</p>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__right">
        <button
          type="button"
          className="header__add-btn"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>

        <p className="header__username">Terrence Tegene</p>

        <img src={avatar} alt="User avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;