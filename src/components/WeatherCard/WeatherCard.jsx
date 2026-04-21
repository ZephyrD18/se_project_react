import "./WeatherCard.css";
import sun from "../../assets/Sun.svg";
import clouds from "../../assets/Clouds.svg";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}°F</p>

      <div className="weather-card__icon">
        <img src={sun} alt="" className="weather-card__sun" />
        <img src={clouds} alt="" className="weather-card__clouds" />
      </div>
    </section>
  );
}

export default WeatherCard;
