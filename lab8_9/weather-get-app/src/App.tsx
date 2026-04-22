import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import AirPollution from './components/AirPollution';
import { fetchForecast, fetchAirPollution } from './services/weather';
import './App.css';

function App() {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [cityName, setCityName] = useState<string>('');
  const [forecast, setForecast] = useState<any>(null);
  const [airPollution, setAirPollution] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchWeatherData = useCallback(async () => {
    if (lat === null || lon === null) return;
    setLoading(true);
    setError('');
    try {
      const [forecastData, airData] = await Promise.all([
        fetchForecast(lat, lon),
        fetchAirPollution(lat, lon),
      ]);
      setForecast(forecastData);
      setAirPollution(airData);
    } catch (err) {
      setError('Ошибка при загрузке данных. Попробуйте позже.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  // Первоначальная загрузка при изменении координат
  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  // Обновление каждые 3 часа (10800000 мс)
  useEffect(() => {
    if (!lat || !lon) return;
    const interval = setInterval(fetchWeatherData, 10800000);
    return () => clearInterval(interval);
  }, [lat, lon, fetchWeatherData]);

  const handleCitySelect = (newLat: number, newLon: number, name: string) => {
    setLat(newLat);
    setLon(newLon);
    setCityName(name);
  };

  // Определение класса для фона в зависимости от погоды
  const weatherCondition = forecast?.list[0]?.weather[0]?.main?.toLowerCase() || 'default';
  const appClassName = `App ${weatherCondition}`;

  return (
    <div className={appClassName}>
      <header style={{ padding: '20px' }}>
        <h1>Прогноз погоды</h1>
        <SearchBar onCitySelect={handleCitySelect} />
      </header>
      <main style={{ padding: '0 20px' }}>
        {loading && <div>Загрузка...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {forecast && (
          <>
            <CurrentWeather data={forecast} />
            <ForecastList forecastData={forecast.list} />
            <AirPollution data={airPollution} />
          </>
        )}
        {!forecast && !loading && !error && (
          <div>Введите название города, чтобы увидеть прогноз</div>
        )}
      </main>
    </div>
  );
}

export default App;