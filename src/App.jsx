import React, { useState } from "react";
import "./App.css";

const APIKEY = "8e9bdd624d27a94bf1bd7e0ca7e99da6";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Weather App ☀️ </h1>
      </div>

      <div className="section">
        <div className="search">
          <input
            type="text"
            placeholder="Enter a city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button type="button" onClick={getWeather}>
            Search
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="card">
          <div className="weather-info">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>🌡 Temperature: {weather.main.temp} °C</p>
            <p>🌥 Weather: {weather.weather[0].description}</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
          </div>
          </div>
        )}
      </div>

      <div className="footer">
        <p>© 2026 Weather App - @~SHAIK RAHIM</p>
      </div>
    </div>
  );
}