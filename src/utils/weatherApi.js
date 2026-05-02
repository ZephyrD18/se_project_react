import { apiKey, coordinates } from "./constants";
import { checkResponse } from "./api";

const HOT_TEMPERATURE_MIN = 86;
const WARM_TEMPERATURE_MIN = 66;
const FAHRENHEIT_FREEZING_POINT = 32;
const CELSIUS_CONVERSION_NUMERATOR = 5;
const CELSIUS_CONVERSION_DENOMINATOR = 9;

export function getWeatherCondition(temperature) {
  if (temperature >= HOT_TEMPERATURE_MIN) {
    return "hot";
  } else if (temperature >= WARM_TEMPERATURE_MIN) {
    return "warm";
  } else {
    return "cold";
  }
}

export function filterWeatherData(data) {
  const temperature = Math.round(data.main.temp);

  return {
    temp: {
      F: temperature,
      C: Math.round(
        ((temperature - FAHRENHEIT_FREEZING_POINT) *
          CELSIUS_CONVERSION_NUMERATOR) /
          CELSIUS_CONVERSION_DENOMINATOR,
      ),
    },
    city: data.name,
    type: getWeatherCondition(temperature),
  };
}

export function getWeather() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${apiKey}`,
  )
    .then(checkResponse)
    .then(filterWeatherData);
}
