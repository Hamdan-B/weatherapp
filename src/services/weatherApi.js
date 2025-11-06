import axios from "axios";

const API_KEY = "ff66230de26b4fc6bf6112448252808";
const BASE_URL = "http://api.weatherapi.com/v1";

export const getWeather = async (city) => {
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
