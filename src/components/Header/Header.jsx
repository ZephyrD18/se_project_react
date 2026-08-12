import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import Avatar from "../Avatar/Avatar";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  isLoggedIn,
  isAuthChecking,
  weatherData,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const userName = currentUser.name || "";

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">wtwr&deg;</span>
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />

        {!isAuthChecking &&
          (isLoggedIn ? (
            <>
              <button
                type="button"
                className="header__add-btn"
                onClick={handleAddClick}
              >
                + Add clothes
              </button>

              <Link to="/profile" className="header__profile-link">
                <p className="header__username">{userName}</p>
                <Avatar
                  name={userName}
                  avatarUrl={currentUser.avatar}
                  imageClassName="header__avatar"
                  placeholderClassName="header__avatar-placeholder"
                />
              </Link>
            </>
          ) : (
            <div className="header__auth-buttons">
              <button
                type="button"
                className="header__auth-btn"
                onClick={handleRegisterClick}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="header__auth-btn"
                onClick={handleLoginClick}
              >
                Log In
              </button>
            </div>
          ))}
      </div>
    </header>
  );
}

export default Header;
