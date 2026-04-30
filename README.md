# WTWR (What to Wear)

WTWR is a React application that helps users decide what to wear based on the current weather. The app gets live weather data, matches garments to the active weather type, and provides a small wardrobe interface for adding, previewing, and deleting clothing items.

## Project Features

- Current weather display with location, date, temperature, and weather-based visuals
- Fahrenheit/Celsius temperature toggle powered by React context
- Weather-based filtering on the main clothing card feed
- Profile route with the full clothing collection and user sidebar
- Controlled add-garment form with client-side validation
- Item preview modal and delete confirmation flow
- Overlay-click and Escape-key modal closing behavior
- Clothing item persistence through a local JSON Server mock API
- Live weather data from the OpenWeather API

## Technologies Used

- React
- React Router
- Vite
- JavaScript
- CSS
- OpenWeather API
- Fetch API
- JSON Server
- ESLint
- Prettier

## Implementation Notes

The application is built with functional React components and hooks. It uses React Router for page navigation, Context API for the shared temperature unit, a reusable modal foundation for dialog behavior, and a custom `useForm` hook to manage form state. API utilities keep the OpenWeather and clothing item requests separate from the component layer, while component-scoped CSS and BEM-style class names keep the UI styles organized.

## Project Pitch Video

Check out [my project pitch video](https://www.loom.com/share/71c93c98196a4fa892024666bc1751b5), where I walk through WTWR and share some of the challenges I faced while building it.
