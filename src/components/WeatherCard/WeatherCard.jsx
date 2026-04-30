import { useContext } from "react";
import "./WeatherCard.css";
import sun from "../../assets/Sun.svg";
import clouds from "../../assets/Clouds.svg";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnit";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData.temp[currentTemperatureUnit];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temp}&deg;{currentTemperatureUnit}
      </p>

      <div className="weather-card__icon">
        <img src={sun} alt="Sun" className="weather-card__sun" />
        <img src={clouds} alt="Clouds" className="weather-card__clouds" />
      </div>
    </section>
  );
}

export default WeatherCard;
