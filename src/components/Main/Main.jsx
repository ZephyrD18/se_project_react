import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";
import { getItemId } from "../../utils/item";

function Main({ weatherData, clothingItems, onCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData.temp[currentTemperatureUnit];

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherData.type;
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <h1 className="main__description">
        Today is {temp}&deg; {currentTemperatureUnit} / You may want to wear:
      </h1>

      <ul className="main__cards-list">
        {filteredCards.map((item) => (
          <li key={getItemId(item)} className="main__card-item">
            <ItemCard item={item} onCardClick={onCardClick} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Main;
