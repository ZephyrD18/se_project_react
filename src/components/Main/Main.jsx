import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems, onCardClick }) {
  const filteredCards = clothingItems.filter((item) => {
    return item.weather === weatherData.type;
  });

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <p className="main__description">
        Today is {weatherData.temp.F}° F / You may want to wear:
      </p>

      <ul className="main__cards-list">
        {filteredCards.map((item) => (
          <li key={item._id} className="main__card-item">
            <ItemCard item={item} onCardClick={onCardClick} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Main;
