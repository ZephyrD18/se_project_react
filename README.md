# WTWR

WTWR (What to Wear) is a React weather app that recommends clothing based on the current weather. It fetches live weather data, loads clothing items from a local JSON Server mock API, and lets users add, preview, and delete garments.

## Functionality

- Displays the current date and weather location
- Fetches current weather data from the OpenWeather API
- Switches temperature display between Fahrenheit and Celsius
- Filters main-page clothing cards by current weather type
- Provides a profile page with all clothing items
- Adds new garments through a controlled form
- Opens item preview and delete confirmation modals
- Stores clothing items through a JSON Server mock API

## Technologies and Techniques

- React with functional components and hooks
- React Router
- Context API
- Custom `useForm` hook
- Vite
- JSON Server
- Fetch API
- Component-scoped CSS
- BEM-style class naming

## Running the Project

Install dependencies, then run the mock API and React app in separate terminals:

```bash
npm install
npm run server
npm run dev
```

The mock API runs at `http://localhost:3001`.
