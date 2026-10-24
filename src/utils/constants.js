export const coordinates = {
  latitude: 40.7128,
  longitude: -74.006,
};

export const apiKey = "e8667a8196c7defcc01fad9a6fbd79a3";

export const apiBaseUrl = import.meta.env.PROD
  ? import.meta.env.VITE_API_BASE_URL
  : "http://localhost:3001";
