import { useState, useEffect } from 'react';

import weatherService from '../services/weather';

const Weather = ({ location }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(location)
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        setWeather(null);
        console.log('Error:', error.message);
      });
  }, [location]);

  if (location === null) return null;

  if (weather === null) return <p>Loading weather data...</p>;

  return (
    <div>
      <h2>Weather in {location}</h2>
      <p>temperature {weather.main.temp} Celsius</p>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={`Weather icon: ${weather.weather[0].description}`}
        />
      </div>
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
