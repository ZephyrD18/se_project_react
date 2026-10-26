# WTWR (What to Wear?)

WTWR is a full-stack wardrobe application that recommends clothing for the current weather. The React frontend retrieves live weather data and communicates with an Express and MongoDB API for user accounts and clothing-item persistence.

Live site: [ttwtwr.robot-armies.com](https://ttwtwr.robot-armies.com). API: [api.ttwtwr.robot-armies.com](https://api.ttwtwr.robot-armies.com/items).

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

The frontend expects the backend API at `http://localhost:3001` and runs at `http://localhost:3000`.

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

## Production Build

Set `VITE_API_BASE_URL` to the HTTPS URL of the deployed API subdomain, either in your shell or in `.env.production.local`. Then run `npm run build` and upload only the contents of `dist` for nginx to serve. Vite embeds the API URL when building; changing it requires a new build.

Vite serves this application from `/` and does not use a `homepage` package field. Install development dependencies with `npm ci`; their sources and licenses are recorded in `package-lock.json`.

Production loads React 18.3.1, React DOM 18.3.1, and React Router DOM 6.30.3, all MIT-licensed, from [esm.sh](https://esm.sh/) using a pinned import map. These runtimes are excluded from the application bundle and remain hosted separately. The site requires a browser with import-map support and access to esm.sh.

Cabinet Grotesk is provided by Indian Type Foundry under the [ITF Free Font License](https://www.fontshare.com/licenses). The application loads weights 400, 500, and 700 through the [official Fontshare CSS API](https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap); font files are hosted by Fontshare and require a network connection. Arial is the fallback when that service is unavailable. The release contains no local font binaries or third-party reset stylesheet.

## Quality Checks

```bash
npm run lint
npm run format:check
npm run build
```

## Project Pitch Video

Watch the [WTWR project pitch](https://www.loom.com/share/ee9be9be09544c9e803cb46ab5aa3840).
