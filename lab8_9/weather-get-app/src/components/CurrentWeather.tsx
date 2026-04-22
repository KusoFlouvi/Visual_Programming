import React from 'react';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: any; // позже уточним тип
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  if (!data) return null;

  const current = data.list[0];
  const city = data.city;

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h2>{city.name}, {city.country}</h2>
      <WeatherIcon iconCode={current.weather[0].icon} size={80} />
      <div style={{ fontSize: '48px', fontWeight: 'bold' }}>{Math.round(current.main.temp)}°C</div>
      <div>Ощущается как {Math.round(current.main.feels_like)}°C</div>
      <div>{current.weather[0].description}</div>
      <div>Ветер: {current.wind.speed} м/с</div>
      <div>Влажность: {current.main.humidity}%</div>
    </div>
  );
};

export default CurrentWeather;