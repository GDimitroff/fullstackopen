import axios from 'axios';

const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getWeather = async (cityName) => {
  const url = `${baseURL}?q=${cityName}&appid=${API_KEY}&units=metric`;
  const request = axios.get(url);
  const response = await request;
  return response.data;
};

export default { getWeather };
