import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import { getWeather } from "../../utils/weatherApi";
import {
  addCardLike,
  addItem,
  deleteItem,
  getItems,
  removeCardLike,
  updateProfile,
} from "../../utils/api";
import { authorize, checkToken, register } from "../../utils/auth";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getItemId } from "../../utils/item";

const DEFAULT_FAHRENHEIT_TEMPERATURE = 75;
const DEFAULT_CELSIUS_TEMPERATURE = 24;
const DEFAULT_WEATHER_DATA = {
  temp: {
    F: DEFAULT_FAHRENHEIT_TEMPERATURE,
    C: DEFAULT_CELSIUS_TEMPERATURE,
  },
  city: "",
  type: "hot",
};

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(DEFAULT_WEATHER_DATA);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [loginError, setLoginError] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  const handleRegisterClick = () => {
    setLoginError("");
    setRegistrationError("");
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setLoginError("");
    setRegistrationError("");
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    if (!isLoggedIn) return;

    setActiveModal("edit-profile");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
    handleCloseModal();
    navigate("/");
  };

  const handleAddClick = () => {
    if (!isLoggedIn) return;

    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
    setLoginError("");
    setRegistrationError("");
  };

  const handleAddItem = (item, resetForm) => {
    const token = localStorage.getItem("jwt");

    if (!isLoggedIn || !token) return;

    setIsLoading(true);

    addItem(item, token)
      .then((newItem) => {
        setClothingItems((currentItems) => [newItem, ...currentItems]);
        resetForm();
        handleCloseModal();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Add item error:", err);
      });
  };

  const openConfirmationModal = (card) => {
    if (!isLoggedIn) return;

    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

  const handleCardDelete = () => {
    const token = localStorage.getItem("jwt");

    if (!isLoggedIn || !token || !cardToDelete) return;

    const cardId = getItemId(cardToDelete);

    if (cardId === undefined) return;

    setIsLoading(true);

    deleteItem(cardId, token)
      .then(() => {
        setClothingItems((currentItems) =>
          currentItems.filter((item) => getItemId(item) !== cardId),
        );
        handleCloseModal();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Delete item error:", err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLoggedIn || !token || id === undefined) return;

    const likeRequest = isLiked ? removeCardLike : addCardLike;

    likeRequest(id, token)
      .then((updatedCard) => {
        if (localStorage.getItem("jwt") !== token) return;

        setClothingItems((currentItems) =>
          currentItems.map((item) =>
            String(getItemId(item)) === String(id) ? updatedCard : item,
          ),
        );
      })
      .catch((err) => {
        console.error("Card like error:", err);
      });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((currentUnit) =>
      currentUnit === "F" ? "C" : "F",
    );
  };

  const completeLogin = ({ email, password }, resetForm) => {
    let loginToken = "";

    return authorize({ email, password })
      .then((res) => {
        if (!res.token) {
          throw new Error("The server did not return a token");
        }

        loginToken = res.token;
        localStorage.setItem("jwt", loginToken);

        return checkToken(loginToken);
      })
      .then((user) => {
        if (localStorage.getItem("jwt") !== loginToken) {
          throw new Error("A newer authentication request has completed");
        }

        setCurrentUser(user);
        setIsLoggedIn(true);
        resetForm?.();
        handleCloseModal();

        return user;
      })
      .catch((err) => {
        if (loginToken && localStorage.getItem("jwt") === loginToken) {
          localStorage.removeItem("jwt");
          setCurrentUser({});
          setIsLoggedIn(false);
        }

        return Promise.reject(err);
      });
  };

  const handleRegistration = (userData, resetForm) => {
    setRegistrationError("");
    setIsLoading(true);

    register(userData)
      .then(() =>
        completeLogin(
          { email: userData.email, password: userData.password },
          resetForm,
        ),
      )
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setRegistrationError("Unable to register. Please try again");
        console.error("Registration error:", err);
      });
  };

  const handleLogin = (credentials, resetForm) => {
    setLoginError("");
    setIsLoading(true);

    completeLogin(credentials, resetForm)
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setLoginError("Email or password incorrect");
        console.error("Login error:", err);
      });
  };

  const handleUpdateProfile = (profileData) => {
    const token = localStorage.getItem("jwt");

    if (!isLoggedIn || !token) return;

    setIsLoading(true);

    updateProfile(profileData, token)
      .then((updatedUser) => {
        if (localStorage.getItem("jwt") !== token) return;

        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Profile update error:", err);
      });
  };

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Items API error:", err);
      });

    getWeather()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => {
        console.error("Weather API error:", err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    let isMounted = true;

    if (!token) {
      setIsAuthChecking(false);
      return undefined;
    }

    checkToken(token)
      .then((user) => {
        if (isMounted && localStorage.getItem("jwt") === token) {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }
      })
      .finally(() => {
        if (isMounted) setIsAuthChecking(false);
      })
      .catch((err) => {
        if (isMounted && localStorage.getItem("jwt") === token) {
          localStorage.removeItem("jwt");
          setCurrentUser({});
          setIsLoggedIn(false);
          console.error("Token validation error:", err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeModal) return undefined;

    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            handleAddClick={handleAddClick}
            handleRegisterClick={handleRegisterClick}
            handleLoginClick={handleLoginClick}
            isLoggedIn={isLoggedIn}
            isAuthChecking={isAuthChecking}
            weatherData={weatherData}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isChecking={isAuthChecking}
                >
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onAddClick={handleAddClick}
                    onEditProfileClick={handleEditProfileClick}
                    onSignOut={handleSignOut}
                    isLoggedIn={isLoggedIn}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            isLoading={isLoading}
            onAddItem={handleAddItem}
            onClose={handleCloseModal}
            buttonText={isLoading ? "Saving..." : "Add garment"}
          />

          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "preview"}
            onClose={handleCloseModal}
            onDeleteClick={openConfirmationModal}
          />

          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={handleCloseModal}
            onConfirm={handleCardDelete}
            buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            isLoading={isLoading}
            onClose={handleCloseModal}
            onRegister={handleRegistration}
            onLoginClick={handleLoginClick}
            onInputChange={() => setRegistrationError("")}
            formError={registrationError}
            buttonText={isLoading ? "Signing up..." : "Sign Up"}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            isLoading={isLoading}
            onClose={handleCloseModal}
            onLogin={handleLogin}
            onRegisterClick={handleRegisterClick}
            onInputChange={() => setLoginError("")}
            formError={loginError}
            buttonText={isLoading ? "Logging in..." : "Log In"}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            isLoading={isLoading}
            onClose={handleCloseModal}
            onUpdateProfile={handleUpdateProfile}
            buttonText={isLoading ? "Saving..." : "Save changes"}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
