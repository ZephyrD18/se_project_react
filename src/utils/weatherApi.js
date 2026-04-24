import { apiKey, coordinates } from "./constants";

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }

  return res.json();
}

export function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
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
    },
    city: data.name,
    type: getWeatherCondition(temperature),
  };
}

export function getWeather() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${apiKey}`
  )
    .then(checkResponse)
    .then(filterWeatherData);
}
