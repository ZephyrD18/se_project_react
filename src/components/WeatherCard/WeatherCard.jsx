import "./WeatherCard.css";
import sun from "../../assets/Sun.svg";
import clouds from "../../assets/Clouds.svg";

function WeatherCard({ weatherData }) {
  const temp = weatherData.temp.F;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{temp}°F</p>

      <div className="weather-card__icon">
        <img src={sun} alt="Sun" className="weather-card__sun" />
        <img src={clouds} alt="Clouds" className="weather-card__clouds" />
      </div>
    </section>
  );
}

export default WeatherCard;
