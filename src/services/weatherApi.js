import axios from "axios";
import { API_KEY as ENV_API_KEY } from "@env";

// Fallback to process.env if available (web / other environments)
const API_KEY =
  ENV_API_KEY ||
  (typeof process !== "undefined" ? process.env.API_KEY : undefined);
const BASE_URL = "http://api.weatherapi.com/v1";

export const getWeather = async (city) => {
  if (!API_KEY)
    throw new Error(
      "Weather API key is not set. Please add it to your .env file as API_KEY=YOUR_KEY"
    );

  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: city,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
