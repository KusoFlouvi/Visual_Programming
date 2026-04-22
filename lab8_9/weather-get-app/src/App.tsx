import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import AirPollution from './components/AirPollution';
import { getCoordinates, getForecast, getAirPollution } from './api';
import './App.css';

function App() {
  const [city, setCity] = useState<string>('');
  const [forecast, setForecast] = useState<any>(null);
  const [air, setAir] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bgClass, setBgClass] = useState('default');

  const fetchWeather = useCallback(async (cityName: string) => {
    setLoading(true);
    setError('');
    try {
      const coords = await getCoordinates(cityName);
      const [forecastData, airData] = await Promise.all([
        getForecast(coords.lat, coords.lon),
        getAirPollution(coords.lat, coords.lon)
      ]);
      setForecast(forecastData);
      setAir(airData);
      const condition = forecastData.list[0].weather[0].main.toLowerCase();
      setBgClass(condition);
    } catch (err: any) {
      setError(err.message || 'Ошибка');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!city) return;
    fetchWeather(city);
    const interval = setInterval(() => fetchWeather(city), 3 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city, fetchWeather]);

  return (
    <div className={`App ${bgClass}`}>
      <h1>Прогноз погоды</h1>
      <SearchBar onSearch={setCity} />
      {loading && <div className="loader">Загрузка...</div>}
      {error && <div className="error">{error}</div>}
      {forecast && (
        <>
          <CurrentWeather
            data={forecast.list[0]}
            cityName={forecast.city.name}
            country={forecast.city.country}
          />
          <ForecastList list={forecast.list} />
          <AirPollution data={air} />
        </>
      )}
    </div>
  );
}

export default App;