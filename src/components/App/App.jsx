import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Profile from "../Profile/Profile";
import { getWeather } from "../../utils/weatherApi";
import { addItem, deleteItem, getItems } from "../../utils/api";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: { F: 75, C: 24 },
    city: "",
    type: "hot",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const handleAddClick = () => {
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
  };

  const handleAddItem = (item, resetForm) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems((currentItems) => [newItem, ...currentItems]);
        resetForm();
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Add item error:", err);
      });
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

  const handleCardDelete = () => {
    if (!cardToDelete) return;

    const cardId = cardToDelete._id || cardToDelete.id;

    deleteItem(cardId)
      .then(() => {
        setClothingItems((currentItems) =>
          currentItems.filter((item) => (item._id || item.id) !== cardId),
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Delete item error:", err);
      });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((currentUnit) =>
      currentUnit === "F" ? "C" : "F",
    );
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
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={weatherData}
                clothingItems={clothingItems}
                onCardClick={handleCardClick}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                onCardClick={handleCardClick}
                onAddClick={handleAddClick}
              />
            }
          />
        </Routes>

        <Footer />

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItem}
          onClose={handleCloseModal}
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
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
