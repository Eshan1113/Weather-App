import React, { useState, useEffect } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('Colombo');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = '73f18fc7a632679ea97429476be4f43f';

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Error fetching weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); // Fetch weather data only once when the component loads

  return (
    <div className="weather-app">
      <h1>Weather App</h1>

      <div className="input-section">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name"
          className="location-input"
        />
        <button onClick={fetchWeatherData} className="fetch-button">
          Get Weather
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>🌡️ Temperature: {weatherData.main.temp}°C</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
          <p>🌤️ Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
