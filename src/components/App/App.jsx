import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";
import { getWeather } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: { F: 75 },
    city: "",
    type: "hot",
  });

  const [clothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
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

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
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
      <Header handleAddClick={handleAddClick} weatherData={weatherData} />
      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
      />
      <Footer />

      <AddItemModal
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
      />

      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;