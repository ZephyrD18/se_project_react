# WTWR (What to Wear?)

WTWR is a full-stack wardrobe application that recommends clothing for the current weather. The React frontend retrieves live weather data and communicates with an Express and MongoDB API for user accounts and clothing-item persistence.

## Functionality

- Display the current date, location, weather, and temperature in Fahrenheit or Celsius.
- Filter the public clothing feed by the current weather category.
- Register, sign in, restore authenticated sessions from a JWT, and sign out.
- Protect the profile route from unauthorized visitors.
- Display the current user's name and avatar with a first-letter fallback.
- Add and delete user-owned clothing items.
- Like and unlike clothing items.
- Edit the authenticated user's name and avatar.
- Close modals with their close controls, the overlay, or the Escape key.

## Technologies and Techniques

- React 18 and functional components
- React Router
- Context API for temperature units and current-user data
- Controlled forms through a reusable `useForm` hook
- Fetch API with JWT Bearer authorization
- Vite
- CSS, BEM naming, responsive layouts, and custom web fonts
- OpenWeather API
- Express, MongoDB, and Mongoose through the separate backend project
- ESLint and Prettier

## Repositories

The application is split across these public GitHub repositories:

- Frontend: [ZephyrD18/se_project_react](https://github.com/ZephyrD18/se_project_react)
- Backend API: [ZephyrD18/se_project_express](https://github.com/ZephyrD18/se_project_express)

## Run Locally

The frontend expects the backend API at `http://localhost:3001` and runs at `http://localhost:5173`.

1. Start MongoDB locally.
2. Clone and start the [backend repository](https://github.com/ZephyrD18/se_project_express):

   ```bash
   npm install
   npm run dev
   ```

3. In this frontend repository, install dependencies and start Vite:

   ```bash
   npm install
   npm run dev
   ```

## Quality Checks

```bash
npm run lint
npm run format:check
npm run build
```

## Project Pitch Video

Watch the [WTWR project pitch](https://www.loom.com/share/71c93c98196a4fa892024666bc1751b5).
